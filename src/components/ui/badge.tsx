import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

function Badge({ children, variant = "default", className = "" }: BadgeProps) {
    const variants = {
        default: "bg-border text-foreground",
        success: "bg-success/10 text-success",
        warning: "bg-accent/10 text-accent",
        error: "bg-error/10 text-error",
        info: "bg-primary/10 text-primary",
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
}

function getStatusBadge(status: string) {
    const statusMap: Record<string, { label: string; variant: BadgeVariant }> = {
        OPEN: { label: "Dicari", variant: "warning" },
        MATCHED: { label: "Cocok", variant: "info" },
        CLOSED: { label: "Selesai", variant: "success" },
        AVAILABLE: { label: "Tersedia", variant: "success" },
        CLAIMED: { label: "Diklaim", variant: "info" },
        PENDING: { label: "Menunggu", variant: "warning" },
        APPROVED: { label: "Disetujui", variant: "success" },
        REJECTED: { label: "Ditolak", variant: "error" },
    };

    const statusInfo = statusMap[status] || { label: status, variant: "default" as BadgeVariant };

    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
}

export { Badge, getStatusBadge };
