import "dotenv/config";
import { db } from "@/db";

import { lostReports } from "@/db/schema/lost-reports";
import { foundItems } from "@/db/schema/found-items";
import { claimRequests } from "@/db/schema/claim-requests";

async function seedLostReports() {
	const data: (typeof lostReports.$inferInsert)[] = [
		{
			reporterName: "Bintang",
			reporterContact: "081234567001",
			reporterNim: "2405073",
			itemName: "Dompet Hitam",
			itemDescription: "Dompet kulit hitam berisi KTM",
			lastLocation: "Gedung FPMIPA",
			lostDate: "2025-01-10",
			status: "OPEN",
		},
		{
			reporterName: "Rizky",
			reporterContact: "081234567002",
			itemName: "Flashdisk",
			itemDescription: "Flashdisk 32GB warna merah",
			lastLocation: "Perpustakaan",
			lostDate: "2025-01-11",
			status: "OPEN",
		},
		{
			reporterName: "Ayu",
			reporterContact: "081234567003",
			itemName: "Kunci Motor",
			itemDescription: "Kunci motor Honda dengan gantungan biru",
			lastLocation: "Parkiran Utama",
			lostDate: "2025-01-12",
			status: "MATCHED",
		},
		{
			reporterName: "Dimas",
			reporterContact: "081234567004",
			itemName: "Powerbank",
			itemDescription: "Powerbank 10.000 mAh warna putih",
			lastLocation: "Kantin",
			lostDate: "2025-01-13",
			status: "OPEN",
		},
		{
			reporterName: "Salsa",
			reporterContact: "081234567005",
			itemName: "Kacamata",
			itemDescription: "Kacamata hitam frame bulat",
			lastLocation: "Ruang Kelas A1",
			lostDate: "2025-01-14",
			status: "CLOSED",
		},
	];

	await db.insert(lostReports).values(data);
}

async function seedFoundItems() {
	const data: (typeof foundItems.$inferInsert)[] = [
		{
			finderName: "Andi",
			contactPhone: "08129999001",
			itemName: "Dompet Hitam",
			description: "Dompet hitam berisi kartu mahasiswa",
			foundLocation: "FPMIPA",
			foundDate: "2025-01-10",
			status: "AVAILABLE",
		},
		{
			finderName: "Nina",
			contactPhone: "08129999002",
			itemName: "Flashdisk",
			description: "Flashdisk merah 32GB",
			foundLocation: "Perpustakaan",
			foundDate: "2025-01-11",
			status: "AVAILABLE",
		},
		{
			finderName: "Yoga",
			contactPhone: "08129999003",
			itemName: "Kunci Motor",
			description: "Kunci motor Honda",
			foundLocation: "Parkiran",
			foundDate: "2025-01-12",
			status: "CLAIMED",
		},
		{
			finderName: "Putri",
			contactPhone: "08129999004",
			itemName: "Powerbank",
			description: "Powerbank putih",
			foundLocation: "Kantin",
			foundDate: "2025-01-13",
			status: "AVAILABLE",
		},
		{
			finderName: "Fajar",
			contactPhone: "08129999005",
			itemName: "Kacamata",
			description: "Kacamata hitam",
			foundLocation: "Kelas A1",
			foundDate: "2025-01-14",
			status: "CLAIMED",
		},
	];

	await db.insert(foundItems).values(data);
}

async function seedClaimRequests() {
	const data: (typeof claimRequests.$inferInsert)[] = [
		{
			foundItemId: 1,
			claimantName: "Bintang",
			claimantNim: "2405073",
			contactPhone: "081234567001",
			ownershipProofText: "Dompet berisi KTM atas nama Bintang",
			status: "PENDING",
		},
		{
			foundItemId: 2,
			claimantName: "Rizky",
			contactPhone: "081234567002",
			ownershipProofText: "Flashdisk berisi file tugas pribadi",
			status: "PENDING",
		},
		{
			foundItemId: 3,
			claimantName: "Ayu",
			contactPhone: "081234567003",
			ownershipProofText: "Kunci dengan gantungan biru",
			status: "APPROVED",
		},
		{
			foundItemId: 4,
			claimantName: "Dimas",
			contactPhone: "081234567004",
			ownershipProofText: "Powerbank ada stiker kecil",
			status: "REJECTED",
		},
		{
			foundItemId: 5,
			claimantName: "Salsa",
			contactPhone: "081234567005",
			ownershipProofText: "Kacamata frame bulat",
			status: "PENDING",
		},
	];

	await db.insert(claimRequests).values(data);
}

async function run() {
	console.log("🌱 Seeding data...");

	await seedLostReports();
	await seedFoundItems();
	await seedClaimRequests();

	console.log("✅ Seeder selesai");
	process.exit(0);
}

run().catch((err) => {
	console.error("❌ Seeder gagal");
	console.error(err);
	process.exit(1);
});
