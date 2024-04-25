<script setup lang="ts">
import { useAccountStore } from '@/store/modules/account';
import { useSettingStore } from '@/store/modules/settings';
import RecursiveMenus from './LayoutRecursiveMenus.vue';

defineOptions({
  name: 'AppNavigation',
});

const accountStore = useAccountStore();

const { toggleAppNavigation } = useSettingStore();
const { permanentNavigation, navigation } = storeToRefs(useSettingStore());
</script>

<template>
  <v-navigation-drawer
    :model-value="permanentNavigation || navigation"
    :permanent="permanentNavigation"
    @update:model-value="toggleAppNavigation"
  >
    <RecursiveMenus :items="accountStore.menus" />
  </v-navigation-drawer>
</template>
