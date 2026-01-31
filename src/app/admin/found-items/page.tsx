"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/eden";
import { formatDateShort } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStatusBadge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

export default function AdminFoundItemsPage() {
    const { showToast } = useToast();
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchItems = async () => {
        try {
            const res = await api.api["found-items"].get();
            setItems((res.data as any[]) || []);
        } catch {
            showToast("Gagal memuat data", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleUpdateStatus = async (id: number, status: "AVAILABLE" | "CLAIMED") => {
        setIsUpdating(true);
        try {
            const token = localStorage.getItem("admin_token");
            await api.api["found-items"]({ id: String(id) }).status.patch(
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            showToast("Status berhasil diperbarui", "success");
            fetchItems();
            setIsModalOpen(false);
        } catch {
            showToast("Gagal memperbarui status", "error");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin ingin menghapus data barang temuan ini?")) return;

        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`/api/found-items/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete");
            showToast("Data berhasil dihapus", "success");
            fetchItems();
            setIsModalOpen(false);
        } catch {
            showToast("Gagal menghapus data", "error");
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
                <h1 className="text-2xl font-bold text-foreground mb-2">Kelola Barang Temuan</h1>
                <p className="text-muted">Lihat dan kelola semua barang temuan</p>
            </div>

            {items.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Barang</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground hidden md:table-cell">Penemu</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground hidden lg:table-cell">Lokasi</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-b border-border hover:bg-card/50 transition-colors">
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="font-medium text-foreground">{item.itemName}</p>
                                            <p className="text-xs text-muted mt-0.5">{formatDateShort(item.foundDate)}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 hidden md:table-cell">
                                        <p className="text-sm text-foreground">{item.finderName}</p>
                                        <p className="text-xs text-muted">{item.contactPhone}</p>
                                    </td>
                                    <td className="py-4 px-4 hidden lg:table-cell">
                                        <p className="text-sm text-muted">{item.foundLocation || "N/A"}</p>
                                    </td>
                                    <td className="py-4 px-4">{getStatusBadge(item.status)}</td>
                                    <td className="py-4 px-4 text-right">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => {
                                                setSelectedItem(item);
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
                        <p className="text-muted">Belum ada barang temuan</p>
                    </CardContent>
                </Card>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Detail Barang Temuan"
                size="lg"
            >
                {selectedItem && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-muted">Nama Barang</label>
                                <p className="font-medium text-foreground">{selectedItem.itemName}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">Status</label>
                                <div className="mt-1">{getStatusBadge(selectedItem.status)}</div>
                            </div>
                            <div className="col-span-2">
                                <label className="text-xs text-muted">Deskripsi</label>
                                <p className="text-sm text-foreground">{selectedItem.description || "Tidak ada deskripsi"}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">Lokasi Ditemukan</label>
                                <p className="text-sm text-foreground">{selectedItem.foundLocation || "N/A"}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">Tanggal Ditemukan</label>
                                <p className="text-sm text-foreground">{formatDateShort(selectedItem.foundDate)}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">Penemu</label>
                                <p className="text-sm text-foreground">{selectedItem.finderName}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">Kontak</label>
                                <p className="text-sm text-foreground">{selectedItem.contactPhone}</p>
                            </div>
                        </div>

                        <div className="border-t border-border pt-4">
                            <label className="text-xs text-muted block mb-2">Update Status</label>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    size="sm"
                                    variant={selectedItem.status === "AVAILABLE" ? "primary" : "outline"}
                                    onClick={() => handleUpdateStatus(selectedItem.id, "AVAILABLE")}
                                    isLoading={isUpdating}
                                >
                                    Tersedia
                                </Button>
                                <Button
                                    size="sm"
                                    variant={selectedItem.status === "CLAIMED" ? "primary" : "outline"}
                                    onClick={() => handleUpdateStatus(selectedItem.id, "CLAIMED")}
                                    isLoading={isUpdating}
                                >
                                    Diklaim
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-border">
                            <Button variant="danger" size="sm" onClick={() => handleDelete(selectedItem.id)}>
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
