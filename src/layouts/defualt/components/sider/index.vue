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
import { userStore } from "@/store/modules/user";

import SiderItem from "./SiderItem.vue";

const router = useRouter();
const route = useRoute();
const store = userStore();

const menuList = computed(() => {
	const { addRoutes, curModule } = store;
	if (!addRoutes.length) {
		return [];
	} else if (curModule === 1) {
		return addRoutes[0].children;
	} else if (curModule === 2) {
		return addRoutes[1].children;
	} else if (curModule === 3) {
		return addRoutes[2].children;
	} else if (curModule === 4) {
		return addRoutes[3].children;
	} else {
		return [];
	}
});

const activeMenu = computed(() => {
	const { meta, path } = route;
	if (meta.activeMenu) {
		return meta.activeMenu as string;
	}
	return path;
});

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
</script>

<style scoped lang="scss"></style>
