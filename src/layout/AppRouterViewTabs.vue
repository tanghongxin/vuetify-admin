<template>
  <div class="fill-height">
    <!-- / Tab -->
    <v-tabs
      v-if="appMultipleTabs"
      show-arrows
      slider-color="primary darken-1"
      @change="handleTabsChange"
      :height="tabHeight"
    >
      <v-tab
        v-for="(route, index) in openedRoutes"
        :key="index"
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

    <!-- / Divider -->
    <v-divider v-if="appMultipleTabs" />

    <!-- / Content -->
    <v-container
      fluid
      ref="content"
      id="app-router-view-tabs-content"
      class="overflow-x-hidden overflow-y-auto py-1 px-1"
      v-scroll:#v-router-view-tabs-container="handleScroll"
      :style="{ height: routerViewHeight }"
    >
      <VRouterBreadCrumbs v-show="appMultipleTabs && !$vuetify.breakpoint.xsOnly" class="pt-2 pb-2" :style="{ height: breadCrumbsHeight }" />
      <div :style="{ height:routerViewHeight }">
        <v-slide-x-transition leave-absolute mode="out-in">
          <keep-alive :include="include">
            <router-view :key="$route.name" />
          </keep-alive>
        </v-slide-x-transition>
      </div>
    </v-container>

    <!-- / ContextMenu -->
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
import VFollowMenu from '@/components/VImplements/VFollowMenu.vue'
import VRouterBreadCrumbs from '@/components/VImplements/VRouterBreadCrumbs.vue'
import _ from 'lodash-es'
import { mapMutations, mapState } from 'vuex'
import { RunTimeMutations } from '@/store/modules'

export default {
  name: 'AppRouterViewTabs',
  components: {
    VFollowMenu,
    VRouterBreadCrumbs,
  },
  props: {
    tabHeight: {
      type: Number,
      default: 56,
    },
    breadCrumbsHeight: {
      type: Number,
      default: 57,
    },
  },
  data: () => ({
    targetIndex: -1,
  }),
  computed: {
    ...mapState('setting', ['appHeaderHeight', 'appMultipleTabs']),
    ...mapState('runTime', ['openedRoutes']),
    menus () {
      return [
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
      ]
    },
    include () {
      if (!this.appMultipleTabs) {
        return []
      }
      const matched = this.openedRoutes.map(r => r.matched).flat()
      const tags = matched.map(e => e.components.default.name)
      return _.uniq(tags)
    },
    routerViewHeight () {
      return `calc(100% - ${this.appMultipleTabs ? this.tabHeight : 0}px)`
    },
  },
  watch: {
    'appMultipleTabs': {
      // redirect from 404 will trigger created
      immediate: false,
      handler () {
        if (this.appMultipleTabs) {
          this.setOpenedRoutes([this.$route])
        }
      },
    },
    '$route': {
      immediate: true,
      handler () {
        if (!this.appMultipleTabs) {
          return
        }
        
        const openedRoutes = this.openedRoutes.slice()
        const index = openedRoutes.findIndex(route => route.name === this.$route.name)
        if (index === -1) {
          openedRoutes.push(this.$route)
        } else {
          const { scrollTop } = openedRoutes[index].meta
          if (scrollTop) {
            this.$route.meta.scrollTop = scrollTop
            this.restoreScroll()
          }
          openedRoutes.splice(index, 1, this.$route)
        }
        console.log(1)
        this.setOpenedRoutes(openedRoutes)
      },
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
      const openedRoutes = this.openedRoutes.slice()
      openedRoutes.splice(index, 1)
      this.setOpenedRoutes(openedRoutes)
    },
    handleCloseRight (index) {
      this.setOpenedRoutes(this.openedRoutes.slice(0, index + 1))
    },
    handleCloseLeft (index) {
      this.setOpenedRoutes(this.openedRoutes.slice(index))
    },
    handleCLoseOthers (index) {
      this.setOpenedRoutes([this.openedRoutes[index]])
    },
    handleCtxMenu (e, index) {
      this.targetIndex = index
      this.$refs['followMenu'].show(e)
    },
    handleTabsChange (fullPath = '/home') {
      this.$router.push(fullPath).catch(() => {})
    },
    handleScroll (e) {
      this.$route.meta.scrollTop = e.target.scrollTop
    },
    async restoreScroll () {
      // wait for page init
      await this.$nextTick()
      // FIXME: scrollTop value is wrong after resizing
      setTimeout(this.$vuetify.goTo, 900, this.$route.meta.scrollTop, {
        container: this.$refs['content'],
        offset: this.appHeaderHeight * -1,
      })
    },
  },
}
</script>

<style lang="scss">
#app-router-view-tabs-content {
  position: relative;
}

.slide-x-transition-enter-active,
.slide-x-transition-leave-active {
  overflow: hidden;
}
</style>
