import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import * as labs from 'vuetify/labs/components'

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const vuetify = () => createVuetify({
  components: {
    ...components,
    ...labs,
  },
  directives,
})
