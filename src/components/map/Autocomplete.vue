<template>
  <v-autocomplete
    class="Autocomplete"
    color="primary"
    :cache-items="false"
    flat
    height="30"
    hide-no-data
    :items="resultList"
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
    <!--  -->
    <template v-slot:item="{ item }">
      <v-list-item-content>
        <v-list-item-title v-text="item.name" />
        <v-list-item-subtitle v-text="item.address" />
        <v-list-item-subtitle v-text="item.phone" />
      </v-list-item-content>
      <!-- {{ item.name + '  ' + item.address }} -->
    </template>
  </v-autocomplete>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Autocomplete',
  props: {
    map: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    resultList: [],
    search: '',
    loading: false,
  }),
  watch: {
    // TODO: loading shake
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
        this.resultList = await this.fetch()
      } catch (e) {
        // this.resultList = []
        throw e
      } finally {
        this.loading = false
      }
    },
    selectPosition (e) {
      console.log(e)
      const latlngBounds = new qq.maps.LatLngBounds()
      // this.resultList.forEach(poi => {
      //   latlngBounds.extend(poi.latLng)
      //   let marker = new qq.maps.Marker({
      //     map: this.map,
      //     position: poi.latLng,
      //   })
      //   marker.setTitle(poi.name)
      // })
      // this.map.fitBounds(latlngBounds)
      latlngBounds.extend(e.latLng)
      this.map.fitBounds(latlngBounds)
      this.map.panTo(e.latLng)
    },
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