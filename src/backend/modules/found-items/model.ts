import { t } from "elysia";

export namespace FoundItem {
	export const createBody = t.Object({
		finderName: t.String(),
		finderNim: t.Optional(t.String()),
		contactPhone: t.String(),

		itemName: t.String(),
		description: t.Optional(t.String()),
		foundLocation: t.String(),
		foundDate: t.String(),
		photoUrl: t.Optional(t.String()),
	});

	export const updateStatusBody = t.Object({
		status: t.Union([t.Literal("AVAILABLE"), t.Literal("CLAIMED")]),
	});

	export type createInput = typeof createBody.static;
	export type updateStatusInput = typeof updateStatusBody.static;
}
