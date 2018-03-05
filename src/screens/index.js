import { Navigation } from 'react-native-navigation'
import { withRkTheme } from 'react-native-ui-kitten'
import { Provider } from 'react-redux'

import { bootstrap } from '../config/bootstrap'
import store from '../store'

import Main from './Main'
import Onboarding from './Onboarding'
import NewsList from './NewsList'
import NewsItem from './NewsItem'

import withProvider from './../services/withProvider'

export const registerScreens = () => {
  bootstrap()

  Navigation.registerComponent(
    'Main',
    () => withRkTheme(withProvider(Main)),
  )

  Navigation.registerComponent(
    'Onboarding',
    () => withRkTheme(withProvider(Onboarding)),
  )

  Navigation.registerComponent(
    'NewsList',
    () => withRkTheme(withProvider(NewsList)),
  )

  Navigation.registerComponent(
    'NewsItem',
    () => withRkTheme(withProvider(NewsItem)),
  )
}
