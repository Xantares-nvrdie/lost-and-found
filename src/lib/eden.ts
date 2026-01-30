import { treaty } from "@elysiajs/eden";
import type { app } from "@/app/api/[[...slugs]]/route";

export const api = treaty<app>(
	typeof window === "undefined"
		? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
		: window.location.origin
);
