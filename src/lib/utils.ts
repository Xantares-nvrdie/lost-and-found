import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date | null | undefined): string {
    if (!date) return "Tidak diketahui";

    try {
        const d = typeof date === "string" ? new Date(date) : date;
        if (isNaN(d.getTime())) return String(date);
        return d.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch {
        return String(date);
    }
}

export function formatDateShort(date: string | Date | null | undefined): string {
    if (!date) return "N/A";

    try {
        const d = typeof date === "string" ? new Date(date) : date;
        if (isNaN(d.getTime())) return String(date);
        return d.toLocaleDateString("id-ID");
    } catch {
        return String(date);
    }
}
