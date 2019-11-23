<template>
  <div class="DateTable">
    <!-- / Search -->
    <v-toolbar
      flat
      color="white"
    >
      <slot name="search" />
    </v-toolbar>

    <!-- / Table -->
    <v-data-table
      :expanded.sync="expanded"
      class="elevation-0"
      fixed-header
      :headers="headers"
      hide-default-footer
      :items="desserts"
      item-key="name"
      show-expand
      :page.sync="page"
      :items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      @update:options="handleTableChange"
    >
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length">
          Peek-a-boo!
        </td>
      </template>
    </v-data-table>

    <!-- / Pagination -->
    <div class="d-flex flex-row pa-2">
      <v-spacer />
      <v-select
        style="flex: 0"
        class="px-4"
        flat
        :items="[10, 15, 20, 50]"
        v-model="itemsPerPage"
      />
      <v-pagination
        class="elevation-0"
        v-model="page"
        :length="pageCount"
        :total-visible="7"
        next-icon="keyboard_arrow_right"
        prev-icon="keyboard_arrow_left"
      />
    </div>
  </div>
</template>

<script>
import { headers, desserts } from './mock'

export default {
  name: 'DateTable',
  data: () => ({
    expanded: [],
    headers: headers,
    desserts: desserts,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
  }),
  methods: {
    /**
     * 表格翻页、修改每页条数、数据排序
     * @event
     */
    handleTableChange ({ itemsPerPage, page, sortBy: [sortField], sortDesc }) {
      this.$emit('change', {
        pageNum: page,
        pageSize: itemsPerPage,
        sortField: sortField || '',
        sortDesc: sortDesc || '',
      })
    },
  },
}
</script>

<style lang="scss">
.DateTable {
  width: 100%;
  height: 100%;

  .v-pagination {
    width: auto !important;
    text-align: right !important;
  }
}
</style>
