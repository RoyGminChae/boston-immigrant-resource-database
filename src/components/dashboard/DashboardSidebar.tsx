"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Search,
  Layers,
  MessageCircleQuestion,
  Mail,
  PanelLeft,
  Globe,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  match?: (pathname: string) => boolean;
};

const WORKFLOWS: NavItem[] = [
  {
    label: "Community Forum",
    href: "/forum",
    icon: Users,
    match: (p) => p.startsWith("/forum"),
  },
  { label: "Search Resources", href: "#", icon: Search },
  { label: "Saved Resources", href: "/saved", icon: Layers },
];

const HELPCENTER: NavItem[] = [
  { label: "Additional Resources", href: "#", icon: MessageCircleQuestion },
  { label: "Contact us", href: "#", icon: Mail },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
        active
          ? "bg-[#2F80C2] text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (item: NavItem) =>
    item.match ? item.match(pathname) : pathname === item.href;

  return (
    <aside className="flex h-screen w-[210px] shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo + collapse */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#27317B] text-white">
            <Globe className="h-4 w-4" />
          </span>
          <span className="text-[11px] font-bold leading-none tracking-wide text-[#27317B]">
            BIRD
          </span>
        </div>
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="text-slate-400 transition-colors hover:text-slate-600"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col px-3 pt-3">
        <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Workflows
        </p>
        <div className="flex flex-col gap-1">
          {WORKFLOWS.map((item) => (
            <NavLink key={item.label} item={item} active={isActive(item)} />
          ))}
        </div>

        <p className="mt-auto px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Helpcenter
        </p>
        <div className="flex flex-col gap-1 pb-3">
          {HELPCENTER.map((item) => (
            <NavLink key={item.label} item={item} active={isActive(item)} />
          ))}
        </div>
      </nav>

      {/* User profile */}
      <div className="px-3 pb-4">
        <div className="flex items-center justify-between gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-white">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-600 text-[11px] font-semibold">
              BS
            </span>
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[11px] font-bold">
                Brooklyn Simmons
              </span>
              <span className="truncate text-[9px] text-slate-300">
                brooklynsimmons@gmail.com
              </span>
            </div>
          </div>
          <MoreVertical className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        </div>
      </div>
    </aside>
  );
}
