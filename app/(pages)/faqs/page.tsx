import { FaqList } from "@/app/components/FaqList";
import { PageHero } from "@/app/components/PageHero";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "FAQs",
  description:
    "Common questions about estate financial searches, timelines, authority, fees, and the Estate Resolve process.",
  path: "/faqs",
});

export default function FaqsPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Answers to the Questions Families and Executors Ask Most Often"
        description="If you are trying to understand whether this service is suitable for the estate, these are the issues that usually come up first."
      />

      <section className="py-20">
        <div className="site-container">
          <FaqList />
        </div>
      </section>
    </main>
  );
}
