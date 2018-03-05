import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import { setOnboarding } from '../actions'
import Default from '../components/Onboarding/Default'
import { requestNotifications } from '../services/notifications'

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  }
})

const slides = [
  {
    key: 'intro',
    fatTitle: 'De Punaise',
    text: 'Voor al je nieuws en onzin\nover Ariston \'80',
    image: require('../../assets/onboarding/news-report.png'),
    imageStyle: styles.image,
    backgroundColor: '#3949AB',
  },
  {
    key: 'tip',
    fatTitle: 'Eigen ideëen?',
    text: 'Tip de redactie met je eigen verhalen',
    image: require('../../assets/onboarding/idea.png'),
    imageStyle: styles.image,
    backgroundColor: '#F44336',
  },
  {
    key: 'push',
    fatTitle: 'Push Notificaties',
    text: 'Blijf altijd op de hoogte\nvan het laatste nieuws!',
    image: require('../../assets/onboarding/send.png'),
    imageStyle: styles.image,
    backgroundColor: '#757575',
  }
]

@connect()
export default class Onboarding extends PureComponent {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarHidden: true,
    statusBarTextColorScheme: 'light',
  }

  constructor(props) {
    super(props)

    this.onDone = this._onDone.bind(this)
  }

  async _onDone () {
    await requestNotifications()
    firebase.analytics().logEvent('onboarding', {completed: true})
    this.props.dispatch(setOnboarding({completed: true}))

    this.props.navigator.resetTo({
      screen: 'NewsList',
      animated: true,
      animationType: 'fade',
    })
  }

  renderItem (props) {
    return <Default data={props} />
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AppIntroSlider
          slides={slides}
          renderItem={this.renderItem}
          showPrevButton={true}
          doneLabel='Ok!'
          nextLabel='Volgende'
          prevLabel='Vorige'
          onDone={this.onDone}
        />
      </View>
    )
  }
}
