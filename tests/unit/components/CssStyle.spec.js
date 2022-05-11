import { mount } from '@vue/test-utils'
import { CssStyle } from '@/components/CssStyle'

describe('CssStyle', () => {
  let wrapper
  let div

  beforeEach(() => {
    wrapper = mount(CssStyle, {
      propsData: {
        content: `
          .box { display: inline-block; width: 100px; height: 50px; }
          .red { background-color: red; }
         `,
      },
      attachTo: document.body,
    })

    div = document.createElement('div')
    div.classList.add('box', 'red')
    document.body.append(div)
  })

  afterEach(() => {
    wrapper.destroy()
    document.body.removeChild(div)
  })

  it('Style takes effect globally', () => {
    const { display, width, height, backgroundColor } = window.getComputedStyle(div)
    expect(display).toEqual('inline-block')
    expect(width).toEqual('100px')
    expect(height).toEqual('50px')
    expect(backgroundColor).toEqual('red')
  })

  it('Style takes effect responsibly', async () => {
    const props = wrapper.vm.$props
    await wrapper.setProps({
      content: `${props.content} .red { background-color: pink; }`,
    })
    const { backgroundColor } = window.getComputedStyle(div)
    expect(backgroundColor).toEqual('pink')
  })

  it('Style disappears after component is destroyed', async () => {
    wrapper.destroy()
    await wrapper.vm.$nextTick()
    const defaultStyle = window.getComputedStyle(document.createElement('div'))
    const { display, width, height, backgroundColor } = window.getComputedStyle(div)
    expect(display).toEqual(defaultStyle.display)
    expect(width).toEqual(defaultStyle.width)
    expect(height).toEqual(defaultStyle.height)
    expect(backgroundColor).toEqual(defaultStyle.backgroundColor)
  })
})
