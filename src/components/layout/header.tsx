"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Beranda" },
        { href: "/lost", label: "Barang Hilang" },
        { href: "/found", label: "Barang Temuan" },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-card/80 backdrop-blur-md border-b border-border">
            <div className="container">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-foreground">OSTRIC</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted hover:text-foreground hover:bg-border"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/lost/report"
                            className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                        >
                            Laporkan Hilang
                        </Link>
                        <Link
                            href="/found/report"
                            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
                        >
                            Laporkan Temuan
                        </Link>
                    </div>

                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-border transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <nav className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted hover:text-foreground hover:bg-border"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                            <Link
                                href="/lost/report"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-center text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                            >
                                Laporkan Hilang
                            </Link>
                            <Link
                                href="/found/report"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
                            >
                                Laporkan Temuan
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export { Header };
