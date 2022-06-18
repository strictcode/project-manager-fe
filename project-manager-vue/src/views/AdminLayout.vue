<script lang="ts">
import { RouterView } from "vue-router";
import router from "@/router";
import { notification } from "ant-design-vue";
import {
  DashboardOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { UserDTO } from "@/models/user.dto";
export default defineComponent({
  components: {
    DashboardOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined
  },
  props: {
    footer: String,
  },
  methods: {
    async logout() {
      try {
        await fetch('/api/User/Logout', { method: 'POST'});
        notification["success"]({
          message: "Odhlášení proběhlo úspěšně!",
          description: "Přesměrovávám na login.",
        });
      } catch(err){
        console.log(err);
      }
      router.push({ path: "/auth/login" });
    }
  },
  data() {
    return {
      user: new UserDTO(),
      // eslint-disable-next-line vue/no-dupe-keys
      footer: new Date().getFullYear(),
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
    };
  },
  async created() {
    const data = await (await fetch('/api/User/UserInfo')).json();
    this.user = data;
  }
});
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header class="header px-3 bg-primary-900">
      <div class="logo">
        <h1 class="inline-block float-left pt-3 text-white text-3xl" style="margin-right: calc(75vw - 228px);">Project Manager</h1>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal"
        class="bg-primary-900 header-menu" :style="{ lineHeight: '64px' }">
        <a-menu-item key="user" class="user-section">
          <a-avatar size="large" class="float-left inline-block mt-4 mr-5">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <section v-if="user" class="float-left flex py-2 flex-col justify-evenly h-full text-white text user-info">
            <span class="text-lg">{{ user.userName }}</span>
            <span class="text-slate-400">{{ user.userName }}</span>
          </section>
        </a-menu-item>
        <a-menu-item key="logout" v-on:click="logout()">
          <logout-outlined class="mr-2" /> Odhlásit se
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="250" style="background: #fff">
        <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
          <a-menu-item key="1">
            <dashboard-outlined />
            <span>Projekty</span>
          </a-menu-item>
          <a-menu-item key="2">
            <team-outlined />
            <span>Uživatelé</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <RouterView />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style>
.anticon {
  vertical-align: 2px;
}

.header-menu {
  background: rgb(11 49 102 / var(--tw-bg-opacity)) !important;
}

.user-info {
  line-height: 64px;
}

.user-info span {
  line-height: initial;
}
</style>
