<template>
  <v-app-bar
    :clipped-left="appPermanentNavigation || $vuetify.breakpoint.lgAndUp"
    app
    color="primary darken-2"
    dark
    flat
    :height="appHeaderHeight"
  >
    <v-toolbar-title
      style="width: 300px;"
      class="ml-0 pl-4"
    >
      <v-app-bar-nav-icon
        v-show="!appPermanentNavigation"
        @click.stop="toggleAppNavigation"
      />
      <span>若石管理系统</span>
    </v-toolbar-title>
    <v-spacer />
    <v-tooltip bottom>
      <!-- FIXME: 需点击两次生效 -->
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          color="white"
          v-on="on"
          @click="toggleAppSetting"
        >
          <v-icon
            size="20"
            v-text="'settings'"
          />
        </v-btn>
      </template>
      个性化设置
    </v-tooltip>
    <v-btn
      icon
      large
    >
      <v-avatar
        size="32px"
        item
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        />
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
import mixin from './mixin.vue'

export default {
  name:'AppHeader',
  mixins: [mixin],
}
</script>

<style lang="scss">

</style>
