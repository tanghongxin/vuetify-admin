<template>
  <div
    class="t-auto-complete"
    :id="`t-auto-complete${id}`"
  >
    <!-- / Search autocomplete -->
    <v-autocomplete
      :attach="`#t-auto-complete${id}`"
      autofocus
      :cache-items="false"
      clearable
      color="primary"
      flat
      height="30"
      hide-no-data
      :items="searchResults"
      item-text="name"
      :loading="loading"
      :menu-props="{
        attach: `#t-auto-complete${id}`,
        contentClass: 'elevation-0_',
        maxHeight: 520,
        maxWidth: 350,
        transition: 'slide-y-transition',
      }"
      placeholder="输入地址搜索"
      return-object
      solo
      v-model="place"
      @change="select"
      @update:search-input="search"
    >
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title v-text="item.name" />
          <v-list-item-subtitle v-text="item.address" />
          <v-list-item-subtitle v-text="item.phone" />
        </v-list-item-content>
      </template>
    </v-autocomplete>

    <!-- / Marker -->
    <TMarker
      :position="selectedPlacePosition"
    />
    <!-- FIXME: v-if 时第一次无法渲染到地图上 -->
    <!-- v-if="selectedPlacePosition.length" -->
  </div>
</template>

<script>
import _ from 'lodash'
import TMarker from './TMarker'
import TMapService from './TMapService'
import { v4 as uuid } from 'uuid'

export default {
  name: 'TAutocomplete',
  components: {
    TMarker,
  },
  inject: ['map'],
  data: () => ({
    id: uuid(),
    // VAutocomplete loading
    loading: false,
    // 查询出的地点列表
    searchResults: [],
    // 选中的地点
    place: null,
    // 选中的地点坐标
    selectedPlacePosition: [],
    service: new TMapService(),
  }),
  methods: {
    /**
     * 搜索栏搜索
     * @event
     * @param {String} query 搜索内容
     */
    async search (query = '') {
      // 条件为空或条件结果已存在时，不进行搜索
      if (!query || (this.place && this.place.name === query)) {
        return
      }
      try {
        this.loading = true
        const result = await this.service.searchPlaces(query)
        this.searchResults = result.type === 'CITY_LIST' ? [] : result.detail.pois
      } catch (e) {
        this.searchResults = []
        throw e
      } finally {
        this.loading = false
      }
    },
    /**
     * 下拉列表选中一项
     * @event
     * @param {Object} e 选中的地图点
     */
    select (e) {
      if (e) {
        this.selectedPlacePosition = [
          e.latLng.lat,
          e.latLng.lng,
        ]
        const latlngBounds = new qq.maps.LatLngBounds()
        latlngBounds.extend(e.latLng)
        this.map.fitBounds(latlngBounds)
        this.map.panTo(e.latLng)
      }
    },
    /**
     * 鼠标点击地图任一点选中该坐标
     * @event
     */
    click (e) {
      this.selectedPlacePosition = [
        e.latLng.lat,
        e.latLng.lng,
      ]
    },
  },
  created () {
    this.search = _.debounce(this.search, 800)
  },
}
</script>

<style lang="scss">
.t-auto-complete {
  height: 30px;
  left: 75px;
  position: absolute;
  top: 20px;
  width: 350px;
  z-index: 99;
}
</style>
