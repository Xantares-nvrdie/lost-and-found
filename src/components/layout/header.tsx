"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "../theme-toggle";

function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "/lost", label: "Barang Hilang" },
        { href: "/found", label: "Barang Temuan" },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="container">
                <div className="flex items-center justify-between h-14">
                    <Link href="/" className="font-semibold text-foreground tracking-tight">
                        Lost & Found
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm transition-colors link-underline ${isActive(link.href)
                                    ? "text-foreground"
                                    : "text-muted hover:text-foreground"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            href="/lost/report"
                            className="text-sm text-muted hover:text-foreground transition-colors px-3 py-1.5"
                        >
                            Lapor Hilang
                        </Link>
                        <Link
                            href="/found/report"
                            className="px-4 py-1.5 text-sm font-medium text-background bg-foreground rounded-full hover:opacity-90 transition-opacity"
                        >
                            Lapor Temuan
                        </Link>
                        <ThemeToggle />
                    </div>

                    <div className="flex items-center gap-2 md:hidden">
                        <ThemeToggle />
                        <button
                            className="p-2 -mr-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-sm ${isActive(link.href) ? "text-foreground" : "text-muted"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
                                <Link
                                    href="/lost/report"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-sm text-muted"
                                >
                                    Lapor Hilang
                                </Link>
                                <Link
                                    href="/found/report"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-sm font-medium text-foreground"
                                >
                                    Lapor Temuan →
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

export { Header };
