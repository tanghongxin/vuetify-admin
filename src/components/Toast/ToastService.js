export default class ToastService {
  items = []

  constructor () {
    if (!ToastService.prototype.instance) {
      ToastService.prototype.instance = this
    }
    return ToastService.prototype.instance
  }

  addItem = ({ message, color, timeout = 4000 }) => {
    this.items.push({
      id: this.uniqueId("item_"),
      color,
      message,
      timeout,
    });
  }

  removeItem = (id) => {
    const index = this.items.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  uniqueId = (prefix) => {
    return `${prefix}_` + Math.random().toString(36).substr(2, 9)
  }
}
