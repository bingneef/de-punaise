import React from 'react'
import { StyleSheet } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import { setOnboarding } from '../actions'
import Default from '../components/Onboarding/Default'
const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  }
})

const slides = [
  {
    key: 'first',
    fatTitle: 'De Punaise',
    text: 'Voor al je nieuws en onzin\nover Ariston \'80',
    image: require('../../assets/onboarding/news-report.png'),
    imageStyle: styles.image,
    backgroundColor: '#3949AB',
  },
  {
    key: 'second',
    fatTitle: 'Eigen ideëen?',
    text: 'Straks kan je zelf\nde redactie tippen!',
    image: require('../../assets/onboarding/idea.png'),
    imageStyle: styles.image,
    backgroundColor: '#F44336',
  },
  {
    key: 'third',
    fatTitle: 'Meer features',
    text: 'Er komen meer features aan,\ndus hou de app in de gaten!',
    image: require('../../assets/onboarding/football.png'),
    imageStyle: styles.image,
    backgroundColor: '#757575',
  }
]

@connect()
export default class App extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.onDone = this._onDone.bind(this)
  }

  _onDone = () => {
    firebase.analytics().logEvent('onboarding', {completed: true})
    this.props.dispatch(setOnboarding({completed: true}))
  }

  renderItem (props) {
    return <Default data={props} />
  }

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this.renderItem}
        onDone={this.onDone}
      />
    )
  }
}
