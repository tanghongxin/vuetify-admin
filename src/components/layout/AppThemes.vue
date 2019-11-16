<template>
  <div class="AppThemes">
    <!-- / Themes -->
    <template>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        right
        temporary
      >
        <v-toolbar
          slot="prepend"
          color="primary lighten-1"
        >
          <v-toolbar-title v-text="'主题'" />
        </v-toolbar>

        <v-color-picker
          flat
          v-model="themeColor"
          hide-inputs
          :mode.sync="mode"
          show-swatches
          :swatches="swatches"
          canvas-height="200"
        />
      </v-navigation-drawer>
    </template>

    <!-- / Trigger Button -->
    <template>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            class="AppThemes__trigger-btn"
            color="primary"
            depressed
            falt
            fixed
            ripple
            small
            top="top"
            right="right"
            width="40"
            height="40"
            v-on="on"
            @click="drawer = true"
          >
            <v-icon
              size="20"
              v-text="'settings'"
            />
          </v-btn>
        </template>
        切换主题色
      </v-tooltip>
    </template>
  </div>
</template>

<script>
import { ls } from '@/utils/storage'

export default {
  name: 'AppThemes',
  data: (vm) => ({
    drawer: false,
    color: vm.$vuetify.theme.currentTheme.primary,
    mode: 'rgba',
    swatches: [
      ['#FF0000', '#AA0000', '#550000'],
      ['#FFFF00', '#AAAA00', '#555500'],
      ['#00FF00', '#00AA00', '#005500'],
      ['#00FFFF', '#00AAAA', '#005555'],
    ],
  }),
  computed: {
    themeColor: {
      get () {
        return this.$vuetify.theme.currentTheme.primary
      },
      set (v) {
        ls.set('themeColor', v)
        this.$vuetify.theme.currentTheme.primary = v
      },
    },
  },
  beforeCreate () {
    this.$vuetify.theme.currentTheme.primary =
      ls.get('themeColor') ||
      this.$vuetify.theme.currentTheme.primary
  },
}
</script>

<style lang="scss">
.AppThemes {

  .v-color-picker {
    border-radius: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    .v-color-picker__swatches {
      max-height: 100% !important;
      flex: 1;
    }
  }
  
  &__trigger-btn {
    top: 50% !important;
  }
}
</style>
