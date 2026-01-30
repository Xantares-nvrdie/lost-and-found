import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/eden";
import { formatDateShort } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { getStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

async function getFoundItem(id: string) {
    try {
        const res = await api.api["found-items"]({ id }).get();
        if (!res.data || (res.data as any).message) return null;
        return res.data;
    } catch {
        return null;
    }
}

export default async function FoundItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getFoundItem(id) as any;

    if (!item) {
        notFound();
    }

    return (
        <div className="py-12">
            <div className="container max-w-4xl">
                <Link
                    href="/found"
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
                                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{item.itemName}</h1>
                                    {getStatusBadge(item.status)}
                                </div>
                                <p className="text-muted">Ditemukan oleh {item.finderName}</p>
                            </div>
                            {item.status === "AVAILABLE" && (
                                <Link href={`/claim/${item.id}`}>
                                    <Button size="lg">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Klaim Barang Ini
                                    </Button>
                                </Link>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground mb-4">Detail Barang</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-muted">Deskripsi</label>
                                        <p className="text-foreground mt-1">{item.description || "Tidak ada deskripsi"}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted">Lokasi Ditemukan</label>
                                        <p className="text-foreground mt-1">{item.foundLocation || "Tidak diketahui"}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted">Tanggal Ditemukan</label>
                                        <p className="text-foreground mt-1">{formatDateShort(item.foundDate)}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-foreground mb-4">Informasi Penemu</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-muted">Nama</label>
                                        <p className="text-foreground mt-1">{item.finderName}</p>
                                    </div>
                                    {item.finderNim && (
                                        <div>
                                            <label className="text-sm text-muted">NIM</label>
                                            <p className="text-foreground mt-1">{item.finderNim}</p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="text-sm text-muted">Kontak</label>
                                        <p className="text-foreground mt-1">{item.contactPhone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {item.photoUrl && (
                            <div className="mt-8">
                                <h2 className="text-lg font-semibold text-foreground mb-4">Foto Barang</h2>
                                <div className="rounded-xl overflow-hidden border border-border">
                                    <img src={item.photoUrl} alt={item.itemName} className="w-full h-auto" />
                                </div>
                            </div>
                        )}

                        {item.status === "AVAILABLE" && (
                            <div className="mt-8 pt-6 border-t border-border bg-primary/5 -mx-6 -mb-6 px-6 py-6 rounded-b-xl">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Ini barang Anda?</h3>
                                        <p className="text-sm text-muted">
                                            Ajukan klaim dengan menyertakan bukti kepemilikan untuk mengambil barang ini.
                                        </p>
                                    </div>
                                    <Link href={`/claim/${item.id}`}>
                                        <Button>Ajukan Klaim</Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
