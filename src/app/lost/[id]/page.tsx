import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/eden";
import { formatDateShort } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { getStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

async function getLostReport(id: string) {
    try {
        const res = await api.api["lost-reports"]({ id }).get();
        if (!res.data || (res.data as any).message) return null;
        return res.data;
    } catch {
        return null;
    }
}

export default async function LostReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const report = await getLostReport(id) as any;

    if (!report) {
        notFound();
    }

    return (
        <div className="py-12">
            <div className="container max-w-4xl">
                <Link
                    href="/lost"
                    className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali ke daftar
                </Link>

                <Card>
                    <CardContent>
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{report.itemName}</h1>
                                    {getStatusBadge(report.status)}
                                </div>
                                <p className="text-muted">Dilaporkan oleh {report.reporterName}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground mb-4">Detail Barang</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-muted">Deskripsi</label>
                                        <p className="text-foreground mt-1">{report.itemDescription}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted">Lokasi Terakhir</label>
                                        <p className="text-foreground mt-1">{report.lastLocation}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted">Tanggal Hilang</label>
                                        <p className="text-foreground mt-1">{formatDateShort(report.lostDate)}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-foreground mb-4">Informasi Pelapor</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-muted">Nama</label>
                                        <p className="text-foreground mt-1">{report.reporterName}</p>
                                    </div>
                                    {report.reporterNim && (
                                        <div>
                                            <label className="text-sm text-muted">NIM</label>
                                            <p className="text-foreground mt-1">{report.reporterNim}</p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="text-sm text-muted">Kontak</label>
                                        <p className="text-foreground mt-1">{report.reporterContact}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {report.photoUrl && (
                            <div className="mt-8">
                                <h2 className="text-lg font-semibold text-foreground mb-4">Foto Barang</h2>
                                <div className="rounded-xl overflow-hidden border border-border">
                                    <img src={report.photoUrl} alt={report.itemName} className="w-full h-auto" />
                                </div>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-border">
                            <p className="text-sm text-muted mb-4">
                                Jika Anda menemukan barang ini, silakan hubungi pelapor melalui kontak di atas atau laporkan temuan Anda.
                            </p>
                            <Link href="/found/report">
                                <Button>Laporkan Temuan Barang Ini</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
