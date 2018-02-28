import React from 'react'
import { StyleSheet, FlatList, TouchableOpacity, Platform, Image, View, RefreshControl, ActivityIndicator, AppState } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationActions } from 'react-navigation'
import { RkCard, RkButton, RkStyleSheet, RkText } from 'react-native-ui-kitten'
import { truncate } from 'underscore.string'
import { setUser, setPosts } from '../actions'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import firebase from 'react-native-firebase'
import OpenSettings from 'react-native-open-settings'

import handleSuggestionMail from '../helpers/mail/handleSuggestionMail'
import NetworkError from '../components/NetworkError'

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    flex: 1,
  },
  navIcon: {
    color: theme.colors.text.base,
    padding: 12,
  },
  container: {
    paddingBottom: 48,
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },
  image: {
    borderRadius: 4,
  },
  card: {
    paddingHorizontal: 16,
    borderTopWidth: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CECECE',
    borderRadius: 0,
  },
  footer: {
    paddingTop: 16,
    paddingHorizontal: 0,
  },
  footerComponent: {
    marginTop: 12,
  }
}))

const limit = 4
@graphql(gql`
  query($cursor: Int) {
    posts(cursor: $cursor, limit: ${limit}) {
      feed {
        id
        title
        excerpt(size: 100)
        pubDateTimestamp
        image:imageSized {
          url
        }
      }
      totalCount
    },
  }
`, {
  options: props => {
    return {
      variables: {
        cursor: 0,
      },
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'none',
    }
  },
  props({ data: { loading, posts, fetchMore, refetch } }) {
    return {
      loading,
      posts,
      refetch,
      loadMorePosts() {
        return fetchMore({
          variables: {
            cursor: posts.feed.length,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) { return previousResult }

            const feed = [...previousResult.posts.feed, ...fetchMoreResult.posts.feed]

            return Object.assign({}, previousResult, {
              posts: {
                ...previousResult.posts,
                feed,
              },
            })
          },
        })
      }
    }
  },
})
export default class NewsList extends React.Component {
  static navigationOptions = {
    headerLeft: (
      <RkButton rkType='clear link' onPress={ handleSuggestionMail } color="#fff">
        <Icon style={styles.navIcon} name="lightbulb-on-outline" size={30} />
      </RkButton>
    ),
    headerRight: (
      <RkButton rkType='clear link' onPress={ () => OpenSettings.openSettings() } color="#fff">
        <Icon style={styles.navIcon} name="settings" size={30} />
      </RkButton>
    )
  }


  constructor() {
    super()

    this.renderItem = this._renderItem.bind(this)
    this.refresh = this._refresh.bind(this)
    this.loadMore = this._loadMore.bind(this)
    this.handleAppStateChange = this._handleAppStateChange.bind(this)

    this.state = {
      refreshing: false,
      loadingMore: false,
      appState: AppState.currentState,
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  _handleAppStateChange (nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.refresh()
    }

    this.setState({appState: nextAppState});
  }


  _renderItem({item}) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('NewsItem', {id: item.id})}>
        <RkCard rkType='blog' style={styles.card}>
          <View rkCardHeader style={styles.header}>
            <View>
              <RkText rkType='secondary2'>{moment(item.pubDateTimestamp).fromNow()}</RkText>
            </View>
          </View>
          <Image rkCardImg source={{uri: item.image.url}} style={styles.image} />
          <View style={styles.footer} rkCardFooter>
            <View style={{paddingHorizontal: 0}}>
              <RkText style={{paddingHorizontal: 0}} rkType='header2'>{item.title}</RkText>
              <RkText rkType='primary3 mediumLine' numberOfLines={2}>{item.excerpt}</RkText>
            </View>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  _keyExtractor(item, index) {
    return item.id
  }

  async _refresh () {
    if (this.state.refreshing) {
      return
    }

    this.setState({refreshing: true})
    await this.props.refetch({cursor: 0})
    this.setState({refreshing: false})
  }

  async _loadMore () {
    const { totalCount, feed } = this.props.posts
    const nothingLeftToLoad = totalCount ==  feed.length
    if (this.state.loadingMore || nothingLeftToLoad) {
      return
    }

    this.setState({loadingMore: true})
    await this.props.loadMorePosts()
    this.setState({loadingMore: false})

    firebase.analytics().logEvent('scroll_more', {currentCount: feed.length, totalCount})
  }

  render() {
    if (this.props.loading && (!this.props.posts || this.props.posts.length == 0)){
      return (
        <View style={styles.root} />
      )
    }

    if (this.props.error || !this.props.posts) {
      return <NetworkError />
    }

    const { feed } = this.props.posts

    return (
      <View style={styles.root}>
        <FlatList
          data={ feed }
          renderItem={ this.renderItem }
          keyExtractor={ this._keyExtractor }
          style={ styles.root }
          contentContainerStyle={styles.container}
          onEndReached={this.loadMore}
          onEndReachedThreshold={ 0.2 }
          refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh}/>}
          ListFooterComponent={ this.state.loadingMore && (<ActivityIndicator size="large" style={styles.footerComponent} />) }  />

      </View>
    )
  }
}
