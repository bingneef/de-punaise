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

    this.state = {
      post: null,
      loading: true,
    }
  }

  _close () {
    this.props.navigation.goBack()
  }

  render() {
    if (this.props.data.loading) {
      return (
        <View>
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
              <RkText rkType='secondary2 hintColor'>{moment().add(new Date(), 'seconds').fromNow()}</RkText>
            </View>
          </View>
          <View rkCardContent>
            <View>
              { post.content.map((item, index) => (
                <RkText key={index} rkType='primary3 bigLine'>{item}</RkText>
              ))}
            </View>
          </View>
          <View rkCardFooter />
        </RkCard>
      </ScrollView>
    )

    return (
      <ScrollView style={styles.container}>
        <StatusBar hidden={ true } />
        <Image
          style={{height: Dimensions.get('window').width * 3 / 4}}
          source={{uri: post.image.url}} />

        <TouchableOpacity onPress={this._close} style={styles.closeIconContainer}>
          <Icon
            ios='ios-close-circle'
            android='ios-close-circle'
            style={styles.closeIcon}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>
            { post.title }
          </Text>

          { post.content.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              { paragraph}
            </Text>
          ))}
        </View>
      </ScrollView>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
}));
