import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'

import { rehydrate, fetchRemoteConfig, anonymousLogin } from '../actions'
import NewsList from '../screens/NewsList'
import NewsItem from '../screens/NewsItem'
import Onboarding from '../screens/Onboarding'

const OnboardingNavigator = StackNavigator(
  {
    Onboarding: {
      screen: Onboarding,
    },
  },
)

const NewsListStackNavigator = StackNavigator(
  {
    NewsList: {
      screen: NewsList,
      navigationOptions: {
        headerBackTitle: null,
     }
    },
    NewsItem: {
      screen: NewsItem,
    },
  },
  {
    navigationOptions: {
      headerMode: 'none',
      title: 'DE PUNAISE',
      headerTintColor: '#181818',
      headerStyle: { backgroundColor: 'white' },
    }
  }
)

@connect(state => ({
  rehydrated: state.rehydrated,
  remoteConfig: state.remoteConfig,
  user: state.user,
  onboarding: state.onboarding,
}))

export default class NewsListNavigator extends Component {
  async componentDidMount () {
    // Fix race issue and don't call them at the same time
    await this.props.dispatch(rehydrate())
    await this.props.dispatch(fetchRemoteConfig())
    await this.props.dispatch(anonymousLogin())
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
