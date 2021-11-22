<template>
  <v-list class="py-0 recursive-menus">
    <template v-for="item in items">
      <!-- / branch nodes -->
      <v-list-group
        active-class="primary--text"
        :class="sub ? 'group-sub' : ''"
        v-if="item.type === 'MENU' && !item.hidden"
        v-hasPermission="item.permissions"
        :key="item.to"
        :value="$route.path.includes(item.to)"
      >
        <template #prependIcon>
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </template>
        <template #activator>
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </template>
        <LayoutRecursiveMenus sub :items="item.children" v-if="item.children.length" />
      </v-list-group>

      <!-- / leaf nodes -->
      <v-list-item
        active-class="primary--text"
        v-if="item.type === 'VIEW' && !item.hidden"
        v-hasPermission="item.permissions"
        :key="item.to"
        :to="item.to || item.redirect"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ item.text }}
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
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
}
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
