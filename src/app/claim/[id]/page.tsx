"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/eden";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function ClaimItemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [item, setItem] = useState<any>(null);
    const [form, setForm] = useState({
        claimantName: "",
        claimantNim: "",
        contactPhone: "",
        ownershipProofText: "",
        ownershipProofImageUrl: "",
    });

    useEffect(() => {
        async function fetchItem() {
            try {
                const res = await api.api["found-items"]({ id }).get();
                if (res.data && !(res.data as any).message) {
                    setItem(res.data);
                }
            } catch {
                showToast("Gagal memuat data barang", "error");
            }
        }
        fetchItem();
    }, [id, showToast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await api.api["claim-requests"].post({
                foundItemId: Number(id),
                claimantName: form.claimantName,
                claimantNim: form.claimantNim || undefined,
                contactPhone: form.contactPhone,
                ownershipProofText: form.ownershipProofText,
                ownershipProofImageUrl: form.ownershipProofImageUrl || undefined,
            });

            if (res.error) {
                throw new Error("Failed to submit claim");
            }

            showToast("Klaim berhasil diajukan! Tunggu konfirmasi dari admin.", "success");
            router.push("/found");
        } catch (err) {
            showToast("Gagal mengajukan klaim. Silakan coba lagi.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-12">
            <div className="container max-w-2xl">
                <Link
                    href={`/found/${id}`}
                    className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali ke detail barang
                </Link>

                {item && (
                    <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <p className="text-sm text-muted mb-1">Mengajukan klaim untuk:</p>
                        <h2 className="text-lg font-semibold text-foreground">{item.itemName}</h2>
                        {item.description && <p className="text-sm text-muted mt-1">{item.description}</p>}
                    </div>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Ajukan Klaim Barang</CardTitle>
                        <CardDescription>
                            Isi form berikut dengan bukti kepemilikan untuk mengklaim barang ini
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-foreground">Informasi Pengklaim</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Nama Lengkap *"
                                        name="claimantName"
                                        value={form.claimantName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    <Input
                                        label="Nomor HP/WA *"
                                        name="contactPhone"
                                        value={form.contactPhone}
                                        onChange={handleChange}
                                        required
                                        placeholder="08xxxxxxxxxx"
                                    />
                                </div>
                                <Input
                                    label="NIM (Opsional)"
                                    name="claimantNim"
                                    value={form.claimantNim}
                                    onChange={handleChange}
                                    placeholder="Masukkan NIM jika mahasiswa"
                                />
                            </div>

                            <div className="border-t border-border pt-6 space-y-4">
                                <h3 className="text-sm font-semibold text-foreground">Bukti Kepemilikan</h3>
                                <Textarea
                                    label="Jelaskan Bukti Kepemilikan *"
                                    name="ownershipProofText"
                                    value={form.ownershipProofText}
                                    onChange={handleChange}
                                    required
                                    placeholder="Jelaskan secara detail mengapa barang ini milik Anda. Contoh: ciri-ciri unik, isi dompet, dll."
                                />
                                <Input
                                    label="URL Foto Bukti (Opsional)"
                                    name="ownershipProofImageUrl"
                                    value={form.ownershipProofImageUrl}
                                    onChange={handleChange}
                                    placeholder="https://... (foto KTP, struk pembelian, dll.)"
                                />
                            </div>

                            <div className="bg-accent/10 rounded-lg p-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                    <p className="text-foreground">
                                        Klaim Anda akan diverifikasi oleh admin. Pastikan informasi yang Anda berikan benar dan dapat
                                        dipertanggungjawabkan.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" isLoading={isLoading} className="flex-1">
                                    Ajukan Klaim
                                </Button>
                                <Link href={`/found/${id}`} className="flex-1">
                                    <Button type="button" variant="outline" className="w-full">
                                        Batal
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
