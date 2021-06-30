<template>
  <DataTable
    :headers="headers"
    item-key="name"
    :items="items"
    :loading="loading"
    :options="options"
    @update:options="handleTableChange"
  >
    <template v-slot:search>
      <v-form ref="form">
        <v-row class="px-4">
          <v-col
            class="py-0"
            cols="12"
            sm="6"
            md="3"
            lg="2"
          >
            <v-text-field
              placeholder="门店名称"
              v-model="query.name"
              clearable
            />
          </v-col>
          <v-col
            class="py-0"
            cols="12"
            sm="6"
            md="3"
            lg="2"
          >
            <v-text-field
              placeholder="省"
              v-model="query.province"
              clearable
            />
          </v-col>
          <v-col
            class="py-0"
            cols="12"
            sm="6"
            md="3"
            lg="2"
          >
            <v-text-field
              placeholder="市"
              v-model="query.city"
              clearable
            />
          </v-col>
          <v-col
            class="py-0"
            cols="12"
            sm="6"
            md="3"
            lg="2"
          >
            <v-text-field
              placeholder="状态"
              v-model="query.status"
              clearable
            />
          </v-col>
          <v-col
            class="py-0"
            cols="12"
            sm="6"
            md="3"
            lg="2"
          >
            <v-text-field
              placeholder="开业年份"
              v-model="query.name"
              clearable
            />
          </v-col>
        </v-row>
      </v-form>
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
    <template v-slot:item.name="{ item }">
      <v-chip
        dark
      >
        {{ item.name }}
      </v-chip>
    </template>
  </DataTable>
</template>

<script>
import DataTable from '@/components/table/DataTable'
import { getShopList } from '@/api/shop'
export default {
  name: 'ShopList',
  components: {
    DataTable,
  },
  data: () => ({
    items: [],
    loading: false,
    options: {
      page: 1,
      pageCount: 1,
      itemsPerPage: 10,
    },
    query: {
      city: '',
      date: '',
      name: '',
      status: '',
      province: '',
    },
  }),
  computed: {
    headers () {
      return [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
        { text: '', value: 'data-table-expand' },
      ]
    },
  },
  methods: {
    async fetch () {
      try {
        this.loading = true
        const { data } = await getShopList({ ...this.query, ...this.options })
        this.items = data.items
        this.options.total = data.total
        this.options.pageCount = data.pageCount
      } catch (e) {
        this.items = []
        this.options.total = 0
        this.options.pageCount = 1
        throw e
      } finally {
        this.loading = false
      }
    },
    handleTableChange (options) {
      this.options = options
      this.$refs['form'].validate() && this.fetch()
    },
    handleAddShop () {},
  },
}
</script>

<style lang="scss">

</style>
