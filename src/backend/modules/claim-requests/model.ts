import { t } from "elysia";

export namespace ClaimRequest {
	export const createBody = t.Object({
		foundItemId: t.Number(),

		claimantName: t.String(),
		claimantNim: t.Optional(t.String()),
		contactPhone: t.String(),

		ownershipProofText: t.String(),
		ownershipProofImageUrl: t.Optional(t.String()),
	});

	export const updateStatusBody = t.Object({
		status: t.Union([t.Literal("PENDING"), t.Literal("APPROVED"), t.Literal("REJECTED")]),
	});
	export type createInput = typeof createBody.static;
	export type updateStatusInput = typeof updateStatusBody.static;
}
