<template>
	<div class="h-full sider">
		<el-menu
			active-text-color="#ffd04b"
			background-color="#545c64"
			class="el-menu-vertical-demo h-full"
			:default-active="activeMenu"
			text-color="#fff"
			@open="handleOpen"
			@close="handleClose"
		>
			<sider-item
				v-for="item in menuList"
				:key="item.name"
				:item="item"
				@item-click="handleLink"
			></sider-item>
		</el-menu>
	</div>
</template>

<script lang="ts" setup>
import { type RouteRecordRaw } from "vue-router";
import department from "@/router/modules/department";
import warehouse from "@/router/modules/warehouse";
import procure from "@/router/modules/procure";
import finance from "@/router/modules/finance";
import { userStore } from "@/store/modules/user";

import SiderItem from "./SiderItem.vue";

const router = useRouter();
const route = useRoute();
const store = userStore();

const menuList: Ref<RouteRecordRaw[]> = ref([]);

const activeMenu = computed(() => {
	const { meta, path } = route;
	if (meta.activeMenu) {
		return meta.activeMenu as string;
	}
	return path;
});

const hasPermission = (tmp: RouteRecordRaw, routes: string[]): boolean => {
	if (tmp.meta?.roles) {
		return routes.some((role) => (tmp.meta?.roles as string[]).includes(role));
	} else {
		return true;
	}
};

const fitlerMenu = (
	routes: RouteRecordRaw[],
	roles: string[],
): RouteRecordRaw[] => {
	// 过滤出来
	const res: RouteRecordRaw[] = [];

	routes.forEach((route: RouteRecordRaw) => {
		const tmp = { ...route };
		if (hasPermission(tmp, roles)) {
			if (tmp.children) {
				tmp.children = fitlerMenu(tmp.children, roles);
			}
			res.push(tmp);
		}
	});

	return res;
};

const init = (): void => {
	const { curModule, baseInfo } = store;
	let temp: RouteRecordRaw[] = [];
	if (curModule === 1) {
		temp = fitlerMenu(department, baseInfo.resources);
	} else if (curModule === 2) {
		temp = fitlerMenu(warehouse, baseInfo.resources);
	} else if (curModule === 3) {
		temp = fitlerMenu(procure, baseInfo.resources);
	} else if (curModule === 4) {
		temp = fitlerMenu(finance, baseInfo.resources);
	}
	if (temp.length) {
		const { children = [] } = temp[0];
		menuList.value = children;
	}
};

const handleOpen = (key: string, keyPath: string[]): void => {
	console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]): void => {
	console.log(key, keyPath);
};

const handleLink = (o: RouteRecordRaw): void => {
	const { path } = o;
	console.log(332);
	router.push({ path }).catch(() => {});
};

onMounted(() => {
	init();
});
</script>

<style scoped lang="scss"></style>
