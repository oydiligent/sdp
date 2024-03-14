import type { RouteRecordRaw, RouteLocationNormalized } from "vue-router";

import { useProjectStore } from "@/store/modules/project";

export const handleBeforeEnter = (to: RouteLocationNormalized): void => {
	const { meta, name } = to;
	if (meta?.cache) {
		const store = useProjectStore();
		store.setKeepAlives(name as string);
	}
};

export const castToFlatRoute = (
	routes: RouteRecordRaw[],
	flatRoutes: RouteRecordRaw[] = [],
): RouteRecordRaw[] => {
	routes.forEach((item) => {
		if (item.children) {
			const iitem = { ...item };
			delete iitem.children;
			flatRoutes.push({ ...iitem });
			castToFlatRoute(item.children, flatRoutes);
		} else {
			flatRoutes.push({ ...item });
		}
	});

	return flatRoutes;
};

// 生成扁平化机构路由(仅两级结构)
export const generateFlatRoutes = (
	routes: RouteRecordRaw[],
): RouteRecordRaw[] => {
	const newRoutes: RouteRecordRaw[] = routes.map((item: RouteRecordRaw) => {
		const { children = [] } = item;
		return {
			...item,
			children: castToFlatRoute(children),
		};
	});

	return newRoutes;
};
