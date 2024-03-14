<template>
	<div class="header">
		<div class="flex h-50px">
			<!-- <el-icon><setting /></el-icon> -->
			<breadcrumb />
			<right-menu />
		</div>
		<div>进入后的一排菜单</div>
	</div>
</template>

<script lang="ts" setup>
import Breadcrumb from "./components/Breadcrumb.vue";
import RightMenu from "./components/RightMenu.vue";
</script>

<style scoped lang="scss"></style>
