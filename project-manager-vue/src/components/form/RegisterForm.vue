<template>
  <a-form
    layout="horizontal"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item>
      <a-input v-model:value="formState.user" placeholder="Username">
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
        class="w-full"
        html-type="submit"
        :disabled="formState.user === '' || formState.password === ''"
      >
        Registrovat se
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive } from "vue";
import type { UnwrapRef } from "vue";
import { notification, type FormProps } from "ant-design-vue";
import router from "@/router";

interface FormState {
  user: string;
  password: string;
}
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      user: "",
      password: "",
    });
    const handleFinish: FormProps["onFinish"] = (values) => {
       const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      };
       fetch("/api/User/Login", requestOptions)
        .then((response) => {
          notification["success"]({
            message: "Registrace proběhla úspěšně!",
            description: "Vaše registrace proběhla v pořádku, nyní budete přesměrování na hlavní stránku.",
          });
          router.push({ path: "/auth/login" });
        })
        .catch((err) => {
          notification["error"]({
            message: "Registrace se nepovedla!",
            description:
              "Zkuste zadat údaje správně",
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
