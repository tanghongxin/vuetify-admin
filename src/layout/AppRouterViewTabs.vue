<template>
  <div class="fill-height d-flex flex-column align-center justify-center v-router-view-tabs">
    <transition name="v-router-view-tabs_header">
      <div class="v-router-view-tabs_header fill-width" v-if="appMultipleTabs">
        <v-tabs
          show-arrows
          slider-color="primary darken-1"
          @change="handleTabsChange"
          :height="56"
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

        <v-divider />

        <VRouterBreadCrumbs v-show="appMultipleTabs && !$vuetify.breakpoint.xsOnly" class="pt-2 pb-2" :style="{ height: '57px' }" />
      </div>
    </transition>

    <v-container
      fluid
      ref="content"
      id="v-router-view-tabs__content"
      class="overflow-x-hidden overflow-y-auto py-1 px-1"
      v-scroll:#v-router-view-tabs__content="handleScroll"
      :style="{ flex: '1' }"
    >
      <div :style="{ height: '100%' }">
        <v-slide-x-transition leave-absolute mode="out-in">
          <keep-alive :include="include">
            <router-view :key="$route.name" />
          </keep-alive>
        </v-slide-x-transition>
      </div>
    </v-container>

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
  name: 'AppRouterViewTabs',
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
      async handler () {
        if (!this.appMultipleTabs) {
          return
        }
        
        let scrollTop
        const openedRoutes = this.openedRoutes.slice()
        const index = openedRoutes.findIndex(route => route.name === this.$route.name)
        if (index === -1) {
          openedRoutes.push(this.$route)
        } else {
          scrollTop = openedRoutes[index].meta.scrollTop
          openedRoutes.splice(index, 1, this.$route)
        }
        this.setOpenedRoutes(openedRoutes)
        if (scrollTop) {
          await this.$nextTick()
          this.restoreScroll(scrollTop)
        }
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
    restoreScroll (scrollTop) {
      this.$route.meta.scrollTop = scrollTop
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
.v-router-view-tabs {
  &_header {
    height: 114px;

    &-enter,
    &-leave-to {
      height: 0;
    }

    &-enter-to,
    &-leave {
      height: 114px;
    }

    &-enter-active,
    &-leave-active {
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
  }
}
</style>
