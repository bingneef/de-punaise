import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import firebase from 'react-native-firebase'
import { setUser } from '../actions'
import { connect } from 'react-redux'

@connect()
export default class NewsItem extends React.Component {
  constructor() {
    super()
    this._handleLogin = this._handleLogin.bind(this)
  }

  async componentDidMount () {
    const context = this
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      if (result.isCancelled) {
        alert('Login was cancelled')
      } else {
        context._handleLogin(result)
      }

    } catch (error) {
      alert('Login failed with error: ' + error)
    }
  }

  async _handleLogin (result) {
    const data = await AccessToken.getCurrentAccessToken()
    console.log(data)

    if (!data) {
      throw new Error('Something went wrong obtaining the users access token')
    }

    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)

    // login with credential
    const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential)

    await this.props.dispatch(setUser(currentUser.user))
    this.props.history.replace(`/`)
  }

  render() {
    return (
      <View />
    )
  }
}
