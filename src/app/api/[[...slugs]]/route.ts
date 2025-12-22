import { Elysia, t } from "elysia";
import { fromTypes, openapi } from "@elysiajs/openapi";

import foundItemsModule from "@/backend/modules/found-items";
import lostReportsModule from "@/backend/modules/lost-reports";
import claimRequestsModule from "@/backend/modules/claim-requests";
import adminUsersModule from "@/backend/modules/admin-users";

export const app = new Elysia({ prefix: "/api" })
	.use(
		openapi({
			path: "/labs",
			references: fromTypes("route.ts"),
			documentation: {
				info: {
					title: "OSTRIC Labs API",
					version: "alpha 0.0.1",
					description: "Automatically generated documentation and testing for easier development.",
				},
				tags: [],
			},
			scalar: {
				defaultModelExpandDepth: -1,
				operationsSorter: "method",
			},
		}),
	)

	.use(foundItemsModule)
	.use(lostReportsModule)
	.use(claimRequestsModule)
	.use(adminUsersModule);

export type app = typeof app;

export const GET = app.fetch;
export const POST = app.fetch;
export const PUT = app.fetch;
export const PATCH = app.fetch;
export const DELETE = app.fetch;
