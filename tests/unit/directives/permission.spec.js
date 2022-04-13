import { createLocalVue, mount } from '@vue/test-utils'
import {
  hasPermission,
  hasAnyPermission,
  hasRole,
  hasAnyRole,
  hiddenClsName,
} from '@/directives/permissions'
import Vuex from 'vuex'

const localVue = createLocalVue();

[hasPermission, hasAnyPermission, hasRole, hasAnyRole, Vuex].forEach(p => localVue.use(p))

describe('permission', () => {
  let store
  let wrapper

  // TODO: validate style.display
  const isHidden = (selector) => [...wrapper.find(selector).element.classList].includes(hiddenClsName)

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        account: {
          permissions: ['get'],
          roles: ['student'],
        },
      },
    })

    const Component = {
      template: `
        <div>
          <button id="hasPermission__get" v-hasPermission="hasPermission__get"></button>
          <button id="hasPermission__delete" v-hasPermission="hasPermission__delete"></button>
          <button id="hasAnyPermission__get_delete" v-hasAnyPermission="hasAnyPermission__get_delete"></button>
          <button id="hasAnyPermission__delete" v-hasAnyPermission="hasAnyPermission__delete"></button>
          <button id="hasRole__student" v-hasRole="hasRole__student"></button>
          <button id="hasRole__teacher" v-hasRole="hasRole__teacher"></button>
          <button id="hasAnyRole__student_teacher" v-hasAnyRole="hasAnyRole__student_teacher"></button>
          <button id="hasAnyRole__admin" v-hasAnyRole="hasAnyRole__admin"></button>
        </div>
      `,
      data: () => ({
        hasPermission__get: ['get'],
        hasPermission__delete: ['delete'],
        hasAnyPermission__get_delete: ['get', 'delete'],
        hasAnyPermission__delete: ['delete'],
        hasRole__student: ['student'],
        hasRole__teacher: ['teacher'],
        hasAnyRole__student_teacher: ['student', 'teacher'],
        hasAnyRole__admin: ['admin'],
      }),
    }

    // vm = new localVue(Object.assign({}, Component, { store })).$mount(document.body)
    // wrapper = createWrapper(vm)

    wrapper = mount(Component, { localVue, store, attachTo: document.body })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('hasPermission', async () => {
    expect(isHidden('#hasPermission__get')).toBe(false)
    expect(isHidden('#hasPermission__delete')).toBe(true)

    wrapper.setData({ hasPermission__get: ['_'], hasPermission__delete: ['get'] })
    await wrapper.vm.$nextTick()
    expect(isHidden('#hasPermission__get')).toBe(true)
    expect(isHidden('#hasPermission__delete')).toBe(false)
  })

  it('hasAnyPermission', async () => {
    expect(isHidden('#hasAnyPermission__get_delete')).toBe(false)
    expect(isHidden('#hasAnyPermission__delete')).toBe(true)

    wrapper.setData({ hasAnyPermission__get_delete: ['_'], hasAnyPermission__delete: ['get'] })
    await wrapper.vm.$nextTick()
    expect(isHidden('#hasAnyPermission__get_delete')).toBe(true)
    expect(isHidden('#hasAnyPermission__delete')).toBe(false)
  })

  it('hasRole', async () => {
    expect(isHidden('#hasRole__student')).toBe(false)
    expect(isHidden('#hasRole__teacher')).toBe(true)

    wrapper.setData({ hasRole__student: ['_'], hasRole__teacher: ['student'] })
    await wrapper.vm.$nextTick()
    expect(isHidden('#hasRole__student')).toBe(true)
    expect(isHidden('#hasRole__teacher')).toBe(false)
  })

  it('hasAnyRole', async () => {
    expect(isHidden('#hasAnyRole__student_teacher')).toBe(false)
    expect(isHidden('#hasAnyRole__admin')).toBe(true)

    wrapper.setData({ hasAnyRole__student_teacher: ['_'], hasAnyRole__admin: ['student'] })
    await wrapper.vm.$nextTick()
    expect(isHidden('#hasAnyRole__student_teacher')).toBe(true)
    expect(isHidden('#hasAnyRole__admin')).toBe(false)
  })
})
