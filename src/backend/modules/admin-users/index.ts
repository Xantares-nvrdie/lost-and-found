import { Elysia, t } from "elysia";
import {AdminUserService} from "./service";
import { AdminUser } from "./model";
import { adminOnly } from "@/backend/utils/admin-middleware";

const adminUsersModule = new Elysia({ prefix: "/admin-users", tags: ["Admin Users"] })

	.post(
		"/login",
		async ({ body, set }) => {
			const result = await AdminUserService.login(body.username, body.password);

			if (!result) {
				set.status = 401;
				return { message: "Invalid credentials" };
			}

			return result; // { token }
		},
		{
			body: AdminUser.loginBody,
			detail: {
				summary: "Admin user login",
				description: "Endpoint for admin users to log in and receive a JWT token.",
			},
		},
	)

	.post(
		"/",
		async ({ body, set }) => {
			await AdminUserService.create(body.username, body.password);
			set.status = 201;
			return { message: "Admin user created successfully" };
		},
		{
			beforeHandle: [adminOnly],
			body: AdminUser.loginBody,
			detail: {
				summary: "Create a new admin user",
				description: "Endpoint to create a new admin user with a username and password.",
			},
		},
	)

	.delete(
		"/:id",
		async ({ params, set }) => {
			await AdminUserService.delete(Number(params.id));
			set.status = 204;
			return null;
		},
		{
			beforeHandle: [adminOnly],
			params: t.Object({
				id: t.String(),
			}),
			detail: {
				summary: "Delete an admin user",
				description: "Endpoint to delete an admin user by their ID.",
			},
		},
	);

export default adminUsersModule;
