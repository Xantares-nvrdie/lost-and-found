import { pgTable, serial, varchar, text, date, timestamp } from "drizzle-orm/pg-core";
import { foundStatusEnum } from "@/db/schema/enums";

export const foundItems = pgTable("found_items", {
	id: serial("id").primaryKey(),

	finderName: varchar("finder_name", { length: 100 }).notNull(),
	finderNim: varchar("finder_nim", { length: 20 }),
	contactPhone: varchar("contact_phone", { length: 20 }).notNull(),

	itemName: varchar("item_name", { length: 100 }).notNull(),
	description: text("description"),
	foundLocation: varchar("found_location", { length: 100 }),
	foundDate: date("found_date"),
	photoUrl: varchar("photo_url", { length: 255 }),

	status: foundStatusEnum("status").default("AVAILABLE").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
