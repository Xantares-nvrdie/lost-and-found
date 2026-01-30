import Link from "next/link";
import { api } from "@/lib/eden";
import { formatDateShort } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { getStatusBadge } from "@/components/ui/badge";

async function getStats() {
	try {
		const [lostRes, foundRes] = await Promise.all([
			api.api["lost-reports"].get(),
			api.api["found-items"].get(),
		]);

		const lostData = lostRes.data as any[] || [];
		const foundData = foundRes.data as any[] || [];

		return {
			totalLost: lostData.length,
			totalFound: foundData.length,
			openLost: lostData.filter((item: any) => item.status === "OPEN").length,
			availableFound: foundData.filter((item: any) => item.status === "AVAILABLE").length,
			recentLost: lostData.slice(0, 3),
			recentFound: foundData.slice(0, 3),
		};
	} catch {
		return {
			totalLost: 0,
			totalFound: 0,
			openLost: 0,
			availableFound: 0,
			recentLost: [],
			recentFound: [],
		};
	}
}

export default async function HomePage() {
	const stats = await getStats();

	return (
		<div className="min-h-screen">
			<section className="relative py-20 lg:py-32 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
				<div className="container relative">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
							Temukan Barang <span className="text-primary">Hilang</span> Anda
						</h1>
						<p className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto">
							Platform Lost & Found yang membantu mempertemukan barang hilang dengan pemiliknya. Laporkan
							kehilangan atau temuan barang dengan mudah.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href="/lost/report"
								className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-primary rounded-xl hover:bg-primary-hover transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								Laporkan Kehilangan
							</Link>
							<Link
								href="/found/report"
								className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-primary bg-card border-2 border-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								Laporkan Temuan
							</Link>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 bg-card border-y border-border">
				<div className="container">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						<div className="text-center p-6">
							<div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stats.totalLost}</div>
							<div className="text-sm text-muted">Total Laporan Hilang</div>
						</div>
						<div className="text-center p-6">
							<div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stats.totalFound}</div>
							<div className="text-sm text-muted">Total Barang Temuan</div>
						</div>
						<div className="text-center p-6">
							<div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stats.openLost}</div>
							<div className="text-sm text-muted">Masih Dicari</div>
						</div>
						<div className="text-center p-6">
							<div className="text-4xl md:text-5xl font-bold text-success mb-2">{stats.availableFound}</div>
							<div className="text-sm text-muted">Siap Diklaim</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16">
				<div className="container">
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-2xl md:text-3xl font-bold text-foreground">Barang Hilang Terbaru</h2>
						<Link
							href="/lost"
							className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
						>
							Lihat Semua →
						</Link>
					</div>

					{stats.recentLost.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{stats.recentLost.map((item: any) => (
								<Link key={item.id} href={`/lost/${item.id}`}>
									<Card hover className="h-full">
										<CardContent>
											<div className="flex items-start justify-between mb-3">
												<h3 className="font-semibold text-foreground line-clamp-1">{item.itemName}</h3>
												{getStatusBadge(item.status)}
											</div>
											<p className="text-sm text-muted line-clamp-2 mb-4">{item.itemDescription}</p>
											<div className="flex items-center gap-4 text-xs text-muted">
												<span className="flex items-center gap-1">
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
														/>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
														/>
													</svg>
													{item.lastLocation}
												</span>
												<span className="flex items-center gap-1">
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
														/>
													</svg>
													{formatDateShort(item.lostDate)}
												</span>
											</div>
										</CardContent>
									</Card>
								</Link>
							))}
						</div>
					) : (
						<div className="text-center py-12 bg-card rounded-xl border border-border">
							<p className="text-muted">Belum ada laporan kehilangan</p>
						</div>
					)}
				</div>
			</section>

			<section className="py-16 bg-card border-y border-border">
				<div className="container">
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-2xl md:text-3xl font-bold text-foreground">Barang Temuan Terbaru</h2>
						<Link
							href="/found"
							className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
						>
							Lihat Semua →
						</Link>
					</div>

					{stats.recentFound.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{stats.recentFound.map((item: any) => (
								<Link key={item.id} href={`/found/${item.id}`}>
									<Card hover className="h-full bg-background">
										<CardContent>
											<div className="flex items-start justify-between mb-3">
												<h3 className="font-semibold text-foreground line-clamp-1">{item.itemName}</h3>
												{getStatusBadge(item.status)}
											</div>
											<p className="text-sm text-muted line-clamp-2 mb-4">{item.description || "Tidak ada deskripsi"}</p>
											<div className="flex items-center gap-4 text-xs text-muted">
												<span className="flex items-center gap-1">
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
														/>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
														/>
													</svg>
													{item.foundLocation || "Tidak diketahui"}
												</span>
												<span className="flex items-center gap-1">
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
														/>
													</svg>
													{formatDateShort(item.foundDate)}
												</span>
											</div>
										</CardContent>
									</Card>
								</Link>
							))}
						</div>
					) : (
						<div className="text-center py-12 bg-background rounded-xl border border-border">
							<p className="text-muted">Belum ada barang temuan</p>
						</div>
					)}
				</div>
			</section>

			<section className="py-16">
				<div className="container">
					<div className="text-center max-w-2xl mx-auto mb-12">
						<h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Cara Kerja</h2>
						<p className="text-muted">Proses mudah untuk melaporkan dan menemukan barang</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-semibold text-foreground mb-2">1. Buat Laporan</h3>
							<p className="text-sm text-muted">
								Isi form laporan dengan detail barang yang hilang atau ditemukan
							</p>
						</div>

						<div className="text-center">
							<div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-semibold text-foreground mb-2">2. Cari & Cocokkan</h3>
							<p className="text-sm text-muted">Sistem akan menampilkan barang yang sesuai dengan pencarian</p>
						</div>

						<div className="text-center">
							<div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<h3 className="text-lg font-semibold text-foreground mb-2">3. Klaim Barang</h3>
							<p className="text-sm text-muted">
								Ajukan klaim dengan bukti kepemilikan untuk mengambil barang
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
