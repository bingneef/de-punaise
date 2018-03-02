import React, { PureComponent } from 'react'
import { View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { RkStyleSheet, RkText } from 'react-native-ui-kitten'

export default class NetworkError extends PureComponent {
  render () {

    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <Icon style={styles.navIcon} name="md-bug" size={160} />
          <RkText style={styles.title} rkType='Title center'>De server kan niet worden bereikt..</RkText>
        </View>
      </View>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  navIcon: {
    color: theme.colors.text.base,
  },
  title: {
    marginTop: 12,
  },
}))
