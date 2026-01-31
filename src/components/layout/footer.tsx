import Link from "next/link";

function Footer() {
    return (
        <footer className="border-t border-border mt-auto pt-8">
            <div className="container py-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <Link href="/" className="font-semibold text-foreground tracking-tight">
                            Lost & Found
                        </Link>
                        <p className="text-sm text-muted mt-1">
                            Membantu menemukan barang yang hilang.
                        </p>
                    </div>

                    <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                        <Link href="/lost" className="hover:text-foreground transition-colors">
                            Barang Hilang
                        </Link>
                        <Link href="/found" className="hover:text-foreground transition-colors">
                            Barang Temuan
                        </Link>
                        <Link href="/lost/report" className="hover:text-foreground transition-colors">
                            Lapor Hilang
                        </Link>
                        <Link href="/found/report" className="hover:text-foreground transition-colors">
                            Lapor Temuan
                        </Link>
                        <Link href="/admin/login" className="hover:text-foreground transition-colors">
                            Admin
                        </Link>
                    </nav>
                </div>

                <div className="border-t border-border mt-8 pt-6">
                    <p className="text-xs text-muted">
                        © {new Date().getFullYear()} Lost & Found
                    </p>
                </div>
            </div>
        </footer>
    );
}

export { Footer };
