<template>
  <div class="DateTable">
    <!-- / Search -->
    <v-toolbar
      class="py-0"
      flat
      color="white"
    >
      <slot name="search" />
    </v-toolbar>

    <!-- / Actions -->
    <v-toolbar
      class="py-0"
      flat
      color
    >
      <slot name="actions" />
      <v-spacer />
      <v-btn
        class="mr-2"
        depressed 
        tile 
        @click="handleSearch"
      >
        查询
      </v-btn>

      <v-btn
        depressed 
        tile 
        @click="handleRefresh"
      >
        刷新
      </v-btn>
    </v-toolbar>

    <!-- / Table -->
    <v-data-table
      :expanded.sync="expanded"
      class="elevation-0"
      fixed-header
      :headers="headers"
      hide-default-footer
      :items="items"
      item-key="name"
      :loading="loading"
      show-expand
      :page.sync="options.page"
      :items-per-page="options.itemsPerPage"
      @page-count="options.pageCount = $event"
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
        v-model="options.itemsPerPage"
      />
      <v-pagination
        class="elevation-0"
        v-model="options.page"
        :length="options.pageCount"
        :total-visible="7"
        next-icon="keyboard_arrow_right"
        prev-icon="keyboard_arrow_left"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DateTable',
  props: {
    headers: {
      type: Array,
      default: () => [],
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    expanded: [],
    options: {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
    },
  }),
  watch: {
    options: {
      immediate: false,
      deep: true,
      handler (v) {
        this.$emit('input', v)
      },
    },
  },
  methods: {
    handleRefresh () {
      this.$emit('change', {
        ...this.options,
      })
    },
    handleSearch () {
      this.options = {
        ...this.options,
        page: 1,
      }
      this.$emit('change', {
        ...this.options,
      })
    },
    /**
     * 表格翻页、修改每页条数、数据排序
     * @event
     */
    handleTableChange ({ itemsPerPage, page, sortBy: [sortField], sortDesc: [desc] }) {
      this.options = {
        ...this.options,
        itemsPerPage: itemsPerPage,
        page: page,
        sortField: sortField || '',
        sortOrder: desc ? 'desc' : 'asc',
      }
      this.$emit('change', {
        page: page,
        itemsPerPage: itemsPerPage,
        sortField: sortField || '',
        sortOrder: desc ? 'desc' : 'asc',
        ...this.search,
      })
    },
  },
  created () {
    this.options = {
      ...this.options,
      ...this.value,
    }
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

  .v-toolbar__content {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
