import { t } from "elysia";

export namespace LostReport {
	export const createBody = t.Object({
		reporterName: t.String(),
		reporterContact: t.String(),
		reporterNim: t.Optional(t.String()),

		itemName: t.String(),
		itemDescription: t.String(),
		lastLocation: t.String(),
		lostDate: t.String(),
		photoUrl: t.Optional(t.String()),
	});

	export const updateStatusBody = t.Object({
		status: t.Union([t.Literal("OPEN"), t.Literal("MATCHED"), t.Literal("CLOSED")]),
	});

	export type createInput = typeof createBody.static;
	export type updateStatusInput = typeof updateStatusBody.static;
}
