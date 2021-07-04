<template>
  <v-app-bar
    :clipped-left="appPermanentNavigation || $vuetify.breakpoint.lgAndUp"
    app
    color="primary darken-2"
    dark
    flat
    :height="appHeaderHeight"
  >
    <v-toolbar-title style="width: 200px;" class="ml-0 mr-1 pl-4 d-flex flex-row justify-center align-center">
      <v-expand-x-transition>
        <v-app-bar-nav-icon
          v-show="!appPermanentNavigation"
          @click.stop="toggleAppNavigation"
        />
      </v-expand-x-transition>
      <span>若石管理系统</span>
    </v-toolbar-title>

    <v-spacer />

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          color="white"
          v-on="on"
          @click="toggleAppSetting"
        >
          <v-icon size="20">
            settings
          </v-icon>
        </v-btn>
      </template>
      <span>个性化设置</span>
    </v-tooltip>

    <v-btn icon large>
      <v-avatar size="32px" item>
        <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify" />
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
