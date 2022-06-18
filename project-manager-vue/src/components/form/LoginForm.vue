<template>
  <a-form
    layout="horizontal"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item>
      <a-input v-model:value="formState.email" placeholder="Username">
        <template #prefix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-model:value="formState.password"
        type="password"
        placeholder="Password"
      >
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        class="uppercase font-semibold py-3 h-auto rounded-md w-full"
        html-type="submit"
        :disabled="formState.email === '' || formState.password === ''"
      >
        Přihlásit se
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" mount>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive } from "vue";
import { notification } from "ant-design-vue";
import type { UnwrapRef } from "vue";
import type { FormProps } from "ant-design-vue";
import router from "@/router";

interface FormState {
  email: string;
  password: string;
}
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      email: "",
      password: "",
    });
    const handleFinish: FormProps["onFinish"] = (values) => {
      console.log(values, formState);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      };
      fetch("/api/User/Login", requestOptions)
        .then((response) => {
          notification["success"]({
            message: "Přihlášení proběhlo úspěšně!",
            description: "Přesměrovávám na dashboard s projekty.",
          });
          router.push({ path: "/admin/projects" });
        })
        .catch((err) => {
          notification["error"]({
            message: "Přihlášení se nezdařilo!",
            description:
              "Zadal jste špatné přihlašovací údaje, zkuste zkontrolovat vaše údaje a přihlásit se znovu.",
          });
        });
    };
    const handleFinishFailed: FormProps["onFinishFailed"] = (errors) => {
      console.log(errors);
    };
    return {
      formState,
      handleFinish,
      handleFinishFailed,
    };
  },
});
</script>
