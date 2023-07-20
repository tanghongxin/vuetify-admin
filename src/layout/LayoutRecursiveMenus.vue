<script setup>
import { defineProps, defineOptions } from 'vue'
import { useState } from './composable'
import { defineAsyncComponent } from 'vue'

const LayoutRecursiveMenus = defineAsyncComponent(() => import('./LayoutRecursiveMenus.vue'))

defineOptions({
  name: 'LayoutRecursiveMenus',
})

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  sub: {
    type: Boolean,
    default: false,
  },
})

const state = useState()
</script>

<template>
  <v-list class="py-0 recursive-menus" :opened="state.breadcrumbs.map(({ title }) => title)">
    <template v-for="item in items">
      <!-- / branch nodes -->
      <v-list-group
        selected-class="primary--text"
        :class="sub ? 'group-sub' : ''"
        v-if="item.type === 'MENU' && !item.hidden"
        :key="item.to"
        :value="item.text"
      >
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="item.icon"
            :title="item.text"
          />
        </template>

        <LayoutRecursiveMenus sub :items="item.children" v-if="item.children.length" />
      </v-list-group>

      <!-- / leaf nodes -->
      <v-list-item
        selected-class="primary--text"
        v-if="item.type === 'VIEW' && !item.hidden"
        :key="item.to"
        :to="item.to || item.redirect"
        link
      >
        <template #prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </template>
  </v-list>
</template>

<style lang="scss">
.group-sub {
  padding-left: 1rem;

  /* stylelint-disable-next-line */
  & > .v-list-group__items {
    padding-left: 1rem;
  }
}
</style>
