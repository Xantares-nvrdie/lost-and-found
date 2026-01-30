import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = "", label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="block text-sm text-foreground mb-2">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={inputId}
                className={`w-full px-3 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${error ? "border-error" : "border-border"
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
        </div>
    );
});

Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = "", label, error, id, ...props }, ref) => {
        const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={textareaId} className="block text-sm text-foreground mb-2">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={textareaId}
                    className={`w-full px-3 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none ${error ? "border-error" : "border-border"
                        } ${className}`}
                    rows={4}
                    {...props}
                />
                {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = "", label, error, id, options, ...props }, ref) => {
        const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={selectId} className="block text-sm text-foreground mb-2">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    id={selectId}
                    className={`w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${error ? "border-error" : "border-border"
                        } ${className}`}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
            </div>
        );
    }
);

Select.displayName = "Select";

export { Input, Textarea, Select };
