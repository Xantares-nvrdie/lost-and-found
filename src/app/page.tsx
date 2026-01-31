import Link from "next/link";
import { api } from "@/lib/eden";
import { formatDateShort } from "@/lib/utils";
import MetallicPaint from "@/components/MetallicPaint";
import logo from './logo.svg';

async function getStats() {
	try {
		const [lostRes, foundRes] = await Promise.all([
			api.api["lost-reports"].get(),
			api.api["found-items"].get(),
		]);

		const lostData = (lostRes.data as any[]) || [];
		const foundData = (foundRes.data as any[]) || [];

		return {
			totalLost: lostData.length,
			totalFound: foundData.length,
			openLost: lostData.filter((item: any) => item.status === "OPEN").length,
			availableFound: foundData.filter((item: any) => item.status === "AVAILABLE").length,
			recentLost: lostData.slice(0, 4),
			recentFound: foundData.slice(0, 4),
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
		<div className="min-h-screen relative">
			{/* Hero */}
			<section className="relative py-24 md:py-32 overflow-hidden">
				<div className="container relative z-10">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="max-w-2xl animate-in">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.1] mb-6">
								Temukan lagi barang
								<br />
								yang hilang.
							</h1>
							<p className="text-lg text-muted mb-8 max-w-lg leading-relaxed">
								Platform modern untuk melaporkan dan menemukan barang hilang.
								Membantu menghubungkan kembali pemilik dengan barang berharganya secara cepat dan aman.
							</p>
							<div className="flex flex-wrap gap-4">
								<Link
									href="/lost/report"
									className="inline-flex items-center px-8 py-3.5 text-sm font-medium text-background bg-foreground rounded-full hover:opacity-90 transition-opacity shadow-sm"
								>
									Laporkan Kehilangan
								</Link>
								<Link
									href="/found"
									className="inline-flex items-center px-8 py-3.5 text-sm font-medium text-foreground border border-border rounded-full hover:bg-primary-light transition-colors"
								>
									Cari Barang
								</Link>
							</div>
						</div>

						<div className="relative h-[400px] md:h-[500px] w-full lg:w-[600px] mx-auto lg:mr-0">
							<div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl" />
							<MetallicPaint
								imageSrc="/logo.svg"
								speed={0.25}
								scale={2.5}
								refraction={1}
								liquid={0.6}
								chromaticSpread={2}
								angle={10}
								brightness={1}
								contrast={1.1}
								lightColor="#ffffff"
								darkColor="#000000"
								tintColor="#562ba4ff"
								mouseAnimation={false}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Stats - Bento Style */}
			<section className="pb-16 relative">
				<div className="container">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="bg-card border border-border rounded-2xl p-6 hover-lift">
							<div className="text-3xl font-semibold text-foreground">{stats.totalLost}</div>
							<div className="text-sm text-muted mt-1">Laporan Hilang</div>
						</div>
						<div className="bg-card border border-border rounded-2xl p-6 hover-lift">
							<div className="text-3xl font-semibold text-foreground">{stats.totalFound}</div>
							<div className="text-sm text-muted mt-1">Barang Temuan</div>
						</div>
						<div className="bg-card border border-border rounded-2xl p-6 hover-lift">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-accent rounded-full pulse-dot" />
								<div className="text-3xl font-semibold text-foreground">{stats.openLost}</div>
							</div>
							<div className="text-sm text-muted mt-1">Masih Dicari</div>
						</div>
						<div className="bg-card border border-border rounded-2xl p-6 hover-lift">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-success rounded-full" />
								<div className="text-3xl font-semibold text-foreground">{stats.availableFound}</div>
							</div>
							<div className="text-sm text-muted mt-1">Siap Diklaim</div>
						</div>
					</div>
				</div>
			</section>

			{/* Recent Lost */}
			<section className="py-16 border-t border-border relative">
				<div className="container">
					<div className="flex items-end justify-between mb-8">
						<div>
							<h2 className="text-2xl font-semibold text-foreground tracking-tight">Kehilangan Terbaru</h2>
							<p className="text-sm text-muted mt-1">Bantu temukan pemilik barang-barang ini</p>
						</div>
						<Link href="/lost" className="text-sm text-muted hover:text-foreground transition-colors link-underline">
							Lihat semua
						</Link>
					</div>

					{stats.recentLost.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{stats.recentLost.map((item: any) => (
								<Link key={item.id} href={`/lost/${item.id}`} className="group">
									<div className="bg-card border border-border rounded-2xl p-5 hover-lift">
										<div className="flex items-start justify-between gap-4">
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 mb-1">
													{item.status === "OPEN" && (
														<span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-accent bg-accent/10 rounded-full">
															<span className="w-1.5 h-1.5 bg-accent rounded-full pulse-dot" />
															Dicari
														</span>
													)}
													{item.status === "MATCHED" && (
														<span className="px-2 py-0.5 text-xs font-medium text-success bg-success/10 rounded-full">
															Cocok
														</span>
													)}
													{item.status === "CLOSED" && (
														<span className="px-2 py-0.5 text-xs font-medium text-muted bg-primary-light rounded-full">
															Selesai
														</span>
													)}
												</div>
												<h3 className="font-medium text-foreground group-hover:text-accent transition-colors truncate">
													{item.itemName}
												</h3>
												<p className="text-sm text-muted line-clamp-1 mt-1">{item.itemDescription}</p>
											</div>
											<svg className="w-4 h-4 text-muted group-hover:text-foreground transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
											</svg>
										</div>
										<div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-muted">
											<span className="flex items-center gap-1.5">
												<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
												</svg>
												{item.lastLocation}
											</span>
											<span>{formatDateShort(item.lostDate)}</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<div className="text-center py-12 border border-dashed border-border rounded-2xl">
							<p className="text-muted">Belum ada laporan kehilangan</p>
						</div>
					)}
				</div>
			</section>

			{/* Recent Found */}
			<section className="py-16 border-t border-border relative">
				<div className="container">
					<div className="flex items-end justify-between mb-8">
						<div>
							<h2 className="text-2xl font-semibold text-foreground tracking-tight">Temuan Terbaru</h2>
							<p className="text-sm text-muted mt-1">Mungkin salah satunya milik Anda</p>
						</div>
						<Link href="/found" className="text-sm text-muted hover:text-foreground transition-colors link-underline">
							Lihat semua
						</Link>
					</div>

					{stats.recentFound.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{stats.recentFound.map((item: any) => (
								<Link key={item.id} href={`/found/${item.id}`} className="group">
									<div className="bg-card border border-border rounded-2xl p-5 hover-lift">
										<div className="flex items-start justify-between gap-4">
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 mb-1">
													{item.status === "AVAILABLE" && (
														<span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-success bg-success/10 rounded-full">
															<span className="w-1.5 h-1.5 bg-success rounded-full" />
															Tersedia
														</span>
													)}
													{item.status === "CLAIMED" && (
														<span className="px-2 py-0.5 text-xs font-medium text-muted bg-primary-light rounded-full">
															Diklaim
														</span>
													)}
												</div>
												<h3 className="font-medium text-foreground group-hover:text-accent transition-colors truncate">
													{item.itemName}
												</h3>
												<p className="text-sm text-muted line-clamp-1 mt-1">{item.description || "Tidak ada deskripsi"}</p>
											</div>
											<svg className="w-4 h-4 text-muted group-hover:text-foreground transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
											</svg>
										</div>
										<div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-muted">
											<span className="flex items-center gap-1.5">
												<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
												</svg>
												{item.foundLocation || "Tidak diketahui"}
											</span>
											<span>{formatDateShort(item.foundDate)}</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<div className="text-center py-12 border border-dashed border-border rounded-2xl">
							<p className="text-muted">Belum ada barang temuan</p>
						</div>
					)}
				</div>
			</section>

			{/* How it works */}
			<section className="py-16 border-t border-border bg-primary-light relative overflow-hidden">
				<div className="container relative">
					<h2 className="text-2xl font-semibold text-foreground tracking-tight mb-8">Cara Kerja</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="group">
							<div className="relative">
								<div className="text-sm font-medium text-muted mb-2 flex items-center gap-2">
									<span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-border text-xs">1</span>
								</div>
								<h3 className="font-medium text-foreground mb-2">Buat Laporan</h3>
								<p className="text-sm text-muted leading-relaxed">
									Isi formulir dengan detail barang yang hilang atau ditemukan. Sertakan deskripsi yang jelas.
								</p>
							</div>
						</div>
						<div className="group">
							<div className="relative">
								<div className="text-sm font-medium text-muted mb-2 flex items-center gap-2">
									<span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-border text-xs">2</span>
								</div>
								<h3 className="font-medium text-foreground mb-2">Cari & Temukan</h3>
								<p className="text-sm text-muted leading-relaxed">
									Jelajahi daftar barang dan temukan yang sesuai dengan pencarian Anda.
								</p>
							</div>
						</div>
						<div className="group">
							<div className="relative">
								<div className="text-sm font-medium text-muted mb-2 flex items-center gap-2">
									<span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-border text-xs">3</span>
								</div>
								<h3 className="font-medium text-foreground mb-2">Klaim Barang</h3>
								<p className="text-sm text-muted leading-relaxed">
									Ajukan klaim dengan bukti kepemilikan. Admin akan memverifikasi dan menghubungi Anda.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-16 border-t border-border relative">
				<div className="container">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
						<div>
							<h2 className="text-2xl font-semibold text-foreground tracking-tight">Kehilangan sesuatu?</h2>
							<p className="text-muted mt-1">Laporkan sekarang agar lebih mudah ditemukan.</p>
						</div>
						<Link
							href="/lost/report"
							className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-background bg-foreground rounded-full hover:opacity-90 transition-opacity"
						>
							Buat Laporan
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
