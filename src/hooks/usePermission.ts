import { userStore } from "@/store/modules/user";
import { isArray } from "lodash-es";

export const usePermission = (): {
	hasPermission: (value?: string | string[], def?: boolean) => boolean;
} => {
	const store = userStore();

	const hasPermission = (value?: string | string[], def = true): boolean => {
		if (!value) {
			return def;
		}

		const { getResources } = store;

		if (value && !isArray(value)) {
			return getResources.includes(value);
		}

		if (isArray(value) && value.length > 0) {
			const flag = getResources.filter((t: string) => {
				return value.includes(t);
			});

			return flag.length > 0;
		}

		return true;
	};

	return { hasPermission };
};
