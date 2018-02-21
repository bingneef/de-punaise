import firebase from 'react-native-firebase'

const handleMessage = (...args) => {
  console.warn('handleMessage', args)
}

export const setupNotifications = async () => {
  firebase.messaging().requestPermissions()

  try {
    const notificationData = await firebase.messaging().getInitialNotification()
    if (notificationData.click_action == 'GOTO_MESSAGE') {
      console.warn('GOTO MESSAGES')
    }
  } catch (e) { }

  firebase.messaging().onMessage(handleMessage)
}
