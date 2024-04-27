<script setup lang="ts">
import { sleep } from '@rthx/utils';

defineOptions({ name: 'FollowMenu' });

const wrapperRef = ref<Element>(null);
const menu = ref<boolean>(false);
const x = ref<string | number>(0);
const y = ref<string | number>(0);

const show = async (e: MouseEvent) => {
  e.preventDefault();
  if (menu.value) {
    menu.value = false;
    await sleep(130);
  }
  x.value = `${e.clientX}px`;
  y.value = `${e.clientY}px`;
  menu.value = true;
};

defineExpose({
  show,
});
</script>

<template>
  <Teleport to="body">
    <div ref="wrapperRef" class="FollowMenu">
      <v-menu
        v-model="menu"
        :attach="wrapperRef"
        location="end"
        transition="scale-transition"
      >
        <slot />
      </v-menu>
    </div>
  </Teleport>
</template>

<style lang="scss">
.FollowMenu {
  .v-overlay__content {
    top: v-bind(y);
    left: v-bind(x);
  }
}
</style>
