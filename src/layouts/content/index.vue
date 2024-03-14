<template>
	<div class="layout-content">
		<Suspense>
			<template #default>
				<router-view v-slot="{ Component, route }">
					<transition name="fade-transform" mode="out-in">
						<keep-alive :include="getKeepAlives">
							<component
								:is="Component"
								:key="route.meta.usePathKey ? route.path : undefined"
							/>
						</keep-alive>
					</transition>
				</router-view>
			</template>
			<template #fallback>Loading...</template>
		</Suspense>
	</div>
</template>

<script lang="ts" setup>
const getKeepAlives: Ref<string[]> = [];
</script>

<style lang="scss" scoped>
.layout-content {
	box-shadow: 6px 0px 18px rgba(144, 164, 183, 0.69);
	overflow: auto;
}
</style>
