<template>
  <DataTable
    :headers="headers"
    :items="items"
    :loading="loading"
    :search="search"
    v-model="options"
    @change="fetch"
  >
    <template v-slot:search>
      <v-container class="py-0">
        <v-row>
          <v-col
            xs="6"
            sm="4"
            md="2"
          >
            <v-text-field
              placeholder="门店名称"
              v-model="search.name"
              clearable
            />
          </v-col>
          <v-col
            xs="6"
            sm="4"
            md="2"
          >
            <v-text-field
              placeholder="开业年份"
              v-model="search.date"
              clearable
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </DataTable>
</template>
<script>
import DataTable from '~~/table/DataTable'
import { headers, items } from './mock'

export default {
  name: 'ShopList',
  components: {
    DataTable,
  },
  data: () => ({
    headers,
    items: [],
    loading: false,
    options: {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
    },
    search: {},
  }),
  methods: {
    fetch (query) {
      this.loading = true
      console.log(query)
      this.items = items
      // TODO: 刷新页码
      this.loading = false
    },
  },
}
</script>

<style lang="scss">

</style>
