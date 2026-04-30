import {
  CheckIcon,
  LockIcon,
  ShieldIcon,
  UsersIcon,
} from "@/app/components/Icons";
import { trustHighlights } from "@/app/lib/site-data";

const iconMap = {
  check: CheckIcon,
  lock: LockIcon,
  shield: ShieldIcon,
  users: UsersIcon,
} as const;

export function TrustBar() {
  return (
    <section className="border-y border-brand-border bg-brand-ivory py-6">
      <div className="site-container grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {trustHighlights.map((item) => {
          const Icon = iconMap[item.icon];

          return (
            <div key={item.title} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-navy text-brand-gold-light">
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-brand-navy">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm leading-6 text-brand-slate">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
