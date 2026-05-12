import { useState, useEffect } from "react";

const EVENTS_DATA = [
  {
    id: 1,
    title: "Jazz Under the Stars",
    category: "Music",
    date: "2026-06-14",
    time: "7:00 PM",
    location: "Rooftop Arena, Chennai",
    price: 899,
    seats: 120,
    booked: 94,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80",
    tag: "Trending",
    tagColor: "#f59e0b",
    description:
      "An electrifying evening of live jazz music under the open sky. Experience world-class musicians perform swing, bebop, and contemporary jazz as the city lights shimmer below. Enjoy signature cocktails, gourmet bites, and an ambience like no other — where smooth melodies meet the cool night breeze.",
    highlights: ["Live jazz band", "Rooftop venue with city view", "Cocktails & gourmet bites", "Open seating area", "Photography-friendly"],
    organizer: "SoundWave Productions",
    refundPolicy: "Full refund up to 48 hours before the event.",
  },
  {
    id: 2,
    title: "Tech Horizons Summit",
    category: "Conference",
    date: "2026-06-20",
    time: "9:00 AM",
    location: "ITC Grand, Bangalore",
    price: 2499,
    seats: 300,
    booked: 210,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    tag: "Featured",
    tagColor: "#6366f1",
    description:
      "India's premier technology summit bringing together founders, engineers, investors and innovators. Two full days of keynotes, workshops, and networking sessions covering AI, Web3, SaaS, and the future of digital infrastructure. Past speakers include leaders from Google, Microsoft, and top-tier Indian startups.",
    highlights: ["50+ speakers", "8 parallel workshops", "Startup expo zone", "Investor networking sessions", "Lunch & refreshments included"],
    organizer: "Nexus Events India",
    refundPolicy: "50% refund up to 7 days before the event. No refund thereafter.",
  },
  {
    id: 3,
    title: "Coastal Food Festival",
    category: "Food",
    date: "2026-07-04",
    time: "11:00 AM",
    location: "Marina Beach, Chennai",
    price: 499,
    seats: 500,
    booked: 187,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    tag: "New",
    tagColor: "#10b981",
    description:
      "A beachside celebration of coastal cuisines from across Tamil Nadu and beyond. Over 40 food stalls serving freshly caught seafood, traditional Chettinad recipes, street food classics, and fusion desserts. Live cooking demonstrations by renowned chefs, craft beer pop-ups, and music by the waves.",
    highlights: ["40+ food stalls", "Live chef demos", "Craft beer & mocktail bar", "Kids' activity zone", "Cultural folk performances"],
    organizer: "ChennaiEats Collective",
    refundPolicy: "Non-refundable. Entry transferable to another person.",
  },
  {
    id: 4,
    title: "Classical Carnatic Night",
    category: "Music",
    date: "2026-07-10",
    time: "6:30 PM",
    location: "Music Academy, Chennai",
    price: 349,
    seats: 200,
    booked: 160,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    tag: "Selling Fast",
    tagColor: "#ef4444",
    description:
      "A deeply immersive evening of classical Carnatic music performed by maestros and rising stars of the tradition. The concert features ragas spanning all six seasons, with elaborate compositions in Adi and Rupaka talas. A rare opportunity to witness the living heritage of South Indian classical music in an intimate setting.",
    highlights: ["Seasoned and upcoming artists", "Ragas across all six seasons", "Intimate 200-seat auditorium", "Pre-concert talk at 5:30 PM", "Complimentary programme booklet"],
    organizer: "Sangeetha Bharati Trust",
    refundPolicy: "Full refund up to 72 hours before the event.",
  },
  {
    id: 5,
    title: "Startup Pitch Night",
    category: "Business",
    date: "2026-07-18",
    time: "5:00 PM",
    location: "WeWork, Coimbatore",
    price: 0,
    seats: 150,
    booked: 60,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    tag: "Free",
    tagColor: "#059669",
    description:
      "Watch 10 handpicked early-stage startups pitch to a panel of angel investors and VCs in a high-energy live format. After the pitches, network with founders, mentors, and investors over drinks. Whether you're a founder, investor, or simply passionate about the startup ecosystem — this is your room to be in.",
    highlights: ["10 startup pitches", "Panel of 5 investors", "Post-pitch networking", "Free food & drinks", "Certificate of participation"],
    organizer: "CoimbatoreStartups Hub",
    refundPolicy: "Free entry — no payment required. Please cancel your registration if you can't attend.",
  },
  {
    id: 6,
    title: "Contemporary Art Exhibition",
    category: "Art",
    date: "2026-07-25",
    time: "10:00 AM",
    location: "Lalit Kala Akademi, Delhi",
    price: 199,
    seats: 250,
    booked: 78,
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80",
    tag: "Popular",
    tagColor: "#8b5cf6",
    description:
      "A curated exhibition of over 80 contemporary Indian artworks spanning painting, sculpture, digital art, and mixed media installations. Featuring 22 artists from across the country, the exhibition explores themes of identity, ecology, and memory. Guided walkthroughs available on weekends.",
    highlights: ["80+ artworks on display", "22 contemporary artists", "Interactive installations", "Guided tours on weekends", "Artist Q&A sessions"],
    organizer: "Lalit Kala Akademi, New Delhi",
    refundPolicy: "Full refund up to 24 hours before entry date.",
  },
  {
    id: 7,
    title: "Yoga & Wellness Retreat",
    category: "Wellness",
    date: "2026-08-03",
    time: "6:00 AM",
    location: "Pondicherry Beach Resort",
    price: 1299,
    seats: 80,
    booked: 45,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    tag: "New",
    tagColor: "#10b981",
    description:
      "A full-day wellness retreat by the sea, combining sunrise yoga sessions, meditation, breathwork, Ayurvedic consultations, and a mindful plant-based lunch. Led by certified instructors with 10+ years of experience, this retreat is designed to help you unplug, restore, and reconnect with yourself.",
    highlights: ["Sunrise yoga & pranayama", "Guided meditation sessions", "Ayurvedic consultation (15 min)", "Plant-based lunch included", "Take-home wellness kit"],
    organizer: "PondyWellness Co.",
    refundPolicy: "Full refund up to 5 days before the retreat. 50% refund after that.",
  },
  {
    id: 8,
    title: "Electronic Dance Carnival",
    category: "Music",
    date: "2026-08-15",
    time: "8:00 PM",
    location: "YMCA Grounds, Madurai",
    price: 1199,
    seats: 1000,
    booked: 780,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    tag: "Trending",
    tagColor: "#f59e0b",
    description:
      "Madurai's biggest electronic music festival returns with a lineup of 12 DJs across two stages. Headliners include internationally touring artists alongside South India's hottest underground talent. Expect immersive light shows, laser rigs, and a crowd of 1000+ ready to dance until midnight.",
    highlights: ["12 DJs across 2 stages", "International & local headliners", "Laser & LED light show", "Food court & bar area", "Locker facilities on-site"],
    organizer: "BassNation Events",
    refundPolicy: "Non-refundable. Entry transferable.",
  },
];

const CATEGORIES = ["All", "Music", "Conference", "Food", "Business", "Art", "Wellness"];

const TICKET_TYPES = [
  { id: "general", label: "General Admission", multiplier: 1, desc: "Standard entry with access to all areas." },
  { id: "vip", label: "VIP Pass", multiplier: 2.2, desc: "Priority entry, reserved seating & welcome kit." },
  { id: "group", label: "Group (5 tickets)", multiplier: 4.2, desc: "5 tickets at a 16% discount." },
];

// ─── Icons ──────────────────────────────────────────────────────────────────

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const UsersIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const TagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ─── SeatBar ─────────────────────────────────────────────────────────────────

function SeatBar({ booked, total }) {
  const pct = Math.round((booked / total) * 100);
  const color = pct > 85 ? "#ef4444" : pct > 60 ? "#f59e0b" : "#10b981";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <span style={{ fontSize: "11px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
          <UsersIcon /> {booked}/{total} booked
        </span>
        <span style={{ fontSize: "11px", color }}>{pct}%</span>
      </div>
      <div style={{ background: "#1e293b", borderRadius: "99px", height: "5px", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, background: color, height: "100%", borderRadius: "99px", transition: "width 0.6s ease" }} />
      </div>
    </div>
  );
}

// ─── EventCard ───────────────────────────────────────────────────────────────

function EventCard({ event, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(160deg, #0f172a 60%, #1e293b)",
        border: `1px solid ${hovered ? "#6366f1" : "#1e293b"}`,
        borderRadius: "18px",
        overflow: "hidden",
        transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 60px rgba(99,102,241,0.18)" : "0 4px 20px rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", height: "190px", overflow: "hidden" }}>
        <img src={event.image} alt={event.title} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transition: "transform 0.4s ease",
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,11,21,0.85) 20%, transparent 70%)" }} />
        <span style={{
          position: "absolute", top: "14px", left: "14px",
          background: event.tagColor, color: "#fff",
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em",
          padding: "3px 10px", borderRadius: "99px", textTransform: "uppercase",
        }}>{event.tag}</span>
        <span style={{
          position: "absolute", top: "14px", right: "14px",
          background: "rgba(15,23,42,0.75)", backdropFilter: "blur(6px)",
          color: "#cbd5e1", fontSize: "11px", fontWeight: 600,
          padding: "3px 10px", borderRadius: "99px", border: "1px solid #334155",
        }}>{event.category}</span>
      </div>
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
        <h3 style={{ color: "#f1f5f9", fontSize: "17px", fontWeight: 700, fontFamily: "'Syne', sans-serif", lineHeight: 1.3, margin: 0 }}>{event.title}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {[
            { icon: <CalendarIcon />, text: formatDateShort(event.date) },
            { icon: <ClockIcon />, text: event.time },
            { icon: <LocationIcon />, text: event.location },
          ].map(({ icon, text }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px", color: "#94a3b8", fontSize: "13px" }}>
              <span style={{ color: "#6366f1" }}>{icon}</span>{text}
            </div>
          ))}
        </div>
        <SeatBar booked={event.booked} total={event.seats} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
          <div>
            <span style={{ fontSize: "11px", color: "#64748b", letterSpacing: "0.05em" }}>STARTS FROM</span>
            <div style={{ color: event.price === 0 ? "#10b981" : "#f1f5f9", fontSize: "20px", fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>
              {event.price === 0 ? "FREE" : `₹${event.price.toLocaleString()}`}
            </div>
          </div>
          <button
            onClick={() => onNavigate(event)}
            style={{
              background: hovered ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "linear-gradient(135deg, #4f46e5, #7c3aed)",
              border: "none", color: "#fff",
              padding: "10px 18px", borderRadius: "12px",
              fontSize: "13px", fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", gap: "6px",
              transition: "background 0.2s, transform 0.15s",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          >
            View Details <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Booking Confirmation Modal ───────────────────────────────────────────────

function BookingConfirmModal({ event, ticket, qty, onClose }) {
  const price = event.price === 0 ? 0 : Math.round(event.price * ticket.multiplier);
  const total = price * (ticket.id === "group" ? 1 : qty);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(2,6,23,0.9)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px", animation: "fadeIn 0.2s ease",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0f172a", border: "1px solid #1e293b",
        borderRadius: "24px", maxWidth: "420px", width: "100%",
        boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
        animation: "slideUp 0.25s ease", overflow: "hidden",
      }}>
        {/* Success header */}
        <div style={{
          background: "linear-gradient(135deg, #10b981, #059669)",
          padding: "32px 28px 24px", textAlign: "center",
        }}>
          <div style={{
            width: "60px", height: "60px", borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", fontSize: "28px",
          }}>✓</div>
          <h2 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 800, margin: "0 0 6px" }}>
            Booking Confirmed!
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", margin: 0 }}>
            Your tickets have been reserved successfully.
          </p>
        </div>
        {/* Details */}
        <div style={{ padding: "24px 28px" }}>
          <div style={{ background: "#1e293b", borderRadius: "14px", padding: "18px", marginBottom: "20px" }}>
            <div style={{ color: "#94a3b8", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Booking Summary</div>
            {[
              ["Event", event.title],
              ["Date", `${formatDateShort(event.date)} · ${event.time}`],
              ["Venue", event.location],
              ["Ticket", ticket.label],
              ["Quantity", ticket.id === "group" ? "5 tickets (group)" : `${qty} ticket${qty > 1 ? "s" : ""}`],
              ["Total Paid", event.price === 0 ? "FREE" : `₹${total.toLocaleString()}`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "6px 0", borderBottom: "1px solid #334155" }}>
                <span style={{ color: "#64748b", fontSize: "13px", flexShrink: 0, marginRight: "12px" }}>{k}</span>
                <span style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: 600, textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
          <p style={{ color: "#64748b", fontSize: "12px", textAlign: "center", marginBottom: "20px" }}>
            A confirmation has been sent to your email. Show your ticket QR at the venue.
          </p>
          <button onClick={onClose} style={{
            width: "100%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: "none", color: "#fff", padding: "14px", borderRadius: "12px",
            fontSize: "15px", fontWeight: 700, cursor: "pointer",
          }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Event Detail Page ────────────────────────────────────────────────────────

function EventDetailPage({ event, onBack }) {
  const [selectedTicket, setSelectedTicket] = useState(TICKET_TYPES[0]);
  const [qty, setQty] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = document.getElementById("detail-scroll-root");
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const remaining = event.seats - event.booked;
  const pct = Math.round((event.booked / event.seats) * 100);
  const barColor = pct > 85 ? "#ef4444" : pct > 60 ? "#f59e0b" : "#10b981";

  const basePrice = event.price === 0 ? 0 : Math.round(event.price * selectedTicket.multiplier);
  const ticketCount = selectedTicket.id === "group" ? 5 : qty;
  const total = basePrice * (selectedTicket.id === "group" ? 1 : qty);
  const gst = event.price === 0 ? 0 : Math.round(total * 0.18);
  const grandTotal = total + gst;

  return (
    <div id="detail-scroll-root" style={{ minHeight: "100vh", background: "#020617", overflowY: "auto", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" }}>

      {/* Sticky top nav */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(2,6,23,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #1e293b" : "none",
        padding: "14px 24px",
        transition: "all 0.3s ease",
        display: "flex", alignItems: "center", gap: "12px",
      }}>
        <button onClick={onBack} style={{
          background: "#1e293b", border: "1px solid #334155",
          color: "#94a3b8", padding: "8px 16px", borderRadius: "10px",
          fontSize: "13px", fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", gap: "7px",
          transition: "all 0.2s",
        }}>
          <BackIcon /> Back to Events
        </button>
        {scrolled && (
          <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "15px", fontFamily: "'Syne', sans-serif" }}>
            {event.title}
          </span>
        )}
      </div>

      {/* Hero */}
      <div style={{ position: "relative", height: "420px", overflow: "hidden", marginTop: "-56px" }}>
        <img src={event.image} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #020617 15%, rgba(2,6,23,0.45) 60%, rgba(2,6,23,0.15) 100%)" }} />
        <div style={{ position: "absolute", bottom: "28px", left: "28px", right: "28px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
            <span style={{
              background: event.tagColor, color: "#fff",
              fontSize: "11px", fontWeight: 700, padding: "4px 12px",
              borderRadius: "99px", textTransform: "uppercase", letterSpacing: "0.06em",
            }}>{event.tag}</span>
            <span style={{
              background: "rgba(15,23,42,0.75)", backdropFilter: "blur(6px)",
              color: "#cbd5e1", fontSize: "11px", fontWeight: 600,
              padding: "4px 12px", borderRadius: "99px", border: "1px solid #334155",
            }}>{event.category}</span>
          </div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(26px, 5vw, 40px)",
            fontWeight: 800, color: "#f1f5f9",
            lineHeight: 1.2, margin: 0,
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}>{event.title}</h1>
        </div>
      </div>

      {/* Content grid */}
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "36px 24px 80px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 360px",
        gap: "32px",
        alignItems: "start",
      }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* Quick meta */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px",
          }}>
            {[
              { icon: <CalendarIcon />, label: "Date", value: formatDate(event.date) },
              { icon: <ClockIcon />, label: "Time", value: event.time },
              { icon: <LocationIcon />, label: "Venue", value: event.location },
              { icon: <UsersIcon />, label: "Capacity", value: `${event.seats} seats` },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{
                background: "#0f172a", border: "1px solid #1e293b",
                borderRadius: "14px", padding: "16px",
              }}>
                <div style={{ color: "#6366f1", marginBottom: "6px" }}>{icon}</div>
                <div style={{ color: "#64748b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2px" }}>{label}</div>
                <div style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>

          {/* About */}
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 700, color: "#f1f5f9", marginBottom: "12px" }}>
              About This Event
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.75, fontSize: "15px", margin: 0 }}>
              {event.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 700, color: "#f1f5f9", marginBottom: "14px" }}>
              What's Included
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {event.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    width: "22px", height: "22px", borderRadius: "50%",
                    background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.4)",
                    color: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <CheckIcon />
                  </span>
                  <span style={{ color: "#cbd5e1", fontSize: "14px" }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seat Availability */}
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "16px", padding: "22px" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#f1f5f9", marginBottom: "16px" }}>
              Seat Availability
            </h2>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ color: "#94a3b8", fontSize: "13px" }}>{event.booked} booked · {remaining} remaining of {event.seats} total</span>
              <span style={{ color: barColor, fontSize: "13px", fontWeight: 700 }}>{pct}% filled</span>
            </div>
            <div style={{ background: "#1e293b", borderRadius: "99px", height: "10px", overflow: "hidden", marginBottom: "14px" }}>
              <div style={{ width: `${pct}%`, background: barColor, height: "100%", borderRadius: "99px", transition: "width 0.6s ease" }} />
            </div>
            {pct > 85 && (
              <div style={{
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "10px", padding: "10px 14px",
                color: "#fca5a5", fontSize: "13px", display: "flex", alignItems: "center", gap: "7px",
              }}>
                <InfoIcon /> Hurry! Only {remaining} seat{remaining !== 1 ? "s" : ""} left.
              </div>
            )}
          </div>

          {/* Organizer + Refund Policy */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "14px", padding: "18px" }}>
              <div style={{ color: "#64748b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>Organised By</div>
              <div style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600 }}>{event.organizer}</div>
            </div>
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "14px", padding: "18px" }}>
              <div style={{ color: "#64748b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px", display: "flex", alignItems: "center", gap: "5px" }}>
                <ShieldIcon /> Refund Policy
              </div>
              <div style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.5 }}>{event.refundPolicy}</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Booking Panel ── */}
        <div style={{
          position: "sticky", top: "80px",
          background: "#0f172a", border: "1px solid #1e293b",
          borderRadius: "20px", overflow: "hidden",
        }}>
          {/* Panel header */}
          <div style={{
            background: "linear-gradient(135deg, #1e1b4b, #312e81)",
            padding: "20px 22px",
            borderBottom: "1px solid #1e293b",
          }}>
            <div style={{ color: "#a5b4fc", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
              <TagIcon style={{ display: "inline" }} /> Book Tickets
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 800, color: event.price === 0 ? "#10b981" : "#f1f5f9" }}>
                {event.price === 0 ? "FREE" : `₹${event.price.toLocaleString()}`}
              </span>
              {event.price > 0 && <span style={{ color: "#6366f1", fontSize: "13px" }}>/ ticket onwards</span>}
            </div>
          </div>

          <div style={{ padding: "22px" }}>

            {/* Ticket Type */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>Select Ticket Type</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {TICKET_TYPES.map((t) => {
                  const active = selectedTicket.id === t.id;
                  const tPrice = event.price === 0 ? 0 : Math.round(event.price * t.multiplier);
                  return (
                    <div
                      key={t.id}
                      onClick={() => { setSelectedTicket(t); setQty(1); }}
                      style={{
                        border: `1px solid ${active ? "#6366f1" : "#1e293b"}`,
                        background: active ? "rgba(99,102,241,0.08)" : "#0a0f1e",
                        borderRadius: "12px", padding: "12px 14px",
                        cursor: "pointer", transition: "all 0.2s",
                        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <div style={{ color: active ? "#a5b4fc" : "#cbd5e1", fontWeight: 600, fontSize: "14px", marginBottom: "2px" }}>{t.label}</div>
                        <div style={{ color: "#64748b", fontSize: "12px" }}>{t.desc}</div>
                      </div>
                      <div style={{ color: event.price === 0 ? "#10b981" : (active ? "#a5b4fc" : "#94a3b8"), fontWeight: 700, fontSize: "14px", flexShrink: 0, marginLeft: "10px" }}>
                        {event.price === 0 ? "Free" : `₹${tPrice.toLocaleString()}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantity (only for non-group) */}
            {selectedTicket.id !== "group" && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>Number of Tickets</div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setQty(n)}
                      style={{
                        width: "38px", height: "38px",
                        background: qty === n ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#1e293b",
                        border: `1px solid ${qty === n ? "transparent" : "#334155"}`,
                        borderRadius: "10px", color: qty === n ? "#fff" : "#94a3b8",
                        fontWeight: 700, fontSize: "14px", cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >{n}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Price breakdown */}
            {event.price > 0 && (
              <div style={{
                background: "#070d1a", border: "1px solid #1e293b",
                borderRadius: "12px", padding: "14px",
                marginBottom: "20px",
              }}>
                <div style={{ color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>Price Breakdown</div>
                {[
                  [`${selectedTicket.label} × ${ticketCount}`, `₹${total.toLocaleString()}`],
                  ["GST (18%)", `₹${gst.toLocaleString()}`],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#64748b", fontSize: "13px" }}>{k}</span>
                    <span style={{ color: "#94a3b8", fontSize: "13px" }}>{v}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 700 }}>Total</span>
                  <span style={{ color: "#f1f5f9", fontSize: "16px", fontWeight: 800 }}>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={() => setShowConfirm(true)}
              disabled={remaining === 0}
              style={{
                width: "100%",
                background: remaining === 0 ? "#1e293b" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none", color: remaining === 0 ? "#475569" : "#fff",
                padding: "16px", borderRadius: "14px",
                fontSize: "16px", fontWeight: 800, cursor: remaining === 0 ? "not-allowed" : "pointer",
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "0.02em",
                transition: "opacity 0.2s",
                marginBottom: "14px",
              }}
            >
              {remaining === 0 ? "Sold Out" : event.price === 0 ? `Register Now — Free` : `Pay ₹${grandTotal.toLocaleString()}`}
            </button>

            {/* Trust badges */}
            <div style={{ display: "flex", justifyContent: "center", gap: "18px", flexWrap: "wrap" }}>
              {["Secure Payment", "Instant Confirmation", "Easy Refunds"].map((t) => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: "4px", color: "#475569", fontSize: "11px" }}>
                  <ShieldIcon /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <BookingConfirmModal
          event={event}
          ticket={selectedTicket}
          qty={qty}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

// ─── Listing Page ─────────────────────────────────────────────────────────────

export default function EventBookingApp() {
  const [events] = useState(EVENTS_DATA);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => { setFiltered(EVENTS_DATA); setLoading(false); }, 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let result = [...events];
    if (activeCategory !== "All") result = result.filter(e => e.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      );
    }
    if (sortBy === "date") result.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "popularity") result.sort((a, b) => (b.booked / b.seats) - (a.booked / a.seats));
    setFiltered(result);
  }, [search, activeCategory, sortBy, events]);

  // Show detail page if an event is selected
  if (selectedEvent) {
    return <EventDetailPage event={selectedEvent} onBack={() => setSelectedEvent(null)} />;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #020617; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 99px; }
        input::placeholder { color: #475569; }
        select option { background: #0f172a; color: #e2e8f0; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" }}>

        {/* Hero */}
        <div style={{
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
          padding: "60px 24px 50px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-60px", left: "-80px", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-80px", right: "-60px", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span style={{
              background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.4)",
              color: "#a5b4fc", fontSize: "12px", fontWeight: 700,
              padding: "5px 16px", borderRadius: "99px", letterSpacing: "0.1em",
              textTransform: "uppercase", display: "inline-block", marginBottom: "18px",
            }}>🎟 Discover & Book</span>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(32px, 6vw, 58px)", fontWeight: 800,
              background: "linear-gradient(135deg, #f1f5f9, #a5b4fc)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              lineHeight: 1.15, marginBottom: "14px",
            }}>Unforgettable Experiences</h1>
            <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "480px", margin: "0 auto" }}>
              Browse curated events across music, tech, food & more. Find your next great experience.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(2,6,23,0.92)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid #1e293b", padding: "16px 24px",
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "14px" }}>
              <div style={{ flex: "1 1 260px", position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#475569" }}><SearchIcon /></span>
                <input
                  type="text"
                  placeholder="Search events, venues, categories…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%", background: "#0f172a",
                    border: "1px solid #1e293b", borderRadius: "12px",
                    color: "#e2e8f0", fontSize: "14px",
                    padding: "11px 14px 11px 44px", outline: "none",
                  }}
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: "#0f172a", border: "1px solid #1e293b",
                  borderRadius: "12px", color: "#94a3b8",
                  fontSize: "13px", padding: "11px 14px",
                  cursor: "pointer", outline: "none", flex: "0 0 auto",
                }}
              >
                <option value="date">Sort: Date</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: activeCategory === cat ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#0f172a",
                    border: `1px solid ${activeCategory === cat ? "transparent" : "#1e293b"}`,
                    color: activeCategory === cat ? "#fff" : "#94a3b8",
                    padding: "7px 16px", borderRadius: "99px",
                    fontSize: "13px", fontWeight: 600, cursor: "pointer",
                    whiteSpace: "nowrap", transition: "all 0.2s", flexShrink: 0,
                  }}
                >{cat}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "36px 24px 60px" }}>
          <div style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
            {loading ? "Loading events…" : `${filtered.length} event${filtered.length !== 1 ? "s" : ""} found`}
          </div>
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ background: "#0f172a", borderRadius: "18px", overflow: "hidden", border: "1px solid #1e293b" }}>
                  <div style={{ height: "190px", background: "#1e293b", animation: "pulse 1.5s infinite" }} />
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[80, 60, 50, 40].map((w, j) => (
                      <div key={j} style={{ height: "14px", background: "#1e293b", borderRadius: "8px", width: `${w}%`, animation: "pulse 1.5s infinite", animationDelay: `${j * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "#475569" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
              <div style={{ fontSize: "20px", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>No events found</div>
              <div style={{ fontSize: "14px" }}>Try adjusting your search or filter criteria.</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
              {filtered.map((event) => (
                <EventCard key={event.id} event={event} onNavigate={setSelectedEvent} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}