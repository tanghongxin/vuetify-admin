<template>
  <div class="exception fill-width d-flex flex-column justify-center align-center">
    <div class="exception-img mb-6" :style="{ filter: appThemeDark ? 'invert(100%)': 'none' }" />
    <h1>{{ 404 }}</h1>
    <h2>抱歉，您访问的页面不存在或仍在开发中</h2>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useSettingStore } from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Exception',
  computed: {
    ...mapState(useSettingStore, { appThemeDark: 'appThemeDark' }),
  },
})
</script>

<style lang="scss">
.exception {
  height: 85%;

  &-img {
    background-image: url("@/assets/images/alert-triangle.svg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 240px;
    width: 360px;
  }
}
</style>
