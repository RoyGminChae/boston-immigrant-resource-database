import Image from "next/image";
import FaqAccordion from "./FaqAccordion";
import { client } from "@/lib/sanity";

async function getGeneralFaqs() {
  return client.fetch(`*[_type == "faqItem" && section == "general"]{
    _id,
    trigger,
    content
  }`)
}

export default async function FaqSection() {
  const faqs = await getGeneralFaqs()

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <h2 className="text-2xl font-bold text-bird-accent md:text-3xl">
          Frequently Asked Question
        </h2>
        <p className="mt-1 text-sm text-bird-accent/80 md:text-base">
          Boston Immigrant Resource Dashboard
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="rounded-2xl bg-[#F9FBFF] p-6">
            <FaqAccordion items={faqs} defaultOpen="0" />
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-2xl lg:min-h-[400px]">
            <Image
              src="/img/helping.png"
              alt="Community members shaking hands"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
