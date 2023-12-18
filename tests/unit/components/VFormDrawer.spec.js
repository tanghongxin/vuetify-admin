import { mount, DOMWrapper } from '@vue/test-utils'
import { FormDrawer } from '@/components/FormDrawer/index'
import { vuetify } from 'tests/utils'
import { VApp } from 'vuetify/components'

vi.mock('@/stores', () => ({
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
  let rootWrapper
  const bodyWrapper = new DOMWrapper(document.body)

  beforeEach(() => {
    document.body.innerHTML = '<div id="v-application"></div>'
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
  })

  afterEach(() => {
    rootWrapper.unmount()
  })

  it.only('Should update Visible when props change', async () => {
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
