import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { adminUsers } from "@/db/schema/admin-users";
import { eq } from "drizzle-orm";

async function seedAdmin() {
	const username = "admin";
	const password = "admin123";

	// cek apakah admin sudah ada
	const existing = await db.query.adminUsers.findFirst({
		where: eq(adminUsers.username, username),
	});

	if (existing) {
		console.log("❌ Admin already exists");
		process.exit(0);
	}

	const passwordHash = await bcrypt.hash(password, 10);

	await db.insert(adminUsers).values({
		username,
		passwordHash,
	});

	console.log("✅ Admin seeded successfully");
	console.log("--------------------------------");
	console.log(`username : ${username}`);
	console.log(`password : ${password}`);
}

seedAdmin()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error("❌ Failed to seed admin");
		console.error(err);
		process.exit(1);
	});

// npx/bunx tsx src/scripts/seed-admin.ts
