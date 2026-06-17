import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import people from "/public/img/people.png";
import groupPhoto from "/public/img/group_photo.png";
import aboutRight1 from "/public/img/about-right-1.png";
import aboutRight2 from "/public/img/about-right-2.png";
import aboutRight3 from "/public/img/about-right-3.png";

export default function AboutBirdSection() {
  return (
    <section className="overflow-hidden bg-gradient-to-r from-[#e8f5f0] to-[#e3f2fd]">
      <div className="relative mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="shrink-0 space-y-6 lg:max-w-md lg:pr-8">
            <div>
              <h1 className="text-3xl font-bold text-[#27317B] md:text-4xl">About BIRD</h1>
              <p className="mt-2 text-lg font-semibold text-bird-accent">
                Boston Immigrant Resource Dashboard
              </p>
            </div>
            <p className="text-sm leading-relaxed text-black md:text-base">
              To provide real-time, accessible information on essential resources for immigrants,
              refugees, and service providers—ensuring timely and effective support. To foster a
              &ldquo;city of belonging&rdquo; by creating a more connected and efficient support
              network for immigrants, refugees, and asylum seekers in Boston.
            </p>
            <Button
              asChild
              className="rounded-full bg-bird-accent px-8 py-5 text-sm font-semibold hover:bg-bird-accent-hover"
            >
              <Link href="/login">Activate your Account</Link>
            </Button>
          </div>

          <div className="relative min-w-0 flex-1 overflow-hidden lg:ml-4">
            <div className="flex w-max items-start gap-3">
              <div className="flex shrink-0 flex-col gap-3 justify-center">
                <Image src={people} alt="Community members holding posters" className="h-[180px] w-[280px] rounded-2xl object-cover" />
                <Image src={groupPhoto} alt="Community volunteers smiling together" className="h-[180px] w-[280px] rounded-2xl object-cover" />
              </div>
              <div className="flex shrink-0 flex-col gap-3">
                <Image src={aboutRight1} alt="Community members holding multilingual belonging posters" className="h-[180px] w-[280px] rounded-2xl object-cover" />
                <Image src={aboutRight2} alt="Outdoor community outreach event with banners" className="h-[180px] w-[280px] rounded-2xl object-cover" />
                <Image src={aboutRight3} alt="Group posing with Boston belonging banner" className="h-[180px] w-[280px] rounded-2xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}