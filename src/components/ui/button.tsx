import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
	size?: "sm" | "md" | "lg";
	isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className = "", variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
		const baseStyles =
			"inline-flex items-center justify-center font-medium rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

		const variants = {
			primary: "bg-foreground text-background hover:opacity-90 focus-visible:ring-foreground",
			secondary: "bg-primary-light text-foreground hover:bg-border focus-visible:ring-border",
			outline: "border border-border text-foreground hover:bg-primary-light focus-visible:ring-border",
			ghost: "text-muted hover:text-foreground hover:bg-primary-light focus-visible:ring-border",
			danger: "bg-error text-white hover:opacity-90 focus-visible:ring-error",
		};

		const sizes = {
			sm: "px-3 py-1.5 text-xs",
			md: "px-4 py-2 text-sm",
			lg: "px-6 py-2.5 text-sm",
		};

		return (
			<button
				ref={ref}
				className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
				disabled={disabled || isLoading}
				{...props}
			>
				{isLoading && (
					<svg
						className="animate-spin -ml-1 mr-2 h-3.5 w-3.5"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				)}
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
