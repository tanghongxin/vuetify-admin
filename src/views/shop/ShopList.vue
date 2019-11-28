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
      <v-container>
        <v-row>
          <v-col
            class="py-0"
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
            class="py-0"
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
            class="py-0"
            xs="6"
            sm="4"
            md="2"
          >
            <v-text-field
              placeholder="省"
              v-model="search.province"
              clearable
            />
          </v-col>
          <v-col
            class="py-0"
            xs="6"
            sm="4"
            md="2"
          >
            <v-text-field
              placeholder="市"
              v-model="search.city"
              clearable
            />
          </v-col>
          <v-col
            class="py-0"
            xs="6"
            sm="4"
            md="2"
          >
            <v-text-field
              placeholder="状态"
              v-model="search.status"
              clearable
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-slot:actions>
      <v-btn
        class="mr-2"
        depressed 
        tile 
        @click="handleAddShop"
      >
        新增门店
      </v-btn>
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
    search: {
      city: '',
      date: '',
      name: '',
      status: '',
      province: '',
    },
  }),
  methods: {
    fetch (query) {
      this.loading = true
      console.log(query)
      this.items = items
      // TODO: 刷新页码
      this.loading = false
    },
    handleAddShop () {},
  },
}
</script>

<style lang="scss">

</style>
