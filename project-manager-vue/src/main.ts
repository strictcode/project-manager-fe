import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { DatePicker, Card, Layout, Form, Input, Button, Menu, Avatar, Breadcrumb, Empty, Badge } from 'ant-design-vue';
import './assets/index.css';

const app = createApp(App);

app.use(router);
app.use(Layout);
app.use(Avatar);
app.use(Card);
app.use(Form);
app.use(Input);
app.use(Button);
app.use(Menu);
app.use(DatePicker);
app.use(Breadcrumb);
app.use(Empty);
app.use(Badge);
app.mount("#app");
