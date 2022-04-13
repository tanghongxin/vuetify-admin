import Vue from 'vue'
import { mount, createLocalVue, createWrapper } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { FormDrawer } from '@/components/FormDrawer/index'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('FormDrawer', () => {
  let store
  let wrapper

  beforeEach(() => {
    Object.assign(document.body.style, {
      width: '1920px',
      height: '1080px',
    })

    store = new Vuex.Store({
      modules: {
        setting: {
          namespaced: true,
          state: {
            appHeaderHeight: 60,
          },
        },
      },
    })

    wrapper = mount(FormDrawer, {
      vuetify: new Vuetify(),
      store,
      localVue,
      attachTo: document.body,
    })
  })

  it('Visible', async () => {
    // FIXME: always received true
    expect(createWrapper(wrapper.element).isVisible()).toEqual(false)

    await wrapper.setProps({ value: true })
    expect(createWrapper(wrapper.element).isVisible()).toEqual(true)
  })

  it('Title', async () => {
    const title = 'test'
    await wrapper.setProps({ value: true, title })
    expect(wrapper.find('.v-toolbar__title').text()).toEqual(title)
  })

  it('Width', async () => {
    const width = 400
    await wrapper.setProps(({ value: true, width }))
    const style = window.getComputedStyle(wrapper.vm.$el)
    expect(style.width).toEqual(`${width}px`)
  })
})
