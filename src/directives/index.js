import auth from './auth'

export default {
  install (app) {
    app.use(auth)
  },
}
