<template>
  <div class="data-table fill-width fill-height d-flex flex-column">
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

    <div class="flex-grow-1" :style="{ position: 'relative' }">
      <v-data-table
        class="elevation-0"
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
        :options="options"
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

    <slot name="default" />
  </div>
</template>

<script>
import VLoading from '@/components/VImplements/VLoading.vue'

export default {
  name: 'DataTable',
  components: {
    VLoading,
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
