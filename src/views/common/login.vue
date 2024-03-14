<template>
	<div class="h-full bg-login flex justify-center items-center flex-col">
		<div class="font-bold mb-40px text-26px text-gray-200">系统登录</div>
		<el-form
			ref="loginFormRef"
			:model="loginForm"
			:rules="loginRules"
			label-width="auto"
			size="large"
		>
			<el-form-item prop="username">
				<el-input
					v-model="loginForm.username"
					placeholder="Username"
					name="username"
					type="text"
				>
					<template #prefix>
						<el-icon class="el-input__icon"><User /></el-icon>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					v-model="loginForm.password"
					:type="passwordType"
					placeholder="Password"
					name="password"
				>
					<template #prefix>
						<el-icon class="el-input__icon"><Lock /></el-icon>
					</template>
					<template #suffix>
						<el-icon class="el-input__icon" @click="showPwd"
							><Hide v-if="passwordType === 'password'" /><View v-else
						/></el-icon>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					size="large"
					style="width: 100%"
					@click="handleLogin(loginFormRef)"
					>确定
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus";
import { User, Lock, View, Hide } from "@element-plus/icons-vue";

import { userStore } from "@/store/modules/user";

interface loginFormModel {
	username: string;
	password: string;
}

const router = useRouter();
const store = userStore();

const loginFormRef = ref<FormInstance>();

const loginForm: Ref<loginFormModel> = ref({
	username: "",
	password: "",
});

const loginRules: Ref<FormRules<loginFormModel>> = ref({
	username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
	password: [{ required: true, trigger: "blur", message: "请输入密码" }],
});

const passwordType: Ref<string> = ref("password");

const showPwd = (): void => {
	if (passwordType.value === "password") {
		passwordType.value = "";
	} else {
		passwordType.value = "password";
	}
};

const handleLogin = async (formEl: FormInstance | undefined): Promise<void> => {
	console.log(formEl);
	if (!formEl) return;
	try {
		// await formEl.validate();
		const loginInfo = {
			token: "123456789",
		};
		const baseInfo = {
			userId: 48,
			userName: "001",
			realName: "熊书道",
			mobile: "15121102634",
			roleIds: [1, 49],
			roleNames: ["超级管理员", "管理员"],
			resources: [
				"refundApplication",
				"basedata/equipment/channelProject/save",
				"specimen/result/sub/audit",
				"customerInfo",
			],
			resourceIds: [21, 27, 29, 30],
			resourceNames: ["辅助信息保存", "操作日志查看", "批量核收", "处理"],
			currentOrganization: {
				departmentName: null,
				labName: "塞力医检（上海）实验室",
			},
		};
		store.setToken(loginInfo.token);
		store.setBaseInfo(baseInfo);

		await router.replace({ path: "/" });
	} catch (error) {
		console.log(error);
	}
};
</script>
