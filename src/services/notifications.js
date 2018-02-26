import firebase from 'react-native-firebase'

const handleMessage = (...args) => {
  console.warn('handleMessage', args)
}

export const requestNotifications = async () => {
  await firebase.messaging().requestPermissions()
  await firebase.messaging().subscribeToTopic('news')
}

export const setupNotifications = async () => {
  try {
    const notificationData = await firebase.messaging().getInitialNotification()
    if (notificationData) {
      console.warn(notificationData)
    }
  } catch (e) { }

  firebase.messaging().onMessage(handleMessage)
}
