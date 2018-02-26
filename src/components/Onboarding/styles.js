import { RkStyleSheet } from 'react-native-ui-kitten'
import { Dimensions } from 'react-native'

export const styles = RkStyleSheet.create(theme => ({
  image: {
    width: 240,
    height: 240,
  },
  topSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  middleSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  bottomSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  text: {
    color: 'rgba(255, 255, 255, .9)',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '300',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 36,
    color: 'rgba(255, 255, 255, .9)',
    fontWeight: '300',
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  fatTitle: {
    fontSize: 36,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '600',
    paddingHorizontal: 16,
    textAlign: 'center',
    paddingBottom: 24,
  },
  button: {
    marginTop: 12,
  },
}))
