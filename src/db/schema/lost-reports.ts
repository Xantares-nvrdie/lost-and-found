import { pgTable, serial, varchar, text, date, timestamp } from "drizzle-orm/pg-core";
import { lostStatusEnum } from "@/db/schema/enums";
import { stat } from "fs";

export const lostReports = pgTable("lost_reports", {
	id: serial("id").primaryKey(),

	reporterName: varchar("reporter_name", { length: 100 }).notNull(),
	reporterContact: varchar("reporter_contact", { length: 20 }).notNull(),
	reporterNim: varchar("reporter_nim", { length: 20 }),

	itemName: varchar("item_name", { length: 255 }).notNull(),
	itemDescription: text("item_description").notNull(),
	lastLocation: varchar("last_location", { length: 255 }).notNull(),
	lostDate: date("lost_date").notNull(),
	photoUrl: varchar("photo_url", { length: 255 }),

	status: lostStatusEnum("status").default("OPEN").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
