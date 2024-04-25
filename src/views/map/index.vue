<script setup lang="ts">
import { useSettingStore } from '@/store/modules/settings';

// eslint-disable-next-line vue/no-reserved-component-names
defineOptions({ name: 'Map' });

const { themeDark } = storeToRefs(useSettingStore());

const loading = ref(true);
</script>

<template>
  <div class="map">
    <Spin :model-value="loading">
      <AMapMap
        :map-style="themeDark ? 'dark' : 'normal'"
        @complete="loading = false"
      >
        <a-map-fit-view />
        <a-map-toolbar />
        <a-map-scale />
        <a-map-control-bar />
      </AMapMap>
    </Spin>
  </div>
</template>

<style lang="scss">
.map {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
