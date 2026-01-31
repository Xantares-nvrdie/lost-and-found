"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/eden";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stats {
    totalLost: number;
    totalFound: number;
    totalClaims: number;
    pendingClaims: number;
    openLost: number;
    availableFound: number;
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats>({
        totalLost: 0,
        totalFound: 0,
        totalClaims: 0,
        pendingClaims: 0,
        openLost: 0,
        availableFound: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [lostRes, foundRes, claimsRes] = await Promise.all([
                    api.api["lost-reports"].get(),
                    api.api["found-items"].get(),
                    api.api["claim-requests"].get(),
                ]);

                const lostData = (lostRes.data as any[]) || [];
                const foundData = (foundRes.data as any[]) || [];
                const claimsData = (claimsRes.data as any[]) || [];

                setStats({
                    totalLost: lostData.length,
                    totalFound: foundData.length,
                    totalClaims: claimsData.length,
                    pendingClaims: claimsData.filter((c: any) => c.status === "PENDING").length,
                    openLost: lostData.filter((l: any) => l.status === "OPEN").length,
                    availableFound: foundData.filter((f: any) => f.status === "AVAILABLE").length,
                });
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Total Barang Hilang",
            value: stats.totalLost,
            icon: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            color: "text-accent",
            bgColor: "bg-accent/10",
            href: "/admin/lost-reports",
        },
        {
            title: "Total Barang Temuan",
            value: stats.totalFound,
            icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
            color: "text-success",
            bgColor: "bg-success/10",
            href: "/admin/found-items",
        },
        {
            title: "Total Klaim",
            value: stats.totalClaims,
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
            color: "text-primary",
            bgColor: "bg-primary/10",
            href: "/admin/claim-requests",
        },
        {
            title: "Klaim Pending",
            value: stats.pendingClaims,
            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
            color: "text-error",
            bgColor: "bg-error/10",
            href: "/admin/claim-requests",
        },
    ];

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard</h1>
                <p className="text-muted">Selamat datang di panel admin OSTRIC Lost & Found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat) => (
                    <Link key={stat.title} href={stat.href}>
                        <Card hover className="h-full">
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted mb-1">{stat.title}</p>
                                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                                        <svg className={`w-6 h-6 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                        </svg>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Statistik Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                                    <span className="text-sm text-foreground">Barang Masih Dicari</span>
                                </div>
                                <span className="font-semibold text-foreground">{stats.openLost}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-success rounded-full"></div>
                                    <span className="text-sm text-foreground">Barang Siap Diklaim</span>
                                </div>
                                <span className="font-semibold text-foreground">{stats.availableFound}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-error rounded-full"></div>
                                    <span className="text-sm text-foreground">Klaim Menunggu Verifikasi</span>
                                </div>
                                <span className="font-semibold text-foreground">{stats.pendingClaims}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Aksi Cepat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <Link
                                href="/admin/lost-reports"
                                className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-border transition-colors"
                            >
                                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Kelola Barang Hilang</p>
                                    <p className="text-xs text-muted">Lihat dan update status laporan</p>
                                </div>
                            </Link>
                            <Link
                                href="/admin/found-items"
                                className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-border transition-colors"
                            >
                                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Kelola Barang Temuan</p>
                                    <p className="text-xs text-muted">Lihat dan update status temuan</p>
                                </div>
                            </Link>
                            <Link
                                href="/admin/claim-requests"
                                className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-border transition-colors"
                            >
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Verifikasi Klaim</p>
                                    <p className="text-xs text-muted">Approve atau reject klaim</p>
                                </div>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
