<template>
  <v-app id="v-application" class="fill-width fill-height">
    <router-view v-slot="{ Component }">
      <v-fade-transition leave-absolute mode="out-in">
        <component :is="Component" @vue:mounted="removeSpinner" />
      </v-fade-transition>
    </router-view>
    <Toast />
  </v-app>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' });

let el = document.getElementById('app_spinner_wrapper');

const removeSpinner = () => {
  if (el) {
    el.parentElement.removeChild(el);
    el = null;
  }
};
</script>
