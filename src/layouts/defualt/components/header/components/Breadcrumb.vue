<template>
	<el-breadcrumb class="" separator="/">
		<!-- <transition-group name="breadcrumb"> -->
		<el-breadcrumb-item
			v-for="(item, index) in levelList"
			:key="item.path"
			:to="{ path: index === 0 ? '/' : item.path }"
		>
			<span>{{ index === 0 ? "首页" : item.meta?.title }}</span>
		</el-breadcrumb-item>
		<!-- </transition-group> -->
	</el-breadcrumb>
</template>

<script lang="ts" setup>
import { type RouteRecordRaw } from "vue-router";

const route = useRoute();
const levelList: Ref<RouteRecordRaw[]> = ref([]);

const getBreadcrumb = (): void => {
	const { matched } = route;
	levelList.value = [...matched];
};

watch(
	() => route.path,
	() => {
		getBreadcrumb();
	},
);

onMounted(() => {
	getBreadcrumb();
});
</script>
