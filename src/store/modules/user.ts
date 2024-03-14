import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import { asyncRoutes } from "@/router/modules";

interface baseInfoModel {
	userId: number | null;
	userName: string;
	realName: string;
	mobile: string;
	roleIds: number[];
	roleNames: string[];
	resources: string[];
	resourceIds: number[];
	resourceNames: string[];
	currentOrganization: {
		departmentName: string | null;
		labName: string;
	};
}

interface userStateModel {
	token: string | null;
	baseInfo: baseInfoModel;
	addRoutes: RouteRecordRaw[];
	curModule: number | null;
}

const hasPermission = (tmp: RouteRecordRaw, routes: string[]): boolean => {
	if (tmp.meta?.roles) {
		return routes.some((role) => (tmp.meta?.roles as string[]).includes(role));
	} else {
		return true;
	}
};

const filterAsyncRoutes = (
	asyncRoutes: RouteRecordRaw[],
	routes: string[],
): RouteRecordRaw[] => {
	const res: RouteRecordRaw[] = [];

	asyncRoutes.forEach((route: RouteRecordRaw) => {
		const tmp = { ...route };
		if (hasPermission(tmp, routes)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, routes);
				if (tmp.meta?.redirect && tmp.children.length) {
					tmp.redirect = tmp.children[0].path;
				}
			}
			res.push(tmp);
		}
	});

	return res;
};

export const userStore = defineStore("user", {
	state: (): userStateModel => ({
		token: null,
		baseInfo: {
			userId: null,
			userName: "",
			realName: "",
			mobile: "",
			roleIds: [],
			roleNames: [],
			resources: [],
			resourceIds: [],
			resourceNames: [],
			currentOrganization: {
				departmentName: null,
				labName: "",
			},
		},
		addRoutes: [],
		curModule: null,
	}),
	getters: {
		getResources(state: userStateModel) {
			const { resources } = state.baseInfo;
			return resources;
		},
	},
	actions: {
		setToken(value: string) {
			this.token = value;
		},
		setBaseInfo(value: baseInfoModel) {
			this.baseInfo = value;
		},
		setCurModule(value: number | null) {
			this.curModule = value;
		},
		async setGenerateRoutes(value: string[]): Promise<RouteRecordRaw[]> {
			return await new Promise((resolve) => {
				const accessedRoutes = filterAsyncRoutes(asyncRoutes, value);
				console.log(accessedRoutes);
				this.addRoutes = accessedRoutes;
				resolve(accessedRoutes);
			});
		},
	},
	// 开启持久化
	persist: {
		key: "user",
		storage: window.sessionStorage,
		paths: ["token", "baseInfo", "curModule"],
	},
});
