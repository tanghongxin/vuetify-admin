<script setup lang="ts">
import { sleep } from '@rthx/utils';

defineOptions({ name: 'FollowMenu' });

const wrapperRef = ref(null);
const menu = ref(false);
const x = ref<string | number>(0);
const y = ref<string | number>(0);

const show = async (e: MouseEvent) => {
  e.preventDefault();
  if (menu.value) {
    // trigger leave transition
    await sleep(120);
    menu.value = false;
  } else {
    await nextTick();
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
        absolute
        offset-y
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
