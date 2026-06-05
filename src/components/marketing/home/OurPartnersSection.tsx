import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function OurPartnersSection() {
  return (
    <section className="bg-[#f5f7fa] py-20 md:py-28">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-6 px-6 md:gap-8 lg:grid-cols-2 lg:items-stretch lg:px-14">
        <div className="flex min-h-[360px] flex-col justify-between rounded-3xl bg-white p-10 shadow-sm md:min-h-[400px] md:p-12 lg:min-h-[440px]">
          <div>
            <h2 className="text-3xl font-bold text-bird-accent md:text-4xl">Our Partners</h2>
            <p className="mt-6 text-base leading-relaxed text-black md:text-lg">
              BIRD is accessible through a private dashboard. If your organization is working with
              immigrants in the Greater Boston area, use the &ldquo;Contact Us&rdquo; form to
              schedule a call or meeting for a BIRD orientation and how your organization can be
              included here.
            </p>
          </div>
          <Button
            asChild
            className="mt-10 h-12 w-fit rounded-full bg-bird-accent px-8 text-base hover:bg-bird-accent-hover md:h-14 md:px-10"
          >
            <a href="#sponsors">See Sponsors Below</a>
          </Button>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-3xl md:min-h-[400px] lg:min-h-[440px]">
          <Image
            src="/img/partners-photo.png"
            alt="A woman and young girl smiling together"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 540px"
          />
        </div>
      </div>
    </section>
  );
}
