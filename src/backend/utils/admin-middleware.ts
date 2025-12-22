import jwt from "jsonwebtoken";
import type { Context } from "elysia";

export async function adminOnly({ headers, set }: Context) {
	const auth = headers["authorization"];

	if (!auth || !auth.startsWith("Bearer ")) {
		set.status = 401;
		throw new Error("Unauthorized");
	}

	const token = auth.replace("Bearer ", "");

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;

		if (payload.role !== "admin") {
			set.status = 403;
			throw new Error("Forbidden");
		}
	} catch {
		set.status = 401;
		return null;
	}
}
