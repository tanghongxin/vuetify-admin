<script setup lang="ts">
import { addProject, editProject, getProject } from '@/api/project';
import { VForm } from 'vuetify/components';
import { ProjectInfo } from '@/api/project/types';

defineOptions({ name: 'ProjectSchema' });

const emit = defineEmits<{
  (e: 'addSuccess'): void;
  (e: 'editSuccess'): void;
}>();

const formRef = ref<VForm>(null);
const uploadRef = ref(null);

const formData = ref<ProjectInfo>({
  id: '',
  name: '',
  type: '',
  category: '',
  price: '',
  time: '',
  percent: '',
  occupy: null,
  tags: '',
});
const loading = ref(false);
const visible = ref(false);

const add = async () => {
  await addProject(formData.value);
  emit('addSuccess');
};

const edit = async () => {
  await editProject(formData.value);
  emit('editSuccess');
};

const open = async (id: string | undefined) => {
  try {
    visible.value = true;
    loading.value = true;
    if (id !== undefined) {
      formData.value = await getProject(id);
    }
  } finally {
    loading.value = false;
  }
};

const close = () => {
  visible.value = false;
};

const reset = () => {
  const defaultFormData = {
    id: '',
    name: '',
    type: '',
    category: '',
    price: '',
    time: '',
    percent: '',
    occupy: null,
    tags: '',
  };
  Object.assign(formData, defaultFormData);
  formRef.value.resetValidation();
  uploadRef.value.reset();
};

const submit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;
  try {
    loading.value = true;
    await (formData.value.id ? edit() : add());
    close();
  } finally {
    loading.value = false;
  }
};

defineExpose({ open });
</script>

<template>
  <FormDrawer
    v-model="visible"
    flat
    :loading="loading"
    :title="`${formData.id ? '编辑' : '新增'}项目`"
    :width="680"
    :after-close="reset"
  >
    <template #content>
      <v-form ref="formRef">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.name"
                variant="underlined"
                label="项目名称"
                :rules="[(v) => !!v || '请输入项目名称']"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="formData.type"
                variant="underlined"
                :items="['足道', '全身按摩', '中医调理', 'SPA', '套餐']"
                :rules="[(v) => !!v || '请选择项目类型']"
                label="项目类型"
              />
            </v-col>
            <v-col cols="6">
              <v-radio-group
                v-model="formData.category"
                :items="['公共项目', '其他项目']"
                :rules="[(v) => !!v || '请选择项目类别']"
                label="项目类别"
                inline
              >
                <v-radio color="primary" label="公共项目" value="公共项目" />
                <v-radio color="primary" label="其他项目" value="其他项目" />
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model.number="formData.price"
                variant="underlined"
                :rules="[(v) => !!v || '请输入展示价格']"
                label="展示价格（¥）"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.number="formData.time"
                variant="underlined"
                :rules="[(v) => !!v || '请输入总时长']"
                label="总时长（分钟）"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model.number="formData.percent"
                variant="underlined"
                type="number"
                :rules="[(v) => !!v || '请输入成本比例']"
                label="成本比例（%）"
              />
            </v-col>
            <v-col cols="6">
              <v-radio-group
                v-model="formData.occupy"
                color="primary"
                :rules="[(v) => typeof v === 'boolean' || '请选择独享房间']"
                label="独享房间"
                inline
              >
                <v-radio color="primary" label="否" :value="false" />
                <v-radio color="primary" label="是" :value="true" />
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0" cols="12">
              <v-text-field
                v-model="formData.tags"
                variant="underlined"
                counter="12"
                label="功效标签"
                :rules="[
                  (v) => !!v || '请输入功效标签',
                  (v) => (v && v.length <= 12) || '最多输入12个字符',
                ]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ImgUpload ref="uploadRef" flat />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>

    <template #actions>
      <v-spacer />
      <v-btn size="large" variant="text" @click="close"> 取消 </v-btn>
      <v-btn
        size="large"
        variant="text"
        type="submit"
        @click.stop.prevent="submit"
      >
        保存
      </v-btn>
    </template>
  </FormDrawer>
</template>

<style lang="scss"></style>
