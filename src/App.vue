<template>
  <v-app id="v-application" class="fill-width fill-height">
    <router-view v-slot="{ Component }">
      <v-fade-transition leave-absolute mode="out-in">
        <component :is="Component" />
      </v-fade-transition>
    </router-view>
    <Toast />
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
