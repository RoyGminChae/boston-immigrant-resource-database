import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ForumTab } from "@/lib/forum";

const TABS: { label: string; value: ForumTab }[] = [
  { label: "Recent", value: "recent" },
  { label: "Unanswered", value: "unanswered" },
  { label: "Unsolved", value: "unsolved" },
  { label: "Solved", value: "solved" },
];

export default function ForumTabs({ active }: { active: ForumTab }) {
  return (
    <div className="flex items-center gap-6 border-b border-slate-200">
      {TABS.map((tab) => {
        const isActive = tab.value === active;
        return (
          <Link
            key={tab.value}
            href={
              tab.value === "recent" ? "/forum" : `/forum?tab=${tab.value}`
            }
            className={cn(
              "relative -mb-px border-b-2 px-1 py-2.5 text-sm transition-colors",
              isActive
                ? "border-[#2F80C2] font-semibold text-[#2F80C2]"
                : "border-transparent text-slate-500 hover:text-slate-700",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
