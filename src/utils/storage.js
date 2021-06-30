export const ls = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key, defaultValue) {
    try {
      return JSON.parse(localStorage.getItem(key)) || defaultValue
    } catch (e) {
      return defaultValue
    }
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
}
