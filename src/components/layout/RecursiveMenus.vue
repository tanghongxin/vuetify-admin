<template>
  <v-list
    :class="{ 'RecursiveMenus__sub': sub }"
    dense
  >
    <template v-for="item in items">
      <!-- / branch nodes -->
      <v-list-group
        v-if="item.type === 'MENU' && !item.hidden"
        v-hasPermission="item.permissions"
        :key="item.text"
        v-model="item.model"
        :prepend-icon="item.icon"
        :append-icon="item.model ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        :sub-group="sub"
      >
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <!-- / branch - leaf nodes -->
        <!-- <v-list-item
          v-for="(child, i) in item.children"
          :key="i"
          link
          :to="child.to" 
        >
          <template
            v-if="!child.hidden" 
            v-hasPermission="child.permissions"
          >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-hasPermission="child.permissions">
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item> -->
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
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
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
.RecursiveMenus__sub {
  // padding-left: 2em;
}
</style>
