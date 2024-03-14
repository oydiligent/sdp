import { createApp } from "vue";
import "nprogress/nprogress.css";
import { setupPermissionDirective } from "@/directives/permission";
import "./styles/index.scss";
import "virtual:windi.css";
import "virtual:windi-devtools";
import App from "./App.vue";
import { setupStore } from "@/store";
import { setupRouter } from "@/router";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App);
setupStore(app);
setupRouter(app);
// 注册权限指令
setupPermissionDirective(app);
app.mount("#app");
