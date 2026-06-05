import FaqAccordion from "./FaqAccordion";
import { FOR_PROVIDERS_FAQ } from "./data";

export default function ForProvidersSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <h2 className="text-center text-2xl font-bold text-bird-accent md:text-3xl">
          For Providers
        </h2>
        <div className="mt-8 rounded-2xl bg-white px-2 md:px-6">
          <FaqAccordion items={FOR_PROVIDERS_FAQ} defaultOpen="0" centered />
        </div>
      </div>
    </section>
  );
}
