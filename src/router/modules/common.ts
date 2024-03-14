import type { RouteRecordRaw } from "vue-router";
import { type Component } from "vue";

const Login = (): Component => import("@/views/common/login.vue");
const NotFound = (): Component => import("@/views/common/notFound.vue");
const Home = (): Component => import("@/views/home/index.vue");

const commonRoutes: RouteRecordRaw[] = [
	{
		path: "/login",
		name: "login",
		component: Login,
	},
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/404",
		name: "404",
		component: NotFound,
	},
];

export default commonRoutes;
