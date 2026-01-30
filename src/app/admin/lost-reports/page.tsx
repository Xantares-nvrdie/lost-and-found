"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/eden";
import { formatDateShort } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStatusBadge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

export default function AdminLostReportsPage() {
    const { showToast } = useToast();
    const [reports, setReports] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchReports = async () => {
        try {
            const res = await api.api["lost-reports"].get();
            setReports((res.data as any[]) || []);
        } catch {
            showToast("Gagal memuat data", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleUpdateStatus = async (id: number, status: "OPEN" | "MATCHED" | "CLOSED") => {
        setIsUpdating(true);
        try {
            const token = localStorage.getItem("admin_token");
            await api.api["lost-reports"]({ id: String(id) }).status.patch(
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            showToast("Status berhasil diperbarui", "success");
            fetchReports();
            setIsModalOpen(false);
        } catch {
            showToast("Gagal memperbarui status", "error");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin ingin menghapus laporan ini?")) return;

        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`/api/lost-reports/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete");
            showToast("Laporan berhasil dihapus", "success");
            fetchReports();
            setIsModalOpen(false);
        } catch {
            showToast("Gagal menghapus laporan", "error");
        }
    };

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
                <h1 className="text-2xl font-bold text-foreground mb-2">Kelola Barang Hilang</h1>
                <p className="text-muted">Lihat dan kelola semua laporan kehilangan barang</p>
            </div>

            {reports.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Barang</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground hidden md:table-cell">Pelapor</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground hidden lg:table-cell">Lokasi</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} className="border-b border-border hover:bg-card/50 transition-colors">
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="font-medium text-foreground">{report.itemName}</p>
                                            <p className="text-xs text-muted mt-0.5">{formatDateShort(report.lostDate)}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 hidden md:table-cell">
                                        <p className="text-sm text-foreground">{report.reporterName}</p>
                                        <p className="text-xs text-muted">{report.reporterContact}</p>
                                    </td>
                                    <td className="py-4 px-4 hidden lg:table-cell">
                                        <p className="text-sm text-muted">{report.lastLocation}</p>
                                    </td>
                                    <td className="py-4 px-4">{getStatusBadge(report.status)}</td>
                                    <td className="py-4 px-4 text-right">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => {
                                                setSelectedReport(report);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            Detail
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <Card>
                    <CardContent className="text-center py-12">
                        <p className="text-muted">Belum ada laporan kehilangan</p>
                    </CardContent>
                </Card>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Detail Laporan Kehilangan"
                size="lg"
            >
                {selectedReport && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-muted">Nama Barang</label>
                                <p className="font-medium text-foreground">{selectedReport.itemName}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">Status</label>
                                <div className="mt-1">{getStatusBadge(selectedReport.status)}</div>
                            </div>
                            <div className="col-span-2">
                                <label className="text-xs text-muted">Deskripsi</label>
                                <p className="text-sm text-foreground">{selectedReport.itemDescription}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">Lokasi Terakhir</label>
                                <p className="text-sm text-foreground">{selectedReport.lastLocation}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">Tanggal Hilang</label>
                                <p className="text-sm text-foreground">{formatDateShort(selectedReport.lostDate)}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">Pelapor</label>
                                <p className="text-sm text-foreground">{selectedReport.reporterName}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">Kontak</label>
                                <p className="text-sm text-foreground">{selectedReport.reporterContact}</p>
                            </div>
                        </div>

                        <div className="border-t border-border pt-4">
                            <label className="text-xs text-muted block mb-2">Update Status</label>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    size="sm"
                                    variant={selectedReport.status === "OPEN" ? "primary" : "outline"}
                                    onClick={() => handleUpdateStatus(selectedReport.id, "OPEN")}
                                    isLoading={isUpdating}
                                >
                                    Dicari
                                </Button>
                                <Button
                                    size="sm"
                                    variant={selectedReport.status === "MATCHED" ? "primary" : "outline"}
                                    onClick={() => handleUpdateStatus(selectedReport.id, "MATCHED")}
                                    isLoading={isUpdating}
                                >
                                    Cocok
                                </Button>
                                <Button
                                    size="sm"
                                    variant={selectedReport.status === "CLOSED" ? "primary" : "outline"}
                                    onClick={() => handleUpdateStatus(selectedReport.id, "CLOSED")}
                                    isLoading={isUpdating}
                                >
                                    Selesai
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-border">
                            <Button variant="danger" size="sm" onClick={() => handleDelete(selectedReport.id)}>
                                Hapus
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                                Tutup
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
