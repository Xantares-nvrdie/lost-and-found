"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        const token = localStorage.getItem("admin_token");

        // Tidak punya token
        if (!token) {
            setIsAuthenticated(false);

            if (!isLoginPage) {
                router.replace("/admin/login");
            }

            setIsLoading(false);
            return;
        }

        // Punya token
        setIsAuthenticated(true);

        // Sudah login tapi membuka /admin/login
        if (isLoginPage) {
            router.replace("/admin");
            return;
        }

        setIsLoading(false);
    }, [isLoginPage, router]);

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        router.replace("/admin/login");
    };

    const navLinks = [
        { href: "/admin", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
        { href: "/admin/lost-reports", label: "Barang Hilang", icon: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { href: "/admin/found-items", label: "Barang Temuan", icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" },
        { href: "/admin/claim-requests", label: "Permintaan Klaim", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <aside className="fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border overflow-y-auto hidden lg:block">
                    <div className="p-4">
                        <div className="mb-6">
                            <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Menu</h2>
                            <nav className="space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted hover:text-foreground hover:bg-border"
                                            }`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                                        </svg>
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="border-t border-border pt-4">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-error hover:bg-error/10 w-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                Keluar
                            </button>
                        </div>
                    </div>
                </aside>

                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
                    <nav className="flex justify-around py-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors ${pathname === link.href ? "text-primary" : "text-muted"
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                                </svg>
                                <span className="line-clamp-1">{link.label.split(" ")[0]}</span>
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium text-error"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            Keluar
                        </button>
                    </nav>
                </div>

                <main className="flex-1 lg:ml-64 pb-20 lg:pb-0">{children}</main>
            </div>
        </div>
    );
}
