import { mount, DOMWrapper } from '@vue/test-utils'
import { FormDrawer } from '@/components/FormDrawer/index'
import { vuetify } from 'tests/utils'
import { VApp } from 'vuetify/components'

vi.mock('@/store', () => ({
  useSettingStore: null,
}))

vi.mock('pinia', () => ({
  mapState () {
    return {
      appHeaderHeight () {
        return 60
      },
    }
  },
}))

describe('FormDrawer', () => {
  // let wrapper
  let rootWrapper
  const bodyWrapper = new DOMWrapper(document.body)

  beforeEach(() => {
    // TODO: 为 VApp 指定 id 会有生命周期问题
    document.body.innerHTML = '<div id="v-application"></div>'

    /**
     * TODO
     * 对于使用到 provide/inject Symbol 的组件，需要在 template 或 render 中挂载而非依次 mount
     * 否则会导致依赖注入无法找到（上下文不共享？）
     */
    rootWrapper = mount({
      template: `<VApp>
                    <FormDrawer v-model="visible" :title="title" :width="width" />
                  </VApp>
                `,
      components: {
        VApp,
        FormDrawer,
      },
      data () {
        return {
          visible: false,
          title: 'title',
          width: 90,
        }
      },
    }, {
      global: {
        plugins: [vuetify()],
      },
      attachTo: document.getElementById('v-application'),
    })

    // wrapper = rootWrapper.findComponent(FormDrawer)
  })

  afterEach(() => {
    rootWrapper.unmount()
  })

  it('Should update Visible when props change', async () => {
    // TODO: You can only use setProps on your mounted component
    // await wrapper.setProps({ modelValue: true })

    await rootWrapper.setData({ visible: true })
    expect(
      bodyWrapper
        .find('.v-navigation-drawer')
        .classes('v-navigation-drawer--active'),
    ).toBe(true)

    await rootWrapper.setData({ visible: false })
    expect(
      bodyWrapper
        .find('.v-navigation-drawer')
        .classes('v-navigation-drawer--active'),
    ).toBe(false)
  })

  it('Should update Title when props change', async () => {
    await rootWrapper.setData({ visible: true, title: 'test' })
    expect(bodyWrapper.find('.v-toolbar-title').text()).toEqual('test')
  })

  it('Should update TWidth when props change', async () => {
    const width = 400
    await rootWrapper.setData(({ visible: true, width }))
    const style = window.getComputedStyle(document.getElementsByClassName('v-navigation-drawer')[0])
    expect(style.width).toEqual(`${width}px`)
  })
})
