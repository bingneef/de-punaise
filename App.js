import React from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import NewsListNavigator from './src/navigation/NewsListNavigator'
import store from './src/store'
import { SafeAreaView } from 'react-navigation'
import { ApolloProvider } from 'react-apollo'
import {withRkTheme} from 'react-native-ui-kitten';

import {bootstrap} from './config/bootstrap';
import { setupNotifications } from './src/services/notifications'
import { client } from './src/services/graphql/interface'

import ErrorBoundary from './src/screens/ErrorBoundary'

import './config/ReactotronConfig'

bootstrap()

class App extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    setupNotifications()
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ErrorBoundary>
          <Provider store={store}>
            <ApolloProvider client={client}>
              <NewsListNavigator/>
            </ApolloProvider>
          </Provider>
        </ErrorBoundary>
      </View>
    )
  }
}

export default withRkTheme(App)
