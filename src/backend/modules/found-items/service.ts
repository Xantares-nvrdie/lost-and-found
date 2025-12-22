import { db } from "@/db";
import { FoundItem } from "./model";
import { foundItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createFoundItem(data: FoundItem.createInput) {
	await db.insert(foundItems).values(data);
}

export async function getAllFoundItems() {
	return db.select().from(foundItems);
}

export async function getFoundItemsById(id: number) {
	return db.query.foundItems.findFirst({
		where: (fi, { eq }) => eq(fi.id, id),
	});
}

export async function updateFoundItemStatus(id: number, status: FoundItem.updateStatusInput["status"]) {
	await db.update(foundItems).set({ status }).where(eq(foundItems.id, id));
}

export async function deleteFoundItem(id: number) {
	await db.delete(foundItems).where(eq(foundItems.id, id));
}
