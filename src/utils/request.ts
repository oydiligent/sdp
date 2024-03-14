import axios, {
	type AxiosRequestConfig,
	type AxiosResponse,
	type AxiosError,
} from "axios";
import { userStore } from "@/store/modules/user";
const logout = (): void => {};

interface AxiosRequestConfigRe extends AxiosRequestConfig {
	intercept?: boolean;
	loading?: { spinning: boolean; spintext?: string } | boolean;
}

const service = axios.create({
	baseURL: "/", // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 50000, // request timeout
});

const store = userStore();

// request拦截器
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const reConfig: AxiosRequestConfigRe = config;
		const { ticket } = store.baseInfo as any;
		const { loading } = reConfig;
		if (typeof loading === "boolean" && loading) {
			// store.setLoading({ spinning: true });
		} else if (loading) {
			// const { spinning, spintext } = loading;
			// store.setLoading({ spinning, spintext });
		}

		if (ticket) {
			reConfig.headers?.Authorization = ticket as string;
		}
		return reConfig;
	},
	async (error) => {
		// store.setLoading({ spinning: false });
		ElMessage.error({ message: "请求参数错误" });
		return await Promise.reject(error);
	},
);

service.interceptors.response.use(
	async (response: AxiosResponse) => {
		const { config, data: resData, status } = response;
		// store.setLoading({ spinning: false });

		if (status === 200) {
			const { intercept = true } = config as AxiosRequestConfigRe;
			if (intercept) {
				const { msg = "", code = "", data } = resData;

				if (code === "000000") {
					return await Promise.resolve(data);
				}

				const overdue: string[] = [];

				if (overdue.includes(code as string)) {
					logout();
					ElMessage({
						type: "error",
						message: msg,
					});
					return await Promise.reject(resData);
				}
				ElMessage({
					type: "error",
					message: msg,
				});
				return await Promise.reject(resData);
			}

			// 对于不做拦截统一返回所有数据
			return await Promise.resolve(response);
		}
		const error = `异常问题，请联系管理员，状态码：${status}`;
		ElMessage({
			type: "error",
			message: error,
		});
		return await Promise.reject(error);
	},
	async (error: AxiosError) => {
		// store.setLoading({ spinning: false });
		if (error.response) {
			const { status } = error.response;
			const msg = `异常问题，请联系管理员，状态码：${status}`;
			ElMessage.error({ message: msg });
		} else {
			ElMessage.error({ message: error?.message || "系统异常" });
		}

		return await Promise.reject(error);
	},
);

export const fetch = async <T = any>(
	config: AxiosRequestConfigRe,
): Promise<T> => {
	try {
		const res = await service(config);
		return Promise.resolve(res) as any;
	} catch (error) {
		return await Promise.reject(error);
	}
};

export default service;
