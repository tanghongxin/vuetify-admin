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
        color="error"
        text
        @click="handleDelete(item.id)"
      >
        删除
      </v-btn>
    </template>
    <template #default>
      <ProjectAdd
        ref="projectAdd"
        @success:add="fetch"
        @success:edit="fetch"
      />
    </template>
  </DataTable>
</template>

<script>
import DataTable from '~~/table/DataTable'
import ProjectAdd from './ProjectAdd'
import { deleteProject, getProjectList } from 'api/project'

export default {
  name: 'ProjectList',
  components: {
    DataTable,
    ProjectAdd,
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
    handleTableChange (options) {
      this.options = options
      this.$refs['form'].validate() && this.fetch()
    },
    handleAdd () {
      this.$refs['projectAdd'].add()
    },
    handleEdit (id) {
      this.$refs['projectAdd'].edit(id)
    },
    async handleDelete (id) {
      // TODO: confirm
      try {
        this.loading = true
        await deleteProject(id)
        this.fetch()
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
