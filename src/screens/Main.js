import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'

import { setupNotifications } from '../services/notifications'
import { rehydrate, fetchRemoteConfig, anonymousLogin } from '../actions'

@connect(state => ({
  onboarding: state.onboarding,
}))
export default class Main extends Component {
  async componentDidMount () {
    // Prevent race issue and don't call them at the same time
    await this.props.dispatch(rehydrate())
    await this.props.dispatch(fetchRemoteConfig())
    await this.props.dispatch(anonymousLogin())

    setupNotifications(this.props.navigator)

    const { onboarding } = this.props

    const screen = onboarding.completed ? 'NewsList' : 'Onboarding'

    this.props.navigator.resetTo({
      screen,
      animated: true,
      animationType: 'fade',
    })

    SplashScreen.hide()
  }

  render () {
    return <View style={{ flex: 1, backgroundColor: 'white' }} />
  }
}
