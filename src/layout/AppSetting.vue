<template>
  <div class="AppSetting">
    <v-navigation-drawer
      app
      :value="appSetting"
      fixed
      right
      temporary
      @input="handleInput"
      ref="drawer"
    >
      <!-- / Header -->
      <v-toolbar
        :height="appHeaderHeight"
        slot="prepend"
        color="primary lighten-1"
      >
        <v-toolbar-title v-text="'个性化设置'" />
      </v-toolbar>

      <!-- / Content -->
      <v-container>
        <v-layout column>
          <!-- / Navigation -->
          <v-flex>
            <v-subheader
              class="px-1 my-2"
              v-text="'导航栏设置'"
            />
            <v-switch
              color="primary"
              :value="permanentAppNavigation"
              primary
              label="导航栏固定左侧"
              @change="togglePermanentAppNavigation"
            />
          </v-flex>
          <!-- / Theme -->
          <v-flex>
            <v-subheader
              class="px-1 my-2"
              v-text="'主题色设置'"
            />
            <div class="color-option">
              <v-layout wrap>
                <label
                  v-for="(colorConfig, colorName) in colors"
                  :key="colorName"
                  class="AppSetting__label flex xs6 pa-1"
                  v-show="!filterColors.includes(colorName)"
                >
                  <input
                    type="radio"
                    name="colorConfig"
                    :checked="colorConfig.base === themeColor"
                    @input="themeColor = colorConfig.base"
                  >
                  <span class="AppSetting__item bg">
                    <span class="overlay">
                      <span class="material-icons">check</span>
                    </span>
                    <span
                      class="AppSetting__item-header"
                      :class="colorName"
                    />
                    <span
                      class="AppSetting__item-header"
                      :class="colorName"
                    />
                    <span
                      class="white"
                    />
                  </span>
                </label>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
import colors from 'vuetify/lib/util/colors'
import { ls } from '@/utils/storage'
import mixin from './mixin.vue'

export default {
  name: 'AppSetting',
  mixins: [mixin],
  data: () => ({
    drawer: false,
    colors: colors,
    filterColors: ['blueGrey', 'lightBlue', 'lightGreen', 'deepPurple', 'deepOrange', 'shades'],
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
  methods: {
    handleInput () {
      // HACK
      if (this.$refs.drawer.isActive !== this.appSetting) {
        this.toggleAppSetting()
      }
    },
  },
}
</script>

<style lang="scss">
.AppSetting {
  
  &__trigger-btn {
    top: 50% !important;
  }

  &__label {
    position: relative;
    display: block;
    cursor: pointer;
  }

  &__label input[type='radio'] {
    display: none;
  }

  &__label input[type='radio'] + span {
    position: relative;
  }

  &__label input[type='radio'] + span > .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: none;
    width: 100%;
    height: 100%;
    line-height: 30px;
    color: #fff;
    text-align: center;
    background-color: rgba(0,0,0,.3);
  }

  &__label input[type='radio']:checked + span > .overlay {
    display: block;
  }

  &__label .bg {
    background-color: #f1f1f1;
  }

  &__item {
    display: block;
    margin-bottom: 15px;
    overflow: hidden;
    box-shadow: 0 0 2px rgba(0,0,0,.1);
  }

  &__item-header {
    height: 10px;
  }

  &__item > span {
    display: inline-block;
    width: 50%;
    height: 20px;
  }
}
</style>
