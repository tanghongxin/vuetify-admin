import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { Toast, toast } from '@/components/Toast'

describe('Toast', () => {
  let wrapper
  const message = 'test message'

  beforeEach(() => {
    wrapper = mount(Toast, {
      vuetify: new Vuetify(),
    })
  })
  
  it('Render message to DOM', async () => {
    toast.success({ message })
    await wrapper.vm.$nextTick()
    const content = wrapper.find('.v-snack__content')
    expect(content.exists()).toBe(true)
    expect(content.text()).toEqual(message)
  })

  it('Render next message when next button is clicked', async () => {
    toast.success({ message: '' })
    toast.success({ message })
    await wrapper.vm.$nextTick()
    const nextButtonWrapper = wrapper
      .findAll('button')
      .filter(w => w.text().includes('下一条'))
      .at(0)
    expect(nextButtonWrapper.exists()).toBe(true)

    nextButtonWrapper.trigger('click')
    await wrapper.vm.$nextTick()
    const content = wrapper.find('.v-snack__content')
    expect(content.exists()).toBe(true)
    expect(content.text()).toEqual(message)
  })

  it('Disappear after a specific time', (done) => {
    const timeout = 1000
    toast.success({ message, timeout })

    setTimeout(() => {
      expect( wrapper.find('.v-snack__content').exists()).toBe(false)
      done()
    }, timeout)
  })

  it('Disappear when close button is clicked', async () => {
    toast.success({ message })
    await wrapper.vm.$nextTick()
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect( wrapper.find('.v-snack__content').exists()).toBe(false)
  })

  it('Only Render close button when length < 2', async () => {
    toast.success({ message })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('button').length).toEqual(1)
  })

  it('Render next and close buttons when length > 2', async () => {
    toast.success({ message })
    toast.success({ message })
    await wrapper.vm.$nextTick()
    const buttonWrapperArray = wrapper.findAll('button')
    expect(buttonWrapperArray.length).toEqual(2)
  })
})
