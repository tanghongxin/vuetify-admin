<template>
  <div
    class="Autocomplete"
    :id="`Autocomplete${_uid}`"
  >
    <!-- / Search autocomplete -->
    <v-autocomplete
      :attach="`#Autocomplete${_uid}`"
      autofocus
      :cache-items="false"
      clearable
      color="primary"
      flat
      height="30"
      hide-no-data
      :items="places"
      item-text="name"
      :loading="loading"
      :menu-props="{
        attach: `#Autocomplete${_uid}`,
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
      :map="map"
      :position="selectedPlacePosition"
    />
    <!-- FIXME: v-if 时第一次无法渲染到地图上 -->
    <!-- v-if="selectedPlacePosition.length" -->
  </div>
</template>

<script>
import _ from 'lodash'
import TMarker from './Marker'
import { searchPlaces } from './service'

export default {
  name: 'Autocomplete',
  components: {
    TMarker,
  },
  props: {
    map: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    // VAutocomplete loading
    loading: false,
    // 查询出的地点列表
    places: [],
    // 选中的地点
    place: null,
    // 选中的地点坐标
    selectedPlacePosition: [],
  }),
  methods: {
    /**
     * 搜索栏搜索
     * @event
     * @param {String} query 搜索内容
     */
    search: _.debounce(async function (query = '') {
      // 条件为空或条件结果已存在时，不进行搜索
      if (!query || (this.place && this.place.name === query)) {
        return
      }
      try {
        this.loading = true
        const result = await searchPlaces(query)
        this.places = result.type === 'CITY_LIST' ? [] : result.detail.pois
      } catch (e) {
        this.places = []
        throw e
      } finally {
        this.loading = false
      }
    }, 800),
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
  mounted () {
    // TODO: 数据测试与需求确认
    // this.listener = qq.maps.event.addListener(this.map, 'click', this.click)
  },
  beforeDestroy () {
    // TODO: 数据测试与需求确认
    // qq.maps.event.removeListener(this.listener)
  },
}
</script>

<style lang="scss">
.Autocomplete {
  position: absolute;
  top: 20px;
  left: 75px;
  z-index: 99;
  width: 350px;
  height: 30px;
}
</style>