import React from "react";
import { 
  LayoutDashboard, 
  HandHeart, 
  Search, 
  Bookmark, 
  Calendar, 
  MessageSquare,
  MoreVertical 
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { name: "Dashboard", icon: "/icons/dashboard.svg" },
    { name: "My Services", icon: "/icons/page.svg" },
    { name: "Search Services", icon: "/icons/arrow.svg" },
    { name: "Saved Services", icon: "/icons/star.svg" },
    { name: "Calendar", icon: "/icons/calendar.svg" },
    { name: "Forum", icon: "/icons/multi-bubble.svg" },
  ];

  return (
    <div
      className={`flex flex-col h-screen bg-gradient-to-b from-[#4E61F6] to-[#2C2F8F] text-white transition-all duration-300 ease-in-out shadow-2xl ${
        isOpen ? "w-[260px]" : "w-0"
      } overflow-hidden border-r border-white/10`}
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-center ">
        <div className="w-30 h-30 flex items-center justify-center">
          <img 
            src="/icons/Just_BIRD_logo_white.png" 
            alt="BIRD" 
            className="w-30 h-30 object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold tracking-tight leading-none">
          BIRD
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 cursor-pointer transition-colors text-sm font-medium"
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-5 h-5 object-contain opacity-70 filter brightness-0 invert"
              />
              <span className="whitespace-nowrap">{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section (Pinned to Bottom) */}
      <div className="p-4 mb-4">
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-slate-400 shrink-0 border border-white/20 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Brooklyn" alt="User" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold truncate leading-tight">Brooklyn Simmons</span>
              <span className="text-[9px] opacity-60 truncate">brooklyn@simmons.com</span>
            </div>
          </div>
          <MoreVertical size={14} className="opacity-40 hover:opacity-100 cursor-pointer shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;