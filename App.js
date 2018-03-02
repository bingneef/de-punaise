import React from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { SafeAreaView } from 'react-navigation'
import { ApolloProvider } from 'react-apollo'
import { withRkTheme } from 'react-native-ui-kitten'

import MainNavigator from './src/navigation/MainNavigator'
import store from './src/store'
import { bootstrap } from './src/config/bootstrap'
import { client } from './src/services/graphql/interface'
import ErrorBoundary from './src/screens/ErrorBoundary'
import { Sentry } from 'react-native-sentry'
import { SENTRY_KEY } from 'react-native-dotenv'
import './config/ReactotronConfig'

if (!__DEV__) {
  Sentry.config(SENTRY_KEY).install()
}

class App extends React.Component {
  constructor() {
    super()

    bootstrap()
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ErrorBoundary>
          <Provider store={store}>
            <ApolloProvider client={client}>
              <MainNavigator/>
            </ApolloProvider>
          </Provider>
        </ErrorBoundary>
      </View>
    )
  }
}

export default withRkTheme(App)
