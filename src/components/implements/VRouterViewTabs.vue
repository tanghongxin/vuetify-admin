<template>
  <div class="VRouterViewTabs fill-height">
    <!-- / Tab -->
    <template>
      <v-tabs
        show-arrows
        slider-color="primary darken-1"
        @change="tabChange"
        :height="tabHeight"
      >
        <v-tooltip
          top
          v-for="(route, index) in routeList"
          :key="index"
        >
          <template v-slot:activator="{ on }">
            <v-tab
              :exact="route.name === $route.name"
              :to="route.fullPath"
              v-on="on"
              @contextmenu="showContextMenu($event, index)"
            >
              {{ route.name }}
              <v-btn
                class="VRouterViewTabs--tab-btn_close"
                icon
                small
                text
                @click.prevent="closeTab(index)"
              >
                <v-icon
                  class="VRouterViewTabs--tab-icon_close"
                  small
                  v-text="'close'"
                />
              </v-btn>
            </v-tab>
          </template>
          <v-breadcrumbs
            style="padding: 0;"
            :items="route.matched.map(route => ({ text: route.name }))"
          />
        </v-tooltip>
      </v-tabs>
    </template>

    <!-- / Divider -->
    <v-divider />

    <!-- / Content -->
    <template>
      <v-container
        fluid
        ref="scroll"
        id="VRouterViewTabs__router-view"
        class="overflow-x-hidden overflow-y-auto"
        v-scroll:#VRouterViewTabs__router-view="subscribeScroll"
        :style="{ height: `calc(100% - ${tabHeight}px)` }"
      >
        <VRouterBreadCrumbs
          class="py-1"
          :style="{ height: breadCrumbsHeight }"
        />
        <div :style="{ height: `calc(100% - ${breadCrumbsHeight}px)` }">
          <v-slide-x-transition mode="out-in">
            <keep-alive>
              <router-view
                ref="routerView"
                :key="$route.name"
                @hook:activated="routerViewActivated"
              />
            </keep-alive>
          </v-slide-x-transition>
        </div>
      </v-container>
    </template>

    <!-- / ContextMenu -->
    <template>
      <VFollowMenu
        ref="followMenu"
      >
        <v-list
          dense
          class=" py-0"
        >
          <v-list-item
            dense
            v-for="(item, index) in menuList"
            :key="index"
            @click.prevent="item.click"
          >
            <v-icon
              class=" mr-1"
              small
              :size="16"
              tag="span"
              v-text="item.icon"
            />
            <v-list-item-title v-text="item.title" />
          </v-list-item>
        </v-list>
      </VFollowMenu>
    </template>
  </div>
</template>

<script>
import VFollowMenu from './VFollowMenu'
import VRouterBreadCrumbs from './VRouterBreadCrumbs'
import { removeKeepAliveCache } from '@/utils/vue'
import _ from 'lodash'
import Timeout from 'await-timeout'

const ANIMATION_TIME = 300

export default {
  name:'VRouterViewTabs',
  components: {
    VFollowMenu,
    VRouterBreadCrumbs,
  },
  props: {
    tabHeight: {
      type: Number,
      default: 48,
    },
    breadCrumbsHeight: {
      type: Number,
      default: 57,
    },
  },
  data: () => ({
    targetIndex: -1,
    routeList: [],
    vmList: [],
  }),
  computed: {
    appHeaderHeight: {
      get () {
        return this.$store.state.setting.appHeaderHeight
      },
    },
    menuList () {
      return [
        {
          title: '关闭选中标签',
          icon: 'keyboard_arrow_down',
          click: () => this.closeTab(this.targetIndex),
        },
        {
          title: '关闭右侧标签',
          icon: 'keyboard_arrow_right',
          click: () => this.closeRightTabs(this.targetIndex),
        },
        {
          title: '关闭左侧标签',
          icon: 'keyboard_arrow_left',
          click: () => this.closeLeftTabs(this.targetIndex),
        },
        {
          title: '关闭其他标签',
          icon: 'keyboard_arrow_up',
          click: () => this.closeOtherTabs(this.targetIndex),
        },
      ]
    },
  },
  methods: {
    // FIMXE: debounce 时间过长，在页面快速切换时无法记忆
    subscribeScroll: _.debounce(function (e) {
      this.$route.meta.scrollTop = e.target.scrollTop
    }, 50),
    async scroll (scrollTop) {
      if (scrollTop) {
        this.$route.meta.scrollTop = scrollTop
        await this.$nextTick()
        await Timeout.set(ANIMATION_TIME)
        this.$vuetify.goTo(scrollTop, {
          container: this.$refs['scroll'],
          offset: this.appHeaderHeight * -1,
        })
      }
    },
    showContextMenu (e, index) {
      this.targetIndex = index
      this.$refs['followMenu'].show(e)
    },
    tabChange (fullPath) {
      this.$router.push(fullPath || '/home').catch(() => {})
    },
    routerViewActivated () {
      const index = this.routeList.findIndex(route => route.name === this.$route.name)
      if (index !== -1) {
        this.scroll(this.routeList[index].meta.scrollTop)
        this.routeList.splice(index, 1, this.$route)
        this.vmList.splice(index, 1, this.$refs['routerView'])
      } else {
        this.routeList.push(this.$route)
        this.vmList.push(this.$refs['routerView'])
      }
    },
    clearCache (index) {
      const vm = this.vmList[index]
      removeKeepAliveCache(vm)
      this.vmList.splice(index, 1)
    },
    clearAllCaches () {
      for (let i = this.vmList.length - 1; i > 0; i--) {
        this.clearCache(i)
      }
    },
    closeTab (index) {
      if (this.routeList[index].path === '/home' && this.routeList.length <= 1) {
        return
      }
      if (index <= this.routeList.length - 2) {
        this.$router.push(
          this.routeList[index + 1].fullPath
        )
      }
      this.routeList.splice(index, 1)
      this.clearCache(index)
    },
    closeRightTabs (index) {
      this.routeList = this.routeList.slice(0, index + 1)
      for (let i = this.vmList.length - 1; i > index; i--) {
        this.clearCache(i)
      }
    },
    closeLeftTabs (index) {
      this.routeList = this.routeList.slice(index)
      for (let i = index - 1; i >= 0; i--) {
        this.clearCache(i)
      }
    },
    closeOtherTabs (index) {
      this.closeRightTabs(index)
      this.closeLeftTabs(index)
    },
  },
  beforeDestroy () {
    this.clearAllCaches()
  },
}
</script>

<style lang="scss">
#VRouterViewTabs__router-view {
  position: relative;
}
</style>
