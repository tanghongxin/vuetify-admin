import { DataTable } from '@/components/DataTable'
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'

describe('DataTable', () => {
  let wrapper, searchWrapper, refreshWrapper, fn

  beforeEach(() => {
    fn = jest.fn(() => {
      const items = Array(31).map((_, index) => ({ id: index }))
      return Promise.resolve({ items, total: items.length })
    })

    wrapper = mount(DataTable, {
      vuetify: new Vuetify(),
      propsData: {
        loadData: fn,
        itemKey: 'id',
        headers: [
          { text: '编号', align: 'center', sortable: false, value: 'id', width: 100, fixed: true },
          { text: '编号1', align: 'center', sortable: false, value: 'id1', width: 100 },
          { text: '编号2', align: 'center', sortable: false, value: 'id2', width: 100 },
          { text: '编号3', align: 'center', sortable: false, value: 'id3', width: 100 },
          { text: '编号4', align: 'center', sortable: false, value: 'id4', width: 100 },
          { text: '编号5', align: 'center', sortable: false, value: 'id5', width: 100, fixed: true },
        ],
      },
      attachTo: document.body,
    })

    searchWrapper = wrapper.find('button[type="submit"]')
    refreshWrapper = wrapper.find('button[type="button"]')
  })

  it('LoadData is called on time and correctly', async () => {
    let times = 0
    const defaultOptions = JSON.parse(JSON.stringify(wrapper.vm.options))

    // 初始化
    expect(fn).toHaveBeenCalledTimes(++times)
    expect(fn).toHaveBeenCalledWith(defaultOptions)

    // 翻页
    wrapper.vm.options.page = 2
    await wrapper.vm.$nextTick()
    expect(fn).toHaveBeenCalledTimes(++times)
    expect(fn).toHaveBeenCalledWith({ ...defaultOptions, page: 2 })

    // 按钮刷新（当前页）
    await refreshWrapper.trigger('click')
    expect(fn).toHaveBeenCalledTimes(++times)
    expect(fn).toHaveBeenCalledWith({ ...defaultOptions, page: 2 })

    // 强制刷新（到第一页）
    wrapper.vm.refresh(true)
    await wrapper.vm.$nextTick()
    expect(fn).toHaveBeenCalledTimes(++times)
    expect(fn).toHaveBeenCalledWith({ ...defaultOptions, page: 1 })

    // 查询
    await searchWrapper.trigger('click')
    expect(fn).toHaveBeenCalledTimes(++times)
    expect(fn).toHaveBeenCalledWith({ ...defaultOptions, page: 1 })

    // 修改分页配置
    wrapper.vm.options.itemsPerPage = 15
    await wrapper.vm.$nextTick()
    expect(fn).toHaveBeenCalledTimes(++times)
    expect(fn).toHaveBeenCalledWith({ ...defaultOptions, itemsPerPage: 15 })
  })

  it('Scroll to top after data update', (done) => {
    (async function () {
      const [table] = wrapper.vm.$el.getElementsByClassName('v-data-table__wrapper')

      expect(table.scrollTop).toEqual(0)

      const unWatch = wrapper.vm.$watch(
        () => wrapper.vm.items,
        async () => {
          unWatch()
          await wrapper.vm.$nextTick()
          expect(table.scrollHeight).toEqual(0)
          done()
        },
      )

      table.scrollTop = 100
      await wrapper.vm.$nextTick()
      expect(table.scrollTop).toEqual(100)

      refreshWrapper.trigger('click')
    })()
  })

  it('The first and the last columns can be fixed', async () => {
    await wrapper.vm.$nextTick()
    const ths = Array.from(wrapper.vm.$el.getElementsByTagName('th'))

    // TODO: why need configure `attachTo: body`?
    expect(window.getComputedStyle(ths[0]).position).toEqual('sticky')
    expect(window.getComputedStyle(ths[ths.length - 1]).position).toEqual('sticky')
  })
})
