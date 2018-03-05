import React from 'react'
import { Navigation } from 'react-native-navigation'
import { RkButton } from 'react-native-ui-kitten'
import OpenSettings from 'react-native-open-settings'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import handleSuggestionMail from '../helpers/mail/handleSuggestionMail'

const TipsButton = ({color}) => {
  return (
    <RkButton rkType='clear link' onPress={ handleSuggestionMail }>
      <Icon style={{color}} name="lightbulb-on-outline" size={30} />
    </RkButton>
  )
}

const SettingsButton = ({color}) => (
  <RkButton rkType='clear link' onPress={ () => OpenSettings.openSettings() }>
    <Icon style={{color}} name="settings" size={30} />
  </RkButton>
)

export const RegisterNavButton = () => {
  Navigation.registerComponent('TipsButton', () => TipsButton)
  Navigation.registerComponent('SettingsButton', () => SettingsButton)
}
