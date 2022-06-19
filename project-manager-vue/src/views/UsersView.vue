<script lang="ts">
import { defineComponent, ref } from "vue";
import type { UserDTO } from "@/models/user.dto";
import type { IssueDTO } from "@/models/issue.dto";
import { StatusEnum } from "@/models/status.enum";
import { RouterLink } from "vue-router";
export default defineComponent({
  components: {},
  methods: {
    async getData() {
      try {
        this.users = await (await fetch("/api/User")).json();
      } catch (err) {
        console.log(err);
      }
    }
  },
  data() {
    return {
      users: ref<UserDTO[]>([]),
    };
  },
  async created() {
    this.getData();
  },
});
</script>
<template>
  <section class="p-5 h-full">
    <section class="columns-2 mb-2">
      <h1 class="text-3xl font-bold text-primary-900">Uživatelé</h1>
    </section>

    <a-breadcrumb class="mb-4">
      <a-breadcrumb-item>
        <RouterLink to="/admin/Projects">Administrace</RouterLink>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <RouterLink to="/admin/users">Uživatelé</RouterLink>
      </a-breadcrumb-item>
    </a-breadcrumb>

    <section v-if="users.length > 0">
      <section class="grid grid-cols-3 gap-4 pt-2">
        <section v-for="user in users" :key="user.id" class="bg-white p-5 shadow-md rounded-md">
          <h2 class="text-xl font-bold ">{{ user.mail }}</h2>
        </section>
      </section>
    </section>
    <section v-else>
      <a-empty />
    </section>
  </section>
</template>
