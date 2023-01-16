<template>
  <v-list class="py-0 recursive-menus" :opened="$route.matched.slice(1).map(({ name }) => name)">
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

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutRecursiveMenus',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    sub: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss">
.group-sub {
  padding-left: 1rem;

  /* stylelint-disable-next-line */
  & > .v-list-group__items {
    padding-left: 1rem;
  }
}
</style>
