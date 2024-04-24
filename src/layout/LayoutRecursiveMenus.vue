<script setup lang="ts">
import { useBreadcrumbs } from '@/composables/layout';
import type { RouteConfig } from '@/types';

const LayoutRecursiveMenus = defineAsyncComponent(
  () => import('./LayoutRecursiveMenus.vue'),
);

defineOptions({
  name: 'LayoutRecursiveMenus',
});

defineProps({
  items: {
    type: Array<RouteConfig>,
    default: () => [],
  },
  sub: {
    type: Boolean,
    default: false,
  },
});

const breadcrumbs = useBreadcrumbs();
</script>

<template>
  <v-list
    class="py-0 recursive-menus"
    :opened="breadcrumbs.map(({ title }) => title)"
  >
    <template v-for="item in items">
      <!-- / branch nodes -->
      <v-list-group
        v-if="item.type === 'MENU' && !item.meta?.isHidden"
        :key="item.path"
        selected-class="primary--text"
        :class="sub ? 'group-sub' : ''"
        :value="item.name"
      >
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="item.icon"
            :title="item.name"
          />
        </template>

        <LayoutRecursiveMenus
          v-if="item.children.length"
          sub
          :items="item.children"
        />
      </v-list-group>

      <!-- / leaf nodes -->
      <v-list-item
        v-if="item.type === 'VIEW' && !item.meta?.isHidden"
        :key="item.path"
        selected-class="primary--text"
        :to="item.path || item.redirect"
        link
      >
        <template #prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </template>
  </v-list>
</template>

<style lang="scss">
.group-sub {
  padding-left: 1rem;

  & > .v-list-group__items {
    padding-left: 1rem;
  }
}
</style>
