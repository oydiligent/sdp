<template>
	<el-container class="h-full">
		<el-aside width="240px">
			<Sider />
		</el-aside>
		<el-container>
			<el-header>
				<Header />
			</el-header>
			<el-main>
				<Content />
			</el-main>
		</el-container>
	</el-container>
</template>

<script lang="ts" setup>
import Sider from "./components/sider/index.vue";
import Header from "./components/header/index.vue";
import Content from "../content/index.vue";
</script>
