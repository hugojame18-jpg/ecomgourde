import Link from "next/link";
import { cx } from "@/lib/format";

type Variant = "primary" | "brand" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 font-semibold rounded-full " +
  "transition-[transform,background-color,color,box-shadow] duration-200 ease-[cubic-bezier(.22,1,.36,1)] " +
  "active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none select-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-berry text-white hover:bg-berry-deep shadow-[0_10px_24px_-12px_rgba(168,48,92,.55)]",
  brand: "bg-brand text-ink hover:bg-brand-glow shadow-[0_12px_28px_-12px_rgba(0,201,182,.85)]",
  outline: "border border-ink/15 text-ink bg-white hover:border-ink/40 hover:bg-mist",
  ghost: "text-ink hover:bg-ink/[0.06]",
  white: "bg-white text-ink hover:bg-mist shadow-[0_10px_24px_-14px_rgba(0,0,0,.5)]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-[16px] md:h-[58px] md:px-10",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  full,
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cx(base, variants[variant], sizes[size], full && "w-full", className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  full,
  className,
  children,
  href,
  ...rest
}: CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link
      href={href}
      className={cx(base, variants[variant], sizes[size], full && "w-full", className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
