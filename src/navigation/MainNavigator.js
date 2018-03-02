import React from 'react'
import { RkText } from 'react-native-ui-kitten'
import { StackNavigator } from 'react-navigation'

import NewsList from '../screens/NewsList'
import NewsItem from '../screens/NewsItem'
import Onboarding from '../screens/Onboarding'
import Main from '../screens/Main'
import { KittenTheme } from '../config/theme'

const newsListStackNavOptions = {
  title: <RkText rkType='NavTitle'>DEPUNAISE</RkText>,
  headerMode: 'none',
  headerTintColor: KittenTheme.colors.header.content,
  headerStyle: { backgroundColor: KittenTheme.colors.header.background },
}

const MainNavigator = StackNavigator(
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
  {
    initialRouteName: 'Main',
  }
)

export default MainNavigator
