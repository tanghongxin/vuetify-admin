export default {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key, defaultValue = {}) {
    return JSON.parse(localStorage.getItem(key)) || defaultValue
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
}
