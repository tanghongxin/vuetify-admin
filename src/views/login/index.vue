<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
            >
              <v-text-field
                label="Login"
                name="login"
                prepend-icon="person"
                :rules="[v => !!v || '请输入用户名']"
                type="text"
                validate-on-blur
                v-model="formData.username"
              />
              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                :rules="[v => !!v || '请输入密码']"
                type="password"
                validate-on-blur
                v-model="formData.password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :loading="loading"
              type="submit"
              @click="$refs['form'].validate() && handleSubmit()"
            >
              登录
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { AccountActions } from '@/store/modules/account'

export default {
  name:'Login',
  data: () => ({
    formData: {
      username: '',
      password: '',
    },
    loading: false,
  }),
  methods: {
    ...mapActions('account', {
      login: AccountActions.LOGIN,
    }),
    async handleSubmit () {
      try {
        this.loading = true
        await this.login(this.formData)
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
