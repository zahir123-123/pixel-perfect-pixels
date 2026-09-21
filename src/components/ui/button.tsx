import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "icon" | "tab" | "view" | "nav";
};

export function Button({ className, variant = "icon", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn("cursor-pointer", className)} data-variant={variant} {...props} />;
}