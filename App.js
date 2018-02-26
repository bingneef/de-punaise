import React from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import MainNavigator from './src/navigation/MainNavigator'
import store from './src/store'
import { SafeAreaView } from 'react-navigation'
import { ApolloProvider } from 'react-apollo'
import { withRkTheme } from 'react-native-ui-kitten';

import { bootstrap } from './src/config/bootstrap';
import { client } from './src/services/graphql/interface'

import ErrorBoundary from './src/screens/ErrorBoundary'

import './config/ReactotronConfig'

bootstrap()

class App extends React.Component {
  constructor() {
    super()
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
