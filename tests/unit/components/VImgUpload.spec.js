import VImgUpload from '@/components/VImplements/VImgUpload'
import { mount } from '@vue/test-utils'

describe('VImgUpload', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(VImgUpload)
  })

  it(`Failed when file's type is not image`, async () => {
    const file = new File([""], 'index.html', { type: 'text/html' });
    Object.defineProperty(file, 'size', { value: 1024 * 2 })
    wrapper.setData({ file })
    wrapper.vm.fileChange(file)
    await wrapper.vm.$nextTick()
    const w = global.bodyWrapper.findAll('.v-snack__content').at(-1)
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

    const w = global.bodyWrapper.findAll('.v-snack__content').at(-1)
    expect(w.exists()).toBeTruthy()
    expect(w.text()).toBe(`图片大小超出${maxSize / 1024}兆`)
  })
})
