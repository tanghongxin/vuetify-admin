<template>
  <div class="fill-height fill-width overflow-hidden">
    <DataTable
      :default-options="{
        sortBy: ['lastModifyTime'],
        sortDesc: [true],
      }"
      :headers="headers"
      item-key="id"
      :load-data="loadData"
      ref="table"
    >
      <template v-slot:search>
        <v-form ref="form">
          <v-row class="px-4">
            <v-col class="py-0" cols="12">
              <v-text-field placeholder="请输入关键字查询" v-model="query.name" clearable />
            </v-col>
          </v-row>
        </v-form>
      </template>

      <template v-slot:actions>
        <v-btn class="mr-2" depressed tile @click="handleAdd">
          新增项目
        </v-btn>
      </template>

      <template v-slot:item.number="{ index }">
        {{ index + 1 }}
      </template>

      <template v-slot:item.time="{ item }">
        <v-chip :color="item.time >= 60 ? 'primary' : 'dark'">
          {{ item.time }}
        </v-chip>
      </template>

      <template v-slot:item.occupy="{ item }">
        {{ item.occupy ? '是' : '否' }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="blue darken-3" class="mr-4" @click="handleEdit(item.id)">
              edit
            </v-icon>
          </template>
          <span>编辑</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="red" @click="handleDelete(item.id)">
              delete
            </v-icon>
          </template>
          <span>删除</span>
        </v-tooltip>
      </template>
    </DataTable>

    <ProjectAdd
      ref="projectAdd"
      @success="handleAddSuccess"
    />
    <ProjectEdit
      ref="projectEdit"
      @success="handleEditSuccess"
    />
  </div>
</template>

<script>
import ProjectAdd from './modules/ProjectAdd.vue'
import ProjectEdit from './modules/ProjectEdit.vue'
import { deleteProject, getProjectList } from '@/api/project'
import toast from '@/utils/toast'

export default {
  name: 'ProjectList',
  components: {
    ProjectAdd,
    ProjectEdit,
  },
  data: () => ({
    query: {
      city: '',
      date: '',
      name: '',
      status: '',
      province: '',
    },
  }),
  computed: {
    headers () {
      return [
        {
          text: '编号',
          align: 'center',
          sortable: false,
          value: 'number',
          width: 100,
          fixed: true,
        },
        {
          text: '项目名称',
          align: 'center',
          sortable: false,
          value: 'name',
        },
        {
          text: '总时长（分钟）',
          align: 'center',
          value: 'time',
          width: 100,
        },
        {
          text: '项目类别',
          align: 'center',
          sortable: false,
          value: 'category',
          width: 120,
        },
        {
          text: '展示价格（¥）',
          align: 'center',
          value: 'price',
          width: 120,
        },
        {
          text: '项目类型',
          align: 'center',
          sortable: false,
          value: 'type',
          width: 120,
        },
        {
          text: '独享房间',
          align: 'center',
          value: 'occupy',
          width: 100,
        },
        {
          text: '成本比例（%）',
          align: 'center',
          value: 'percent',
          width: 100,
        },
        {
          text: '更新时间',
          align: 'center',
          value: 'lastModifyTime',
          width: 150,
        },
        {
          text: '操作',
          align: 'center',
          sortable: false,
          value: 'actions',
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
     * @event
     * @return {Undefined}
     */
    handleAdd () {
      this.$refs['projectAdd'].open()
    },
    /**
     * 新增项目成功
     * @event
     * @return {Undefined}
     */
    handleAddSuccess () {
      toast.success({ message: '新增项目成功' })
      this.query = this.$options.data.apply(this).query
      this.$refs['table'].refresh(true)
    },
    /**
     * 编辑项目
     * @event
     * @param {Number | String} id 项目id
     * @return {Undefined}
     */
    handleEdit (id) {
      this.$refs['projectEdit'].open(id)
    },
    /**
     * 编辑项目成功
     * @event
     * @return {Undefined}
     */
    handleEditSuccess () {
      toast.success({ message: '编辑项目成功' })
      this.$refs['table'].refresh()
    },
    /**
     * 删除项目
     * @event
     * @param {Number | String} id 项目id
     * @return {Promise<Undefined>}
     */
    async handleDelete (id) {
      await deleteProject(id)
      toast.success({ message: '删除项目成功' })
      await this.$refs.table.refresh()
    },
  },
}
</script>

<style lang="scss">
</style>
