import type { App, Directive, DirectiveBinding } from "vue";

import { usePermission } from "@/hooks/usePermission";

const isAuth = (el: Element, binding: { value?: string | string[] }): void => {
	const { hasPermission } = usePermission();

	const { value } = binding;
	if (!value) return;
	if (!hasPermission(value)) {
		el.parentNode?.removeChild(el);
	}
};

const mounted = (el: Element, binding: DirectiveBinding<any>): void => {
	isAuth(el, binding);
};

const authDirective: Directive = {
	mounted,
};

export const setupPermissionDirective = (app: App): void => {
	app.directive("permission", authDirective);
};

export default authDirective;
