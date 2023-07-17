import VImgUpload from '@/components/VImplements/VImgUpload'
import { mount, DOMWrapper } from '@vue/test-utils'
import Toast from '@/components/Toast/Toast.vue'
import { vuetify } from 'tests/utils'

describe('VImgUpload', () => {
  const bodyWrapper = new DOMWrapper(document.body)
  let wrapper, toast

  beforeEach(() => {
    // TODO: 复用
    toast = mount(Toast, { global: { plugins: [vuetify()] } })
    wrapper = mount(VImgUpload)
  })

  afterEach(() => {
    toast.unmount()
  })

  it(`Failed when file's type is not image`, async () => {
    const file = new File([""], 'index.html', { type: 'text/html' });
    Object.defineProperty(file, 'size', { value: 1024 * 2 })
    wrapper.setData({ file })
    wrapper.vm.fileChange(file)
    await wrapper.vm.$nextTick()
    const w = bodyWrapper.findAll('.v-snackbar__content')[0]
    expect(w.exists()).toBeTruthy()
    expect(w.text()).toBe(`上传文件非图片`)
  })

  it('Failed when file exceeds specified size', async () => {
    const maxSize = 1024
    wrapper.setProps({ maxSize })

    const file = new File([""], 'test.png', { type: 'image/png' });
    Object.defineProperty(file, 'size', { value: maxSize + 1 })

    wrapper.setData({ file })
    wrapper.vm.overMaxSize(file)

    await wrapper.vm.$nextTick()

    // reset value
    expect(wrapper.vm.file).toBe(null)

    const w = bodyWrapper.findAll('.v-snackbar__content')[0]
    expect(w.exists()).toBeTruthy()
    expect(w.text()).toBe(`图片大小超出${maxSize / 1024}兆`)
  })
})
