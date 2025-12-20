import { pgTable, serial, varchar, text, timestamp, integer } from "drizzle-orm/pg-core";
import { claimStatusEnum } from "@/db/schema/enums";
import { foundItems } from "@/db/schema/found-items";

export const claimRequests = pgTable("claim_requests", {
	id: serial("id").primaryKey(),

	foundItemId: integer("found_item_id")
		.notNull()
		.references(() => foundItems.id, { onDelete: "cascade" }),

	claimantName: varchar("claimant_name", { length: 100 }).notNull(),
	claimantNim: varchar("claimant_nim", { length: 20 }).notNull(),
	contactPhone: varchar("contact_phone", { length: 20 }).notNull(),

	ownershipProofText: text("ownership_proof_text").notNull(),
	ownershipProofImageUrl: varchar("ownership_proof_image_url", {
		length: 255,
	}),

	status: claimStatusEnum("status").default("PENDING").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
