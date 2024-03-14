<template>
	<div class="h-full bg-blue-200 p-40px grid grid-cols-3 gap-20px">
		<el-card
			v-for="item in filterModules"
			:key="item.key"
			style="max-width: 480px; cursor: pointer"
			@click="handleToModule(item)"
		>
			<el-image style="width: 100%" :src="item.icon" fit="fill" />
			<template #footer>{{ item.name }}</template>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { type RouteRecordRaw } from "vue-router";
import department from "@/router/modules/department";
import warehouse from "@/router/modules/warehouse";
import procure from "@/router/modules/procure";
import finance from "@/router/modules/finance";
import { userStore } from "@/store/modules/user";

const router = useRouter();
const store = userStore();
interface modulesModel {
	key: number;
	name: string;
	icon: string;
	roles: string[];
}

const modules: Ref<modulesModel[]> = ref([
	{
		key: 1,
		roles: ["refundApplication"],
		name: "科室作业",
		icon: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
	},
	{
		key: 2,
		roles: ["refundApplication"],
		name: "仓库作业",
		icon: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
	},
	{
		key: 3,
		roles: ["refundApplication"],
		name: "采购管理",
		icon: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
	},
	{
		key: 4,
		roles: ["refundApplication"],
		name: "财务管理",
		icon: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
	},
]);

const filterModules = computed(() => {
	const { resources } = store.baseInfo;

	return modules.value.filter(({ roles }) =>
		roles.some((role) => resources.includes(role)),
	);
});

const hasPermission = (tmp: RouteRecordRaw, routes: string[]): boolean => {
	const { meta, path } = tmp;

	if (!meta?.isMenu ?? !path) {
		return false;
	} else if (meta?.roles) {
		return routes.some((role) => (meta?.roles as string[]).includes(role));
	} else {
		return true;
	}
};

const fitlerUrl = (
	routes: RouteRecordRaw[],
	roles: string[],
): RouteRecordRaw[] => {
	// 过滤出来
	let res: RouteRecordRaw[] = [];

	routes.forEach((route: RouteRecordRaw) => {
		const tmp = { ...route };
		if (tmp.children) {
			res = [...res, ...fitlerUrl(tmp.children, roles)];
		} else if (hasPermission(tmp, roles)) {
			res.push(tmp);
		}
	});

	return res;
};

const handleToModule = (item: modulesModel): void => {
	// 跳转到模块的第一个有权限的路由，需遍历
	const { key, name } = item;
	const { baseInfo } = store;
	let temp: RouteRecordRaw[] = [];
	if (key === 1) {
		temp = fitlerUrl(department, baseInfo.resources);
	} else if (key === 2) {
		temp = fitlerUrl(warehouse, baseInfo.resources);
	} else if (key === 3) {
		temp = fitlerUrl(procure, baseInfo.resources);
	} else if (key === 4) {
		temp = fitlerUrl(finance, baseInfo.resources);
	}
	if (temp.length) {
		const { path } = temp[0];
		store.setCurModule(key);
		router.push({ path }).catch(() => {});
	} else {
		ElMessage.error({ message: `暂无${name}权限` });
	}
};
</script>
