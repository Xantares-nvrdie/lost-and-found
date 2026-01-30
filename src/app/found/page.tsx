import Link from "next/link";
import { api } from "@/lib/eden";
import { formatDateShort } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { getStatusBadge } from "@/components/ui/badge";

async function getFoundItems() {
    try {
        const res = await api.api["found-items"].get();
        return (res.data as any[]) || [];
    } catch {
        return [];
    }
}

export default async function FoundItemsPage() {
    const items = await getFoundItems();

    return (
        <div className="py-12">
            <div className="container">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Barang Temuan</h1>
                        <p className="text-muted">Daftar barang yang ditemukan dan siap diklaim pemiliknya</p>
                    </div>
                    <Link
                        href="/found/report"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-hover transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Laporkan Temuan
                    </Link>
                </div>

                {items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item: any) => (
                            <Link key={item.id} href={`/found/${item.id}`}>
                                <Card hover className="h-full">
                                    <CardContent>
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="font-semibold text-foreground line-clamp-1">{item.itemName}</h3>
                                            {getStatusBadge(item.status)}
                                        </div>
                                        <p className="text-sm text-muted line-clamp-2 mb-4">
                                            {item.description || "Tidak ada deskripsi"}
                                        </p>
                                        <div className="space-y-2 text-xs text-muted">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                                <span className="line-clamp-1">{item.foundLocation || "Tidak diketahui"}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <span>Ditemukan: {formatDateShort(item.foundDate)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                                <span>{item.finderName}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-card rounded-xl border border-border">
                        <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Belum ada barang temuan</h3>
                        <p className="text-muted mb-6">Belum ada barang temuan yang dilaporkan saat ini</p>
                        <Link
                            href="/found/report"
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-hover transition-all duration-200"
                        >
                            Laporkan Temuan Pertama
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
