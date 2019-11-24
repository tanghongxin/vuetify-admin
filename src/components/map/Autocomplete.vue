<template>
  <div>
    <!-- / Search autocomplete -->
    <v-autocomplete
      :cache-items="false"
      class="Autocomplete"
      clearable
      color="primary"
      flat
      height="30"
      hide-no-data
      :items="positionList"
      item-text="name"
      :loading="loading"
      :no-data-text="loading ? '加载中' : '无匹配数据'"
      :menu-props="{
        maxHeight: 520,
        maxWidth: 350,
        transition: 'slide-y-transition',
      }"
      placeholder="输入地址搜索"
      return-object
      solo
      :search-input.sync="search"
      v-model="value"
      @change="selectPosition"
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
      v-if="selectedPosition"
      :map="map"
      :position="selectedPosition"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import TMarker from './Marker'

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
    value: null,
    positionList: [],
    selectedPosition: null,
    search: '',
    loading: false,
  }),
  watch: {
    search: _.debounce(function (v) {
      if (this.value && v) {
        v !== this.value.name && this.setPosition()
      } else {
        this.setPosition()
      }
    }, 300),
  },
  methods: {
    fetch () {
      return new Promise((resolve, reject) => {
        this.searchService = new qq.maps.SearchService({
          complete : results => results.type === 'CITY_LIST' ? reject() : resolve(results.detail.pois),
          error: reject,
        })
        // 每页条数
        this.searchService.setPageCapacity(15)
        this.searchService.search(this.search)
      })
    },
    async setPosition () {
      try {
        this.loading = true
        this.positionList = await this.fetch()
      } catch (e) {
        this.positionList = []
        throw e
      } finally {
        this.loading = false
      }
    },
    selectPosition (e) {
      if (e) {
        this.selectedPosition = [
          e.latLng.lat,
          e.latLng.lng,
        ]
        const latlngBounds = new qq.maps.LatLngBounds()
        latlngBounds.extend(e.latLng)
        this.map.fitBounds(latlngBounds)
        this.map.panTo(e.latLng)
      }
    },
    clickPosition (e) {
      this.selectedPosition = [
        e.latLng.lat,
        e.latLng.lng,
      ]
    },
  },
  mounted () {
    this.listener = qq.maps.event.addListener(this.map, 'click', this.clickPosition)
  },
  beforeDestroy () {
    qq.maps.event.removeListener(this.listener)
  },
}
</script>

<style lang="scss">
.Autocomplete {
  position: relative;
  top: 20px;
  left: 75px;
  z-index: 99;
  width: 350px;
  height: 30px;
}
</style>