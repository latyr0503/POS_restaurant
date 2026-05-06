import * as React from "react"

import { cn } from "@/lib/utils"
import { EyeIcon, EyeOffIcon } from "lucide-react"

function Input({
  className,
  Icon,
  type,
  ...props
}: React.ComponentProps<"input"> & { Icon?: React.ElementType }) {
  const [inputType, setInputType] = React.useState(type)

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"))
  }
  return (
    <div className="relative flex items-center gap-2">
      {Icon && (
        <Icon className="absolute left-3 h-5 w-5 text-primary" />
      )}

      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "h-11 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className,
          Icon && "ps-10"
        )}
        {...props}
      />

      {type === "password" && inputType === "password" && (
        <EyeIcon
          className="absolute right-3 h-5 w-5 cursor-pointer text-primary"
          onClick={togglePasswordVisibility}
        />
      )}

      {type === "password" && inputType === "text" && (
        <EyeOffIcon
          className="absolute right-3 h-5 w-5 cursor-pointer text-primary"
          onClick={togglePasswordVisibility}
        />
      )}
    </div>
  )
}

export { Input }
