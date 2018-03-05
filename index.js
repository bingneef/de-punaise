import { Navigation } from 'react-native-navigation'
import { Sentry } from 'react-native-sentry'
import { SENTRY_KEY } from 'react-native-dotenv'

import { bootstrap } from './src/config/bootstrap'
import { registerScreens } from './src/screens'
import { RegisterNavButton } from './src/components/NavButtons'

import './config/ReactotronConfig'

if (!__DEV__) {
  Sentry.config(SENTRY_KEY).install()
}

RegisterNavButton()
registerScreens()
bootstrap()

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Main',
    navigatorStyle: {
      navBarHidden: true,
    }
  },
})
