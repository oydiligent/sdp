import type { RouteRecordRaw } from "vue-router";

const Login = async (): Promise<any> =>
	await import("@/views/common/login.vue");

const warehouse: RouteRecordRaw[] = [
	{
		path: "/two-a",
		name: "two-a",
		meta: {
			roles: ["specimen/result/sub/audit"],
		},
		component: Login,
	},
];

export default warehouse;
