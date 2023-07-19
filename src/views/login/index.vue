<script setup>
import { useAccountStore } from '@/store'
import { reactive } from 'vue'
import { ref } from 'vue'

const formData = reactive({
  username: 'Admin',
  password: 'h97rpXts8',
})
const loading = ref(false)

const accountStore = useAccountStore()

const handleSubmit = async () => {
  try {
    loading.value = true
    await accountStore.login(formData)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="d-flex fill-height" fluid align="center" justify="center">
    <v-row class="full-height" align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-form ref="form">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
          
            <v-card-text>
              <v-text-field
                variant="underlined"
                autofocus
                label="Login"
                name="login"
                prepend-icon="person"
                :rules="[v => !!v || '请输入用户名']"
                type="text"
                validate-on-blur
                v-model="formData.username"
                autocomplete="username"
              />
              <v-text-field
                variant="underlined"
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                :rules="[v => !!v || '请输入密码']"
                type="password"
                validate-on-blur
                v-model="formData.password"
                autocomplete="current-password"
              />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                :loading="loading"
                type="submit"
                @click.prevent="handleSubmit"
              >
                登录
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">

</style>
