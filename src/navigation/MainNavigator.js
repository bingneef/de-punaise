import React from 'react'
import { StackNavigator } from 'react-navigation'

import NewsList from '../screens/NewsList'
import NewsItem from '../screens/NewsItem'
import Onboarding from '../screens/Onboarding'
import Main from '../screens/Main'

export default StackNavigator(
  {
    Main: {
      screen: Main,
    },
  },
  {
    navigationOptions: {
      header: null,
    }
  }
)

export const OnboardingNavigator = StackNavigator(
  {
    Onboarding: {
      screen: Onboarding,
    },
  },
  {
    navigationOptions: {
      header: null,
    }
  }
)

export const NewsListStackNavigator = StackNavigator(
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
      title: 'DePunaise',
      headerMode: 'none',
      headerTintColor: '#181818',
      headerStyle: { backgroundColor: 'white' },
    }
  }
)
