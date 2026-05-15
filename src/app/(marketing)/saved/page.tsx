"use client";

import { useState } from "react";
import Sidebar from "@/components/marketing/Sidebar";
import Logo from "/icons/BIRDLogo_Blue_1.svg";

const NAV_ITEMS = [
  { icon: "/icons/dashboard.svg", label: "Dashboard" },
  { icon: "/icons/page.svg", label: "My Services" },
  { icon: "/icons/arrow.svg", label: "Search Services" },
  { icon: "/icons/star.svg", label: "Saved Services", active: true },
  { icon: "/icons/calendar.svg", label: "Calendar" },
  { icon: "/icons/multi-bubble.svg", label: "Forum" },
];

<Sidebar isOpen={true} activePage="saved" />

const CATEGORIES = ["Legal Services", "ESOL", "Work Force", "Customized"];

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  category: string;
}

const SERVICES: ServiceCard[] = CATEGORIES.flatMap((cat, ci) =>
  Array.from({ length: 4 }, (_, i) => ({
    id: ci * 4 + i,
    title: "Title",
    description:
      "Keep your messages short, but make sure they cover everything you need to say.",
    category: cat,
  }))
);

function FlowerSVG() {
  return (
    <img
      src="/img/Image.svg"
      alt="Flower"
      width={80}
      height={80}
      style={{
        display: "block",
        objectFit: "cover",
      }}
    />
  );
}

function ServiceCardItem({ card, index }: { card: ServiceCard; index: number }) {
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        background: "white",
        borderRadius: 12,
        padding: "12px",
        border: "1px solid #e8e4df",
        alignItems: "flex-start",
        cursor: "pointer",
        transition: "box-shadow 0.15s",
        position: "relative",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 2px 12px rgba(0,0,0,0.08)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")
      }
    >
      <div style={{ flexShrink: 0, borderRadius: 8, overflow: "hidden" }}>
        <FlowerSVG/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: 13, margin: "0 0 4px", color: "#1a1a1a" }}>
          {card.title}
        </p>
        <p style={{ fontSize: 12, color: "#6b6b6b", margin: 0, lineHeight: 1.5 }}>
          {card.description}
        </p>
      </div>
      <button
        aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
        onClick={(e) => {
          e.stopPropagation();
          setBookmarked((b) => !b);
        }}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 2,
          color: bookmarked ? "#3d3db5" : "#aaa",
        }}
      >
        <i
          className={bookmarked ? "ti ti-bookmark-filled" : "ti ti-bookmark"}
          style={{ fontSize: 14 }}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

export default function SavedResources() {
  const [search, setSearch] = useState("");
  const [serviceType, setServiceType] = useState("Service Type");
  const [language, setLanguage] = useState("Language");
  const [fee, setFee] = useState("Fee");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = SERVICES.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = CATEGORIES.map((cat) => ({
    cat,
    items: filtered.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f0ede8",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
      />

      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? 210 : 64,
          background: "linear-gradient(180deg, #2d2db5 0%, #1e1e8a 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "20px 0",
          flexShrink: 0,
          transition: "width 0.2s",
          position: "relative",
        }}
      >
       {/* Logo */}
        <div style={{ padding: "0 0 24px" }}>
          <img
            src="/icons/BIRDLogo_Blue_1.svg"
            alt="BIRD Logo"
            width={94}
            height={94}
            style={{
              flexShrink: 0,
              position: "relative",
              left: 10,  // ← adjust this to move left/right
              top: 4,   // ← adjust this to move up/down
            }}
          />
        </div>

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                margin: "2px 8px",
                borderRadius: 8,
                cursor: "pointer",
                background: item.active ? "rgba(255,255,255,0.18)" : "transparent",
                color: item.active ? "white" : "rgba(255,255,255,0.65)",
                transition: "background 0.15s, color 0.15s",
                fontSize: 14,
                fontWeight: item.active ? 500 : 400,
              }}
              onMouseEnter={(e) => {
                if (!item.active)
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                if (!item.active)
                  (e.currentTarget as HTMLDivElement).style.background = "transparent";
              }}
            >
              <img
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                style={{
                  flexShrink: 0,
                  opacity: item.active ? 1 : 0.7,
                  filter: "brightness(0) invert(1)",
                }}
              />             
               {sidebarOpen && <span>{item.label}</span>}
            </div>
          ))}
        </nav>

        {/* User */}
        <div
          style={{
            padding: "12px 16px",
            margin: "8px",
            borderRadius: 10,
            background: "rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#a0c4e0",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
              color: "#1e4a6e",
            }}
          >
            BS
          </div>
          {sidebarOpen && (
            <div style={{ overflow: "hidden" }}>
              <p style={{ margin: 0, color: "white", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Brooklyn Simmons
              </p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                brooklyn@simmons.com
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "32px 36px", overflowY: "auto" }}>
        <h1 style={{ fontSize: 32, fontWeight: 600, color: "#111", margin: "0 0 24px" }}>
          Saved Resources
        </h1>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: "1 1 280px", minWidth: 200 }}>
            <i
              className="ti ti-search"
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#999",
                fontSize: 16,
              }}
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search saved resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                paddingLeft: 36,
                paddingRight: 12,
                height: 40,
                borderRadius: 8,
                border: "1px solid #ddd",
                background: "white",
                fontSize: 14,
                color: "#333",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          {[
            { value: serviceType, setter: setServiceType, options: ["All Types", "Legal", "Education", "Employment"] },
            { value: language, setter: setLanguage, options: ["All Languages", "English", "Spanish", "French"] },
            { value: fee, setter: setFee, options: ["Any Fee", "Free", "Sliding Scale", "Paid"] },
          ].map(({ value, setter, options }) => (
            <select
              key={value}
              value={value}
              onChange={(e) => setter(e.target.value)}
              style={{
                height: 40,
                padding: "0 32px 0 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                background: "white",
                fontSize: 14,
                color: "#333",
                cursor: "pointer",
                appearance: "none",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23999' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              {options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ))}
        </div>

        {/* Quick action cards */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          {[
            { icon: "ti-bookmark", label: "All Saved" },
            { icon: "ti-file-description", label: "Recently Added" },
            { icon: "ti-clock", label: "Upcoming" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              style={{
                flex: 1,
                background: "white",
                border: "1px solid #e8e4df",
                borderRadius: 12,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                color: "#555",
                fontSize: 14,
                transition: "box-shadow 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 2px 10px rgba(0,0,0,0.07)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")
              }
            >
              <i className={`ti ${icon}`} style={{ fontSize: 20, color: "#888" }} aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Grouped service cards */}
        {grouped.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}>
            <i className="ti ti-search-off" style={{ fontSize: 40, display: "block", marginBottom: 12 }} aria-hidden="true" />
            <p style={{ fontSize: 15 }}>No saved resources match your search.</p>
          </div>
        ) : (
          grouped.map(({ cat, items }) => (
            <section key={cat} style={{ marginBottom: 32 }}>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#111",
                  margin: "0 0 14px",
                }}
              >
                {cat}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 12,
                }}
              >
                {items.map((card, i) => (
                  <ServiceCardItem key={card.id} card={card} index={i} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}