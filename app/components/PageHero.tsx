import { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  /** Tighter top/bottom padding for shorter pages where the default gap reads as too much empty space. */
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  titleClassName,
  descriptionClassName,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={`bg-brand-navy text-white ${compact ? "pt-[88px]" : "pt-[120px]"}`}
    >
      <div
        className={`site-container ${compact ? "py-8 md:py-10" : "py-16 md:py-20"}`}
      >
        <div className="section-label text-brand-gold-light">{eyebrow}</div>
        <h1
          className={
            titleClassName ||
            "mt-5 max-w-4xl font-serif text-[clamp(2.3rem,5vw,4rem)] leading-[1.12] font-semibold"
          }
        >
          {title}
        </h1>
        <div
          className={
            descriptionClassName ||
            "mt-5 max-w-2xl text-lg leading-8 text-white/66"
          }
        >
          {description}
        </div>
      </div>
    </section>
  );
}
