import AdminLayoutVue from "@/views/AdminLayout.vue";
import PublicLayoutVue from "@/views/PublicLayout.vue";
import DashboardViewVue from "@/views/DashboardView.vue";
import LoginViewVue from "@/views/LoginView.vue";
import RegisterViewVue from "@/views/RegisterView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      component: AdminLayoutVue,
      beforeEnter: async (to, from) => {
        // reject the navigation
        try{
   
          const userResponse = await fetch("/api/User/UserInfo");
          if( userResponse.status === 200){
            return true;
          } else {
            router.push({ path: "/auth/login" });
          }
    
        } catch(error) { }
        return false;
        
      },
      children: [
        { path: "projects", name: "Projects", component: DashboardViewVue}
      ]
    },
    {
      path: "/auth",
      component: PublicLayoutVue,
      children: [
        { path: "login", name: "Login", component: LoginViewVue},
        { path: "register", name: "Register", component: RegisterViewVue}
      ]
    },
    { path: '', redirect: { name: 'Login' }}
  ],
});

export default router;
