import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'

import { setupNotifications } from '../services/notifications'
import { rehydrate, fetchRemoteConfig, anonymousLogin } from '../actions'

@connect(state => ({
  rehydrated: state.rehydrated,
  remoteConfig: state.remoteConfig,
  user: state.user,
  onboarding: state.onboarding,
}))
class Main extends Component {
  async componentDidMount () {
    // Prevent race issue and don't call them at the same time
    await this.props.dispatch(rehydrate())
    await this.props.dispatch(fetchRemoteConfig())
    await this.props.dispatch(anonymousLogin())

    setupNotifications(this.props.navigation)

    const { onboarding } = this.props

    if (!onboarding.completed) {
      this.props.navigation.replace('Onboarding')
    } else {
      this.props.navigation.replace('NewsList')
    }

    SplashScreen.hide()
  }

  render () {
    return <View style={{ flex: 1, backgroundColor: 'white' }} />
  }
}

export default withNavigation(Main)
