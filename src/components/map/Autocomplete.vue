<template>
  <v-autocomplete
    class="Autocomplete"
    color="primary"
    cache-items
    flat
    hide-no-data
    :items="resultList"
    item-text="name"
    :loading="loading"
    placeholder="输入地址搜索"
    return-object
    solo
    :search-input.sync="search"
    @change="selectPosition"
  />
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
        this.searchService.search(this.search)
      })
    },
    async setPosition () {
      try {
        this.loading = true
        this.resultList = await this.fetch()
      } catch (e) {
        this.resultList = []
        throw e
      } finally {
        this.loading = false
      }
    },
    selectPosition (e) {
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
  z-index: 999;
  width: 280px;
  height: 30px;
}
</style>