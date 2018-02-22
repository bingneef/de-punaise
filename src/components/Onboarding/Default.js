import React, { PureComponent } from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import { RkStyleSheet, RkText } from 'react-native-ui-kitten'

export default class Default extends PureComponent {
  render () {
    const { data } = this.props

    const containerStyle = {
      backgroundColor: data.backgroundColor,
      paddingTop: data.topSpacer,
      paddingBottom: data.bottomSpacer,
    }

    return (
      <View style={[styles.mainContent, containerStyle]}>
        <View style={styles.content}>
          <View style={styles.topSection}>
            <RkText style={styles.title}>{data.title}</RkText>
            <RkText style={styles.fatTitle}>{data.fatTitle}</RkText>
          </View>
          <View style={styles.middleSection}>
            <Image source={data.image} style={styles.image} />
          </View>
          <View style={styles.bottomSection}>
            <RkText style={styles.text}>{data.text}</RkText>
          </View>
        </View>
      </View>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  image: {
    width: 240,
    height: 240,
  },
  topSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  middleSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  bottomSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  text: {
    color: 'rgba(255, 255, 255, .9)',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '300',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 36,
    color: 'rgba(255, 255, 255, .9)',
    fontWeight: '300',
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  fatTitle: {
    fontSize: 36,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '600',
    paddingHorizontal: 16,
    textAlign: 'center',
    paddingBottom: 24,
  },
  button: {
    marginTop: 12,
  },
}))
