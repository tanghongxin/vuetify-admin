const Props = {
  position: {
    type: Array,
    default: () =>[39.916527,116.397128],
  },

  zoom: {
    type: Number,
    default: 10,
  },

  zIndex: {
    type: Number,
    default: 10,
  },
}
const Mixin = {
  library: {
    inject: ['map'],
  },
}

export {
  Props,
  Mixin,
}
