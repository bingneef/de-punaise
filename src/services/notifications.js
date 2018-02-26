import firebase from 'react-native-firebase'
import { NavigationActions } from 'react-navigation';


const handleMessage = (navigation, args) => {
  navigation.replace('NewsList')
  navigation.navigate('NewsItem', { id: args.postId })
}

export const requestNotifications = async () => {
  await firebase.messaging().requestPermissions()
  await firebase.messaging().subscribeToTopic('news')
}

export const setupNotifications = async (navigation) => {
  try {
    const notificationData = await firebase.messaging().getInitialNotification()
    if (notificationData) {
      handleMessage(navigation, notificationData)
    }
  } catch (e) { }
}
