import { type Router, type RouteRecordRaw } from "vue-router";
import nprogress from "nprogress";
import { userStore } from "@/store/modules/user";
import { WHITE_NAME_LIST } from "./modules";
// const logout = (): void => {};

export function createRouterGuards(router: Router): void {
	router.beforeEach(async (to, from, next) => {
		nprogress.start();
		document.title = (to.meta.title as string) || document.title;

		const store = userStore();

		const { token, addRoutes, baseInfo } = store;

		if (token) {
			if (addRoutes.length) {
				next();
			} else {
				try {
					const accessRoutes = await store.setGenerateRoutes(
						baseInfo.resources,
					);
					// dynamically add accessible routes
					accessRoutes.forEach((route: RouteRecordRaw) => {
						router.addRoute(route);
					});

					// hack method to ensure that addRoutes is complete
					// set the replace: true, so the navigation will not leave a history record
					next({ ...to, replace: true });
				} catch (error) {
					console.log(error);
				}
			}
		} else {
			if (WHITE_NAME_LIST.includes(to.path)) {
				next();
			} else {
				next(`/login`);
				nprogress.done();
			}
		}
	});

	router.afterEach(() => {
		nprogress.done();
	});

	router.onError((error) => {
		console.log(error);
		nprogress.done();
		const jsPattern = /Loading chunk (\S)+ failed/g;
		const cssPattern = /Loading CSS chunk (\S)+ failed/g;
		const isChunkLoadFailed =
			Boolean(error.message.match(jsPattern)) ||
			error.message.match(cssPattern);
		const isDynamically = error.message.includes(
			"Failed to fetch dynamically imported module",
		);
		if (Boolean(isChunkLoadFailed) || Boolean(isDynamically)) {
			if (!window.location.href.includes("#reloaded")) {
				window.location.href += "#reloaded";
				window.location.reload();
			}
		} else {
			ElMessage.error({ message: "路由错误！" });
		}
	});
}
