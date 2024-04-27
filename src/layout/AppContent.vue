<script setup lang="ts">
import { useSettingStore } from '@/store/modules/settings';
import { useKeepAliveInclude } from '@/composables/layout';
import { debounce } from 'radash';
import { uuid } from '@rthx/utils';

defineOptions({
  name: 'AppContent',
});

const { tagsView } = storeToRefs(useSettingStore());
const route = useRoute();
const include = useKeepAliveInclude();
const containerRef = ref<IoGC<'VContainer'>>(null);
const containerId = uuid();
const updateScrollTop = debounce({ delay: 100 }, (top: number) => {
  Object.assign(route.meta, {
    scroll: { top, el: containerId },
  });
});
</script>

<template>
  <v-main class="app-content h-100 overflow-hidden">
    <div class="h-100 d-flex flex-column align-center justify-center">
      <v-expand-transition>
        <TagsView v-if="tagsView" />
      </v-expand-transition>
      <div class="w-100 flex-grow-1 p-relative">
        <v-container
          :id="containerId"
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
          <div class="h-100 w-100">
            <router-view v-slot="{ Component }">
              <v-slide-x-transition mode="out-in">
                <keep-alive :include="tagsView ? include : []">
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
