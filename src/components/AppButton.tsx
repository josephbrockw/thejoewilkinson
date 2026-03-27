"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost-dark" | "ghost-light";
type Size = "md" | "lg";

interface AppButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  // Amber fill — for primary CTAs
  primary:
    "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 shadow-[0_2px_12px_rgba(245,158,11,0.35)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.45)]",
  // Forest green fill — for secondary CTAs
  secondary:
    "bg-[#064E3B] text-white hover:bg-[#053d2e] active:bg-[#042e23] shadow-[0_2px_12px_rgba(6,78,59,0.25)] hover:shadow-[0_4px_20px_rgba(6,78,59,0.35)]",
  // Used on dark (forest green) backgrounds — ghost white
  "ghost-light":
    "bg-white/15 text-white border border-white/30 hover:bg-white/25 hover:border-white/50 backdrop-blur-sm shadow-none",
  // Used on light backgrounds — ghost forest
  "ghost-dark":
    "bg-transparent text-[#064E3B] border border-[#064E3B]/30 hover:bg-[#064E3B]/8 hover:border-[#064E3B]/60 shadow-none",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-9 py-3.5 text-base",
};

export function AppButton({
  variant = "primary",
  size = "lg",
  href,
  external = false,
  onClick,
  type = "button",
  disabled = false,
  children,
  className = "",
}: AppButtonProps) {
  const cls = [
    "inline-flex items-center justify-center gap-2",
    "font-semibold rounded-full",
    "transition-all duration-200 ease-out",
    "active:scale-[0.97]",
    "cursor-pointer select-none",
    variants[variant],
    sizes[size],
    className,
  ].join(" ");

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
