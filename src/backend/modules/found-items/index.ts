import { Elysia, t } from "elysia";
import {
	createFoundItem,
	deleteFoundItem,
	getAllFoundItems,
	getFoundItemsById,
	updateFoundItemStatus,
} from "./service";
import { FoundItem } from "./model";
import { adminOnly } from "@/backend/utils/admin-middleware";

const foundItemsModule = new Elysia({ prefix: "/found-items", tags: ["Found Items"] })
	.get(
		"/",
		async () => {
			return await getAllFoundItems();
		},
		{
			detail: {
				summary: "Get all found items",
				description: "Mengambil semua data barang temuan.",
			},
		},
	)

	.get(
		"/:id",
		async ({ params, set }) => {
			const data = await getFoundItemsById(Number(params.id));
			if (!data) {
				set.status = 404;
				return { message: "Found item data not found" };
			}
			return data;
		},
		{
			detail: {
				summary: "Get found item by ID",
				description: "Mengambil data barang temuan berdasarkan ID.",
			},
		},
	)

	.post(
		"/",
		async ({ body, set }) => {
			await createFoundItem(body);
			set.status = 201;
			return { message: "Found item data created successfully" };
		},
		{
			body: FoundItem.createBody,
			detail: {
				summary: "Create a new found item",
				description: "Membuat data barang temuan baru.",
			},
		},
	)

	.patch(
		"/:id/status",
		async ({ params, body, set }) => {
			await updateFoundItemStatus(Number(params.id), body.status);
			return { message: "Status updated successfully" };
		},
		{
			beforeHandle: [adminOnly],
			body: FoundItem.updateStatusBody,
			params: t.Object({
				id: t.String(),
			}),
			detail: {
				summary: "Update found item status",
				description: "Memperbarui status barang temuan berdasarkan ID.",
			},
		},
	)

	.delete(
		"/:id",
		async ({ params, set }) => {
			await deleteFoundItem(Number(params.id));
			set.status = 204;
			return null;
		},
		{
			beforeHandle: [adminOnly],
			params: t.Object({ id: t.String() }),
			detail: {
				summary: "Delete found item",
				description: "Menghapus data barang temuan berdasarkan ID.",
			},
		},
	);

export default foundItemsModule;
