import { Alert } from 'react-native'
import Mailer from 'react-native-mail'

export default () => {
  Mailer.mail({
    subject: 'DePunaise Suggestie',
    recipients: ['depunaise.tips@gmail.com'],
    isHTML: true,
  }, (error) => {
    if (error) {
      Alert.alert('Het is mislukt', 'Kan MailApp niet openen, je kan suggesties mailen naar depunaise.tips@gmail.com.', [
        {text: 'ok'}
      ],
      { cancelable: true })
    }
  })
}
