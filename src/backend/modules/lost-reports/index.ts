import { Elysia, t } from "elysia";
import { LostReportService } from "./service";
import { LostReport } from "./model";
import { adminOnly } from "@/backend/utils/admin-middleware";

const lostReportsModule = new Elysia({ prefix: "/lost-reports", tags: ["Lost Reports"] })
	.get(
		"/",
		async () => {
			return await LostReportService.getAll();
		},
		{
			detail: {
				summary: "Get all lost reports",
				description: "Mengambil semua laporan kehilangan barang.",
			},
		},
	)

	.get(
		"/:id",
		async ({ params, set }) => {
			const data = await LostReportService.getById(Number(params.id));
			if (!data) {
				set.status = 404;
				return { message: "Lost report not found" };
			}
			return data;
		},
		{
			detail: {
				summary: "Get lost report by ID",
				description: "Mengambil laporan kehilangan barang berdasarkan ID.",
			},
		},
	)

	.post(
		"/",
		async ({ body, set }) => {
			await LostReportService.create(body);

			set.status = 201;
			return { message: "Lost report created successfully" };
		},
		{
			body: LostReport.createBody,
			detail: {
				summary: "Create a new lost report",
				description: "Membuat laporan kehilangan barang baru.",
			},
		},
	)

	.patch(
		"/:id/status",
		async ({ params, body, set }) => {
			await LostReportService.updateStatus(Number(params.id), body.status);
			return { message: "Status updated successfully" };
		},
		{
			beforeHandle: [adminOnly],
			params: t.Object({
				id: t.String(),
			}),
			body: LostReport.updateStatusBody,
			detail: {
				summary: "Update lost report status",
				description: "Memperbarui status laporan kehilangan barang.",
			},
		},
	)

	.delete(
		"/:id",
		async ({ params, set }) => {
			await LostReportService.delete(Number(params.id));

			set.status = 204;
			return null;
		},
		{
			beforeHandle: [adminOnly],
			params: t.Object({
				id: t.String(),
			}),
			detail: {
				summary: "Delete a lost report",
				description: "Menghapus laporan kehilangan barang berdasarkan ID.",
			},
		},
	);

export default lostReportsModule;
