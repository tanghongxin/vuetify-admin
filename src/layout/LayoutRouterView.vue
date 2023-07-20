<script setup>
import _ from 'lodash-es'
import { useRuntimeStore, useSettingStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, nextTick } from 'vue'
import { computed, defineOptions } from 'vue';
import { useBreadcrumbs } from './composable'
import { useDisplay } from 'vuetify'

defineOptions({
  name: 'LayoutRouterView',
})

const runtimeStore = useRuntimeStore()
const settingStore = useSettingStore()
const router = useRouter()
const route = useRoute()
const targetIndex = ref(-1)
const followMenuRef = ref(null)
const { xs } = useDisplay()

const breadcrumbs = useBreadcrumbs()

const openedRoutesComponentNames = computed(() => {
  const matched = runtimeStore.openedRoutes.map(r => r.matched).flat()
  const tags = matched.map(e => e.components.default.name)
  return _.uniq(tags)
})

const handleClose = (index) =>{
  // 当只有一个页签且为首页时，保持不动
  if (runtimeStore.openedRoutes[index].path === '/home' && runtimeStore.openedRoutes.length <= 1) {
    return
  }

  // 关闭当前激活页签
  if (runtimeStore.openedRoutes[index].fullPath === route.fullPath) {
    let to
    // 优化向右移动
    if (index <= runtimeStore.openedRoutes.length - 2) {
      to = runtimeStore.openedRoutes[index + 1].fullPath
    } else if (index >= 1) {
      to = runtimeStore.openedRoutes[index - 1].fullPath
    } else {
      to = '/home'
    }
    router.push(to)
  }
  runtimeStore.setOpenedRoutes([
    ...runtimeStore.openedRoutes.slice(0, index),
    ...runtimeStore.openedRoutes.slice(index + 1),
  ])
}

const handleCloseLeft = (index) => {
  runtimeStore.setOpenedRoutes(runtimeStore.openedRoutes.slice(index))
}

const handleCloseRight = (index) => {
  runtimeStore.setOpenedRoutes(runtimeStore.openedRoutes.slice(0, index + 1))
}

const handleCLoseOthers = (index) => {
  runtimeStore.setOpenedRoutes([runtimeStore.openedRoutes[index]])
}

const handleTabsChange = async (fullPath) => {
  await nextTick()
  if (fullPath && fullPath !== route.fullPath) {
    // router.push(fullPath)
  }
}

const updateScrollTop = (scrollTop) => {
  route.meta.scrollTop = scrollTop
}

const restoreScrollTop = (scrollTop) => {
  updateScrollTop(scrollTop)
  // TODO: 官方未发布最新 API
  // setTimeout(this.$vuetify.goTo, 900, scrollTop, {
  //   container: this.$refs['content'],
  //   offset: this.appHeaderHeight * -1,
  // })
}

const handleRouteChange = async () => {
  const openedRoutes = runtimeStore.openedRoutes.slice()
  const index = openedRoutes.findIndex(r => r.name === route.name)
  const originalRoute = openedRoutes[index]
  
  if (index === -1) {
    openedRoutes.push({ ...route })
  } else {
    openedRoutes.splice(index, 1, { ...route })
  }
  runtimeStore.setOpenedRoutes(openedRoutes)

  // TODO: 记录可能不生效
  if (originalRoute && originalRoute.meta.scrollTop) {
    await nextTick()
    restoreScrollTop(originalRoute.meta.scrollTop)
  }
}

const handleCtxMenu = (e, index) => {
  targetIndex.value = index
  followMenuRef.value.show(e)
}

let unWatchRoute

const watchRoute = () => watch(
  () => route,
  handleRouteChange,
  { immediate: false, deep: true },
)

watch(
  () => settingStore.appMultipleTabs,
  (val) => {
    let openedRoutes = []
    if (val) {
      // There could be an original value when route is redirected from /404
      openedRoutes = runtimeStore.openedRoutes.length ? runtimeStore.openedRoutes: [{ ...route }]
      unWatchRoute = watchRoute()
    } else {
      unWatchRoute && unWatchRoute()
      unWatchRoute = null
    }
    window.route = route
    window.test = openedRoutes[0]
    runtimeStore.setOpenedRoutes(openedRoutes)
  },
  { immediate: true },
)
</script>

<template>
  <div class="fill-height d-flex flex-column align-center justify-center">
    <v-expand-transition>
      <div class="fill-width" v-if="settingStore.appMultipleTabs">
        <v-tabs
          :model-value="route.fullPath"
          show-arrows
          slider-color="primary darken-1"
          :height="48"
          @update:modelValue="handleTabsChange"
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
            <v-btn icon ripple small variant="text" @click.prevent="handleClose(index)">
              <v-icon small>
                close
              </v-icon>
            </v-btn>
          </v-tab>
        </v-tabs>
        <v-divider />
        
        <v-breadcrumbs v-show="!xs" class="pt-2 pb-2" :items="breadcrumbs">
          <template #divider>
            <v-icon>forward</v-icon>
          </template>
        </v-breadcrumbs>
      </div>
    </v-expand-transition>

    <div class="fill-width flex-grow-1" :style="{ position: 'relative' }">
      <v-container
        class="overflow-x-hidden overflow-y-auto py-1 px-1 "
        fluid
        ref="content"
        :style="{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          // padding: '0 !important'
        }"
        v-scroll.self="e => updateScrollTop(e.target.scrollTop)"
      >
        <div class="fill-height">
          <router-view v-slot="{ Component }">
            <v-slide-x-transition mode="out-in">
              <keep-alive :include="settingStore.appMultipleTabs ? openedRoutesComponentNames : []">
                <component :is="Component" :key="route.name" />
              </keep-alive>
            </v-slide-x-transition>
          </router-view>
        </div>
      </v-container>
    </div>

    <VFollowMenu ref="followMenuRef">
      <v-list dense class="py-0">
        <v-list-item dense @click="() => handleClose(targetIndex)">
          <template #prepend>
            <v-icon class="mr-1" small :size="16" tag="span">
              keyboard_arrow_down
            </v-icon>
            <v-list-item-title>关闭选中标签</v-list-item-title>
          </template>
        </v-list-item>
        <v-list-item dense @click="() => handleCloseRight(targetIndex)" :disabled="targetIndex >= runtimeStore.openedRoutes.length - 1">
          <template #prepend>
            <v-icon class="mr-1" small :size="16" tag="span">
              keyboard_arrow_right
            </v-icon>
            <v-list-item-title>关闭右侧标签</v-list-item-title>
          </template>
        </v-list-item>
        <v-list-item dense @click="() => handleCloseLeft(targetIndex)" :disabled="targetIndex < 1">
          <template #prepend>
            <v-icon class="mr-1" small :size="16" tag="span">
              keyboard_arrow_left
            </v-icon>
            <v-list-item-title>关闭左侧标签</v-list-item-title>
          </template>
        </v-list-item>
        <v-list-item dense @click="handleCLoseOthers(targetIndex)" :disabled="runtimeStore.openedRoutes.length <= 1">
          <template #prepend>
            <v-icon class="mr-1" small :size="16" tag="span">
              keyboard_arrow_up
            </v-icon>
            <v-list-item-title>关闭其他标签</v-list-item-title>
          </template>
        </v-list-item>
      </v-list>
    </VFollowMenu>
  </div>
</template>
