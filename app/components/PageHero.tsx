type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="bg-brand-navy pt-[120px] text-white">
      <div className="site-container py-16 md:py-20">
        <div className="section-label text-brand-gold-light">{eyebrow}</div>
        <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.3rem,5vw,4rem)] leading-[1.12] font-semibold">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/66">
          {description}
        </p>
      </div>
    </section>
  );
}
