import Image from "next/image";
import { client, urlFor } from "@/lib/sanity";

async function getPartnerLogos() {
  return client.fetch(`*[_type == "partnerLogo"]{
    _id,
    alt,
    logo
  }`)
}

export default async function SponsorLogos() {
  const logos = await getPartnerLogos()

  return (
    <section id="sponsors" className="border-y border-gray-100 bg-white py-10">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-center gap-20 px-6 sm:gap-28 md:gap-36 lg:justify-between lg:gap-0 lg:px-20 xl:px-28">
        {logos.map((logo: any) => (
          <div key={logo._id} className="flex h-16 items-center justify-center">
            {logo.logo && (
              <Image
                src={urlFor(logo.logo).width(360).height(128).url()}
                alt={logo.alt ?? ""}
                width={180}
                height={64}
                className="max-h-16 w-auto object-contain"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}