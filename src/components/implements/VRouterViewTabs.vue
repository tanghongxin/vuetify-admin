<template>
  <div class="VRouterViewTabs">
    <div :style="{ height }">
      <v-tabs
        show-arrows
        :slider-color="sliderColor"
        @change="tabChange"
      >
        <v-tab
          v-for="(route, index) in routeList"
          :key="index"
          :exact="route.name === $route.name"
          :to="route.fullPath"
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
      </v-tabs>
    </div>

    <div
      class="VRouterViewTabs__router-view"
      :style="{ height: `calc(100vh - ${height}px - ${top}px)` }"
    >
      <v-fade-transition mode="out-in">
        <keep-alive>
          <router-view
            ref="routerView"
            :key="$route.name"
            @hook:activated="routerViewActiviated"
          />
        </keep-alive>
      </v-fade-transition>
    </div>

    <VFollowMenu
      ref="followMenu"
    >
      <v-list
        dense
        class="VRouterViewTabs__menu-list"
      >
        <v-list-item
          dense
          class="VRouterViewTabs__menu-list-item"
          v-for="(item, index) in menuList"
          :key="index"
          @click.prevent="item.click"
        >
          <v-icon
            class="VRouterViewTabs__menu-list-icon"
            small
            :size="16"
            tag="span"
            v-text="item.icon"
          />
          <v-list-item-title v-text="item.title" />
        </v-list-item>
      </v-list>
    </VFollowMenu>
  </div>
</template>

<script>
import VFollowMenu from '~~/implements/VFollowMenu'

export default {
  name:'VRouterViewTabs',
  components: {
    VFollowMenu,
  },
  props: {
    sliderColor: {
      type: String,
      default: 'primary',
    },
    top: {
      type: Number,
      default: 60,
    },
    height: {
      type: Number,
      default: 64,
    },
  },
  data: () => ({
    targetIndex: -1,
    routeList: [],
    vmList: [],
  }),
  computed: {
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
          click: () => this.closeRightTab(this.targetIndex),
        },
        {
          title: '关闭左侧标签',
          icon: 'keyboard_arrow_left',
          click: () => this.closeLeftTab(this.targetIndex),
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
    showContextMenu (e, index) {
      this.targetIndex = index
      this.$refs['followMenu'].show(e)
    },
    tabChange (fullPath) {
      this.$router.push(fullPath || '/home').catch(() => {})
    },
    routerViewActiviated () {
      const index = this.routeList.findIndex(route => route.name === this.$route.name)
      if (index !== -1) {
        this.routeList.splice(index, 1, this.$route)
        this.vmList.splice(index, 1, this.$refs['routerView'])
      } else {
        this.routeList.push(this.$route)
        this.vmList.push(this.$refs['routerView'])
      }
    },
    removeCache (index) {
      const vm = this.vmList[index]
      const key = vm.$vnode.key
      const { cache, keys } = vm.$vnode.parent.componentInstance
      if (keys.length && cache[key]) {
        const index = keys.indexOf(key)
        keys.splice(index, 1)
        delete cache[key]
      }
      vm.$destroy()
      this.vmList.splice(index, 1)
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
      this.removeCache(index)
    },
    closeRightTab (index) {
      this.routeList = this.routeList.slice(0, index + 1)
      for (let i = this.vmList.length - 1; i > index; i--) {
        this.removeCache(i)
      }
    },
    closeLeftTab (index) {
      this.routeList = this.routeList.slice(index)
      for (let i = index - 1; i >= 0; i--) {
        this.removeCache(i)
      }
    },
    closeOtherTabs (index) {
      this.closeRightTab(index)
      this.closeLeftTab(index)
    },
    clear () {
      for (let i = this.vmList.length - 1; i > 0; i--) {
        this.removeCache(i)
      }
    },
  },
  beforeDestroy () {
    this.clear()
  },
}
</script>

<style lang="scss">
.VRouterViewTabs {
  height: 100%;
  width: 100%;

  &__router-view {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &__menu-list {
    padding-top: 0;
    padding-bottom: 0;

    &-item {
      font-size: 16px;
    }

    &-icon {
      margin-right: 4px;
    }
  }
}
</style>
