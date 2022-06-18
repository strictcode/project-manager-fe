<script setup lang="ts">
import RegisterForm from "@/components/form/RegisterForm.vue";
import { RouterLink } from "vue-router";
</script>
<template>
  <section class="p-10 rounded-3xl shadow-lg bg-white w-80 lg:w-1/4">
    <header class="mb-4 text-center">
      <h1 class="text-3xl font-bold my-3">ProjectManager</h1>
      <h2 class="text-center text-xl font-bold my-3">Registrace</h2>
    </header>
    <main>
      <RegisterForm></RegisterForm>
    </main>
    <footer>
      <p class="">
        Zpátky na login. Klikněte
        <RouterLink class="p-0 underline" to="/auth/login">zde.</RouterLink>
      </p>
    </footer>
  </section>
</template>

<style></style>
