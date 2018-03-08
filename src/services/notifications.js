import firebase from 'react-native-firebase'
import { NavigationActions } from 'react-navigation';


const handleMessage = (navigation, args) => {
  if (!args.postId) {
    return
  }

  navigation.replace('NewsList')
  navigation.navigate('NewsItem', { id: args.postId })
}

export const requestNotifications = async () => {
  await firebase.messaging().requestPermissions()
}

export const setupNotifications = async (navigation) => {
  await firebase.messaging().subscribeToTopic('news')
  try {
    const notificationData = await firebase.messaging().getInitialNotification()
    if (notificationData) {
      handleMessage(navigation, notificationData)
    }
  } catch (e) { }
}
