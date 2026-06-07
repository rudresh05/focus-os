import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[var(--line)] bg-[var(--panel-strong)] px-3 py-2 text-sm text-[var(--text)] transition-all placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props} />
    )
  }
)
Input.displayName = "Input"

export { Input }
