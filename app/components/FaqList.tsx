import { ChevronDownIcon } from "@/app/components/Icons";
import { faqItems } from "@/app/lib/site-data";

export function FaqList() {
  return (
    <div className="mx-auto grid max-w-4xl gap-4">
      {faqItems.map((item) => (
        <details
          key={item.question}
          className="group border border-brand-border bg-white px-6 py-5"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
            <span className="font-serif text-[1.18rem] font-semibold text-brand-navy">
              {item.question}
            </span>
            <ChevronDownIcon className="mt-1 h-5 w-5 shrink-0 text-brand-gold transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-4 max-w-3xl pr-4 text-[1rem] leading-8 text-brand-slate">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
