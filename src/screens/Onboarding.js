import React from 'react'
import { StyleSheet } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { setOnboarding } from '../actions'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  }
})

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../../assets/RNFirebase512x512.png'),
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../../assets/RNFirebase512x512.png'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/RNFirebase512x512.png'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  }
]

@connect()
export default class App extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this._onDone = this._onDone.bind(this)

  }

  _onDone = () => {
    this.props.dispatch(setOnboarding({completed: true}))
  }

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={this._onDone}
      />
    )
  }
}
