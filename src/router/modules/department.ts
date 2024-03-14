import { type Component } from "vue";
import type { RouteRecordRaw } from "vue-router";

const Layout = (): Component => import("@/layouts/defualt/index.vue");

const Account = (): Component =>
	import("@/views/department/system/account.vue");
const Role = (): Component => import("@/views/department/system/role.vue");

const SettingO = (): Component =>
	import("@/views/department/basicSetting/settingO.vue");

const department: RouteRecordRaw[] = [
	{
		path: "/department",
		name: "department",
		component: Layout,
		meta: {
			title: "科室作业",
			isMenu: true,
			redirect: true,
			roles: ["refundApplication"],
		},
		children: [
			{
				path: "/department/system",
				name: "system",
				meta: {
					title: "系统管理",
					isMenu: true,
					redirect: true,
				},
				children: [
					{
						path: "/department/system/account",
						name: "account",
						meta: {
							title: "账号管理",
							isMenu: true,
							roles: ["refundApplication"],
						},
						component: Account,
					},
					{
						path: "/department/system/role",
						name: "role",
						meta: {
							title: "角色管理",
							isMenu: true,
							roles: ["refundApplication"],
						},
						component: Role,
					},
					{
						path: "/department/system/role/detail",
						name: "roleDetail",
						meta: {
							title: "角色管理详情",
							isMenu: false,
							activeMenu: "/department/system/role", // 针对详情对应激活目录
							roles: ["refundApplication"],
						},
						component: Role,
					},
				],
			},
			{
				path: "/department/basic-setting",
				name: "basicSetting",
				meta: {
					title: "基础设置",
					isMenu: true,
					redirect: true,
				},
				children: [
					{
						path: "/department/basic-setting/setting-1",
						name: "setting-1",
						meta: {
							title: "设置-1",
							isMenu: true,
							roles: ["specimen/result/sub/audit"],
						},
						component: SettingO,
					},
				],
			},
		],
	},
];

export default department;
