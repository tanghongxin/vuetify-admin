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
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <!-- <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon>mdi-code-tags</v-icon>
                </v-btn> -->
              </template>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  href="https://codepen.io/johnjleider/pen/pMvGQO"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon>mdi-codepen</v-icon>
                </v-btn>
              </template>
              <span>Codepen</span>
            </v-tooltip>
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
              v-text="'登陆'"
              @click="$refs['form'].validate() && handleSubmit()"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { login } from 'api/account'
import { mapMutations } from 'vuex'

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
    ...mapMutations({
      setPermissions: 'account/setPermissions',
      setMenus: 'account/setMenus',
      setToken: 'account/setToken',
      buildRoutes: 'account/buildRoutes',
    }),
    async handleSubmit () {
      try {
        this.loading = true
        const { data } = await login(this.formData)
        this.setPermissions(data.permissons)
        this.setMenus(data.menus)
        this.setToken(data.token)
        this.buildRoutes()
        this.$router.push('/project/list')
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
