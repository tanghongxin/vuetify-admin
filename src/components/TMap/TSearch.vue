<template>
  <div class="t-search" :id="`${state.id}`">
    <v-autocomplete
      :attach="`#${state.id}`"
      variant="solo"
      autofocus
      clearable
      color="primary"
      flat
      height="30"
      :items="state.searchResults"
      item-title="name"
      :filter-keys="['name']"
      hide-no-data
      return-object
      placeholder="输入地址搜索"
      :loading="state.loading"
      :menu-props="{
        attach: `#${state.id}`,
        contentClass: 'elevation-0',
        maxHeight: 520,
        maxWidth: 350,
        transition: 'slide-y-transition',
      }"
      @update:search="search"
      @update:model-value="select"
    >
      <template #item="{ props, item }">
        <v-list-item
          v-bind="props"
          :title="item.raw.name"
          :subtitle="item.raw.address"
        />
      </template>
    </v-autocomplete>

    <TMarker v-if="position.length" :position="position" />
  </div>
</template>

<script>
import _ from 'lodash-es'
import TMarker from './TMarker.vue'
import { computed, defineComponent, reactive } from 'vue'
import { useInject, useService } from './composable'

export default defineComponent({
  name: 'TSearch',
  components: {
    TMarker,
  },
  setup () {
    const state = reactive({
      id: `t-search${Date.now()}`,
      loading: false,
      searchResults: [],
      search: null,
    })
    const position = computed(() => {
      if (!state.place) return []
      return [
        state.place.latLng.lat,
        state.place.latLng.lng,
      ]
    })
    const service = useService()
    const map = useInject()

    const search = _.debounce(async (query) => {
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
  top: 40px;
  width: 350px;
  z-index: 2;
}
</style>
