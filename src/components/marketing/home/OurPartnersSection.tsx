import Image from "next/image";
import { Button } from "@/components/ui/button";
import { client, urlFor } from "@/lib/sanity";

async function getPartnersSection() {
  const sections = await client.fetch(`*[_type == "partnersSection"]{
    heading,
    paragraph,
    buttonText,
    buttonLink,
    image
  }`);
  return sections[0];
}

export default async function OurPartnersSection() {
  const section = await getPartnersSection();
  if (!section) return null;

  return (
    <section className="bg-[#f5f7fa] py-20 md:py-28">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-6 px-6 md:gap-8 lg:grid-cols-2 lg:items-stretch lg:px-14">
        <div className="flex min-h-[360px] flex-col justify-between rounded-3xl bg-white p-10 shadow-sm md:min-h-[400px] md:p-12 lg:min-h-[440px]">
          <div>
            <h2 className="text-3xl font-bold text-bird-accent md:text-4xl">{section.heading}</h2>
            <p className="mt-6 text-base leading-relaxed text-black md:text-lg">
              {section.paragraph}
            </p>
          </div>
          <Button
            asChild
            className="mt-10 h-12 w-fit rounded-full bg-bird-accent px-8 text-base hover:bg-bird-accent-hover md:h-14 md:px-10"
          >
            <a href={section.buttonLink}>{section.buttonText ?? "See Sponsors Below"}</a>
          </Button>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-3xl md:min-h-[400px] lg:min-h-[440px]">
          {section.image && (
            <Image
              src={urlFor(section.image).width(1080).url()}
              alt="A woman and young girl smiling together"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 540px"
            />
          )}
        </div>
      </div>
    </section>
  );
}