<template>
  <div
    class="t-search"
    :id="`t-search${state.id}`"
  >
    <!-- / Search autocomplete -->
    <v-autocomplete
      :attach="`#t-search${state.id}`"
      autofocus
      :cache-items="false"
      clearable
      color="primary"
      flat
      height="30"
      hide-no-data
      :items="state.searchResults"
      item-text="name"
      :loading="state.loading"
      :menu-props="{
        attach: `#t-search${state.id}`,
        contentClass: 'elevation-0_',
        maxHeight: 520,
        maxWidth: 350,
        transition: 'slide-y-transition',
      }"
      placeholder="输入地址搜索"
      return-object
      solo
      v-model="state.place"
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
      :position="position"
    />
    <!-- FIXME: v-if 时第一次无法渲染到地图上 -->
    <!-- v-if="position.length" -->
  </div>
</template>

<script>
import _ from 'lodash'
import TMarker from './TMarker.vue'
import TMapService from './TMapService'
import { v4 as uuid } from 'uuid'
import { computed, defineComponent, reactive } from '@vue/composition-api'
import { useMap } from './composable'

export default defineComponent({
  name: 'TSearch',
  components: {
    TMarker,
  },
  setup () {
    const state = reactive({
      id: uuid(),
      loading: false,
      searchResults: [],
      place: null,
    })
    const position = computed(() => {
      if (!state.place) return []
      return [
        state.place.latLng.lat,
        state.place.latLng.lng,
      ]
    })
    const service = new TMapService()
    const map = useMap()

    const search = _.debounce(async(query) => {
      if (!query) return
      if (state.place && state.place === query) return
      try {
        state.loading = true
        const searchResults = await service.searchPlaces(query)
        state.searchResults = searchResults.type === 'CITY_LIST' ? [] : searchResults.detail.pois
      } finally {
        state.loading = false
      }
    }, 200)

    const select = (e) => {
      if (!e) return
      const latLngBounds = new qq.maps.LatLngBounds()
      latLngBounds.extend(e.latLng)
      map.fitBounds(latLngBounds)
      map.panTo(e.latLng)
    }

    return { state, search, select, position }
  },
})
</script>

<style lang="scss">
.t-search {
  height: 30px;
  left: 75px;
  position: absolute;
  top: 20px;
  width: 350px;
  z-index: 99;
}
</style>
