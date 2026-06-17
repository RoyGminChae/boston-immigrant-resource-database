import Image from "next/image";
import { client } from "@/lib/sanity";

async function getImageBanner() {
  const banners = await client.fetch(`*[_type == "imageBanner"]{
    "image": image.asset->url
  }`);
  return banners[0];
}

export default async function ImageBanner() {
  const banner = await getImageBanner();

  if (!banner?.image) return null;

  return (
    <section className="w-full overflow-hidden bg-white" aria-hidden="true">
      <div className="flex w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="relative h-36 min-w-0 flex-1 sm:h-40 md:h-48 lg:h-52"
          >
            <Image
              src={banner.image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="20vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}