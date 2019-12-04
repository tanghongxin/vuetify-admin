<template>
  <DataTable
    class="ProjectList"
    :headers="headers"
    item-key="name"
    :items="items"
    :loading="loading"
    :search="search"
    v-model="options"
    @change="fetch"
  >
    <template v-slot:search>
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
            v-model="search.name"
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
            v-model="search.province"
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
            v-model="search.city"
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
            v-model="search.status"
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
            v-model="search.name"
            clearable
          />
        </v-col>
      </v-row>
    </template>
    <template v-slot:actions>
      <v-btn
        class="mr-2"
        depressed 
        tile 
        @click="handleAddProject"
      >
        新增项目
      </v-btn>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn text>
        编辑
      </v-btn>
      <v-btn text>
        查看
      </v-btn>
      <v-btn text>
        删除
      </v-btn>
    </template>
    <template #default>
      <ProjectAdd
        ref="projectAdd"
        @success="fetch"
      />
    </template>
  </DataTable>
</template>

<script>
import DataTable from '~~/table/DataTable'
import ProjectAdd from './ProjectAdd'
import { projectList } from 'api/project'

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
    },
    search: {
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
          class: 'text-no-wrap',
          sortable: false,
          value: 'number',
        },
        {
          text: '项目名称',
          align: 'center',
          class: 'text-no-wrap',
          sortable: false,
          value: 'name',
        },
        {
          text: '总时长（分钟）',
          align: 'center',
          class: 'text-no-wrap',
          sortable: false,
          value: 'time',
        },
        {
          text: '项目类别',
          align: 'center',
          class: 'text-no-wrap',
          sortable: false,
          value: 'category',
        },
        {
          text: '展示价格',
          align: 'center',
          class: 'text-no-wrap',
          sortable: false,
          value: 'price',
        },
        {
          text: '项目类型',
          align: 'center',
          class: 'text-no-wrap',
          sortable: false,
          value: 'type',
        },
        {
          text: '独享房间',
          align: 'center',
          class: 'text-no-wrap',
          sortable: false,
          value: 'occupy',
        },
        {
          text: '成本比例（%）',
          align: 'center',
          class: 'text-no-wrap',
          sortable: false,
          value: 'percent',
        },
        {
          text: '更新时间',
          align: 'center',
          class: 'text-no-wrap',
          sortable: false,
          value: 'lastModifyTime',
        },
        {
          text: '操作',
          align: 'center',
          class: 'text-no-wrap',
          sortable: false,
          value: 'actions',
        },
      ]
    },
  },
  methods: {
    async fetch (query) {
      console.log(query)
      try {
        this.loading = true
        const { data } = await projectList(query)
        console.log(data)
        this.items = data.items
        this.options.pageCount = data.pageCount
      } catch (e) {
        this.items = []
        this.options.pageCount = 1
        throw e
      } finally {
        // TODO: 刷新页码
        this.loading = false
      }
    },
    handleAddProject () {
      this.$refs['projectAdd'].show()
    },
  },
  created () {
    // this.fetch()
  },
}
</script>

<style lang="scss">
.ProjectList {

  td {
    @extend .text-no-wrap !optional;
  }
}
</style>
