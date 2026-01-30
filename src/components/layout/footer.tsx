import Link from "next/link";

function Footer() {
    return (
        <footer className="bg-card border-t border-border mt-auto pt-8">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
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
                        <p className="text-muted text-sm max-w-sm">
                            Platform Lost & Found untuk membantu menemukan barang yang hilang dan mempertemukan dengan pemiliknya.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Menu</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm text-muted hover:text-primary transition-colors">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="/lost" className="text-sm text-muted hover:text-primary transition-colors">
                                    Barang Hilang
                                </Link>
                            </li>
                            <li>
                                <Link href="/found" className="text-sm text-muted hover:text-primary transition-colors">
                                    Barang Temuan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Laporkan</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/lost/report" className="text-sm text-muted hover:text-primary transition-colors">
                                    Lapor Kehilangan
                                </Link>
                            </li>
                            <li>
                                <Link href="/found/report" className="text-sm text-muted hover:text-primary transition-colors">
                                    Lapor Temuan
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/login" className="text-sm text-muted hover:text-primary transition-colors">
                                    Admin
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-8 text-center">
                    <p className="text-sm text-muted">&copy; {new Date().getFullYear()} OSTRIC. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export { Footer };
