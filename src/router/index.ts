import {
	createRouter,
	createWebHistory,
	type RouteRecordRaw,
} from "vue-router";
import type { App } from "vue";

import { createRouterGuards } from "./permission";
import { WHITE_NAME_LIST } from "./modules";
import basicRoutes from "./modules/common";

// 多个子项目合并成异步路由
// export const asyncRoutes: RouteRecordRaw[] = [];

const getRouteNames = (arr: RouteRecordRaw[]): void => {
	arr.forEach((item: RouteRecordRaw) => {
		if (item.children && item.children.length > 0) {
			getRouteNames(item.children);
		}
	});
};

getRouteNames(basicRoutes);

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_APP_ROUTER_URL as string),
	routes: basicRoutes as unknown as RouteRecordRaw[],
	strict: true, // 严格检查路径末尾是否有尾部斜线（/）。默认为 false，意味着默认情况下，路由 /users 同时匹配 /users 和 /users/。注意这也可以在路由级别上设置。
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

// reset router
export function resetRouter(): void {
	router.getRoutes().forEach((route) => {
		const { name } = route;
		if (name && !WHITE_NAME_LIST.includes(name as string)) {
			router.hasRoute(name) && router.removeRoute(name);
		}
	});
}

// config router
export function setupRouter(app: App<Element>): void {
	app.use(router);
	// 创建路由守卫
	createRouterGuards(router);
}

export default router;
