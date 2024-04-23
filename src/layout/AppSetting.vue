<script setup lang="ts">
// eslint-disable vue/no-deprecated-slot-attribute
import { colors } from '@/plugins/vuetify/theme';
import { useSettingStore } from '@/store/modules/settings';

defineOptions({
  name: 'AppSetting',
});

const store = useSettingStore();
</script>

<template>
  <div class="app-setting">
    <v-navigation-drawer
      :model-value="store.appSetting"
      location="right"
      temporary
      @update:model-value="store.toggleAppSetting"
    >
      <template #prepend>
        <v-toolbar :height="store.appHeaderHeight" color="primary lighten-1">
          <v-toolbar-title>个性化设置</v-toolbar-title>
        </v-toolbar>
      </template>

      <v-container>
        <div class="d-flex flex-column">
          <div>
            <p class="px-1 my-2">导航栏设置</p>
            <v-switch
              color="primary"
              :model-value="store.appPermanentNavigation"
              label="导航栏固定左侧"
              @change="store.toggleAppPermanentNavigation"
            />
          </div>

          <div>
            <p class="px-1 my-2">外观</p>
            <v-switch
              color="primary"
              :model-value="store.appThemeDark"
              label="深色模式"
              @change="store.toggleAppThemeDark"
            />
          </div>

          <div>
            <p class="px-1 my-2">页签模式</p>
            <v-switch
              color="primary"
              :model-value="store.appMultipleTabs"
              label="多页签"
              @change="store.toggleAppMultipleTabs"
            />
          </div>

          <div>
            <p class="px-1 my-2">主题色设置</p>
            <div class="color-option">
              <div class="d-flex flex-row flex-wrap">
                <label
                  v-for="colorName in Object.keys(colors)"
                  :key="colorName"
                  class="app-setting__label flex pa-1"
                >
                  <input
                    type="radio"
                    :checked="colorName === store.appTheme"
                    @input="store.setAppTheme(colorName)"
                  />
                  <span class="app-setting__item bg">
                    <span class="overlay">
                      <span class="material-icons">check</span>
                    </span>
                    <span
                      class="app-setting__item-header"
                      :class="`bg-${colorName}`"
                    />
                    <span
                      class="app-setting__item-header"
                      :class="`bg-${colorName}`"
                    />
                    <span class="bg-white" />
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<style lang="scss">
.app-setting {
  &__trigger-btn {
    top: 50% !important;
  }

  &__label {
    cursor: pointer;
    display: block;
    position: relative;
    flex-basis: 50%;
    flex-grow: 0;
    max-width: 50%;
  }

  &__label input[type='radio'] {
    display: none;
  }

  &__label input[type='radio'] + span {
    position: relative;
  }

  &__label input[type='radio'] + span > .overlay {
    background-color: rgb(0 0 0 / 30%);
    bottom: 0;
    color: #fff;
    display: none;
    height: 100%;
    left: 0;
    line-height: 30px;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
    width: 100%;
  }

  &__label input[type='radio']:checked + span > .overlay {
    display: block;
  }

  &__label .bg {
    background-color: #f1f1f1;
  }

  &__item {
    box-shadow: 0 0 2px rgb(0 0 0 / 10%);
    display: block;
    margin-bottom: 15px;
    overflow: hidden;
  }

  &__item-header {
    height: 10px;
  }

  &__item > span {
    display: inline-block;
    height: 20px;
    width: 50%;
  }
}
</style>
