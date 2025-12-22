import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { adminUsers } from "@/db/schema/admin-users";
import { eq } from "drizzle-orm";

export async function loginAdmin(username: string, password: string) {
	const admin = await db.query.adminUsers.findFirst({
		where: eq(adminUsers.username, username),
	});

	if (!admin) return null;

	const valid = await bcrypt.compare(password, admin.passwordHash);

	if (!valid) return null;

	const token = jwt.sign(
		{
			sub: admin.id,
			username: admin.username,
			role: "admin",
		},
		process.env.JWT_SECRET!,
		{
			expiresIn: "1h",
		},
	);

	return { token };
}

export async function createAdminUser(username: string, password: string) {
	const passwordHash = await bcrypt.hash(password, 10);

	await db.insert(adminUsers).values({
		username,
		passwordHash,
	});
}

export async function deleteAdminUser(id: number) {
	await db.delete(adminUsers).where(eq(adminUsers.id, id));
}
