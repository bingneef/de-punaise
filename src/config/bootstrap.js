import {
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native'
import {RkTheme} from 'react-native-ui-kitten'
import {KittenTheme} from './theme'
import moment from 'moment'
import nl from 'moment/locale/nl'
import {scale} from '../utils/scale'

moment.locale('nl')

export const bootstrap = () => {
  RkTheme.setTheme(KittenTheme, null)

  RkTheme.setType('RkText', 'regular', {
    fontFamily: theme => theme.fonts.family.regular,
  })

  RkTheme.setType('RkText', 'light', {
    fontFamily: theme => theme.fonts.family.light,
  })

  RkTheme.setType('RkText', 'logo', {
    fontFamily: theme => theme.fonts.family.logo,
  })

  RkTheme.setType('RkText', 'NavTitle', {
    color: theme => theme.colors.header.content,
    fontSize: theme => theme.fonts.sizes.navTitle,
    fontFamily: theme => theme.fonts.family.navTitle,
    textAlign: 'center',
  })

  RkTheme.setType('RkText', 'ItemTitle', {
    fontSize: theme => theme.fonts.sizes.itemTitle,
    lineHeight: theme => theme.fonts.sizes.itemTitle * 0.95,
    fontFamily: theme => theme.fonts.family.medium,
  })

  RkTheme.setType('RkText', 'ItemContent', {
    fontSize: theme => theme.fonts.sizes.itemContent,
    lineHeight: theme => theme.fonts.sizes.itemContent * 1.25,
    fontFamily: theme => theme.fonts.family.regular,
  })

  RkTheme.setType('RkText', 'TimeAgo', {
    fontSize: theme => theme.fonts.sizes.timeAgo,
    fontFamily: theme => theme.fonts.family.light
  })

  RkTheme.setType('RkText', 'Title', {
    fontSize: theme => theme.fonts.sizes.title,
    fontFamily: theme => theme.fonts.family.medium
  })

  RkTheme.setType('RkText', 'SubTitle', {
    fontSize: theme => theme.fonts.sizes.subTitle,
    fontFamily: theme => theme.fonts.family.regular
  })

  RkTheme.setType('RkText', 'center', {
    textAlign: 'center',
  })

  RkTheme.setType('RkCard', 'blog', {
    container: {
      paddingHorizontal: 16,
      borderTopWidth: 0,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme => theme.colors.border.base,
      borderRadius: 0,
    },
    header: {
      paddingBottom: 0,
      justifyContent: 'flex-end',
      paddingHorizontal: 0,
    },
    img: {
      borderRadius: 4,
    },
    footer: {
      paddingTop: 16,
      paddingHorizontal: 0,
      display: 'flex',
      flexDirection: 'row',
    },
  })

  RkTheme.setType('RkCard', 'article', {
    container: {
      borderWidth: 0,
      backgroundColor: 'transparent'
    },
    header: {
      paddingVertical: 0,
      paddingTop: 20,
      paddingBottom: 16,
      justifyContent: 'space-between',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: theme => theme.colors.border.base
    },
    content: {
      padding: 16,
      borderBottomWidth: 1,
      borderColor: theme => theme.colors.border.base
    },
    footer: {
      paddingHorizontal: 14,
      paddingTop: 15,
      paddingBottom: 16,
      alignItems: 'center'
    }
  })

  StatusBar.setBarStyle('light-content', true)
  if (Platform.OS == 'android') {
    StatusBar.setBackgroundColor(KittenTheme.colors.header.darkTop)
  }
}
