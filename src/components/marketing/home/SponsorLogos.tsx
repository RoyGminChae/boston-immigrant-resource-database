import Image from "next/image";

import { PARTNER_LOGOS } from "./data";

export default function SponsorLogos() {
  return (
    <section id="sponsors" className="border-y border-gray-100 bg-white py-10">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-center gap-20 px-6 sm:gap-28 md:gap-36 lg:justify-between lg:gap-0 lg:px-20 xl:px-28">
        {PARTNER_LOGOS.map((logo) => (
          <div key={logo.src} className="flex h-16 items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={180}
              height={64}
              className="max-h-16 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
