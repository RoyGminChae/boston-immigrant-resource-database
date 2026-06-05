import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Connect",
    links: [
      { label: "Contact Us", href: "#contact" },
      { label: "Newsletter signup", href: "#contact" },
    ],
  },
  {
    heading: "Social",
    links: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [{ label: "Privacy policy", href: "#" }],
    copyright: true,
  },
] as const;

export default function HomeFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div className="flex items-start gap-3">
          <Image
            src="/icons/BIRDLogo_Blue_1.svg"
            alt="BIRD"
            width={48}
            height={48}
            className="h-12 w-12 shrink-0"
          />
          <div>
            <p className="text-sm font-bold text-[#27317B]">BIRD</p>
            <p className="text-[10px] font-medium uppercase tracking-wide text-bird-accent">
              Boston Immigrant Resource Dashboard
            </p>
          </div>
        </div>

        {FOOTER_LINKS.map((column) => (
          <div key={column.heading}>
            <p className="mb-3 text-sm font-bold text-bird-accent">{column.heading}</p>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-black no-underline hover:text-bird-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {"copyright" in column && column.copyright && (
              <p className="mt-6 text-xs text-black">
                &copy; {new Date().getFullYear()} Unite Boston. All rights reserved.
              </p>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
}
