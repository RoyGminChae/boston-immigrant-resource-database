import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image
            src="/icons/Just_BIRD_logo_blue.png"
            alt="BIRD"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight text-[#27317B]">BIRD</p>
            <p className="text-[10px] font-medium uppercase tracking-wide text-bird-accent">
              Boston Immigrant Resource Dashboard
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-[#27317B]">
          <Link href="/register" className="no-underline hover:text-bird-accent">
            Create Account
          </Link>
          <Link href="/login" className="flex items-center gap-1 no-underline hover:text-bird-accent">
            Sign In
            <ChevronRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
