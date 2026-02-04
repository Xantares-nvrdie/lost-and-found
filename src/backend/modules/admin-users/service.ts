import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { adminUsers } from "@/db/schema/admin-users";
import { eq } from "drizzle-orm";

export abstract class AdminUserService {
	static async getAll(){
		return db.select().from(adminUsers);
	}

	static async getById(id:number){
		return db.query.adminUsers.findFirst({
			where: eq(adminUsers.id,id),
		})
	}

	static async updateUsername(id:number, username:string){
		await db.update(adminUsers).set({username}).where(eq(adminUsers.id,id));
	}

	static async updatePassword(id: number, password: string){
		const pwHash = await bcrypt.hash(password,10);
		await db.update(adminUsers).set({passwordHash: pwHash}).where(eq(adminUsers.id,id));
	}

	static async delete(id: number){
		await db.delete(adminUsers).where(eq(adminUsers.id,id));
	}

	static async login(username: string, password: string){
		const admin = await db.query.adminUsers.findFirst({
			where: eq(adminUsers.username, username),
		});

		if (!admin) return null;

		const valid = await bcrypt.compare(password, admin.passwordHash);
		
		if (!valid) return null;

		const token = jwt.sign({
			sub: admin.id,
			username: admin.username,
			role: "admin",
		}, process.env.JWT_SECRET!, {
			expiresIn: "1h",
		});

		return { token };
	}

	static async create(username: string, password: string){
		const pwHash = await bcrypt.hash(password,10);
		await db.insert(adminUsers).values({
			username,
			passwordHash: pwHash,
		});
	}
}
