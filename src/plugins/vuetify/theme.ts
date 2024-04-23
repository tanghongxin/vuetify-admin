import COLORS from 'vuetify/util/colors';

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
} = COLORS;

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
};

const themes = {};

Object.keys(colors).forEach((color) => {
  Object.assign(
    themes,
    {
      [`${color}LightTheme`]: {
        dark: false,
        colors: {
          primary: colors[color].base,
        },
      },
    },
    {
      [`${color}DarkTheme`]: {
        dark: true,
        colors: {
          primary: colors[color].base,
        },
      },
    },
  );
});

export { colors, themes };

export default {
  variations: {
    colors: ['primary', 'secondary'],
    lighten: 1,
    darken: 2,
  },
  themes,
};
