<template>
	<div class="flex">
		<div class="system-wrap">系统管理子系统</div>
		<el-dropdown
			class="avatar-container right-menu-item hover-effect"
			trigger="hover"
		>
			<div class="avatar-wrapper">
				<i class="el-icon-caret-bottom" />
				<span>name</span>
			</div>
			<template v-slot:dropdown>
				<el-dropdown-menu>
					<router-link to="/">
						<el-dropdown-item>首页</el-dropdown-item>
					</router-link>
					<a target="_blank" href="https://github.com/oydiligent/sdp.git">
						<el-dropdown-item>Github</el-dropdown-item>
					</a>
					<el-dropdown-item divided @click="logout">
						<span style="display: block">退出</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script lang="ts" setup>
const router = useRouter();
const logout = (): void => {
	// 清缓存退出
	router.push({ path: "/login" }).catch(() => {});
};
</script>
