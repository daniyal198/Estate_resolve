import { CallToAction } from "@/app/components/CallToAction";
import { HeroSection } from "@/app/components/HeroSection";
import { IntroSection } from "@/app/components/IntroSection";
import { ProcessSection } from "@/app/components/ProcessSection";
import { StandardsSection } from "@/app/components/StandardsSection";
import { TrustBar } from "@/app/components/TrustBar";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  description:
    "Professional estate financial search services for families, solicitors, and executors who need clarity after a bereavement.",
  path: "/",
});

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <HeroSection />
      <TrustBar />
      <IntroSection />
      <ProcessSection />
      <StandardsSection />
      <CallToAction />
    </main>
  );
}
