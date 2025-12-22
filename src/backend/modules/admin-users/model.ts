import { t } from "elysia";

export namespace AdminUser {
	export const loginBody = t.Object({
		username: t.String(),
		password: t.String(),
	});

	export type loginBody = typeof loginBody.static;
}
