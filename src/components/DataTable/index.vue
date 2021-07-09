<template>
  <div class="data-table fill-width fill-height d-flex flex-column">
    <css-style>
      {{ fixedColumnStyle }}
    </css-style>

    <slot name="search" />

    <div class="d-flex flex-row pb-1 px-2">
      <slot name="actions" />
      <v-spacer />
      <v-btn class="mr-2" depressed tile @click="emit({ page: 1 })">
        查询
      </v-btn>
      <v-btn depressed tile @click="emit({})">
        刷新
      </v-btn>
    </div>

    <div class="flex-grow-1 overflow-hidden" :style="{ position: 'relative' }">
      <v-data-table
        class="elevation-0 fill-width fill-height d-flex flex-column overflow-x-hidden"
        fixed-header
        :headers="headers"
        :hide-default-footer="false"
        :footer-props="{
          itemsPerPageText: '每页条数',
          itemsPerPageOptions: [15, 20, 30, 50],
          showCurrentPage: true,
          showFirstLastPage: true,
        }"
        :items="items"
        :item-key="itemKey"
        :multi-sort="multiSort"
        locale="zh-cn"
        :options="originalOptions"
        :server-items-length="options.total || 0"
        :no-data-text="loading ? '加载中...' : '暂无数据'"
        @update:options="emit($event)"
      >
        <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </v-data-table>
      <VLoading absolute :value="loading" />
    </div>
  </div>
</template>

<script>
import VLoading from '@/components/VImplements/VLoading.vue'

export default {
  name: 'DataTable',
  components: {
    VLoading,
    CssStyle: {
      render (h) {
        return h('style', this.$slots.default)
      },
    },
  },
  props: {
    headers: {
      type: Array,
      default: () => [],
      required: true,
    },
    itemKey: {
      type: String,
      default: 'id',
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
    multiSort: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      required: true,
      default: () => ({
        itemsPerPage: 15,
        page: 1,
        pageCount: 1,
        total: 0,
        sortBy: [],
        sortDesc: [],
      }),
    },
  },
  computed: {
    originalOptions () {
      const { page, itemsPerPage, sortBy, sortDesc } = this.options
      return { page, itemsPerPage, sortBy, sortDesc }
    },
    fixedColumnStyle () {
      // TODO: analyze items props
      const fixedColsL = [1]
      const fixedColsR = [1]

      return [
        ...fixedColsL.map(col => `
        .data-table tr:not(.v-data-table__mobile-table-row) > td:nth-child(${col}),
        .data-table thead:not(.v-data-table-header-mobile) tr > th:nth-child(${col}) {
          background: #fff;
          position: sticky !important;
          left: 0;
          z-index: 2;
        }

        .data-table tr:not(.v-data-table__mobile-table-row):hover > td:nth-child(${col}),
        .data-table thead:not(.v-data-table-header-mobile) tr:hover > th:nth-child(${col}) {
          background: inherit;
        }

        .data-table thead:not(.v-data-table-header-mobile) > tr > th:nth-child(${col}) {
          z-index: 3 !important;
        }
      `),
        ...fixedColsR.map(col => `
        .data-table tr:not(.v-data-table__mobile-table-row) > td:nth-last-child(${col}),
        .data-table thead:not(.v-data-table-header-mobile) tr > th:nth-last-child(${col}) {
          background: #fff;
          position: sticky !important;
          right: 0;
          z-index: 2;
        }

        .data-table tr:not(.v-data-table__mobile-table-row):hover > td:nth-last-child(${col}),
        .data-table tr thead:not(.v-data-table-header-mobile):hover > th:nth-last-child(${col}) {
          background: inherit;
        }

        .data-table thead:not(.v-data-table-header-mobile) > tr > th:nth-last-child(${col}) {
          z-index: 3 !important;
        }
      `),
      ].join(' ')
    },
  },
  methods: {
    emit (payload = {}) {
      this.$emit('update:options', Object.assign({}, this.options, payload))
    },
  },
}
</script>

<style lang="scss">
.data-table {
  position: static !important;

  .v-pagination {
    text-align: right !important;
    width: auto !important;
  }

  .v-toolbar__content {
    padding-bottom: 0;
    padding-top: 0;
  }

  .v-data-footer {
    font-size: 14px;
  }

  th,
  td {
    /* stylelint-disable-next-line */
    @extend .text-no-wrap !optional;
  }
}
</style>
