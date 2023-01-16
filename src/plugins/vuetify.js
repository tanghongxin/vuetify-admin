import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/src/material-design-icons.scss'
import { aliases, md } from 'vuetify/iconsets/md'
import { zhHans } from 'vuetify/locale'
// https://next.vuetifyjs.com/en/labs/introduction/#available-components
import * as labs from 'vuetify/labs/components'
import { themes } from '@/config/themes'

const vuetify = createVuetify({
  components: {
    ...components,
    ...labs,
  },
  directives,
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
  locale: {
    // FIXME
    locale: 'zhHans',
    fallback: 'zhHans',
    messages: { zhHans },
  },
  theme: {
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 1,
      darken: 2,
    },
    themes,
  },
})

export default vuetify
