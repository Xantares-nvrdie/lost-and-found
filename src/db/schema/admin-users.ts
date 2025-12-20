import { pgTable, serial, varchar, integer, text, timestamp } from "drizzle-orm/pg-core";

export const adminUsers = pgTable("adminUsers", {
	id: serial("id").primaryKey(),
	username: varchar("name", { length: 50 }).notNull(),
	passwordHash: text("password_hash").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
