import React from 'react'
import { StyleSheet, FlatList, TouchableOpacity, Platform, Image, View, RefreshControl, ActivityIndicator } from 'react-native'
import { NavigationActions } from 'react-navigation'
import {
  RkCard, RkStyleSheet,
  RkText
} from 'react-native-ui-kitten'
import { truncate } from 'underscore.string'
import { setUser, setPosts } from '../actions'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

const limit = 10

@graphql(gql`
  fragment postInfo on Post {
    id
    title
    excerpt(size: 100)
    pubDateTimestamp
  }
  query($cursor: Int) {
    posts(cursor: $cursor, limit: ${limit}) {
      feed {
        ...postInfo
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
  constructor() {
    super()

    this.renderItem = this._renderItem.bind(this)

    this.state = {
      refreshing: false,
      loadingMore: false,
    }
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
          <View rkCardFooter />
        </RkCard>
      </TouchableOpacity>
    )
  }

  _keyExtractor(item, index) {
    return item.id
  }

  async onRefresh () {
    if (this.state.refreshing) {
      return
    }
    this.setState({refreshing: true})
    await this.props.refetch({cursor: 0})
    this.setState({refreshing: false})
  }

  async loadMore () {
    const { totalCount, feed } = this.props.posts
    const nothingLeftToLoad = totalCount ==  feed.length
    if (this.state.loadingMore || nothingLeftToLoad) {
      return
    }

    this.setState({loadingMore: true})
    await this.props.loadMorePosts()
    this.setState({loadingMore: false})
  }

  render() {
    if (this.props.loading && !this.state.loadingMore) {
      return (
        <View style={styles.container} />
      )
    }

    const { feed } = this.props.posts

    return (
      <FlatList
        data={ feed }
        renderItem={ this.renderItem }
        keyExtractor={ this._keyExtractor }
        style={ styles.container }
        scrollEventThrottle={ 200 }
        onScroll={(e) => {
          let paddingToBottom = 40
          paddingToBottom += e.nativeEvent.layoutMeasurement.height;
          if(e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
            this.loadMore()
          }
        }}
        refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}  />
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: 'white',
    flex: 1
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
  time: {
    marginTop: 5
  }
}))
