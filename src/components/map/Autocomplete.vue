<template>
  <div>
    <!-- / Search autocomplete -->
    <v-autocomplete
      :cache-items="true"
      class="Autocomplete"
      clearable
      color="primary"
      flat
      height="30"
      hide-no-data
      :items="positionList"
      item-text="name"
      :loading="loading"
      :menu-props="{
        maxHeight: 520,
        maxWidth: 350,
        transition: 'slide-y-transition',
      }"
      placeholder="输入地址搜索"
      return-object
      solo
      :search-input.sync="search"
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

    <!-- / Infowindow -->
    <MarkerInfoWindow
      v-if="selectedPosition"
      :map="map"
      :position="[
        selectedPosition.latLng.lat,
        selectedPosition.latLng.lng,
      ]"
    >
      <template v-slot:content>
        <v-list
          color="rgb(250, 250, 250)"
          class="pa-0"
          max-width="350"
          min-width="200"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-text="selectedPosition.name" />
              <v-list-item-subtitle v-text="selectedPosition.address" />
              <v-list-item-subtitle v-text="selectedPosition.phone" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </MarkerInfoWindow>
  </div>
</template>

<script>
import _ from 'lodash'
import MarkerInfoWindow from './MarkerInfoWindow'

export default {
  name: 'Autocomplete',
  components: {
    MarkerInfoWindow,
  },
  props: {
    map: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    positionList: [],
    selectedPosition: null,
    search: '',
    loading: false,
  }),
  watch: {
    // TODO: animation shake
    search: _.debounce(function (v) {
      v && this.setPosition()
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
        this.selectedPosition = e
        const latlngBounds = new qq.maps.LatLngBounds()
        latlngBounds.extend(e.latLng)
        this.map.fitBounds(latlngBounds)
        this.map.panTo(e.latLng)
      }
    },
    clickPosition (e) {
      console.log(e)
    },
  },
  mounted () {
    qq.maps.event.addListener(this.map, 'click', this.clickPosition)
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