// https://github.com/jsdom/jsdom/issues/3368
global.ResizeObserver = class ResizeObserver {
  observe () {
    // do nothing
  }
  unobserve () {
    // do nothing
  }
  disconnect () {
    // do nothing
  }
};

// https://github.com/jsdom/jsdom/issues/1695
Element.prototype.scroll = function (e) {
  this.scrollTop = typeof e === 'object' ? e.top : e
}
