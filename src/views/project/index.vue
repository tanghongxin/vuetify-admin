<template>
  <div class="fill-height fill-width overflow-hidden">
    <DataTable
      :headers="headers"
      :load-data="loadData"
      ref="table"
    >
      <template #search>
        <v-row class="px-4">
          <v-col class="py-0" cols="12">
            <v-text-field variant="underlined" autofocus placeholder="请输入关键字查询" v-model="query.name" clearable />
          </v-col>
        </v-row>
      </template>

      <template #actions>
        <v-btn class="mr-2" variant="tonal" tile @click="handleAdd">
          新增项目
        </v-btn>
      </template>

      <template #item.time="{ item }">
        <v-chip :color="item.raw.time >= 60 ? 'primary' : 'dark'">
          {{ item.raw.time }}
        </v-chip>
      </template>

      <template #item.occupy="{ item }">
        {{ item.raw.occupy ? '是' : '否' }}
      </template>

      <template #item.actions="{ item }">
        <v-tooltip top>
          <template #activator>
            <v-icon color="blue darken-3" class="mr-4" @click="handleEdit(item.raw.id)">
              edit
            </v-icon>
          </template>
          <span>编辑</span>
        </v-tooltip>

        <v-tooltip top>
          <template #activator>
            <v-icon color="red" @click="handleDelete(item.raw.id)">
              delete
            </v-icon>
          </template>
          <span>删除</span>
        </v-tooltip>
      </template>
    </DataTable>

    <ProjectSchema
      ref="projectSchema"
      @editSuccess="handleEditSuccess"
      @addSuccess="handleAddSuccess"
    />
  </div>
</template>

<script>
import ProjectSchema from './modules/ProjectSchema.vue'
import { deleteProject, getProjectList } from '@/api/project'
import toast from '@/utils/toast'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProjectList',
  components: {
    ProjectSchema,
  },
  data: () => ({
    query: {
      name: '',
    },
  }),
  computed: {
    headers () {
      return [
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
      ]
    },
  },
  methods: {
    /**
     * 调取接口数据并初始化表格
     * @return {Promise<Undefined>}
     */
    async loadData (options = {}) {
      return getProjectList({ ...this.query, ...options }).then(r => r.data)
    },
    /**
     * 新增项目
     * @return {Undefined}
     */
    handleAdd () {
      this.$refs['projectSchema'].open()
    },
    /**
     * 新增项目成功
     * @return {Undefined}
     */
    handleAddSuccess () {
      toast.success({ message: '新增项目成功' })
      this.query = this.$options.data.apply(this).query
      this.$refs['table'].refresh(true)
    },
    /**
     * 编辑项目
     * @param {Number | String} id 项目id
     * @return {Undefined}
     */
    handleEdit (id) {
      this.$refs['projectSchema'].open(id)
    },
    /**
     * 编辑项目成功
     * @return {Undefined}
     */
    handleEditSuccess () {
      toast.success({ message: '编辑项目成功' })
      this.$refs['table'].refresh()
    },
    /**
     * 删除项目
     * @param {Number | String} id 项目id
     * @return {Promise<Undefined>}
     */
    async handleDelete (id) {
      await deleteProject(id)
      toast.success({ message: '删除项目成功' })
      await this.$refs.table.refresh()
    },
  },
})
</script>

<style lang="scss">
</style>
