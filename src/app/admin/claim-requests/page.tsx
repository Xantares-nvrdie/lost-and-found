"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/eden";
import { formatDateShort } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStatusBadge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

export default function AdminClaimRequestsPage() {
    const { showToast } = useToast();
    const [claims, setClaims] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedClaim, setSelectedClaim] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchClaims = async () => {
        try {
            const res = await api.api["claim-requests"].get();
            setClaims((res.data as any[]) || []);
        } catch {
            showToast("Gagal memuat data", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchClaims();
    }, []);

    const handleUpdateStatus = async (id: number, status: "PENDING" | "APPROVED" | "REJECTED") => {
        setIsUpdating(true);
        try {
            const token = localStorage.getItem("admin_token");
            await api.api["claim-requests"]({ id: String(id) }).status.patch(
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            showToast("Status klaim berhasil diperbarui", "success");
            fetchClaims();
            setIsModalOpen(false);
        } catch {
            showToast("Gagal memperbarui status", "error");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin ingin menghapus klaim ini?")) return;

        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`/api/claim-requests/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete");
            showToast("Klaim berhasil dihapus", "success");
            fetchClaims();
            setIsModalOpen(false);
        } catch {
            showToast("Gagal menghapus klaim", "error");
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
                <h1 className="text-2xl font-bold text-foreground mb-2">Kelola Permintaan Klaim</h1>
                <p className="text-muted">Verifikasi dan kelola semua permintaan klaim barang</p>
            </div>

            {claims.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Pengklaim</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground hidden md:table-cell">Kontak</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground hidden lg:table-cell">ID Barang</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims.map((claim) => (
                                <tr key={claim.id} className="border-b border-border hover:bg-card/50 transition-colors">
                                    <td className="py-4 px-4">
                                        <p className="font-medium text-foreground">{claim.claimantName}</p>
                                        {claim.claimantNim && <p className="text-xs text-muted">NIM: {claim.claimantNim}</p>}
                                    </td>
                                    <td className="py-4 px-4 hidden md:table-cell">
                                        <p className="text-sm text-muted">{claim.contactPhone}</p>
                                    </td>
                                    <td className="py-4 px-4 hidden lg:table-cell">
                                        <p className="text-sm text-muted">#{claim.foundItemId}</p>
                                    </td>
                                    <td className="py-4 px-4">{getStatusBadge(claim.status)}</td>
                                    <td className="py-4 px-4 text-right">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => {
                                                setSelectedClaim(claim);
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
                        <p className="text-muted">Belum ada permintaan klaim</p>
                    </CardContent>
                </Card>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Detail Permintaan Klaim"
                size="lg"
            >
                {selectedClaim && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-muted">Nama Pengklaim</label>
                                <p className="font-medium text-foreground">{selectedClaim.claimantName}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">Status</label>
                                <div className="mt-1">{getStatusBadge(selectedClaim.status)}</div>
                            </div>
                            <div>
                                <label className="text-xs text-muted">Kontak</label>
                                <p className="text-sm text-foreground">{selectedClaim.contactPhone}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">NIM</label>
                                <p className="text-sm text-foreground">{selectedClaim.claimantNim || "N/A"}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">ID Barang Temuan</label>
                                <p className="text-sm text-foreground">#{selectedClaim.foundItemId}</p>
                            </div>
                            <div>
                                <label className="text-xs text-muted">Tanggal Klaim</label>
                                <p className="text-sm text-foreground">{formatDateShort(selectedClaim.createdAt)}</p>
                            </div>
                        </div>

                        <div className="border-t border-border pt-4">
                            <label className="text-xs text-muted block mb-2">Bukti Kepemilikan</label>
                            <div className="p-4 bg-background rounded-lg">
                                <p className="text-sm text-foreground whitespace-pre-wrap">{selectedClaim.ownershipProofText}</p>
                            </div>
                            {selectedClaim.ownershipProofImageUrl && (
                                <div className="mt-3">
                                    <label className="text-xs text-muted block mb-2">Foto Bukti</label>
                                    <img
                                        src={selectedClaim.ownershipProofImageUrl}
                                        alt="Bukti kepemilikan"
                                        className="rounded-lg border border-border max-w-full h-auto"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="border-t border-border pt-4">
                            <label className="text-xs text-muted block mb-2">Keputusan</label>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    size="sm"
                                    variant={selectedClaim.status === "APPROVED" ? "primary" : "outline"}
                                    onClick={() => handleUpdateStatus(selectedClaim.id, "APPROVED")}
                                    isLoading={isUpdating}
                                >
                                    ✓ Setujui
                                </Button>
                                <Button
                                    size="sm"
                                    variant={selectedClaim.status === "REJECTED" ? "danger" : "outline"}
                                    onClick={() => handleUpdateStatus(selectedClaim.id, "REJECTED")}
                                    isLoading={isUpdating}
                                >
                                    ✗ Tolak
                                </Button>
                                <Button
                                    size="sm"
                                    variant={selectedClaim.status === "PENDING" ? "secondary" : "outline"}
                                    onClick={() => handleUpdateStatus(selectedClaim.id, "PENDING")}
                                    isLoading={isUpdating}
                                >
                                    Pending
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-border">
                            <Button variant="danger" size="sm" onClick={() => handleDelete(selectedClaim.id)}>
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
