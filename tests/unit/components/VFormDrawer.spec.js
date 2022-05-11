import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { FormDrawer } from '@/components/FormDrawer/index'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('FormDrawer', () => {
  let store
  let wrapper

  beforeEach(() => {
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
    // always received true
    // expect(createWrapper(wrapper.element).isVisible()).toEqual(false)
    expect(wrapper.element.classList.contains('v-navigation-drawer--close')).toEqual(true)

    await wrapper.setProps({ value: true })
    expect(wrapper.element.classList.contains('v-navigation-drawer--close')).toEqual(false)
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
