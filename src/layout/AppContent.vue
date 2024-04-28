<script setup lang="ts">
import { useSettingStore } from '@/store/modules/settings';
import { useKeepAliveInclude } from '@/composables/layout';

defineOptions({
  name: 'AppContent',
});

const { tagsView } = storeToRefs(useSettingStore());
const route = useRoute();
const include = useKeepAliveInclude();
</script>

<template>
  <v-main class="app-content h-100">
    <div class="h-100 d-flex flex-column align-center justify-center">
      <v-expand-transition>
        <TagsView v-if="tagsView" />
      </v-expand-transition>
      <div class="w-100 h-100 flex-grow-1 p-relative">
        <v-container
          class="py-1 px-1"
          fluid
          :style="{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }"
        >
          <div class="w-100 h-100 overflow-x-hidden overflow-y-hidden">
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
