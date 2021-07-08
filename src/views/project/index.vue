<template>
  <div class="fill-height fill-width overflow-hidden">
    <DataTable
      :headers="headers"
      item-key="id"
      :items="items"
      :loading="loading"
      :options="options"
      @update:options="handleTableChange"
    >
      <template v-slot:search>
        <v-form ref="form">
          <v-row class="px-4">
            <v-col class="py-0" cols="12" sm="6" md="3" lg="2">
              <v-text-field placeholder="门店名称" v-model="query.name" clearable />
            </v-col>
            <v-col class="py-0" cols="12" sm="6" md="3" lg="2">
              <v-text-field placeholder="省" v-model="query.province" clearable />
            </v-col>
            <v-col class="py-0" cols="12" sm="6" md="3" lg="2">
              <v-text-field placeholder="市" v-model="query.city" clearable />
            </v-col>
            <v-col class="py-0" cols="12" sm="6" md="3" lg="2">
              <v-text-field placeholder="状态" v-model="query.status" clearable />
            </v-col>
            <v-col class="py-0" cols="12" sm="6" md="3" lg="2">
              <v-text-field placeholder="开业年份" v-model="query.name" clearable />
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
        <v-btn color="blue darken-3" text @click="handleEdit(item.id)">
          编辑
        </v-btn>
        <v-btn color="warning" text @click="handleDelete(item.id)">
          删除
        </v-btn>
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
    items: [],
    loading: false,
    options: {
      itemsPerPage: 10,
      page: 1,
      pageCount: 1,
      total: 0,
      sortBy: ['lastModifyTime'],
      sortDesc: [true],
    },
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
        },
        {
          text: '项目类别',
          align: 'center',
          sortable: false,
          value: 'category',
        },
        {
          text: '展示价格',
          align: 'center',
          value: 'price',
        },
        {
          text: '项目类型',
          align: 'center',
          sortable: false,
          value: 'type',
        },
        {
          text: '独享房间',
          align: 'center',
          value: 'occupy',
        },
        {
          text: '成本比例（%）',
          align: 'center',
          value: 'percent',
        },
        {
          text: '更新时间',
          align: 'center',
          value: 'lastModifyTime',
        },
        {
          text: '操作',
          align: 'center',
          sortable: false,
          value: 'actions',
        },
      ]
    },
  },
  methods: {
    /**
     * 调取接口数据并初始化表格
     * @return {Promise<Undefined>}
     */
    async fetch () {
      try {
        this.loading = true
        const { data } = await getProjectList({ ...this.query, ...this.options })
        const { items, total, pageCount } = data
        Object.assign(this, { items })
        Object.assign(this.options, { total, pageCount })
      } catch (e) {
        this.items = []
        this.options.total = 0
        this.options.pageCount = 1
        throw e
      } finally {
        this.loading = false
      }
    },
    /**
     * 表格翻页、排序、更改每页条数等
     * @event
     * @param {Object} options 表格配置
     * @return {Undefined}
     */
    handleTableChange (options) {
      this.options = options
      this.$refs['form'].validate() && this.fetch()
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
      this.options.page = 1
      this.fetch()
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
      this.fetch()
    },
    /**
     * 删除项目
     * @event
     * @param {Number | String} id 项目id
     * @return {Promise<Undefined>}
     */
    async handleDelete (id) {
      try {
        this.loading = true
        await deleteProject(id)
        toast.success({ message: '删除项目成功' })
        await this.fetch()
      } catch (e) {
        throw e
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss">
</style>
