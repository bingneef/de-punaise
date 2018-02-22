import React from 'react'
import { ScrollView, Dimensions, StyleSheet, Platform, Image, View, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import {
  RkCard,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import firebase from 'react-native-firebase'

@graphql(gql`
  query($postId: String!) {
    post:postById(postId: $postId) {
      title
      content
      pubDateTimestamp
      image:imageSized(size: "detail") {
        url
      }
    },
  }
`, {
  options: props => {
    return {
      variables: {
        postId: props.navigation.state.params.id,
      },
      fetchPolicy: 'cache-and-network',
    }
  },
})

export default class NewsItem extends React.Component {

  constructor() {
    super()

    this._close = this._close.bind(this)
  }

  componentDidMount() {
    firebase.analytics().logEvent('post_view', {id: this.props.navigation.state.params.id})
  }

  _close () {
    this.props.navigation.goBack()
  }

  render() {
    if (this.props.data.loading) {
      return (
        <View style={styles.root}>
          <ActivityIndicator
            animating={ true }
            style={{height: 80}}
            size="large"
          />
        </View>
      )
    }

    const { post } = this.props.data

    return (
      <ScrollView style={styles.root}>
        <RkCard rkType='article'>
          <Image rkCardImg source={{uri: post.image.url}} />
          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='header4'>{post.title}</RkText>
              <RkText rkType='secondary2 hintColor'>{moment(post.pubDateTimestamp).fromNow()}</RkText>
            </View>
          </View>
          <View rkCardContent>
            <View>
              { post.content.map((item, index) => (
                <RkText key={index} rkType='primary3 bigLine'>{item}</RkText>
              ))}
            </View>
          </View>
        </RkCard>
      </ScrollView>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    flex: 1,
    borderBottomWidth: 0,
  },
  title: {
    marginBottom: 5
  },
}));
