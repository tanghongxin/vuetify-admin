import request from '@/utils/request'
import Adaptor from 'axios-mock-adapter'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import store from '@/store'
import { vuetify } from 'tests/utils'
import { mount, DOMWrapper } from '@vue/test-utils'
import Toast from '@/components/Toast/Toast.vue'

vi.mock('@/store', async () => ({
  default: {
    state: {
      account: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDIxLTEwLTI0IDAwOjAwOjAwIiwibmFtZSI6InRvZ2V0dG95b3UifQ.XdF46NflSUjnt-adAc6rNZEXI1OD6nxtwGuhz9qkxUA',
      },
    },
  },
}))

describe('request', async () => {
  const bodyWrapper = new DOMWrapper(document.body)
  let adaptor, toast

  beforeEach(() => {
    toast = mount(Toast, { global: { plugins: [vuetify()] } })
    adaptor = new Adaptor(request, { delayResponse: 300 })
  })

  afterEach(() => {
    adaptor.reset()
    toast.unmount()
  })

  it('Should toast message if error exists', async () => {
    adaptor.onPost(new RegExp(500)).reply(() => [500])
    await expect(request.post(`/${500}`)).rejects.toThrow(`Request failed with status code ${500}`)
    const messageWrapper = bodyWrapper.findAll('.v-snackbar__content')[0]
    expect(messageWrapper.exists()).toBeTruthy()
    expect(messageWrapper.text()).toBe('服务器异常')
  })

  it('Should have the same JWT token in header with Vuex', async () => {
    adaptor.onPost(/test/).reply(() => [200])
    const { config } = await request.post('/test')
    expect(config.headers.Authorization).toEqual(`Bearer ${store.state.account.token}`)
  })
})
