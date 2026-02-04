import { db } from "@/db";
import { lostReports } from "@/db/schema";
import type { LostReport } from "./model";
import { eq } from "drizzle-orm";

export abstract class LostReportService {
	static async create(data: LostReport.createInput) {
		await db.insert(lostReports).values(data);
	}
	
	static async getAll() {
		return db.select().from(lostReports);
	}

	static async getById(id: number) {
		return db.query.lostReports.findFirst({
			where: (lr, { eq }) => eq(lr.id, id),
		});
	}

	static async updateStatus(id: number, status: LostReport.updateStatusInput["status"]) {
		await db.update(lostReports).set({ status }).where(eq(lostReports.id, id));
	}
	
	static async delete(id: number) {
		await db.delete(lostReports).where(eq(lostReports.id, id));
	}
}
