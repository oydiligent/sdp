import type { RouteRecordRaw } from "vue-router";
import department from "./department";
import warehouse from "./warehouse";
import procure from "./procure";
import finance from "./finance";

// 白名单路由，应该包含基础静态路由
export const WHITE_NAME_LIST: string[] = ["/login"];

// 多个子模块合并成异步路由
export const asyncRoutes: RouteRecordRaw[] = [
	...department,
	...warehouse,
	...procure,
	...finance,
];
