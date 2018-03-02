import React, { PureComponent } from 'react'
import { View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RkStyleSheet, RkText } from 'react-native-ui-kitten'
import humanFormat from 'human-format'

export default class SocialBar extends PureComponent {
  render () {
    return (
      <View style={styles.root}>
        <View style={styles.section}>
          <Icon style={styles.icon} name="eye-outline" size={24} />
          <RkText>{ humanFormat(this.props.views || 0, { decimals: 1, separator: ''}) }</RkText>
        </View>
      </View>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    color: theme.colors.text.base,
    marginRight: 8,
  },
  accent: {
    color: theme.colors.text.accent,
  },
}))
