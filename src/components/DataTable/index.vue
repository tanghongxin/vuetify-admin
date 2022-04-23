<template>
  <div class="data-table fill-width fill-height d-flex flex-column">
    <CssStyle :content="fixedColumnsStyle" />

    <v-form>
      <slot name="search" />

      <div class="d-flex flex-row pb-1 px-2">
        <slot name="actions" />
        <v-spacer />
        <v-btn class="mr-2" depressed tile type="submit" @click.stop.prevent="search">
          查询
        </v-btn>
        <v-btn depressed tile @click="refresh()">
          刷新
        </v-btn>
      </div>
    </v-form>

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
        locale="zh-cn"
        :multi-sort="multiSort"
        :options="options"
        ref="table"
        :server-items-length="total || 0"
        :no-data-text="loading ? '加载中...' : '暂无数据'"
        @update:options="fetch($event)"
      >
        <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </v-data-table>
      <VLoading absolute :value="loading" />
    </div>
  </div>
</template>

<script>
import VLoading from '@/components/VImplements/VLoading.vue'
import CssStyle from '@/components/CssStyle/index.vue'

export default {
  name: 'DataTable',
  components: {
    VLoading,
    CssStyle,
  },
  props: {
    loadData: {
      type: Function,
      default: () => Promise.resolve(),
      required: true,
    },
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
    multiSort: {
      type: Boolean,
      default: false,
    },
    defaultOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data () {
    return {
      items: [],
      loading: false,
      options: Object.assign({
        itemsPerPage: 20,
        page: 1,
        sortBy: [],
        sortDesc: [],
      }, this.defaultOptions),
      $tableWrapper: null,
      total: 0,
    }
  },
  computed: {
    fixedColumnsStyle () {
      const { left = [], right = [] } = this.pickFixedColumns()
      return [
        ...this.calcFixedColumnCls(left, true),
        ...this.calcFixedColumnCls(right, false),
      ].join('\r\n')
    },
  },
  methods: {
    async fetch (payload = {}) {
      try {
        this.loading = true
        const { items, total } = await this.loadData(Object.assign(this.options, payload))
        Object.assign(this, { items, total })
        this.$nextTick(() => {
          this.$tableWrapper = this.$tableWrapper || this.$refs['table'].$el.getElementsByClassName('v-data-table__wrapper')[0]
          this.$vuetify.goTo(0, {
            container: this.$tableWrapper,
          })
        })
      } catch (e) {
        this.items = []
        this.total = 0
        throw e
      } finally {
        this.loading = false
      }
    },
    refresh (firstPage = false) {
      if (firstPage && this.options.page !== 1) {
        this.options.page = 1
      } else {
        this.fetch(this.options)
      }
    },
    search () {
      if (this.options.page !== 1) {
        this.options.page = 1
      } else {
        this.fetch()
      }
    },
    pickFixedColumns () {
      if ([0, 1].includes(this.headers.length)) {
        return {}
      }

      const [left] = this.headers
      const [right] = this.headers.slice(-1)
      return {
        left: left.fixed ? [1] : [],
        right: right.fixed ? [1] : [],
      }
    },
    // TODO: calc multiple sticky items' left / right
    calcFixedColumnCls (cols = [], left = false) {
      const rootSelector = '.data-table:not(.v-data-table--mobile)'
      const nth = num => `nth${left ? '' : '-last'}-child(${num})`

      return cols.map(col => `
        ${rootSelector} tbody tr > td:${nth(col)},
        ${rootSelector} thead tr > th:${nth(col)} {
          background: var(--background-color);
          position: sticky;
          ${left ? 'left' : 'right'}: 0;
          z-index: 2;
        }

        ${rootSelector} tbody tr:hover > td:${nth(col)} {
          background: inherit;
        }

        ${rootSelector} thead > tr > th:${nth(col)} {
          z-index: 3;
        }
      `)
    },
  },
}
</script>

<style lang="scss">
.theme--dark .data-table {
  --background-color: #1e1e1e;
}

.data-table {
  --background-color: #fff;
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
