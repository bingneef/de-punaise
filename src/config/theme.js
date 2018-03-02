import {scale} from '../utils/scale'

const Colors = {
  text: '#212121',
  accent: '#ff2824',
  header: {
    background: '#c62828',
    content: 'white',
  },
  background: '#ffffff',
  border: '#f2f2f2',
}

const Fonts = {
  light: 'AppleSDGothicNeo-Light',
  regular: 'HelveticaNeue',
  medium: 'HelveticaNeue-Medium',
  bold: 'HelveticaNeue-Bold',
  logo: 'AppleColorEmoji',
  navTitle: 'Courier New',
}

const FontBaseValue = scale(16)

export const KittenTheme = {
  name: 'light',
  colors: {
    accent: Colors.accent,
    text: {
      base: Colors.text,
      accent: Colors.accent,
    },
    header: {
      background: Colors.header.background,
      content: Colors.header.content,
    },
    screen: {
      base: Colors.background,
    },
    border: {
      base: Colors.border,
    },
  },
  fonts: {
    sizes: {
      navTitle: FontBaseValue * 1.5,
      itemTitle: FontBaseValue * 1.5,
      itemContent: FontBaseValue,
      timeAgo: FontBaseValue * 0.8,
      title: FontBaseValue * 1.5,
      subTitle: FontBaseValue * 0.8,
    },
    family: {
      regular: Fonts.regular,
      light: Fonts.light,
      medium: Fonts.medium,
      bold: Fonts.bold,
      navTitle: Fonts.navTitle,
    }
  }
}
