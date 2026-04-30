import Link from "next/link";
import { ArrowRightIcon } from "@/app/components/Icons";
import { processSteps } from "@/app/lib/site-data";

type ProcessSectionProps = {
  detailed?: boolean;
};

export function ProcessSection({ detailed = false }: ProcessSectionProps) {
  return (
    <section className="border-y border-brand-border bg-brand-ivory py-24">
      <div className="site-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-label justify-center">The Process</div>
          <h2 className="mt-5 font-serif text-[clamp(2.1rem,4vw,3rem)] leading-[1.18] font-semibold text-brand-navy">
            How Your Case Is Handled
          </h2>
          <p className="mt-5 text-[1.04rem] leading-8 text-brand-slate">
            A calm, structured process designed for families and advisers who
            need professional guidance rather than technical complexity.
          </p>
        </div>

        <div className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-0">
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-brand-gold/30 lg:block" />
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="relative z-10 px-2 text-center lg:px-6"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center border-2 border-brand-navy bg-white">
                <span className="font-serif text-2xl font-bold text-brand-navy">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-7 font-serif text-[1.22rem] font-semibold text-brand-navy">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-brand-slate">
                {step.description}
              </p>
              {detailed ? (
                <p className="mt-4 text-sm leading-7 text-brand-slate/88">
                  Each stage is documented clearly so the family or instructing
                  adviser understands what is happening, what has been requested,
                  and what the next decision point will be.
                </p>
              ) : null}
            </article>
          ))}
        </div>

        {detailed ? (
          <div className="mt-14 flex justify-center">
            <Link
              href="/start-a-case"
              className="inline-flex items-center gap-3 border border-brand-gold bg-brand-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:-translate-y-0.5 hover:bg-brand-gold-light hover:text-brand-navy"
            >
              Prepare Your Case
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
