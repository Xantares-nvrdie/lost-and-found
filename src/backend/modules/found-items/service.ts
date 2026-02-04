import { db } from "@/db";
import { FoundItem } from "./model";
import { foundItems } from "@/db/schema";
import { eq } from "drizzle-orm";


export abstract class FoundItemService {
	static async create(data: FoundItem.createInput) {
		await db.insert(foundItems).values(data);
	}

	static async getAll() {
		return db.select().from(foundItems);
	}

	static async getById(id: number) {
		return db.query.foundItems.findFirst({
			where: (fi, { eq }) => eq(fi.id, id),
		});
	}

	static async updateStatus(id: number, status: FoundItem.updateStatusInput["status"]) {
		await db.update(foundItems).set({ status }).where(eq(foundItems.id, id));
	}

	static async delete(id: number) {
		await db.delete(foundItems).where(eq(foundItems.id, id));
	}
}
