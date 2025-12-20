import { pgEnum } from "drizzle-orm/pg-core";

export const lostStatusEnum = pgEnum("lost_status", ["OPEN", "MATCHED", "CLOSED"]);

export const foundStatusEnum = pgEnum("found_status", ["AVAILABLE", "CLAIMED"]);

export const claimStatusEnum = pgEnum("claim_status", ["PENDING", "REJECTED", "APPROVED"]);
