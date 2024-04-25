<script setup lang="ts">
defineOptions({
  name: 'DataTable',
});

interface Props {
  loadDataFn: (req: TableReq) => Promise<TableRes<any>>;
  headers: any[];
  multiSort?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loadDataFn: () => Promise.resolve({ items: [], total: 0 }),
  headers: () => [],
  multiSort: false,
});

const formRef = ref<IOGC<'VForm'>>(null);
const items = ref([]);
const loading = ref(false);
const options = ref<TableReq>({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
});
const total = ref(0);

watch(options, fetch, { immediate: true });

async function fetch(ops = {}) {
  try {
    loading.value = true;
    const data = await props.loadDataFn(Object.assign({}, options.value, ops));
    items.value = data.items;
    total.value = data.total;
    await nextTick();
    await scrollToTop();
  } finally {
    loading.value = false;
  }
}

async function refresh(firstPage = false) {
  const { valid } = await formRef.value.validate();
  if (valid) {
    if (firstPage && options.value.page !== 1) {
      options.value.page = 1;
    } else {
      fetch(options.value);
    }
  }
}

function scrollToTop() {
  const tableWrapper = document.querySelector('.v-table__wrapper');
  tableWrapper.scroll({ top: 0, behavior: 'smooth' });
}

defineExpose({ refresh });
</script>

<template>
  <div class="data-table fill-width fill-height d-flex flex-column">
    <v-form ref="formRef">
      <slot name="search" />

      <div class="d-flex flex-row pb-1 px-2">
        <slot name="actions" />
        <v-spacer />
        <v-btn
          class="mr-2"
          variant="tonal"
          tile
          type="submit"
          @click.stop.prevent="refresh(true)"
        >
          查询
        </v-btn>
        <v-btn variant="tonal" tile @click="refresh()"> 刷新 </v-btn>
      </div>
    </v-form>

    <div class="flex-grow-1 overflow-hidden" :style="{ position: 'relative' }">
      <v-data-table-server
        ref="table"
        v-model:items-per-page="options.itemsPerPage"
        class="elevation-0 fill-width fill-height d-flex flex-column overflow-x-hidden"
        fixed-header
        :headers="props.headers"
        :items="items"
        :items-length="total"
        :loading="loading"
        loading-text="加载中"
        :multi-sort="props.multiSort"
        :no-data-text="loading ? '加载中...' : '暂无数据'"
        :page="options.page"
        @update:options="fetch($event)"
      >
        <template v-for="(_, slot) of $slots" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </v-data-table-server>
    </div>
  </div>
</template>

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

  .v-data-table-footer__items-per-page {
    min-width: 180px;
  }

  th,
  td {
    @extend .text-no-wrap !optional;
  }
}
</style>
