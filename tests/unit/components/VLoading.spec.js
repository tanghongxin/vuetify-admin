import { mount, DOMWrapper } from '@vue/test-utils'
import VLoading from '@/components/VImplements/VLoading'
import { describe, expect, it, beforeEach } from 'vitest'
import { vuetify } from 'tests/utils/index'

describe('VLoading', () => {
  let wrapper
  const bodyWrapper = new DOMWrapper(document.body)

  beforeEach(() => {
    wrapper = mount(VLoading, {
      global: {
        plugins: [vuetify()],
      },
    })
  })

  it('Loading takes effect responsibly', async () => {
    await wrapper.setProps({ modelValue: true })
    expect(bodyWrapper.find('.v-overlay__scrim').exists()).toBeTruthy()

    await wrapper.setProps({ modelValue: false })
    expect(bodyWrapper.element.querySelector('.v-overlay__scrim')).toBeNull()
  })
})
