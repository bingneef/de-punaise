import React from 'react'
import {
  View,
  StyleSheet,
  Image,
} from 'react-native'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={[styles.container, styles.errorsContainer]} />
      )
    }

    return this.props.children
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 24,
    flex: 1,
  },
  errorsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
