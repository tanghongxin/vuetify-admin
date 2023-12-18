<template>
  <div class="data-table fill-width fill-height d-flex flex-column">
    <v-form>
      <slot name="search" />

      <div class="d-flex flex-row pb-1 px-2">
        <slot name="actions" />
        <v-spacer />
        <v-btn class="mr-2" variant="tonal" tile type="submit" @click.stop.prevent="refresh(true)">
          查询
        </v-btn>
        <v-btn variant="tonal" tile @click="refresh()">
          刷新
        </v-btn>
      </div>
    </v-form>

    <div class="flex-grow-1 overflow-hidden" :style="{ position: 'relative' }">
      <v-data-table-server
        class="elevation-0 fill-width fill-height d-flex flex-column overflow-x-hidden"
        fixed-header
        :headers="headers"
        :items="items"
        :items-length="total"
        :loading="loading"
        loading-text="加载中"
        :multi-sort="multiSort"
        :no-data-text="loading ? '加载中...' : '暂无数据'"
        :page="options.page"
        ref="table"
        v-model:items-per-page="options.itemsPerPage"
        @update:options="fetch($event)"
      >
        <template v-for="(_, slot) of $slots" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </v-data-table-server>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DataTable',
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
    multiSort: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      items: [],
      loading: false,
      options: { page: 1, itemsPerPage: 10, sortBy: [], groupBy: [] },
      total: 0,
    }
  },
  methods: {
    async fetch (options = {}) {
      try {
        this.loading = true
        const { items, total } = await this.loadData(Object.assign(this.options, options))
        Object.assign(this, { items, total })
        await this.$nextTick()
        await this.scrollToTop()
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
    scrollToTop () {
      const tableWrapper = this.$refs['table'].$el.getElementsByClassName('v-table__wrapper')[0]
      tableWrapper.scroll({ top: 0, behavior: 'smooth' })
    },
  },
})
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
