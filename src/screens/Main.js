import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StatusBar } from 'react-native'
import { withNavigation } from 'react-navigation'

import { OnboardingNavigator, NewsListStackNavigator } from '../navigation/MainNavigator'
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

    console.warn(this.props.navigation)
  }

  render () {
    const { rehydrated, remoteConfig, onboarding, user } = this.props

    if (!rehydrated || !remoteConfig || !user) {
      return <View style={{ flex: 1, backgroundColor: 'white' }} />
    } else if (!onboarding.completed) {
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle="light-content"/>
          <OnboardingNavigator />
        </View>
      )
    }

    return <NewsListStackNavigator />
  }
}

export default withNavigation(Main)
