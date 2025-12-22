import { db } from "@/db";
import { lostReports } from "@/db/schema";
import type { LostReport } from "./model";
import { eq } from "drizzle-orm";

export async function createLostReport(data: LostReport.createInput) {
	await db.insert(lostReports).values(data);
}

export async function getAllLostReports() {
	return db.select().from(lostReports);
}

export async function getLostReportsById(id: number) {
	return db.query.lostReports.findFirst({
		where: (lr, { eq }) => eq(lr.id, id),
	});
}

export async function updateLostReportStatus(id: number, status: LostReport.updateStatusInput["status"]) {
	await db.update(lostReports).set({ status }).where(eq(lostReports.id, id));
}

export async function deleteLostReport(id: number) {
	await db.delete(lostReports).where(eq(lostReports.id, id));
}
