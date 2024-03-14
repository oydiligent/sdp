<template>
	<el-sub-menu v-if="props.item.children?.length" :index="props.item.path">
		<template #title>
			<!-- <el-icon><setting /></el-icon> -->
			<span>{{ props.item.name }}</span>
		</template>
		<sidebar-item
			v-for="i in props.item.children"
			:key="i.path"
			:item="i"
			@item-click="onItemClick"
		></sidebar-item>
	</el-sub-menu>
	<el-menu-item
		v-else-if="props.item.meta?.isMenu"
		:index="props.item.path"
		@click="onItemClick(props.item)"
	>
		<span>{{ props.item.name }}</span>
	</el-menu-item>
</template>

<script lang="ts" setup>
import { type RouteRecordRaw } from "vue-router";

interface Props {
	item: RouteRecordRaw;
}
const props = defineProps<Props>();
const emit = defineEmits(["item-click"]);

const onItemClick = (o: RouteRecordRaw): void => {
	emit("item-click", o);
};
</script>

<script lang="ts">
export default {
	name: "sidebar-item",
};
</script>
