import { mount } from '@vue/test-utils'
import auth from '@/directives/auth'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { useAccountStore } from '@/store'

describe('permission', () => {
  let store
  let wrapper

  const isRemoved = (selector) => !wrapper.find(selector).exists()

  beforeEach(() => {
    vi.mock('@/store', () => ({
      useAccountStore: () => ({
        account: {
          permissions: ['get'],
          roles: ['student'],
        },
      }),
    }))

    store = useAccountStore()

    const Component = {
      template: `
        <div>
          <button id="hasAllPermissions__get" v-hasAllPermissions="hasAllPermissions__get"></button>
          <button id="hasAllPermissions__delete" v-hasAllPermissions="hasAllPermissions__delete"></button>
          <button id="hasAnyPermissions__get_delete" v-hasAnyPermissions="hasAnyPermissions__get_delete"></button>
          <button id="hasAnyPermissions__delete" v-hasAnyPermissions="hasAnyPermissions__delete"></button>
          <button id="hasAllRoles__student" v-hasAllRoles="hasAllRoles__student"></button>
          <button id="hasAllRoles__teacher" v-hasAllRoles="hasAllRoles__teacher"></button>
          <button id="hasAnyRoles__student_teacher" v-hasAnyRoles="hasAnyRoles__student_teacher"></button>
          <button id="hasAnyRoles__admin" v-hasAnyRoles="hasAnyRoles__admin"></button>
        </div>`,
      data: () => ({
        hasAllPermissions__get: ['get'],
        hasAllPermissions__delete: ['delete'],
        hasAnyPermissions__get_delete: ['get', 'delete'],
        hasAnyPermissions__delete: ['delete'],
        hasAllRoles__student: ['student'],
        hasAllRoles__teacher: ['teacher'],
        hasAnyRoles__student_teacher: ['student', 'teacher'],
        hasAnyRoles__admin: ['admin'],
      }),
    }

    wrapper = mount(Component, {
      global: {
        plugins: [auth],
      },
      attachTo: document.body,
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('hasAllPermissions', () => {
    expect(isRemoved('#hasAllPermissions__delete')).toBe(true)
    wrapper.setData({ hasAllPermissions__get: ['_'], hasAllPermissions__delete: ['get'] })
  })

  it('hasAnyPermissions', () => {
    expect(isRemoved('#hasAnyPermissions__get_delete')).toBe(false)
    expect(isRemoved('#hasAnyPermissions__delete')).toBe(true)
  })

  it('hasAllRoles', () => {
    expect(isRemoved('#hasAllRoles__student')).toBe(false)
    expect(isRemoved('#hasAllRoles__teacher')).toBe(true)
  })

  it('hasAnyRoles', () => {
    expect(isRemoved('#hasAnyRoles__student_teacher')).toBe(false)
    expect(isRemoved('#hasAnyRoles__admin')).toBe(true)
  })
})
