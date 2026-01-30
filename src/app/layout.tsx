import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "OSTRIC - Lost & Found Platform",
	description: "Platform untuk melaporkan dan menemukan barang hilang",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="id">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
				<ToastProvider>
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</ToastProvider>
			</body>
		</html>
	);
}
