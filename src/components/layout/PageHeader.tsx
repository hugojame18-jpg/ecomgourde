import { cx } from "@/lib/format";

export function PageHeader({
  eyebrow,
  title,
  text,
  tone = "light",
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: string;
  tone?: "light" | "dark";
  children?: React.ReactNode;
}) {
  return (
    <header
      className={cx(
        "relative overflow-hidden",
        tone === "dark" ? "bg-berry text-white" : "bg-mist text-ink",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-40%] h-[380px] w-[720px] -translate-x-1/2 rounded-full opacity-30 blur-[110px]"
        style={{ background: "radial-gradient(circle, #ffd0e0, transparent 70%)" }}
      />
      <div className="shell relative flex flex-col items-center gap-4 py-14 text-center md:py-20">
        {eyebrow ? (
          <span className={cx("eyebrow", tone === "dark" ? "text-white/70" : "text-berry")}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
            {eyebrow}
          </span>
        ) : null}
        <h1 className="max-w-[16ch] text-[38px] font-bold leading-[0.94] tracking-[-0.045em] md:text-[62px]">
          {title}
        </h1>
        {text ? (
          <p
            className={cx(
              "max-w-[52ch] text-[15px] leading-relaxed md:text-[17px]",
              tone === "dark" ? "text-white/60" : "text-ink-600",
            )}
          >
            {text}
          </p>
        ) : null}
        {children}
      </div>
    </header>
  );
}
