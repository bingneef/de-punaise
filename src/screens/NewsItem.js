import React, { Component } from 'react'
import { ScrollView, Dimensions, StyleSheet, Platform, Image, View, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import {
  RkCard,
  RkText,
  RkStyleSheet,
} from 'react-native-ui-kitten'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import firebase from 'react-native-firebase'
import { Modal, Button } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import Icon from 'react-native-vector-icons/Ionicons'

import NetworkError from '../components/NetworkError'
import SocialBar from '../components/SocialBar'

@graphql(gql`
  query($postId: String!) {
    post:postById(postId: $postId) {
      title
      content
      pubDateTimestamp
      views
      image:imageSized(size: "detail") {
        url
      }
      detailImage:imageSized(size: "super-detail") {
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
      errorPolicy: 'none',
    }
  },
})
export default class NewsItem extends Component {
  constructor() {
    super()

    this.openImageView = this._openImageView.bind(this)
    this.closeImageView = this._closeImageView.bind(this)

    this.state = {
      showImageViewer: false,
    }
  }

  _openImageView () {
    this.setState({
      showImageViewer: true,
    })
  }

  _closeImageView () {
    this.setState({
      showImageViewer: false,
    })
  }

  componentDidMount() {
    firebase.analytics().logEvent('post_view', {id: this.props.navigation.state.params.id})
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

    if (this.props.data.error || !this.props.data.post) {
      return <NetworkError />
    }

    const { post } = this.props.data
    const { showImageViewer } = this.state

    return (
      <ScrollView style={styles.root}>
        <Modal visible={this.state.showImageViewer} transparent={true} onRequestClose={() => this.setState({showImageViewer: false})}>
          <StatusBar backgroundColor="black" />
          <ImageViewer imageUrls={[{url: post.detailImage.url}]} renderIndicator={() => null} />
          <Icon style={styles.navIcon} name="md-close-circle" size={40} onPress={this.closeImageView} />
        </Modal>
        <RkCard rkType='article'>
          <TouchableOpacity onPress={this.openImageView}>
            <Image rkCardImg source={{uri: post.image.url}} style={{height: Dimensions.get('window').width * 3 / 4}}/>
          </TouchableOpacity>
          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='ItemTitle'>{post.title}</RkText>
              <RkText rkType='TimeAgo'>{moment(post.pubDateTimestamp).fromNow()}</RkText>
            </View>
          </View>
          <View rkCardContent style={styles.content}>
            <View>
              { post.content.map((item, index) => (
                <RkText key={index} rkType='ItemContent' style={styles.paragraph}>{item}</RkText>
              ))}
            </View>
          </View>
          <View style={styles.footer} rkCardFooter>
            <SocialBar views={post.views} />
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
  },
  content: {
    borderBottomWidth: 0,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border.base,
    marginHorizontal: 4,
  },
  title: {
    marginBottom: 5
  },
  paragraph: {
    marginBottom: 5,
  },
  navIcon: {
    position: 'absolute',
    top: 24,
    right: 12,
    color: 'white',
  },
}))
