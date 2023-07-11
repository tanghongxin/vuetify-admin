import COLORS from 'vuetify/lib/util/colors'

const {
  red,
  pink,
  purple,
  indigo,
  blue,
  cyan,
  teal,
  green,
  lime,
  yellow,
  amber,
  orange,
} = COLORS

const colors = {
  red,
  pink,
  purple,
  indigo,
  blue,
  cyan,
  teal,
  green,
  lime,
  yellow,
  amber,
  orange,
}

const themes = {}

Object.keys(colors).forEach((color) => {
  // TODO: 主题色搭配
  Object.assign(themes, {
    [`${color}LightTheme`]: {
      dark: false,
      colors: {
        primary: colors[color].base,
        background: '#FFFFFF',
        surface: '#FFFFFF',
        secondary: '#03DAC6',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
  }, {
    [`${color}DarkTheme`]: {
      dark: true,
      colors: {
        primary: colors[color].base,
        accent: colors[color].darken1,
        error: colors[color].accent3,
        background: colors[color].lighten5,
        info: colors[color].darken1,
      },
    },
  })
})

export {
  colors,
  themes,
}
