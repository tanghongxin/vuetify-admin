import directive from './permissions'

export default {
  install (app) {
    app.use(directive)
  },
}
