<template>
  <DataTable
    :headers="headers"
    item-key="name"
    :items="items"
    :loading="loading"
    :options="options"
    @update:options="handleTableChange"
  >
    <template v-slot:search>
      <v-form ref="form">
        <v-row class="px-4">
          <v-col
            class="py-0"
            cols="12"
            sm="6"
            md="3"
            lg="2"
          >
            <v-text-field
              placeholder="门店名称"
              v-model="query.name"
              clearable
            />
          </v-col>
          <v-col
            class="py-0"
            cols="12"
            sm="6"
            md="3"
            lg="2"
          >
            <v-text-field
              placeholder="省"
              v-model="query.province"
              clearable
            />
          </v-col>
          <v-col
            class="py-0"
            cols="12"
            sm="6"
            md="3"
            lg="2"
          >
            <v-text-field
              placeholder="市"
              v-model="query.city"
              clearable
            />
          </v-col>
          <v-col
            class="py-0"
            cols="12"
            sm="6"
            md="3"
            lg="2"
          >
            <v-text-field
              placeholder="状态"
              v-model="query.status"
              clearable
            />
          </v-col>
          <v-col
            class="py-0"
            cols="12"
            sm="6"
            md="3"
            lg="2"
          >
            <v-text-field
              placeholder="开业年份"
              v-model="query.name"
              clearable
            />
          </v-col>
        </v-row>
      </v-form>
    </template>

    <template v-slot:actions>
      <v-btn
        class="mr-2"
        depressed
        tile
        @click="handleAdd"
      >
        新增项目
      </v-btn>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn
        color="blue darken-3"
        text
        @click="handleEdit(item.id)"
      >
        编辑
      </v-btn>
      <v-btn
        color="success"
        text
      >
        查看
      </v-btn>
      <v-btn
        color="warning"
        text
        @click="handleDelete(item.id)"
      >
        删除
      </v-btn>
    </template>

    <template #default>
      <ProjectAdd
        ref="projectAdd"
        @success="handleAddSuccess"
      />
      <ProjectEdit
        ref="projectEdit"
        @success="handleEditSuccess"
      />
      <ProjectDetail ref="ProjectDetail" />
    </template>
  </DataTable>
</template>

<script>

import ProjectAdd from './modules/ProjectAdd.vue'
import ProjectEdit from './modules/ProjectEdit.vue'
import ProjectDetail from './modules/ProjectDetail.vue'
import { deleteProject, getProjectList } from '@/api/project'

export default {
  name: 'ProjectList',
  components: {
    ProjectAdd,
    ProjectEdit,
    ProjectDetail,
  },
  data: () => ({
    items: [],
    loading: false,
    options: {
      itemsPerPage: 10,
      page: 1,
      pageCount: 1,
      total: 0,
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
          sortable: false,
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
          sortable: false,
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
          sortable: false,
          value: 'occupy',
        },
        {
          text: '成本比例（%）',
          align: 'center',
          sortable: false,
          value: 'percent',
        },
        {
          text: '更新时间',
          align: 'center',
          sortable: false,
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
        this.items = data.items
        this.options.total = data.total
        this.options.pageCount = data.pageCount
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
      this.$snotify.success('系统提示', '新增项目成功')
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
      this.$snotify.success('系统提示', '编辑项目成功')
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
        await this.confirmDelete()
        this.loading = true
        await deleteProject(id)
        this.$snotify.success('系统提示', '删除项目成功')
        await this.fetch()
      } catch (e) {
        throw e
      } finally {
        this.loading = false
      }
    },
    /**
     * 确认删除项目
     * @return {Promise<Undefined>}
     */
    confirmDelete () {
      return new Promise(async (resolve, reject) => {
        await this.$dialog.confirm({
          title: '删除项目',
          text: '确定删除该项目么？',
        }) ? resolve() : reject()
      })
    },
  },
}
</script>

<style lang="scss">
</style>
