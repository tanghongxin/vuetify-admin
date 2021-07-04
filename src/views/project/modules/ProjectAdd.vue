<template>
  <FormDrawer
    flat
    :loading="loading"
    title="新增项目"
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
                :rule="[v => !!v || '请输入项目名称']"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="formData.category"
                :items="typeList"
                item-text="name"
                item-value="value"
                label="项目类别"
              />
            </v-col>
            <v-col cols="6">
              <v-radio-group
                v-model="formData.type"
                label="项目类型"
                row
              >
                <v-radio
                  color="primary"
                  label="公共项目"
                  :value="false"
                />
                <v-radio
                  color="primary"
                  label="其他项目"
                  :value="true"
                />
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="formData.price"
                label="展示价格"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="formData.time"
                label="总时长"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="formData.percent"
                type="number"
                label="成本比例"
              />
            </v-col>
            <v-col cols="6">
              <v-radio-group
                v-model="formData.occupy"
                color="primary"
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
                :rules="[v => !!v || '请输入功效标签', v => v && v.length <= 12 || '最多输入12个字']"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <VImgUpload flat />
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
        @click="$refs['form'].validate() && submit()"
      >
        保存
      </v-btn>
    </template>
  </FormDrawer>
</template>

<script>

import { addProject } from '@/api/project'

export default {
  name:'ProjectEdit',
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
      occupy: false,
      tags: '',
    },
    loading: false,
    visible: false,
  }),
  computed: {
    typeList () {
      return [
        {
          name: '足道',
          value: '1',
        },
        {
          name: '全身按摩',
          value: '2',
        },
        {
          name: '中医调理',
          value: '3',
        },
        {
          name: 'SPA',
          value: '4',
        },
        {
          name: '套餐',
          value: '5',
        },
      ]
    },
  },
  methods: {
    async open () {
      this.visible = true
    },
    async close () {
      this.visible = false
      await this.$nextTick()
      Object.assign(this, this.$options.data.apply(this))
      this.$refs['form'].resetValidation()
    },
    async submit () {
      try {
        this.loading = true
        await addProject(this.formData)
        this.$emit('success')
        this.close()
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
