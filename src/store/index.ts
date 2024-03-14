import { createPinia } from "pinia";
import persistedstate from "pinia-plugin-persistedstate";
import type { App } from "vue";

const store = createPinia();

store.use(persistedstate);

export const setupStore = (app: App): void => {
	app.use(store);
};

export { store };
