"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/eden";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function ReportLostPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        reporterName: "",
        reporterContact: "",
        reporterNim: "",
        itemName: "",
        itemDescription: "",
        lastLocation: "",
        lostDate: "",
        photoUrl: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await api.api["lost-reports"].post({
                reporterName: form.reporterName,
                reporterContact: form.reporterContact,
                reporterNim: form.reporterNim || undefined,
                itemName: form.itemName,
                itemDescription: form.itemDescription,
                lastLocation: form.lastLocation,
                lostDate: form.lostDate,
                photoUrl: form.photoUrl || undefined,
            });

            if (res.error) {
                throw new Error("Failed to submit report");
            }

            showToast("Laporan berhasil dibuat!", "success");
            router.push("/lost");
        } catch (err) {
            showToast("Gagal membuat laporan. Silakan coba lagi.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-12">
            <div className="container max-w-2xl">
                <Link
                    href="/lost"
                    className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali
                </Link>

                <Card>
                    <CardHeader>
                        <CardTitle>Laporkan Barang Hilang</CardTitle>
                        <CardDescription>Isi form berikut untuk melaporkan barang yang hilang</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-foreground">Informasi Pelapor</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Nama Lengkap *"
                                        name="reporterName"
                                        value={form.reporterName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    <Input
                                        label="Nomor HP/WA *"
                                        name="reporterContact"
                                        value={form.reporterContact}
                                        onChange={handleChange}
                                        required
                                        placeholder="08xxxxxxxxxx"
                                    />
                                </div>
                                <Input
                                    label="NIM (Opsional)"
                                    name="reporterNim"
                                    value={form.reporterNim}
                                    onChange={handleChange}
                                    placeholder="Masukkan NIM jika mahasiswa"
                                />
                            </div>

                            <div className="border-t border-border pt-6 space-y-4">
                                <h3 className="text-sm font-semibold text-foreground">Detail Barang</h3>
                                <Input
                                    label="Nama Barang *"
                                    name="itemName"
                                    value={form.itemName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Contoh: Laptop ASUS"
                                />
                                <Textarea
                                    label="Deskripsi Barang *"
                                    name="itemDescription"
                                    value={form.itemDescription}
                                    onChange={handleChange}
                                    required
                                    placeholder="Jelaskan ciri-ciri barang secara detail"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Lokasi Terakhir *"
                                        name="lastLocation"
                                        value={form.lastLocation}
                                        onChange={handleChange}
                                        required
                                        placeholder="Contoh: Gedung A Lt.3"
                                    />
                                    <Input
                                        label="Tanggal Hilang *"
                                        name="lostDate"
                                        type="date"
                                        value={form.lostDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Input
                                    label="URL Foto (Opsional)"
                                    name="photoUrl"
                                    value={form.photoUrl}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" isLoading={isLoading} className="flex-1">
                                    Kirim Laporan
                                </Button>
                                <Link href="/lost" className="flex-1">
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
