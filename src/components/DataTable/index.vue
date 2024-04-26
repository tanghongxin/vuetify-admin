<script setup lang="ts">
import { usePromiseFn } from '@/composables';
import { Res, Props, getDefaultRes } from './types';
import TableFooter from './TableFooter.vue';

defineOptions({
  name: 'DataTable',
});

const props = withDefaults(defineProps<Props>(), {
  loadDataFn: () => Promise.resolve(getDefaultRes()),
  headers: () => [],
  multiSort: false,
});

const formRef = ref<IOGC<'VForm'>>(null);
const options = ref<TableReq>({
  page: 1,
  itemsPerPage: 25,
  sortBy: [],
  groupBy: [],
});

const { loading, result, error, exec } = usePromiseFn<Res>(
  props.loadDataFn,
  getDefaultRes(),
);

watch(options, fetch, { immediate: true, deep: true });

async function fetch(ops = {}) {
  await nextTick();
  const { valid } = await formRef.value.validate();
  if (valid) {
    await exec(Object.assign({}, options.value, ops));
    await scrollToTop();
  }
}

async function refresh(firstPage = false) {
  if (firstPage && options.value.page !== 1) {
    options.value.page = 1;
  } else {
    fetch(options.value);
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
    <v-form ref="formRef" @submit.prevent="refresh(true)">
      <slot name="search" />

      <div class="d-flex flex-row pb-1 px-2">
        <slot name="actions" />
        <v-spacer />
        <v-btn class="mr-2" variant="tonal" tile type="submit"> 查询 </v-btn>
        <v-btn variant="tonal" tile @click="refresh()"> 刷新 </v-btn>
      </div>
    </v-form>

    <div class="flex-grow-1 overflow-hidden">
      <v-data-table-virtual
        ref="table"
        class="elevation-0 fill-width fill-height d-flex flex-column overflow-x-hidden"
        fixed-header
        :headers="props.headers"
        :items="result.items"
        :loading="loading"
        loading-text="加载中"
        :multi-sort="props.multiSort"
        :no-data-text="error ? '加载失败' : loading ? '加载中' : '暂无数据'"
      >
        <template v-for="(_, slot) of $slots" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>

        <template #bottom>
          <TableFooter :options :result />
        </template>
      </v-data-table-virtual>
    </div>
  </div>
</template>

<style lang="scss">
.theme--dark .data-table {
  --background-color: #1e1e1e;
}

.data-table {
  --background-color: #fff;

  .v-toolbar__content {
    padding-bottom: 0;
    padding-top: 0;
  }

  th,
  td {
    @extend .text-no-wrap !optional;
  }
}
</style>
