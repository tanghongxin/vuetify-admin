<script setup lang="ts">
import { useTagsViewStore } from '@/store/modules/tagsView';
import Manager from './Manager.vue';
import Breadcrumbs from './Breadcrumbs.vue';

defineOptions({ name: 'TagsView' });

const tagsViewStore = useTagsViewStore();
const route = useRoute();
const targetIndex = ref(-1);
const followMenuRef = ref<IOGC<'FollowMenu'>>(null);

onMounted(() => {
  tagsViewStore.useActivate();
});

onBeforeUnmount(() => {
  tagsViewStore.useDeactivated();
});

const ctxMenu = (e: MouseEvent, index: number) => {
  targetIndex.value = index;
  followMenuRef.value.show(e);
};
</script>

<template>
  <div class="fill-width">
    <v-tabs
      :model-value="route.fullPath"
      show-arrows
      slider-color="primary darken-1"
      :height="48"
      @update:modelValue="() => {}"
    >
      <v-tab
        v-for="(r, index) in tagsViewStore.views"
        :key="r.name"
        :value="r.fullPath"
        :exact="r.name === route.name"
        :to="r.fullPath"
        @contextmenu="ctxMenu($event, index)"
      >
        <span class="subtitle-1">{{ r.name }}</span>
        <v-spacer tag="span" />
        <v-btn
          icon
          ripple
          small
          variant="text"
          @click.prevent="tagsViewStore.close(index)"
        >
          <v-icon small> close </v-icon>
        </v-btn>
      </v-tab>
    </v-tabs>
    <v-divider />
    <Breadcrumbs />
    <FollowMenu ref="followMenuRef">
      <Manager
        :targetIndex
        @close="tagsViewStore.close"
        @closeRight="tagsViewStore.closeRight"
        @closeLeft="tagsViewStore.closeLeft"
        @closeOthers="tagsViewStore.closeOthers"
      />
    </FollowMenu>
  </div>
</template>

<style lang="scss"></style>
