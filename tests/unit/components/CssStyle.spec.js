import { mount } from '@vue/test-utils'
import { CssStyle } from '@/components/CssStyle'
import { describe, expect, it, beforeEach, afterEach } from 'vitest'

describe('CssStyle', () => {
  let wrapper
  let div

  beforeEach(() => {
    wrapper = mount(CssStyle, {
      props: {
        content: `
          .box { display: inline-block; width: 100px; height: 50px; }
          .red { background-color: red ; }
         `,
      },
      attachTo: document.body,
    })

    div = document.createElement('div')
    div.classList.add('box', 'red')
    document.body.append(div)
  })

  afterEach(() => {
    wrapper.unmount()
    document.body.removeChild(div)
  })

  it('Style takes effect globally', () => {
    const { display, width, height } = window.getComputedStyle(div)
    expect(display).toEqual('inline-block')
    expect(width).toEqual('100px')
    expect(height).toEqual('50px')

    // https://stackoverflow.com/questions/76571158/vitest-cannot-test-for-presence-of-specific-styling
    // expect(backgroundColor).toEqual('red')
  })

  it('Style takes effect responsibly', async () => {
    await wrapper.setProps({
      content: `.box { height: 150px; }`,
    })
    const { height } = window.getComputedStyle(div)
    expect(height).toEqual('150px')
  })

  it('Style disappears after component is destroyed', async () => {
    wrapper.unmount()
    await wrapper.vm.$nextTick()
    const defaultStyle = window.getComputedStyle(document.createElement('div'))
    const { display, width, height } = window.getComputedStyle(div)
    expect(display).toEqual(defaultStyle.display)
    expect(width).toEqual(defaultStyle.width)
    expect(height).toEqual(defaultStyle.height)
  })
})
