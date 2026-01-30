import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
    dot?: boolean;
}

function Badge({ children, variant = "default", className = "", dot = false }: BadgeProps) {
    const variants = {
        default: "bg-primary-light text-muted",
        success: "bg-success/10 text-success",
        warning: "bg-accent/10 text-accent",
        error: "bg-error/10 text-error",
        info: "bg-accent/10 text-accent",
    };

    const dotColors = {
        default: "bg-muted",
        success: "bg-success",
        warning: "bg-accent",
        error: "bg-error",
        info: "bg-accent",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
        >
            {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
            {children}
        </span>
    );
}

function getStatusBadge(status: string) {
    const statusMap: Record<string, { label: string; variant: BadgeVariant; dot?: boolean }> = {
        OPEN: { label: "Dicari", variant: "warning", dot: true },
        MATCHED: { label: "Cocok", variant: "success" },
        CLOSED: { label: "Selesai", variant: "default" },
        AVAILABLE: { label: "Tersedia", variant: "success", dot: true },
        CLAIMED: { label: "Diklaim", variant: "default" },
        PENDING: { label: "Menunggu", variant: "warning", dot: true },
        APPROVED: { label: "Disetujui", variant: "success" },
        REJECTED: { label: "Ditolak", variant: "error" },
    };

    const statusInfo = statusMap[status] || { label: status, variant: "default" as BadgeVariant };

    return <Badge variant={statusInfo.variant} dot={statusInfo.dot}>{statusInfo.label}</Badge>;
}

export { Badge, getStatusBadge };
