import { pgTable, serial, varchar, integer, text, timestamp } from "drizzle-orm/pg-core";

export const adminUsers = pgTable("admin_users", {
	id: serial("id").primaryKey(),
	username: varchar("username", { length: 50 }).notNull().unique(),
	passwordHash: text("password_hash").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
