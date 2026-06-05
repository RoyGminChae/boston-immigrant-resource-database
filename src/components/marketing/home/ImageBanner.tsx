import Image from "next/image";

export default function ImageBanner() {
  return (
    <section className="w-full overflow-hidden bg-white" aria-hidden="true">
      <div className="flex w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="relative h-36 min-w-0 flex-1 sm:h-40 md:h-48 lg:h-52"
          >
            <Image
              src="/img/group_photo.png"
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
