import { db } from "@/db";
import { claimRequests } from "@/db/schema";
import type { ClaimRequest } from "./model";
import { eq } from "drizzle-orm";

export abstract class ClaimRequestService {
	static async create(data: ClaimRequest.createInput) {
		await db.insert(claimRequests).values({
			...data,
			status: "PENDING",
		});
	}

	static async getAll() {
		return db.select().from(claimRequests);
	}
	
	static async getById(id: number){
		return db.query.claimRequests.findFirst({
			where: (cr, { eq }) => eq(cr.id, id),
		});
	}

	static async updateStatus(id: number, status: ClaimRequest.updateStatusInput["status"]){
		await db.update(claimRequests).set({status}).where(eq(claimRequests.id, id));
	}

	static async delete(id: number){
		await db.delete(claimRequests).where(eq(claimRequests.id, id));
	}
}
