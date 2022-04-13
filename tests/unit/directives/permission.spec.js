import { createLocalVue, createWrapper, mount } from '@vue/test-utils'
import { hasPermission, hasNoPermission, hasAnyPermission, hasRole, hasAnyRole } from '@/directives/permissions'
import Vuex from 'vuex'

const localVue = createLocalVue();

[hasPermission, hasNoPermission, hasAnyPermission, hasRole, hasAnyRole, Vuex].forEach(p => localVue.use(p))

describe('permission', () => {
  let store
  let wrapper

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
          <button id="hasPermission__get" v-hasPermission="['get']"></button>
          <button id="hasPermission__delete" v-hasPermission="['delete']"></button>
          <button id="hasNoPermission__get" v-hasNoPermission="['get']"></button>
          <button id="hasNoPermission__delete" v-hasNoPermission="['delete']"></button>
          <button id="hasAnyPermission__get-delete" v-hasAnyPermission="['get', 'delete']"></button>
          <button id="hasAnyPermission__delete" v-hasAnyPermission="['delete']"></button>
          <button id="hasRole__student" v-hasRole="['student']"></button>
          <button id="hasRole__teacher" v-hasRole="['teacher']"></button>
          <button id="hasAnyRole__student-teacher" v-hasAnyRole="['student', 'teacher']"></button>
          <button id="hasAnyRole__admin" v-hasAnyRole="['admin']"></button>
        </div>
      `,
    }

    // vm = new localVue(Object.assign({}, Component, { store })).$mount(document.body)
    // wrapper = createWrapper(vm)

    wrapper = mount(Component, { localVue, store, attachTo: document.body })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('hasPermission', () => {
    expect(wrapper.find('#hasPermission__get').isVisible()).toBe(true)
    expect(wrapper.find('#hasPermission__delete').isVisible()).toBe(false)
  })

  it('hasNoPermission', () => {
    expect(wrapper.find('#hasNoPermission__get').isVisible()).toBe(false)
    expect(wrapper.find('#hasNoPermission__delete').isVisible()).toBe(true)
  })

  it('hasAnyPermission', () => {
    expect(wrapper.find('#hasAnyPermission__get-delete').isVisible()).toBe(true)
    expect(wrapper.find('#hasAnyPermission__delete').isVisible()).toBe(false)
  })

  it('hasRole', () => {
    expect(wrapper.find('#hasAnyRole__student-teacher').isVisible()).toBe(true)
    expect(wrapper.find('#hasRole__teacher').isVisible()).toBe(false)
  })

  it('hasAnyRole', () => {
    expect(wrapper.find('#hasAnyRole__student-teacher').isVisible()).toBe(true)
    expect(wrapper.find('#hasAnyRole__admin').isVisible()).toBe(false)
  })
})
