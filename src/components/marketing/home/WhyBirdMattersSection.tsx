import { FileText, Globe, Users, UsersRound } from "lucide-react";

import { STATS } from "./data";

const ICONS = {
  users: Users,
  globe: Globe,
  community: UsersRound,
  resources: FileText,
} as const;

export default function WhyBirdMattersSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 text-center lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-bird-accent">
          Our Purpose
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[#27317B] md:text-4xl">
          Why BIRD Matters
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = ICONS[stat.icon];
            return (
              <div key={stat.label} className="flex flex-col items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bird-accent text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{stat.value}</p>
                <p className="max-w-[180px] text-sm text-black">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
