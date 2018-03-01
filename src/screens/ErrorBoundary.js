import React from 'react'
import { View, Image } from 'react-native'
import { RkText, RkStyleSheet } from 'react-native-ui-kitten'
import { Sentry } from 'react-native-sentry'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    Sentry.captureException(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.root}>
          <Image style={styles.image} source={require('../../assets/logo.png')} />
          <RkText style={styles.title} rkType='Title'>Er is iets foutgegaan..</RkText>
          <RkText rkType='SubTitle'>Sluit de applicatie af en probeer het opnieuw</RkText>
        </View>
      )
    }

    return this.props.children
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: '#CCCCCC',
    padding: 48,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '50%',
    resizeMode: 'contain',
  },
  title: {
    marginTop: 12,
  },
}))
