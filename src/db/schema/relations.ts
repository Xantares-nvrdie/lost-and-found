import { relations } from "drizzle-orm";

import { foundItems } from "@/db/schema/found-items";
import { claimRequests } from "@/db/schema/claim-requests";


export const foundItemsRelations = relations(foundItems, ({ many }) => ({
	claims: many(claimRequests),
}));

export const claimRequestsRelations = relations(claimRequests, ({ one }) => ({
	foundItem: one(foundItems, {
		fields: [claimRequests.foundItemId],
		references: [foundItems.id],
	}),
}));
