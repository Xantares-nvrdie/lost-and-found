import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

function Card({ children, className = "", hover = false }: CardProps) {
    return (
        <div
            className={`bg-card rounded-xl border border-border p-6 shadow-sm ${hover ? "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" : ""
                } ${className}`}
        >
            {children}
        </div>
    );
}

function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`mb-4 ${className}`}>{children}</div>;
}

function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <h3 className={`text-lg font-semibold text-foreground ${className}`}>{children}</h3>;
}

function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <p className={`text-sm text-muted mt-1 ${className}`}>{children}</p>;
}

function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={className}>{children}</div>;
}

function CardFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`mt-4 pt-4 border-t border-border ${className}`}>{children}</div>;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
