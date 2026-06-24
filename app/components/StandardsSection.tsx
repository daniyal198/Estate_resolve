import {
  ClockIcon,
  DocumentIcon,
  LockIcon,
  PoundIcon,
  ScaleIcon,
  UsersIcon,
} from "@/app/components/Icons";
import { standards } from "@/app/lib/site-data";

const iconMap = {
  clock: ClockIcon,
  document: DocumentIcon,
  lock: LockIcon,
  pound: PoundIcon,
  scale: ScaleIcon,
  users: UsersIcon,
} as const;

export function StandardsSection({ title }: { title?: string }) {
  return (
    <section className="py-24">
      <div className="site-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-label justify-center">
            Why Use Estate Resolve
          </div>
          <h2 className="mt-5 font-serif text-[clamp(2.1rem,4vw,3rem)] leading-[1.18] font-semibold text-brand-navy">
            {title || "Practical Value for Executors, Families, and Advisers"}
          </h2>
        </div>

        <div className="mt-14 grid gap-px border border-brand-border bg-brand-border md:grid-cols-2 xl:grid-cols-3">
          {standards.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <article
                key={item.title}
                className="bg-white p-9 hover:bg-brand-ivory"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-brand-navy text-brand-gold-light">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-serif text-[1.32rem] font-semibold text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-slate">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
