<script setup lang="ts">
import ProjectSchema from './components/ProjectSchema.vue';
import { deleteProject, getProjectList } from '@/api/project';
import { formatDate } from '@rthx/utils';
import toast from '@/utils/toast';

defineOptions({ name: 'ProjectList' });

const tableRef = ref(null);
const projectSchemaRef = ref(null);

const query = reactive({ name: '' });

const headers = computed(() => [
  {
    title: '项目名称',
    align: 'center',
    sortable: false,
    key: 'name',
    width: 180,
  },
  {
    title: '总时长（分钟）',
    align: 'center',
    key: 'time',
    width: 180,
  },
  {
    title: '项目类别',
    align: 'center',
    sortable: false,
    key: 'category',
    width: 180,
  },
  {
    title: '展示价格（¥）',
    align: 'center',
    key: 'price',
    width: 180,
  },
  {
    title: '项目类型',
    align: 'center',
    sortable: false,
    key: 'type',
    width: 180,
  },
  {
    title: '独享房间',
    align: 'center',
    key: 'occupy',
    width: 120,
  },
  {
    title: '成本比例（%）',
    align: 'center',
    key: 'percent',
    width: 180,
  },
  {
    title: '更新时间',
    align: 'center',
    key: 'lastModifyTime',
    width: 190,
  },
  {
    title: '操作',
    align: 'center',
    sortable: false,
    key: 'actions',
    width: 110,
    fixed: true,
  },
]);

async function handleAdd() {
  projectSchemaRef.value.open();
}

function handleAddSuccess() {
  toast.success({ message: '新增项目成功' });
  this.query = this.$options.data.apply(this).query;
  tableRef.value.refresh(true);
}
function handleEdit(id) {
  projectSchemaRef.value.open(id);
}
function handleEditSuccess() {
  toast.success({ message: '编辑项目成功' });
  tableRef.value.refresh();
}
async function handleDelete(id) {
  await deleteProject(id);
  toast.success({ message: '删除项目成功' });
  await tableRef.value.refresh();
}
</script>

<template>
  <div class="fill-height fill-width overflow-hidden">
    <DataTable
      ref="tableRef"
      :headers="headers"
      :load-data="(options) => getProjectList({ ...query, ...options })"
    >
      <template #search>
        <v-row class="px-4">
          <v-col class="py-0" cols="12">
            <v-text-field
              v-model="query.name"
              variant="underlined"
              autofocus
              placeholder="请输入关键字查询"
              clearable
            />
          </v-col>
        </v-row>
      </template>

      <template #actions>
        <v-btn class="mr-2" variant="tonal" tile @click="handleAdd">
          新增项目
        </v-btn>
      </template>

      <template #item.time="{ item }">
        <v-chip :color="item.time >= 60 ? 'primary' : 'dark'">
          {{ item.time }}
        </v-chip>
      </template>

      <template #item.occupy="{ item }">
        {{ item.occupy ? '是' : '否' }}
      </template>

      <template #item.lastModifyTime="{ item }">
        {{ formatDate(item.lastModifyTime, 'yyyy-MM-dd HH:mm:ss') }}
      </template>

      <template #item.actions="{ item }">
        <v-tooltip top>
          <template #activator>
            <v-icon
              color="blue darken-3"
              class="mr-4"
              @click="handleEdit(item.id)"
            >
              edit
            </v-icon>
          </template>
          <span>编辑</span>
        </v-tooltip>

        <v-tooltip top>
          <template #activator>
            <v-icon color="red" @click="handleDelete(item.id)"> delete </v-icon>
          </template>
          <span>删除</span>
        </v-tooltip>
      </template>
    </DataTable>

    <ProjectSchema
      ref="projectSchemaRef"
      @edit-success="handleEditSuccess"
      @add-success="handleAddSuccess"
    />
  </div>
</template>

<style lang="scss"></style>
