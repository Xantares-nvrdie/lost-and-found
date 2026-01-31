"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/eden";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await api.api["admin-users"].login.post({
                username: form.username,
                password: form.password,
            });

            if (res.error || !(res.data as any)?.token) {
                throw new Error("Invalid credentials");
            }

            localStorage.setItem("admin_token", (res.data as any).token);
            router.push("/admin");
        } catch (err) {
            setError("Username atau password salah");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12">
            <div className="w-full max-w-sm mx-4">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-foreground tracking-tight">Admin</h1>
                    <p className="text-sm text-muted mt-1">Masuk untuk mengelola data</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="px-3 py-2 bg-error/10 border border-error/20 rounded-lg text-xs text-error text-center">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            placeholder="Masukkan username"
                            autoComplete="username"
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="Masukkan password"
                            autoComplete="current-password"
                        />

                        <Button type="submit" isLoading={isLoading} className="w-full">
                            Masuk
                        </Button>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                        ← Kembali ke beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
