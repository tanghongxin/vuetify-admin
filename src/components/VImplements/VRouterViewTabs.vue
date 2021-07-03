<template>
  <div class="fill-height">
    <!-- / Tab -->
    <v-tabs
      show-arrows
      slider-color="primary darken-1"
      @change="handleTabsChange"
      :height="tabHeight"
    >
      <v-tab
        v-for="(route, index) in routeList"
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
    <v-divider />

    <!-- / Content -->
    <v-container
      fluid
      ref="scroll"
      id="v-router-view-content"
      class="overflow-x-hidden overflow-y-auto py-1 px-1"
      v-scroll:#v-router-view-content="handleScroll"
      :style="{ height: `calc(100% - ${tabHeight}px)` }"
    >
      <VRouterBreadCrumbs v-show="!$vuetify.breakpoint.xsOnly" class="pt-2 pb-2" :style="{ height: breadCrumbsHeight }" />
      <div :style="{ height: `calc(100% - ${breadCrumbsHeight}px)` }">
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
          v-for="(item, index) in menuList"
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
import VFollowMenu from './VFollowMenu.vue'
import VRouterBreadCrumbs from './VRouterBreadCrumbs.vue'
import _ from 'lodash-es'
import { mapState } from 'vuex'

export default {
  name:'VRouterViewTabs',
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
    routeList: [],
  }),
  computed: {
    ...mapState('setting', ['appHeaderHeight']),
    menuList () {
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
      const matched = this.routeList.map(r => r.matched).flat()
      const tags = matched.map(e => e.components.default.name)
      return _.uniq(tags)
    },
  },
  watch: {
    '$route': {
      immediate: true,
      async handler () {
        const index = this.routeList.findIndex(route => route.name === this.$route.name)
        if (index === -1) {
          this.routeList.push(this.$route)
          return
        }
        
        const { scrollTop } = this.routeList[index].meta
        this.routeList.splice(index, 1, this.$route)
        if (scrollTop) {
          // wait for page init
          await this.$nextTick()
          setTimeout(() => {
            // FIXME: scrollTop value is wrong after resizing
            this.$vuetify.goTo(scrollTop, {
              container: this.$refs['scroll'],
              offset: this.appHeaderHeight * -1,
            })
          }, 900)
        }
      },
    },
  },
  methods: {
    handleClose (index) {
      if (this.routeList[index].path === '/home' && this.routeList.length <= 1) {
        return
      }
      if (index <= this.routeList.length - 2) {
        this.$router.push(
          this.routeList[index + 1].fullPath
        )
      }
      this.routeList.splice(index, 1)
    },
    handleCloseRight (index) {
      this.routeList = this.routeList.slice(0, index + 1)
    },
    handleCloseLeft (index) {
      this.routeList = this.routeList.slice(index)
    },
    handleCLoseOthers (index) {
      this.routeList = [this.routeList[index]]
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
  },
  beforeDestroy () {
    this.routeList = []
  },
}
</script>

<style lang="scss">
#v-router-view-content {
  position: relative;
}

.slide-x-transition-enter-active,
.slide-x-transition-leave-active {
  overflow: hidden;
}
</style>
