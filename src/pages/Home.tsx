import { AboutHighlights } from "../components/home/about-highlights";
import { FeatureCcr } from "../components/home/feature-ccr";
import { Hero } from "../components/home/hero";
import { NoticesPreview } from "../components/home/notice-preview";
import { QuickLinks } from "../components/home/quick-links";
import { UtilityRow } from "../components/home/utility-row";

export default function Home() {
  return (
    <main className="container-page py-10">
      <Hero />
      <NoticesPreview />
      <QuickLinks />
      <AboutHighlights />
      <FeatureCcr />
      <UtilityRow />
    </main>
  );
}
