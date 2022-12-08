<template>
  <FormDrawer
    flat
    :loading="loading"
    title="编辑项目"
    v-model="visible"
    :width="680"
  >
    <template #content>
      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.name"
                label="项目名称"
                :rules="[v => !!v || '请输入项目名称']"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="formData.type"
                :items="['足道', '全身按摩', '中医调理', 'SPA', '套餐']"
                :rules="[v => !!v || '请选择项目类型']"
                label="项目类型"
              />
            </v-col>
            <v-col cols="6">
              <v-radio-group
                v-model="formData.category"
                :items="['公共项目', '其他项目']"
                :rules="[v => !!v || '请选择项目类别']"
                label="项目类别"
                row
              >
                <v-radio
                  color="primary"
                  label="公共项目"
                  value="公共项目"
                />
                <v-radio
                  color="primary"
                  label="其他项目"
                  value="其他项目"
                />
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model.number="formData.price"
                :rules="[v => !!v || '请输入展示价格']"
                label="展示价格（¥）"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.number="formData.time"
                :rules="[v => !!v || '请输入总时长']"
                label="总时长（分钟）"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model.number="formData.percent"
                type="number"
                :rules="[v => !!v || '请输入成本比例']"
                label="成本比例（%）"
              />
            </v-col>
            <v-col cols="6">
              <v-radio-group
                v-model="formData.occupy"
                color="primary"
                :rules="[v => typeof v === 'boolean' || '请选择独享房间']"
                label="独享房间"
                row
              >
                <v-radio
                  color="primary"
                  label="否"
                  :value="false"
                />
                <v-radio
                  color="primary"
                  label="是"
                  :value="true"
                />
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="py-0"
              cols="12"
            >
              <v-text-field
                v-model="formData.tags"
                counter="12"
                label="功效标签"
                :rules="[
                  v => !!v || '请输入功效标签',
                  v => v && v.length <= 12 || '最多输入12个字符'
                ]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <VImgUpload ref="upload" flat />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>

    <template #actions>
      <v-spacer />
      <v-btn
        x-large
        text
        @click="close"
      >
        取消
      </v-btn>
      <v-btn
        x-large
        text
        type="submit"
        @click.stop.prevent="submit"
      >
        保存
      </v-btn>
    </template>
  </FormDrawer>
</template>

<script>

import { addProject, editProject, getProject } from '@/api/project'
import _ from 'lodash-es'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProjectSchema',
  props: {},
  data: () => ({
    formData: {
      id: '',
      name: '',
      type: '',
      category: '',
      price: '',
      time: '',
      percent: '',
      occupy: null,
      tags: '',
    },
    loading: false,
    visible: false,
  }),
  methods: {
    async add () {
      await addProject(this.formData)
      this.$emit('addSuccess')
    },
    async edit () {
      await editProject(this.formData)
      this.$emit('editSuccess')
    },
    async open (id) {
      try {
        this.visible = true
        this.loading = true
        if (id) {
          const { data } = await getProject(id)
          this.formData = _.pick(data, Object.keys(this.formData))
        }
      } finally {
        this.loading = false
      }
    },
    async close () {
      this.visible = false
      await this.$nextTick()
      Object.assign(this, this.$options.data.apply(this))
      this.$refs['form'].resetValidation()
      this.$refs['upload'].reset()
    },
    async submit () {
      if (!this.$refs['form'].validate()) return
      try {
        this.loading = true
        await this.formData.id ? this.edit() : this.add()
        this.close()
      } finally {
        this.loading = false
      }
    },
  },
})
</script>

<style lang="scss">
</style>
