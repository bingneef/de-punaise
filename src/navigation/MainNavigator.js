import React from 'react'
import { StackNavigator } from 'react-navigation'

import NewsList from '../screens/NewsList'
import NewsItem from '../screens/NewsItem'
import Onboarding from '../screens/Onboarding'
import Main from '../screens/Main'

const newsListStackNavOptions = {
  title: 'DePunaise',
  headerMode: 'none',
  headerTintColor: '#181818',
  headerStyle: { backgroundColor: 'white' },
}

export default StackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        header: null,
      }
    },
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        header: null,
      }
    },
    NewsList: {
      screen: NewsList,
      navigationOptions: {
        ...newsListStackNavOptions,
        headerBackTitle: null,
     }
    },
    NewsItem: {
      screen: NewsItem,
      navigationOptions: newsListStackNavOptions,
    },
  },
)
