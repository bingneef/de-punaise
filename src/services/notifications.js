import firebase from 'react-native-firebase'

const handleMessage = (navigator, args) => {
  if (!args.postId) {
    return
  }

  navigator.resetTo({
    screen: 'NewsList',
    animated: false,
  })
  navigator.push({
    screen: 'NewsItem',
    passProps: {id: item.id},
  })
}

export const requestNotifications = async () => {
  await firebase.messaging().requestPermissions()
  await firebase.messaging().subscribeToTopic('news')
}

export const setupNotifications = async (navigator) => {
  try {
    const notificationData = await firebase.messaging().getInitialNotification()
    if (notificationData) {
      handleMessage(navigator, notificationData)
    }
  } catch (e) { }
}
