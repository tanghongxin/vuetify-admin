<script setup lang="ts">
import { useRuntimeStore } from '@/store/modules/runtime';
import Manager from './Manager.vue';
import Breadcrumbs from './Breadcrumbs.vue';

const runtimeStore = useRuntimeStore();
const router = useRouter();
const route = useRoute();
const targetIndex = ref(-1);
const followMenuRef = ref(null);
const containerRef = ref(null);

const close = (index) => {
  // 当只有一个页签且为首页时，保持不动
  if (
    runtimeStore.openedRoutes[index].path === '/home' &&
    runtimeStore.openedRoutes.length <= 1
  ) {
    return;
  }

  // 关闭当前激活页签
  if (runtimeStore.openedRoutes[index].fullPath === route.fullPath) {
    let to;
    // 优化向右移动
    if (index <= runtimeStore.openedRoutes.length - 2) {
      to = runtimeStore.openedRoutes[index + 1].fullPath;
    } else if (index >= 1) {
      to = runtimeStore.openedRoutes[index - 1].fullPath;
    } else {
      to = '/home';
    }
    router.push(to);
  }
  runtimeStore.setOpenedRoutes([
    ...runtimeStore.openedRoutes.slice(0, index),
    ...runtimeStore.openedRoutes.slice(index + 1),
  ]);
};

const closeLeft = (index) => {
  runtimeStore.setOpenedRoutes(runtimeStore.openedRoutes.slice(index));
};

const closeRight = (index) => {
  runtimeStore.setOpenedRoutes(runtimeStore.openedRoutes.slice(0, index + 1));
};

const closeOthers = (index) => {
  runtimeStore.setOpenedRoutes([runtimeStore.openedRoutes[index]]);
};

const updateScrollTop = (scrollTop) => {
  route.meta.scrollTop = scrollTop;
};

const restoreScrollTop = (scrollTop) => {
  updateScrollTop(scrollTop);
  setTimeout(() => {
    containerRef.value.$el.scroll({ top: scrollTop, behavior: 'smooth' });
  }, 800);
};

const handleRouteChange = async () => {
  const openedRoutes = runtimeStore.openedRoutes.slice();
  const index = openedRoutes.findIndex((r) => r.name === route.name);
  const originalRoute = openedRoutes[index];

  if (index === -1) {
    openedRoutes.push({ ...route });
  } else {
    openedRoutes.splice(index, 1, { ...route });
  }
  runtimeStore.setOpenedRoutes(openedRoutes);

  if (originalRoute && originalRoute.meta.scrollTop) {
    await nextTick();
    restoreScrollTop(originalRoute.meta.scrollTop);
  }
};

const handleCtxMenu = (e, index) => {
  targetIndex.value = index;
  followMenuRef.value.show(e);
};

watch(() => route, handleRouteChange, { immediate: true, deep: true });
</script>

<template>
  <v-expand-transition>
    <div class="fill-width">
      <v-tabs
        :model-value="route.fullPath"
        show-arrows
        slider-color="primary darken-1"
        :height="48"
      >
        <v-tab
          v-for="(r, index) in runtimeStore.openedRoutes"
          :key="r.name"
          :value="r.fullPath"
          :exact="r.name === r.name"
          :to="r.fullPath"
          @contextmenu="handleCtxMenu($event, index)"
        >
          <span class="subtitle-1">{{ r.name }}</span>
          <v-spacer tag="span" />
          <v-btn icon ripple small variant="text" @click.prevent="close(index)">
            <v-icon small> close </v-icon>
          </v-btn>
        </v-tab>
      </v-tabs>
      <v-divider />
      <Breadcrumbs />
    </div>
  </v-expand-transition>

  <FollowMenu ref="followMenuRef">
    <Manager
      :targetIndex
      :openedRoutes="runtimeStore.openedRoutes"
      @close="close"
      @closeRight="closeRight"
      @closeLeft="closeLeft"
      @closeOthers="closeOthers"
    />
  </FollowMenu>
</template>

<style lang="scss"></style>
