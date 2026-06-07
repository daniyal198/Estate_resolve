import Link from "next/link";
import { ArrowRightIcon } from "@/app/components/Icons";
import { config } from "@/app/lib/config";
import { processSteps } from "@/app/lib/site-data";

export function HeroSection() {
  const turnaroundValue = config.timeline.standardTurnaround.split(" ")[0];

  return (
    <section className="hero-shell min-h-screen pt-[72px] text-white">
      <div className="site-container relative z-10 grid min-h-[calc(100vh-72px)] items-center gap-14 py-16 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-20">
        <div className="animate-fade-up">
          <div className="section-label">Estate Financial Resolution</div>
          <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2.7rem,6vw,4.6rem)] leading-[1.08] font-semibold text-white">
            Locating Hidden Assets
            <br />
            After a Loved One
            <br />
            <em className="font-medium italic text-brand-gold-light">
              Has Passed
            </em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/68 md:text-[1.15rem]">
          We combine discreet, professional enquiries with advanced technology and data-led analysis to trace bank accounts and investment assets.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/start-a-case"
              className="inline-flex items-center justify-center gap-3 border border-brand-gold bg-brand-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:-translate-y-0.5 hover:bg-brand-gold-light hover:text-brand-navy"
            >
              Start a Case
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/book-a-consultation"
              className="inline-flex items-center gap-2 border-b border-white/20 pb-1 text-sm font-semibold tracking-[0.08em] text-white/72 hover:border-brand-gold hover:text-brand-gold-light"
            >
              Book a consultation
            </Link>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/14 pt-8">
            <div>
              <p className="font-serif text-3xl font-semibold text-white">
                {turnaroundValue}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/46">
                Day Turnaround
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold text-white">
                {config.pricing.fixedFee}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/46">
                Fixed Fee
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold text-white">
                100%
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/46">
                Confidential
              </p>
            </div>
          </div>
        </div>

        <aside className="accent-border animate-fade-up border border-[rgba(176,141,78,0.25)] bg-white/5 p-8 backdrop-blur md:p-11">
          <p className="font-serif text-sm uppercase tracking-[0.18em] text-brand-gold-light">
            Our Simple Process
          </p>
          <div className="mt-8 space-y-5">
            {processSteps.map((step, index) => (
              <div key={step.number}>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-brand-gold/55 text-xs font-semibold tracking-[0.1em] text-brand-gold-light">
                    {step.number}
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold tracking-[0.03em] text-white">
                      {step.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-white/52">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < processSteps.length - 1 ? (
                  <div className="ml-4 mt-5 h-4 w-px bg-brand-gold/25" />
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-brand-gold/20 pt-7">
            <Link
              href="/start-a-case"
              className="inline-flex w-full items-center justify-between bg-brand-gold px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
            >
              Begin Your Case Today
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
