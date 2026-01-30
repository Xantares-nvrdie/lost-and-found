"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: "sm" | "md" | "lg";
}

function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !mounted) return null;

    const sizes = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-2xl",
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
            <div
                className={`relative w-full ${sizes[size]} bg-card rounded-2xl border border-border shadow-xl animate-in`}
            >
                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                        <h2 className="font-medium text-foreground">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-1.5 -mr-1.5 rounded-lg hover:bg-primary-light transition-colors"
                            aria-label="Close modal"
                        >
                            <svg
                                className="w-4 h-4 text-muted"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
                <div className="p-6">{children}</div>
            </div>
        </div>,
        document.body
    );
}

export { Modal };
