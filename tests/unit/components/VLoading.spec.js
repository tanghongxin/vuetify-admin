import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VLoading from '@/components/VImplements/VLoading'

describe('VLoading', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(VLoading, {
      vuetify: new Vuetify(),
    })
  })

  it('Loading takes effect responsibly', async () => {
    await wrapper.setProps({ value: true })
    const overlay = wrapper.element.querySelector('.v-overlay__scrim')
    expect(overlay.style.opacity).toEqual('1')

    await wrapper.setProps({ value: false })
    expect(overlay.style.opacity).toEqual('0')
  })
})
