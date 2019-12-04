<script>
export default {
  name: 'DateTable',
  props: {
    headers: {
      type: Array,
      default: () => [],
      required: true,
    },
    itemKey: {
      type: String,
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
  render (h) {
    // 搜索栏
    const search =
      <div>{ this.$slots.search }</div>
    // 工具栏
    const actions =
      <div class="d-flex flex-row pb-1 px-2">
        { this.$slots.actions }
        <v-spacer />
        <v-btn
          class="mr-2"
          depressed 
          tile 
          onClick={ this.handleSearch }
        >
          查询
        </v-btn>

        <v-btn
          depressed 
          tile 
          onClick={ this.handleRefresh }
        >
          刷新
        </v-btn>
      </div>
    // 表格
    const table = h('v-data-table', {
      class: 'elevation-0',
      props: {
        fixedHeader: true,
        headers: this.headers,
        hideDefaultFooter: true,
        items: this.items,
        itemKey: this.itemKey,
        itemsPerPage: this.options.itemsPerPage,
        loading: this.loading,
        noDataText: this.loading ? '加载中...' : '暂无数据',
        page: this.options.page,
      },
      on: {
        pageCount: e => this.options.pageCount = e,
        'update:options': this.handleTableChange,
        'updata:page': e => this.options.page = e,
      },
      scopedSlots: this.$scopedSlots,
    })
    // 分页
    const pagination =
      <div class="d-flex flex-row pa-2">
        <v-spacer />
        <v-select
          style="flex: 0"
          class="px-4"
          flat
          items={ [10, 15, 20, 50] }
          value={ this.options.itemsPerPage }
          onInput={ e => this.options.itemsPerPage = e }
        />
        <v-pagination
          class="elevation-0"
          value={ this.options.page }
          onInput={ e => this.options.page = e }
          length={ this.options.pageCount }
          totalVisible={ 7 }
          next-icon="keyboard_arrow_right"
          prev-icon="keyboard_arrow_left"
        />
      </div>
    const defaultSlot = <div>{ this.$slots.default }</div>
    return <div class="DateTable">
      { search }
      { actions }
      { table }
      { pagination }
      { defaultSlot }
    </div>
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
