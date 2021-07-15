<template>
  <div class="exception fill-width d-flex flex-column justify-center align-center">
    <div class="exception-img mb-6" />
    <h1>{{ config.title }}</h1>
    <h2>{{ config.desc }}</h2>
    <div class="mt-6">
      <v-btn type="primary" depressed class="primary mr-4" @click="$router.push('/home')">
        返回首页
      </v-btn>
      <v-btn type="primary" depressed class="primary" @click="logout">
        重新登录
      </v-btn>
    </div>
  </div>
</template>

<script>
import config from './config'
import { mapActions, mapGetters, mapState } from 'vuex'
import { AccountActions } from '@/store/modules'

export default {
  name: 'Exception',
  computed: {
    ...mapState('runTime', ['openedRoutes']),
    ...mapGetters('account', ['hasLoggedIn']),
    config () {
      return config[this.$route.params.type]
    },
  },
  methods: {
    ...mapActions('account', {
      logout: AccountActions.LOGOUT,
    }),
  },
}
</script>

<style lang="scss">
.exception {
  height: 85%;
  
  &-img {
    background-image: url('~@/assets/error.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 240px;
    width: 360px;
  }
}
</style>
