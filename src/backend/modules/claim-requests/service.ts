import { db } from "@/db";
import { claimRequests } from "@/db/schema";
import type { ClaimRequest } from "./model";
import { eq } from "drizzle-orm";

export async function createClaimRequest(data: ClaimRequest.createInput) {
	await db.insert(claimRequests).values({
		...data,
		status: "PENDING",
	});
}

export async function getAllClaimRequests() {
	return db.select().from(claimRequests);
}

export async function getClaimRequestsById(id: number) {
	return db.query.claimRequests.findFirst({
		where: (cr, { eq }) => eq(cr.id, id),
	});
}

export async function updateClaimRequestStatus(id: number, status: ClaimRequest.updateStatusInput["status"]) {
	await db.update(claimRequests).set({ status }).where(eq(claimRequests.id, id));
}

export async function deleteClaimRequest(id: number) {
	await db.delete(claimRequests).where(eq(claimRequests.id, id));
}
