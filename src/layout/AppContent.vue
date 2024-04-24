<script setup lang="ts">
import { useSettingStore } from '@/store/modules/settings';
import { useKeepAliveInclude } from '@/composables/layout';

defineOptions({
  name: 'AppContent',
});

const { appMultipleTabs } = storeToRefs(useSettingStore());
const route = useRoute();
const include = useKeepAliveInclude();

const updateScrollTop = (scrollTop) => {
  route.meta.scrollTop = scrollTop;
};
</script>

<template>
  <v-main class="app-content fill-height overflow-hidden">
    <div class="fill-height d-flex flex-column align-center justify-center">
      <v-expand-transition>
        <TagsView v-if="appMultipleTabs" />
      </v-expand-transition>
      <div class="fill-width flex-grow-1" :style="{ position: 'relative' }">
        <v-container
          ref="containerRef"
          v-scroll.self="(e) => updateScrollTop(e.target.scrollTop)"
          class="overflow-x-hidden overflow-y-auto py-1 px-1"
          fluid
          :style="{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }"
        >
          <div class="fill-height">
            <router-view v-slot="{ Component }">
              <v-slide-x-transition mode="out-in">
                <keep-alive :include="appMultipleTabs ? include : []">
                  <component :is="Component" :key="route.path" />
                </keep-alive>
              </v-slide-x-transition>
            </router-view>
          </div>
        </v-container>
      </div>
    </div>
  </v-main>
</template>
