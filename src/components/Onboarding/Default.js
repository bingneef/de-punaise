import React, { PureComponent } from 'react'
import { View, Image } from 'react-native'
import { RkText } from 'react-native-ui-kitten'
import { styles } from './styles'

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

