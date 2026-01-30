"use client";

import { useTheme } from "./theme-provider";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-light transition-colors focus-ring"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            {/* Sun icon */}
            <svg
                className={`w-5 h-5 absolute transition-all duration-300 ${theme === "light"
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 rotate-90 scale-0"
                    }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
                <path
                    strokeLinecap="round"
                    strokeWidth={1.5}
                    d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
                />
            </svg>

            {/* Moon icon */}
            <svg
                className={`w-5 h-5 absolute transition-all duration-300 ${theme === "dark"
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-0"
                    }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
            </svg>
        </button>
    );
}
