import { Hero } from "../components/home/hero";
import { NoticesPreview } from "../components/home/notice-preview";

export default function Home() {
  return (
    <main className="container-page py-10">
      <Hero />
      <NoticesPreview />
    </main>
  );
}
