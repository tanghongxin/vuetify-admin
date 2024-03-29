import { mount, DOMWrapper } from '@vue/test-utils'
import { toast, Toast } from '@/components/Toast'
import { vuetify } from 'tests/utils/index'

describe('Toast', () => {
  let wrapper
  const bodyWrapper = new DOMWrapper(document.body)
  const message = 'test message'

  beforeEach(() => {
    wrapper = mount(Toast, {
      global: {
        plugins: [vuetify()],
      },
      attachTo: document.body,
    })
  })

  afterEach(() => {
    wrapper.unmount()
    document.body.innerHTML = ''
  })

  it('Render message to DOM', async () => {
    toast.success({ message })
    await wrapper.vm.$nextTick()
    const content = bodyWrapper.find('.v-snackbar__content')
    expect(content.exists()).toBe(true)
    expect(content.text()).toEqual(message)
  })

  it('Render next message when next button is clicked', async () => {
    toast.success({ message: '' })
    toast.success({ message })
    await wrapper.vm.$nextTick()
    const nextButtonWrapper = bodyWrapper
      .findAll('button')
      .filter(w => w.text().includes('下一条'))
      .at(0)
    expect(nextButtonWrapper.exists()).toBe(true)

    nextButtonWrapper.trigger('click')
    await wrapper.vm.$nextTick()
    const content = bodyWrapper.find('.v-snackbar__content')
    expect(content.exists()).toBe(true)
    expect(content.text()).toEqual(message)
  })

  it('Disappear after a specific time', (done) => {
    const timeout = 1000
    toast.success({ message, timeout })

    setTimeout(() => {
      expect(bodyWrapper.find('.v-snackbar__content').exists()).toBe(false)
      done()
    }, timeout)
  })

  it('Disappear when close button is clicked', async () => {
    toast.success({ message })
    await wrapper.vm.$nextTick()
    bodyWrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(bodyWrapper.find('.v-snackbar__content').exists()).toBe(false)
  })

  it.skip('Only Render close button when length < 2', async () => {
    toast.success({ message })
    await wrapper.vm.$nextTick()
    expect(bodyWrapper.findAll('button').length).toEqual(1)
  })

  // TODO
  it.skip('Render next and close buttons when length > 2', async () => {
    // toast.success({ message })
    // toast.success({ message })
    // await wrapper.vm.$nextTick()
    // const buttonWrapperArray = bodyWrapper.findAll('button')
    // expect(buttonWrapperArray.length).toEqual(2)
  })
})
