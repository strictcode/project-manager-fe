<script lang="ts">
import { RouterView } from "vue-router";

export default {
  props: {
    footer: String,
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      footer: new Date().getFullYear()
    }
  },
};
</script>

<template>
  <a-layout :style="{ padding: '0 24px', minHeight: '100vh' }">
    <a-layout-content style="padding: 0 50px">
      <a-layout style="padding: 24px 0">
        <a-layout-content class="flex items-center justify-center fp">
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      © {{ footer }} ProjectManager
    </a-layout-footer>
  </a-layout>
</template>

<style>
.fp {
  min-height: calc(100vh - 140px);
}
</style>
