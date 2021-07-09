<template>
  <div class="fill-height d-flex flex-column align-center justify-center">
    <v-expand-transition>
      <div class="fill-width" v-if="appMultipleTabs">
        <v-tabs
          show-arrows
          slider-color="primary darken-1"
          @change="handleTabsChange"
          :height="56"
        >
          <v-tab
            v-for="(route, index) in openedRoutes"
            :key="route.name"
            :exact="route.name === $route.name"
            :to="route.fullPath"
            @contextmenu="handleCtxMenu($event, index)"
          >
            <span class="subtitle-1">{{ route.name }}</span>
            <v-btn icon ripple small text @click.prevent="handleClose(index)">
              <v-icon small>
                close
              </v-icon>
            </v-btn>
          </v-tab>
        </v-tabs>
        <v-divider />
        <v-breadcrumbs v-show="!$vuetify.breakpoint.xsOnly" class="pt-2 pb-2" :items="breadcrumbs" />
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
          left: 0
        }"
        v-scroll.self="e => updateScrollTop(e.target.scrollTop)"
      >
        <div class="fill-height">
          <v-slide-x-transition mode="out-in">
            <keep-alive :include="appMultipleTabs ? openedRoutesComponentNames : []">
              <router-view :key="$route.name" />
            </keep-alive>
          </v-slide-x-transition>
        </div>
      </v-container>
    </div>

    <VFollowMenu ref="followMenu">
      <v-list dense class="py-0">
        <v-list-item
          dense
          v-for="(item, index) in menus"
          :key="index"
          @click.prevent="item.click"
        >
          <v-icon class="mr-1" small :size="16" tag="span">
            {{ item.icon }}
          </v-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </VFollowMenu>
  </div>
</template>

<script>
import _ from 'lodash-es'
import { mapMutations, mapState } from 'vuex'
import { RunTimeMutations } from '@/store/modules'

export default {
  name: 'LayoutRouterView',
  data () {
    return {
      targetIndex: -1,
      menus: [
        {
          title: '关闭选中标签',
          icon: 'keyboard_arrow_down',
          click: () => this.handleClose(this.targetIndex),
        },
        {
          title: '关闭右侧标签',
          icon: 'keyboard_arrow_right',
          click: () => this.handleCloseRight(this.targetIndex),
        },
        {
          title: '关闭左侧标签',
          icon: 'keyboard_arrow_left',
          click: () => this.handleCloseLeft(this.targetIndex),
        },
        {
          title: '关闭其他标签',
          icon: 'keyboard_arrow_up',
          click: () => this.handleCLoseOthers(this.targetIndex),
        },
      ],
    }
  },
  computed: {
    ...mapState('setting', ['appHeaderHeight', 'appMultipleTabs']),
    ...mapState('runTime', ['openedRoutes']),
    breadcrumbs () {
      return this.$route.matched.map(r => ({ text: r.name }))
    },
    openedRoutesComponentNames () {
      const matched = this.openedRoutes.map(r => r.matched).flat()
      const tags = matched.map(e => e.components.default.name)
      return _.uniq(tags)
    },
  },
  methods: {
    ...mapMutations('runTime', {
      setOpenedRoutes: RunTimeMutations.SET_OPENED_ROUTES,
    }),
    handleClose (index) {
      if (this.openedRoutes[index].path === '/home' && this.openedRoutes.length <= 1) {
        return
      }
      if (index <= this.openedRoutes.length - 2) {
        this.$router.push(
          this.openedRoutes[index + 1].fullPath
        )
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
    handleTabsChange (fullPath = '/home') {
      if (fullPath !== this.$route.fullPath) {
        this.$router.push(fullPath)
      }
    },
    updateScrollTop (scrollTop) {
      this.$route.meta.scrollTop = scrollTop
    },
    restoreScrollTop (scrollTop) {
      this.updateScrollTop(scrollTop)
      setTimeout(this.$vuetify.goTo, 900, scrollTop, {
        container: this.$refs['content'],
        offset: this.appHeaderHeight * -1,
      })
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
      { immediate: true }
    )
  },
}
</script>

<style lang="scss">
</style>
