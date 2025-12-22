import { Elysia, t } from "elysia";
import {
	createClaimRequest,
	getAllClaimRequests,
	getClaimRequestsById,
	updateClaimRequestStatus,
	deleteClaimRequest,
} from "./service";
import { ClaimRequest } from "./model";
import { adminOnly } from "@/backend/utils/admin-middleware";

const claimRequestsModule = new Elysia({ prefix: "/claim-requests", tags: ["Claim Requests"] })
	.get(
		"/",
		async () => {
			return await getAllClaimRequests();
		},
		{
			detail: {
				summary: "Get all claim requests",
				description: "Mengambil semua permintaan klaim barang.",
			},
		},
	)

	.get(
		"/:id",
		async ({ params, set }) => {
			const data = await getClaimRequestsById(Number(params.id));
			if (!data) {
				set.status = 404;
				return { message: "Claim request not found" };
			}
			return data;
		},
		{
			detail: {
				summary: "Get claim request by ID",
				description: "Mengambil permintaan klaim barang berdasarkan ID.",
			},
		},
	)

	.post(
		"/",
		async ({ body, set }) => {
			await createClaimRequest(body);
			set.status = 201;
			return { message: "Claim request created successfully" };
		},
		{
			body: ClaimRequest.createBody,
			detail: {
				summary: "Create a new claim request",
				description: "Membuat permintaan klaim barang baru.",
			},
		},
	)

	.patch(
		"/:id/status",
		async ({ params, body }) => {
			await updateClaimRequestStatus(Number(params.id), body.status);
			return { message: "Status updated successfully" };
		},
		{
			beforeHandle: [adminOnly],
			params: t.Object({
				id: t.String(),
			}),
			body: ClaimRequest.updateStatusBody,
			detail: {
				summary: "Update claim request status",
				description: "Memperbarui status permintaan klaim barang.",
			},
		},
	)

	.delete(
		"/:id",
		async ({ params, set }) => {
			await deleteClaimRequest(Number(params.id));
			set.status = 204;
			return null;
		},
		{
			beforeHandle: [adminOnly],
			params: t.Object({
				id: t.String(),
			}),
			detail: {
				summary: "Delete a claim request",
				description: "Menghapus permintaan klaim barang.",
			},
		},
	);

export default claimRequestsModule;
