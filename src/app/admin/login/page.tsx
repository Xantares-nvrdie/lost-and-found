"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/eden";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
            <div className="container max-w-md">
                <Card>
                    <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <CardTitle>Admin Login</CardTitle>
                        <CardDescription>Masuk untuk mengelola data Lost & Found</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 bg-error/10 border border-error/20 rounded-lg text-sm text-error text-center">
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

                        <div className="mt-6 pt-6 border-t border-border text-center">
                            <Link href="/" className="text-sm text-muted hover:text-primary transition-colors">
                                ← Kembali ke beranda
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
