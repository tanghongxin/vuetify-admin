import { red, pink, indigo, blue, cyan, teal } from 'vuetify/util/colors';
import { ThemeDefinition } from 'vuetify';

export const colors = { red, pink, indigo, blue, cyan, teal };

export type Color = keyof typeof colors;

export type ThemeName = `${Color}_light` | `${Color}_dark`;

export type Themes = {
  [name in ThemeName]: ThemeDefinition;
};

export const themes: Themes = Object.keys(colors).reduce(
  (acc, color): Themes => {
    return {
      ...acc,
      [`${color}_light`]: {
        dark: false,
        colors: { primary: colors[color].base },
      },
      [`${color}_dark`]: {
        dark: true,
        colors: { primary: colors[color].base },
      },
    };
  },
  {} as Themes,
);

export default {
  variations: {
    colors: ['primary', 'secondary'],
    lighten: 1,
    darken: 2,
  },
  themes,
};
