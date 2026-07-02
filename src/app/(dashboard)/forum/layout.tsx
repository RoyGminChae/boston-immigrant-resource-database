import { Search } from "lucide-react";

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-6 lg:px-8">
      <h1 className="text-2xl font-bold text-[#2F80C2]">Good Morning Brooklyn</h1>

      <div className="relative mt-4">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search services by name or keywords"
          className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#2F80C2] focus:outline-none focus:ring-2 focus:ring-[#2F80C2]/20"
        />
      </div>

      <div className="mt-6">{children}</div>
    </div>
  );
}
