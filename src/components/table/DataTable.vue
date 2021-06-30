<script>
export default {
  name: 'DataTable',
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
    loading: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      required: true,
      default: () => ({}),
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
    const loading = <v-overlay
      absolute
      color="rgba(255, 255, 255, 0.7)"
      opacity="1"
      value={ this.loading }
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      />
    </v-overlay>
    // 表格
    const table = h('v-data-table', {
      class: 'elevation-0',
      props: {
        fixedHeader: true,
        headers: this.headers,
        hideDefaultFooter: false,
        footerProps: {
          itemsPerPageText: '每页条数',
          // itemsPerPageAllText: '全部',
          itemsPerPageOptions: [10, 15, 20, 50],
          showCurrentPage: true,
          showFirstLastPage: true,
        },
        items: this.items,
        itemKey: this.itemKey,
        locale: 'zh-cn',
        options: this.options,
        serverItemsLength: this.options.total || 0,
        // loading: this.loading,
        noDataText: this.loading ? '加载中...' : '暂无数据',
      },
      on: {
        'update:options': this.handleTableChange,
      },
      scopedSlots: {
        ...this.$scopedSlots,
        // 'footer.page-text': ({ itemsLength }) => `共 ${itemsLength} 条记录`,
      },
    })
    const defaultSlot = <div>{ this.$slots.default }</div>
    return <div class="DateTable fill-width fill-height d-flex flex-column">
      { search }
      { actions }
      <div style="position: relative" class="flex-grow-1">
        { table }
        { loading }
      </div>
      { defaultSlot }
    </div>
  },
  data: () => ({}),
  methods: {
    handleSearch () {
      this.$emit('update:options', {
        ...this.options,
        page: 1,
      })
    },
    handleRefresh () {
      this.$emit('update:options', {
        ...this.options,
      })
    },
    handleTableChange (options) {
      this.$emit('update:options', {
        ...this.options,
        ...options,
      })
    },
  },
}
</script>

<style lang="scss">
.DateTable {
  position: static !important;
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

  .v-data-footer {
    font-size: 14px;
  }

  th,
  td {
    @extend .text-no-wrap !optional;
  }
}
</style>
