<script setup lang="ts">
import { useSettingStore } from '@/store/modules/settings';

defineOptions({
  name: 'AppContent',
});

const settingStore = useSettingStore();
const route = useRoute();

const updateScrollTop = (scrollTop) => {
  route.meta.scrollTop = scrollTop;
};
</script>

<template>
  <v-main class="app-content fill-height overflow-hidden">
    <div class="fill-height d-flex flex-column align-center justify-center">
      <TagsView v-if="settingStore.appMultipleTabs" />
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
            // padding: '0 !important'
          }"
        >
          <div class="fill-height">
            <router-view v-slot="{ Component }">
              <v-slide-x-transition mode="out-in">
                <!-- FIXME -->
                <keep-alive
                  v-if="settingStore.appMultipleTabs && route.meta.isKeepAlive"
                >
                  <component :is="Component" :key="route.name" />
                </keep-alive>
                <component v-else :is="Component" :key="route.name" />
              </v-slide-x-transition>
            </router-view>
          </div>
        </v-container>
      </div>
    </div>
  </v-main>
</template>
