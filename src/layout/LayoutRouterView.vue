<template>
  <div class="fill-height d-flex flex-column align-center justify-center">
    <v-expand-transition>
      <div class="fill-width" v-if="appMultipleTabs">
        <v-tabs
          :model-value="$route.fullPath"
          show-arrows
          slider-color="primary darken-1"
          :height="48"
          @update:modelValue="handleTabsChange"
        >
          <v-tab
            v-for="(route, index) in openedRoutes"
            :key="route.name"
            :value="route.fullPath"
            :exact="route.name === $route.name"
            :to="route.fullPath"
            @contextmenu="handleCtxMenu($event, index)"
          >
            <span class="subtitle-1">{{ route.name }}</span>
            <v-spacer tag="span" />
            <v-btn icon ripple small variant="text" @click.prevent="handleClose(index)">
              <v-icon small>
                close
              </v-icon>
            </v-btn>
          </v-tab>
        </v-tabs>
        <v-divider />
        <!-- <v-breadcrumbs v-show="!$vuetify.breakpoint.xsOnly" class="pt-2 pb-2" :items="breadcrumbs"> -->
        <v-breadcrumbs class="pt-2 pb-2" :items="breadcrumbs">
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
              <keep-alive :include="appMultipleTabs ? openedRoutesComponentNames : []">
                <component :is="Component" :key="$route.name" />
              </keep-alive>
            </v-slide-x-transition>
          </router-view>
        </div>
      </v-container>
    </div>

    <VFollowMenu ref="followMenu">
      <v-list dense class="py-0">
        <v-list-item dense @click="() => this.handleClose(this.targetIndex)">
          <template #prepend>
            <v-icon class="mr-1" small :size="16" tag="span">
              keyboard_arrow_down
            </v-icon>
            <v-list-item-title>关闭选中标签</v-list-item-title>
          </template>
        </v-list-item>
        <v-list-item dense @click="() => this.handleCloseRight(this.targetIndex)" :disabled="targetIndex >= openedRoutes.length - 1">
          <template #prepend>
            <v-icon class="mr-1" small :size="16" tag="span">
              keyboard_arrow_right
            </v-icon>
            <v-list-item-title>关闭右侧标签</v-list-item-title>
          </template>
        </v-list-item>
        <v-list-item dense @click="() => this.handleCloseLeft(this.targetIndex)" :disabled="targetIndex < 1">
          <template #prepend>
            <v-icon class="mr-1" small :size="16" tag="span">
              keyboard_arrow_left
            </v-icon>
            <v-list-item-title>关闭左侧标签</v-list-item-title>
          </template>
        </v-list-item>
        <v-list-item dense @click="this.handleCLoseOthers(this.targetIndex)" :disabled="openedRoutes.length <= 1">
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

<script>
import _ from 'lodash-es'
import { mapMutations, mapState } from 'vuex'
import { RuntimeMutations } from '@/store/modules'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutRouterView',
  data () {
    return {
      targetIndex: -1,
    }
  },
  computed: {
    ...mapState('setting', ['appHeaderHeight', 'appMultipleTabs']),
    ...mapState('runtime', ['openedRoutes']),
    breadcrumbs () {
      const [, ...rest] = this.$route.matched.map(r => ({ title: r.name }))
      return rest
    },
    openedRoutesComponentNames () {
      const matched = this.openedRoutes.map(r => r.matched).flat()
      const tags = matched.map(e => e.components.default.name)
      return _.uniq(tags)
    },
  },
  methods: {
    ...mapMutations('runtime', {
      setOpenedRoutes: RuntimeMutations.SET_OPENED_ROUTES,
    }),
    handleClose (index) {
      // 当只有一个页签且为首页时，保持不动
      if (this.openedRoutes[index].path === '/home' && this.openedRoutes.length <= 1) {
        return
      }

      // 关闭当前激活页签
      if (this.openedRoutes[index].fullPath === this.$route.fullPath) {
        let to
        // 优化向右移动
        if (index <= this.openedRoutes.length - 2) {
          to = this.openedRoutes[index + 1].fullPath
        } else if (index >= 1) {
          to = this.openedRoutes[index - 1].fullPath
        } else {
          to = '/home'
        }
        this.$router.push(to)
      }
      this.setOpenedRoutes([
        ...this.openedRoutes.slice(0, index),
        ...this.openedRoutes.slice(index + 1),
      ])
    },
    handleCloseLeft (index) {
      this.setOpenedRoutes(this.openedRoutes.slice(index))
    },
    handleCLoseOthers (index) {
      this.setOpenedRoutes([this.openedRoutes[index]])
    },
    handleCloseRight (index) {
      this.setOpenedRoutes(this.openedRoutes.slice(0, index + 1))
    },
    handleCtxMenu (e, index) {
      this.targetIndex = index
      this.$refs['followMenu'].show(e)
    },
    handleTabsChange (fullPath) {
      if (fullPath && fullPath !== this.$route.fullPath) {
        this.$router.push(fullPath)
      }
    },
    updateScrollTop (scrollTop) {
      this.$route.meta.scrollTop = scrollTop
    },
    restoreScrollTop (scrollTop) {
      this.updateScrollTop(scrollTop)
      // TODO: 官方未发布最新 API
      // setTimeout(this.$vuetify.goTo, 900, scrollTop, {
      //   container: this.$refs['content'],
      //   offset: this.appHeaderHeight * -1,
      // })
    },
    async handleRouteChange () {
      const openedRoutes = this.openedRoutes.slice()
      const index = openedRoutes.findIndex(r => r.name === this.$route.name)
      const originalRoute = openedRoutes[index]

      if (index === -1) {
        openedRoutes.push(this.$route)
      } else {
        openedRoutes.splice(index, 1, this.$route)
      }
      this.setOpenedRoutes(openedRoutes)

      if (originalRoute && originalRoute.meta.scrollTop) {
        await this.$nextTick()
        this.restoreScrollTop(originalRoute.meta.scrollTop)
      }
    },
  },
  created () {
    let unWatchRoute

    const watchRoute = () => this.$watch(
      () => this.$route,
      this.handleRouteChange,
    )

    this.$watch(
      () => this.appMultipleTabs,
      (val) => {
        let openedRoutes = []
        if (val) {
          // There could be an original value when route is redirected from /404
          openedRoutes = this.openedRoutes.length ? this.openedRoutes: [this.$route]
          unWatchRoute = watchRoute()
        } else {
          unWatchRoute && unWatchRoute()
          unWatchRoute = null
        }
        this.setOpenedRoutes(openedRoutes)
      },
      { immediate: true },
    )
  },
})
</script>

<style lang="scss">
</style>
