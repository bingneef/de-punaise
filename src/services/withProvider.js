import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { withRkTheme } from 'react-native-ui-kitten'

import store from '../store'
import { client } from './graphql/interface'

export default (Child) => {
  return class extends Component {
    static navigatorStyle = Child.navigatorStyle
    static navigatorButtons = Child.navigatorButtons

    render () {
      return (
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Child {...this.props} />
          </ApolloProvider>
        </Provider>
      )
    }
  }
}
