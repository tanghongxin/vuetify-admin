<template>
  <v-list :class="!sub ? 'py-0' : ''">
    <template v-for="item in items">
      <!-- / branch nodes -->
      <v-list-group
        v-if="item.type === 'MENU' && !item.hidden"
        v-hasPermission="item.permissions"
        :key="item.text"
        v-model="item.expanded"
        :prepend-icon="item.icon"
        :append-icon="item.model ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        :sub-group="sub"
      >
        <template v-slot:activator>
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </template>
        <RecursiveMenus
          sub
          :items="item.children"
        />
      </v-list-group>

      <!-- / leaf nodes -->
      <v-list-item
        v-if="item.type === 'VIEW' && !item.hidden"
        v-hasPermission="item.permissions"
        :key="item.text"
        :to="item.to"
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
  name:'RecursiveMenus',
  components: {},
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
  data: () => ({
  }),
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
</style>
