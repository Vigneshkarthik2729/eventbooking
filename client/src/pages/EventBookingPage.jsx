import { useState, useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

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
    description: "An electrifying evening of live jazz music under the open sky. Experience world-class musicians perform swing, bebop, and contemporary jazz as the city lights shimmer below.",
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
    description: "India's premier technology summit bringing together founders, engineers, investors and innovators. Two full days of keynotes, workshops, and networking sessions covering AI, Web3, SaaS.",
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
    description: "A beachside celebration of coastal cuisines from across Tamil Nadu and beyond. Over 40 food stalls serving freshly caught seafood, traditional Chettinad recipes, street food classics.",
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
    description: "A deeply immersive evening of classical Carnatic music performed by maestros and rising stars of the tradition. A rare opportunity to witness the living heritage of South Indian classical music.",
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
    description: "Watch 10 handpicked early-stage startups pitch to a panel of angel investors and VCs in a high-energy live format. Network with founders, mentors, and investors over drinks.",
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
    description: "A curated exhibition of over 80 contemporary Indian artworks spanning painting, sculpture, digital art, and mixed media installations. Featuring 22 artists exploring identity, ecology, and memory.",
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
    description: "A full-day wellness retreat by the sea, combining sunrise yoga sessions, meditation, breathwork, Ayurvedic consultations, and a mindful plant-based lunch. Led by certified instructors.",
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
    description: "Madurai's biggest electronic music festival returns with a lineup of 12 DJs across two stages. Headliners include internationally touring artists alongside South India's hottest underground talent.",
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

// Mock user profile
const MOCK_USER = {
  name: "Arjun Krishnamurthy",
  email: "arjun.k@example.com",
  phone: "+91 98456 78901",
  location: "Chennai, Tamil Nadu",
  joinedDate: "2024-03-15",
  avatar: null, // will render initials
  totalBookings: 5,
  totalSpent: 8241,
  upcomingEvents: 2,
};

// Mock bookings history
const MOCK_BOOKINGS = [
  {
    id: "BK-20241",
    eventTitle: "Jazz Under the Stars",
    date: "2026-06-14",
    time: "7:00 PM",
    location: "Rooftop Arena, Chennai",
    ticket: "VIP Pass",
    qty: 2,
    total: 3956,
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80",
  },
  {
    id: "BK-20198",
    eventTitle: "Tech Horizons Summit",
    date: "2026-06-20",
    time: "9:00 AM",
    location: "ITC Grand, Bangalore",
    ticket: "General Admission",
    qty: 1,
    total: 2949,
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
  },
  {
    id: "BK-19874",
    eventTitle: "Startup Pitch Night",
    date: "2026-07-18",
    time: "5:00 PM",
    location: "WeWork, Coimbatore",
    ticket: "General Admission",
    qty: 1,
    total: 0,
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
  },
  {
    id: "BK-18201",
    eventTitle: "Coastal Food Festival",
    date: "2025-12-10",
    time: "11:00 AM",
    location: "Marina Beach, Chennai",
    ticket: "Group (5 tickets)",
    qty: 5,
    total: 2095,
    status: "completed",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
  },
  {
    id: "BK-17550",
    eventTitle: "Classical Carnatic Night",
    date: "2025-10-05",
    time: "6:30 PM",
    location: "Music Academy, Chennai",
    ticket: "General Admission",
    qty: 2,
    total: 822,
    status: "completed",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
  },
];

// Mock notifications
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "confirmed",
    icon: "✅",
    title: "Booking Confirmed",
    message: "Your VIP tickets for Jazz Under the Stars have been reserved. See you on June 14!",
    time: "2 hours ago",
    read: false,
    eventId: 1,
  },
  {
    id: 2,
    type: "update",
    icon: "⚠️",
    title: "Event Updated",
    message: "Tech Horizons Summit: Workshop schedule has been updated. New sessions added on AI & LLMs.",
    time: "5 hours ago",
    read: false,
    eventId: 2,
  },
  {
    id: 3,
    type: "reminder",
    icon: "🔔",
    title: "Event Tomorrow",
    message: "Reminder: Your booking for Jazz Under the Stars is tomorrow at 7:00 PM. Don't forget your ticket!",
    time: "Yesterday",
    read: false,
    eventId: 1,
  },
  {
    id: 4,
    type: "promo",
    icon: "🎉",
    title: "Early Bird Offer",
    message: "Yoga & Wellness Retreat just released early bird tickets at 20% off. Limited seats available!",
    time: "2 days ago",
    read: true,
    eventId: 7,
  },
  {
    id: 5,
    type: "cancelled",
    icon: "❌",
    title: "Booking Cancellation Notice",
    message: "A booking from your wishlist — Electronic Dance Carnival — has been waitlisted. You're #14 in queue.",
    time: "3 days ago",
    read: true,
    eventId: 8,
  },
  {
    id: 6,
    type: "confirmed",
    icon: "✅",
    title: "Payment Successful",
    message: "₹2,949 paid for Tech Horizons Summit. Your e-ticket has been sent to arjun.k@example.com.",
    time: "4 days ago",
    read: true,
    eventId: 2,
  },
  {
    id: 7,
    type: "update",
    icon: "📍",
    title: "Venue Confirmed",
    message: "Coastal Food Festival venue is confirmed: Marina Beach, Stalls Area B. Parking available nearby.",
    time: "1 week ago",
    read: true,
    eventId: 3,
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

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
const BellIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);
const UserIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const LogoutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const TicketIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 9a3 3 0 010-6h20a3 3 0 010 6"/><path d="M2 15a3 3 0 000 6h20a3 3 0 000-6"/>
    <path d="M6 9v6"/><path d="M18 9v6"/>
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function getInitials(name) {
  return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
}
function isPast(dateStr) {
  return new Date(dateStr) < new Date();
}

// ─── SeatBar ──────────────────────────────────────────────────────────────────

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

// ─── Global Navbar ────────────────────────────────────────────────────────────

function GlobalNavbar({ activePage, onNavigate, notifications }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 200,
      background: "rgba(2,6,23,0.95)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid #1e293b",
      padding: "0 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "60px",
    }}>
      {/* Logo */}
      <button
        onClick={() => onNavigate("listing")}
        style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "10px",
        }}
      >
        <span style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          width: "32px", height: "32px", borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "16px",
        }}>🎟</span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "17px", color: "#f1f5f9" }}>
          EventPass
        </span>
      </button>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Home */}
        <button
          onClick={() => onNavigate("listing")}
          style={{
            background: activePage === "listing" ? "rgba(99,102,241,0.15)" : "transparent",
            border: `1px solid ${activePage === "listing" ? "rgba(99,102,241,0.4)" : "transparent"}`,
            color: activePage === "listing" ? "#a5b4fc" : "#64748b",
            padding: "7px 12px", borderRadius: "10px",
            cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
            fontSize: "13px", fontWeight: 600, transition: "all 0.2s",
          }}
        >
          <HomeIcon /> Events
        </button>

        {/* Notifications */}
        <button
          onClick={() => onNavigate("notifications")}
          style={{
            background: activePage === "notifications" ? "rgba(99,102,241,0.15)" : "transparent",
            border: `1px solid ${activePage === "notifications" ? "rgba(99,102,241,0.4)" : "transparent"}`,
            color: activePage === "notifications" ? "#a5b4fc" : "#64748b",
            padding: "7px 12px", borderRadius: "10px",
            cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
            fontSize: "13px", fontWeight: 600, transition: "all 0.2s",
            position: "relative",
          }}
        >
          <BellIcon size={16} />
          Notifications
          {unreadCount > 0 && (
            <span style={{
              position: "absolute", top: "5px", right: "7px",
              background: "#ef4444", color: "#fff",
              fontSize: "9px", fontWeight: 800,
              width: "16px", height: "16px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "2px solid #020617",
            }}>{unreadCount}</span>
          )}
        </button>

        {/* Profile dropdown */}
        <div ref={dropRef} style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(o => !o)}
            style={{
              background: activePage === "profile" || activePage === "bookings" ? "rgba(99,102,241,0.15)" : "#0f172a",
              border: `1px solid ${activePage === "profile" || activePage === "bookings" ? "rgba(99,102,241,0.4)" : "#1e293b"}`,
              borderRadius: "10px",
              padding: "5px 10px 5px 6px",
              cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
              transition: "all 0.2s",
            }}
          >
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 800, color: "#fff",
            }}>{getInitials(MOCK_USER.name)}</div>
            <span style={{ color: "#cbd5e1", fontSize: "13px", fontWeight: 600 }}>
              {MOCK_USER.name.split(" ")[0]}
            </span>
            <span style={{ color: "#475569", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
              <ChevronDownIcon />
            </span>
          </button>

          {dropdownOpen && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 8px)",
              background: "#0f172a", border: "1px solid #1e293b",
              borderRadius: "14px", padding: "8px",
              width: "200px", boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              animation: "slideDown 0.15s ease",
              zIndex: 300,
            }}>
              {/* User mini card */}
              <div style={{ padding: "10px 10px 12px", borderBottom: "1px solid #1e293b", marginBottom: "6px" }}>
                <div style={{ color: "#f1f5f9", fontSize: "13px", fontWeight: 700 }}>{MOCK_USER.name}</div>
                <div style={{ color: "#64748b", fontSize: "11px", marginTop: "2px" }}>{MOCK_USER.email}</div>
              </div>
              {[
                { label: "My Profile", page: "profile", icon: <UserIcon size={14} /> },
                { label: "My Bookings", page: "bookings", icon: <TicketIcon /> },
              ].map(item => (
                <button
                  key={item.page}
                  onClick={() => { onNavigate(item.page); setDropdownOpen(false); }}
                  style={{
                    width: "100%", textAlign: "left",
                    background: activePage === item.page ? "rgba(99,102,241,0.1)" : "transparent",
                    border: "none", color: activePage === item.page ? "#a5b4fc" : "#94a3b8",
                    padding: "9px 10px", borderRadius: "10px",
                    fontSize: "13px", fontWeight: 600, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "8px",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ color: "#6366f1" }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <div style={{ borderTop: "1px solid #1e293b", marginTop: "6px", paddingTop: "6px" }}>
                <button style={{
                  width: "100%", textAlign: "left",
                  background: "transparent", border: "none", color: "#ef4444",
                  padding: "9px 10px", borderRadius: "10px",
                  fontSize: "13px", fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <LogoutIcon /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// ─── EventCard ────────────────────────────────────────────────────────────────

function EventCard({ event, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(160deg, #0f172a 60%, #1e293b)",
        border: `1px solid ${hovered ? "#6366f1" : "#1e293b"}`,
        borderRadius: "18px", overflow: "hidden",
        transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 60px rgba(99,102,241,0.18)" : "0 4px 20px rgba(0,0,0,0.4)",
        display: "flex", flexDirection: "column", cursor: "pointer",
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
          }}>Done</button>
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
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(2,6,23,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #1e293b" : "none",
        padding: "14px 24px", transition: "all 0.3s ease",
        display: "flex", alignItems: "center", gap: "12px",
      }}>
        <button onClick={onBack} style={{
          background: "#1e293b", border: "1px solid #334155",
          color: "#94a3b8", padding: "8px 16px", borderRadius: "10px",
          fontSize: "13px", fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", gap: "7px", transition: "all 0.2s",
        }}>
          <BackIcon /> Back to Events
        </button>
        {scrolled && (
          <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "15px", fontFamily: "'Syne', sans-serif" }}>
            {event.title}
          </span>
        )}
      </div>

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

      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "36px 24px 80px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 360px",
        gap: "32px", alignItems: "start",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" }}>
            {[
              { icon: <CalendarIcon />, label: "Date", value: formatDate(event.date) },
              { icon: <ClockIcon />, label: "Time", value: event.time },
              { icon: <LocationIcon />, label: "Venue", value: event.location },
              { icon: <UsersIcon />, label: "Capacity", value: `${event.seats} seats` },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "14px", padding: "16px" }}>
                <div style={{ color: "#6366f1", marginBottom: "6px" }}>{icon}</div>
                <div style={{ color: "#64748b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2px" }}>{label}</div>
                <div style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>

          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 700, color: "#f1f5f9", marginBottom: "12px" }}>About This Event</h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.75, fontSize: "15px", margin: 0 }}>{event.description}</p>
          </div>

          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 700, color: "#f1f5f9", marginBottom: "14px" }}>What's Included</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {event.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    width: "22px", height: "22px", borderRadius: "50%",
                    background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.4)",
                    color: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}><CheckIcon /></span>
                  <span style={{ color: "#cbd5e1", fontSize: "14px" }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "16px", padding: "22px" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#f1f5f9", marginBottom: "16px" }}>Seat Availability</h2>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ color: "#94a3b8", fontSize: "13px" }}>{event.booked} booked · {remaining} remaining of {event.seats} total</span>
              <span style={{ color: barColor, fontSize: "13px", fontWeight: 700 }}>{pct}% filled</span>
            </div>
            <div style={{ background: "#1e293b", borderRadius: "99px", height: "10px", overflow: "hidden", marginBottom: "14px" }}>
              <div style={{ width: `${pct}%`, background: barColor, height: "100%", borderRadius: "99px" }} />
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

        {/* Booking Panel */}
        <div style={{ position: "sticky", top: "80px", background: "#0f172a", border: "1px solid #1e293b", borderRadius: "20px", overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)", padding: "20px 22px", borderBottom: "1px solid #1e293b" }}>
            <div style={{ color: "#a5b4fc", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>Book Tickets</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 800, color: event.price === 0 ? "#10b981" : "#f1f5f9" }}>
                {event.price === 0 ? "FREE" : `₹${event.price.toLocaleString()}`}
              </span>
              {event.price > 0 && <span style={{ color: "#6366f1", fontSize: "13px" }}>/ ticket onwards</span>}
            </div>
          </div>

          <div style={{ padding: "22px" }}>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>Select Ticket Type</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {TICKET_TYPES.map((t) => {
                  const active = selectedTicket.id === t.id;
                  const tPrice = event.price === 0 ? 0 : Math.round(event.price * t.multiplier);
                  return (
                    <div key={t.id} onClick={() => { setSelectedTicket(t); setQty(1); }} style={{
                      border: `1px solid ${active ? "#6366f1" : "#1e293b"}`,
                      background: active ? "rgba(99,102,241,0.08)" : "#0a0f1e",
                      borderRadius: "12px", padding: "12px 14px",
                      cursor: "pointer", transition: "all 0.2s",
                      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    }}>
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

            {selectedTicket.id !== "group" && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>Number of Tickets</div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setQty(n)} style={{
                      width: "38px", height: "38px",
                      background: qty === n ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#1e293b",
                      border: `1px solid ${qty === n ? "transparent" : "#334155"}`,
                      borderRadius: "10px", color: qty === n ? "#fff" : "#94a3b8",
                      fontWeight: 700, fontSize: "14px", cursor: "pointer", transition: "all 0.15s",
                    }}>{n}</button>
                  ))}
                </div>
              </div>
            )}

            {event.price > 0 && (
              <div style={{ background: "#070d1a", border: "1px solid #1e293b", borderRadius: "12px", padding: "14px", marginBottom: "20px" }}>
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

            <button onClick={() => setShowConfirm(true)} disabled={remaining === 0} style={{
              width: "100%",
              background: remaining === 0 ? "#1e293b" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "none", color: remaining === 0 ? "#475569" : "#fff",
              padding: "16px", borderRadius: "14px",
              fontSize: "16px", fontWeight: 800, cursor: remaining === 0 ? "not-allowed" : "pointer",
              fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em", marginBottom: "14px",
            }}>
              {remaining === 0 ? "Sold Out" : event.price === 0 ? "Register Now — Free" : `Pay ₹${grandTotal.toLocaleString()}`}
            </button>

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

      {showConfirm && (
        <BookingConfirmModal event={event} ticket={selectedTicket} qty={qty} onClose={() => setShowConfirm(false)} />
      )}
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────

function ProfilePage({ onNavigate }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: MOCK_USER.name,
    email: MOCK_USER.email,
    phone: MOCK_USER.phone,
    location: MOCK_USER.location,
  });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const handleSave = () => {
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const stats = [
    { label: "Total Bookings", value: MOCK_USER.totalBookings, icon: "🎟", color: "#6366f1" },
    { label: "Total Spent", value: `₹${MOCK_USER.totalSpent.toLocaleString()}`, icon: "💳", color: "#8b5cf6" },
    { label: "Upcoming Events", value: MOCK_USER.upcomingEvents, icon: "📅", color: "#10b981" },
    { label: "Member Since", value: "Mar 2024", icon: "⭐", color: "#f59e0b" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" }}>
      {/* Hero banner */}
      <div style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        padding: "40px 24px 80px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", right: "-40px", width: "250px", height: "250px", background: "radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            {/* Avatar */}
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "28px", fontWeight: 800, color: "#fff",
              border: "3px solid rgba(255,255,255,0.15)",
              flexShrink: 0,
            }}>{getInitials(formData.name)}</div>
            <div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 800, color: "#f1f5f9", margin: "0 0 4px" }}>
                {formData.name}
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "14px", margin: "0 0 8px" }}>{formData.email}</p>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)",
                padding: "3px 12px", borderRadius: "99px",
              }}>
                <span style={{ color: "#f59e0b", fontSize: "12px" }}>⭐</span>
                <span style={{ color: "#a5b4fc", fontSize: "12px", fontWeight: 600 }}>Premium Member</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ maxWidth: "800px", margin: "-36px auto 0", padding: "0 24px", position: "relative", zIndex: 10 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px",
        }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: "#0f172a", border: "1px solid #1e293b",
              borderRadius: "16px", padding: "16px", textAlign: "center",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}>
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{s.icon}</div>
              <div style={{ color: s.color, fontSize: "18px", fontWeight: 800, fontFamily: "'Syne', sans-serif", marginBottom: "3px" }}>
                {s.value}
              </div>
              <div style={{ color: "#64748b", fontSize: "11px", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: "800px", margin: "28px auto 0", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: "4px", background: "#0f172a", border: "1px solid #1e293b", borderRadius: "14px", padding: "4px", marginBottom: "24px" }}>
          {[
            { id: "profile", label: "Profile Details" },
            { id: "security", label: "Security" },
            { id: "preferences", label: "Preferences" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                background: activeTab === tab.id ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
                border: "none", color: activeTab === tab.id ? "#fff" : "#64748b",
                padding: "10px 14px", borderRadius: "10px",
                fontSize: "13px", fontWeight: 700, cursor: "pointer",
                transition: "all 0.2s",
              }}
            >{tab.label}</button>
          ))}
        </div>

        {/* Saved toast */}
        {saved && (
          <div style={{
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: "12px", padding: "12px 16px", marginBottom: "20px",
            color: "#6ee7b7", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px",
            animation: "fadeIn 0.2s ease",
          }}>
            ✅ Profile updated successfully!
          </div>
        )}

        {activeTab === "profile" && (
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "20px", overflow: "hidden" }}>
            <div style={{
              padding: "20px 24px", borderBottom: "1px solid #1e293b",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>
                Personal Information
              </h2>
              <button
                onClick={() => editMode ? handleSave() : setEditMode(true)}
                style={{
                  background: editMode ? "linear-gradient(135deg, #10b981, #059669)" : "rgba(99,102,241,0.1)",
                  border: `1px solid ${editMode ? "transparent" : "rgba(99,102,241,0.3)"}`,
                  color: editMode ? "#fff" : "#a5b4fc",
                  padding: "8px 16px", borderRadius: "10px",
                  fontSize: "13px", fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "6px",
                  transition: "all 0.2s",
                }}
              >
                {editMode ? <><CheckIcon /> Save Changes</> : <><EditIcon /> Edit Profile</>}
              </button>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {[
                  { label: "Full Name", key: "name", icon: "👤" },
                  { label: "Email Address", key: "email", icon: "📧" },
                  { label: "Phone Number", key: "phone", icon: "📱" },
                  { label: "Location", key: "location", icon: "📍" },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "8px" }}>
                      {field.icon} {field.label}
                    </label>
                    {editMode ? (
                      <input
                        value={formData[field.key]}
                        onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        style={{
                          width: "100%", background: "#1e293b",
                          border: "1px solid #334155", borderRadius: "10px",
                          color: "#f1f5f9", fontSize: "14px",
                          padding: "11px 14px", outline: "none",
                          boxSizing: "border-box",
                          transition: "border-color 0.2s",
                        }}
                      />
                    ) : (
                      <div style={{
                        background: "#0a0f1e", border: "1px solid #1e293b",
                        borderRadius: "10px", padding: "11px 14px",
                        color: "#e2e8f0", fontSize: "14px",
                      }}>{formData[field.key]}</div>
                    )}
                  </div>
                ))}
              </div>

              {editMode && (
                <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button
                    onClick={() => setEditMode(false)}
                    style={{
                      background: "transparent", border: "1px solid #334155",
                      color: "#94a3b8", padding: "10px 18px", borderRadius: "10px",
                      fontSize: "13px", fontWeight: 600, cursor: "pointer",
                    }}
                  >Cancel</button>
                </div>
              )}

              {/* Avatar section */}
              <div style={{ borderTop: "1px solid #1e293b", marginTop: "24px", paddingTop: "24px" }}>
                <div style={{ color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "14px" }}>Profile Picture</div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{
                    width: "64px", height: "64px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "22px", fontWeight: 800, color: "#fff",
                  }}>{getInitials(formData.name)}</div>
                  <div>
                    <button style={{
                      background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)",
                      color: "#a5b4fc", padding: "9px 16px", borderRadius: "10px",
                      fontSize: "13px", fontWeight: 600, cursor: "pointer", marginRight: "8px",
                    }}>Upload Photo</button>
                    <span style={{ color: "#475569", fontSize: "12px" }}>JPG or PNG, max 2MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "20px", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #1e293b" }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>Security Settings</h2>
            </div>
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { title: "Change Password", desc: "Update your account password", icon: "🔒", action: "Change" },
                { title: "Two-Factor Authentication", desc: "Add an extra layer of security", icon: "🛡️", action: "Enable" },
                { title: "Active Sessions", desc: "Manage where you're logged in", icon: "💻", action: "View" },
                { title: "Login History", desc: "See recent account activity", icon: "🕐", action: "View" },
              ].map(item => (
                <div key={item.title} style={{
                  background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "14px",
                  padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "20px" }}>{item.icon}</span>
                    <div>
                      <div style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600 }}>{item.title}</div>
                      <div style={{ color: "#64748b", fontSize: "12px" }}>{item.desc}</div>
                    </div>
                  </div>
                  <button style={{
                    background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
                    color: "#a5b4fc", padding: "7px 14px", borderRadius: "8px",
                    fontSize: "12px", fontWeight: 700, cursor: "pointer",
                  }}>{item.action}</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "preferences" && (
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "20px", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #1e293b" }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>Preferences</h2>
            </div>
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {[
                { label: "Email Notifications", desc: "Booking confirmations & updates", enabled: true },
                { label: "SMS Alerts", desc: "Event reminders via SMS", enabled: true },
                { label: "Marketing Emails", desc: "New events & exclusive offers", enabled: false },
                { label: "Price Drop Alerts", desc: "Notify when ticket prices drop", enabled: true },
                { label: "Waitlist Notifications", desc: "Alert when seats open up", enabled: true },
              ].map((pref, i) => (
                <PreferenceToggle key={i} {...pref} />
              ))}
            </div>
          </div>
        )}

        {/* Danger zone */}
        <div style={{
          background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)",
          borderRadius: "16px", padding: "20px 24px", marginTop: "20px", marginBottom: "40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ color: "#fca5a5", fontSize: "14px", fontWeight: 700, marginBottom: "3px" }}>Danger Zone</div>
            <div style={{ color: "#64748b", fontSize: "12px" }}>Permanently delete your account and all data.</div>
          </div>
          <button style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            color: "#ef4444", padding: "9px 18px", borderRadius: "10px",
            fontSize: "13px", fontWeight: 700, cursor: "pointer",
          }}>Delete Account</button>
        </div>
      </div>
    </div>
  );
}

function PreferenceToggle({ label, desc, enabled: defaultEnabled }) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 0", borderBottom: "1px solid #1e293b",
    }}>
      <div>
        <div style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600 }}>{label}</div>
        <div style={{ color: "#64748b", fontSize: "12px" }}>{desc}</div>
      </div>
      <button
        onClick={() => setEnabled(e => !e)}
        style={{
          width: "44px", height: "24px", borderRadius: "99px",
          background: enabled ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#1e293b",
          border: "none", cursor: "pointer", position: "relative",
          transition: "background 0.25s", flexShrink: 0,
        }}
      >
        <span style={{
          position: "absolute", top: "3px",
          left: enabled ? "23px" : "3px",
          width: "18px", height: "18px", borderRadius: "50%",
          background: "#fff", transition: "left 0.25s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
        }} />
      </button>
    </div>
  );
}

// ─── Bookings Page ────────────────────────────────────────────────────────────

function BookingsPage({ onNavigate }) {
  const [filter, setFilter] = useState("all");
  const upcoming = MOCK_BOOKINGS.filter(b => !isPast(b.date));
  const past = MOCK_BOOKINGS.filter(b => isPast(b.date));
  const shown = filter === "upcoming" ? upcoming : filter === "past" ? past : MOCK_BOOKINGS;

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        padding: "40px 24px 36px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-60px", left: "-60px", width: "260px", height: "260px", background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "30px", fontWeight: 800, color: "#f1f5f9", margin: "0 0 8px" }}>My Bookings</h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>{MOCK_BOOKINGS.length} total bookings · {upcoming.length} upcoming</p>
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "32px 24px 60px" }}>
        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "28px" }}>
          {[
            { label: "Total Bookings", value: MOCK_BOOKINGS.length, color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
            { label: "Upcoming Events", value: upcoming.length, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
            { label: "Events Attended", value: past.length, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.color}30`, borderRadius: "14px", padding: "16px 20px" }}>
              <div style={{ color: s.color, fontSize: "26px", fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>{s.value}</div>
              <div style={{ color: "#94a3b8", fontSize: "12px", marginTop: "3px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {[
            { id: "all", label: `All (${MOCK_BOOKINGS.length})` },
            { id: "upcoming", label: `Upcoming (${upcoming.length})` },
            { id: "past", label: `Past (${past.length})` },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                background: filter === f.id ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#0f172a",
                border: `1px solid ${filter === f.id ? "transparent" : "#1e293b"}`,
                color: filter === f.id ? "#fff" : "#94a3b8",
                padding: "8px 18px", borderRadius: "99px",
                fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              }}
            >{f.label}</button>
          ))}
        </div>

        {/* Booking list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {shown.map(booking => (
            <div key={booking.id} style={{
              background: "#0f172a", border: "1px solid #1e293b",
              borderRadius: "18px", overflow: "hidden",
              display: "flex", alignItems: "stretch",
            }}>
              {/* Image */}
              <div style={{ width: "120px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
                <img src={booking.image} alt={booking.eventTitle} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(2,6,23,0.3)" }} />
              </div>
              {/* Details */}
              <div style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "6px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>
                    {booking.eventTitle}
                  </h3>
                  <span style={{
                    background: booking.status === "confirmed" ? "rgba(16,185,129,0.1)" : "rgba(100,116,139,0.1)",
                    border: `1px solid ${booking.status === "confirmed" ? "rgba(16,185,129,0.3)" : "rgba(100,116,139,0.2)"}`,
                    color: booking.status === "confirmed" ? "#6ee7b7" : "#94a3b8",
                    fontSize: "11px", fontWeight: 700, padding: "3px 10px",
                    borderRadius: "99px", textTransform: "uppercase", whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}>
                    {booking.status === "confirmed" ? "✓ Confirmed" : "Attended"}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                  {[
                    { icon: <CalendarIcon />, text: formatDateShort(booking.date) },
                    { icon: <ClockIcon />, text: booking.time },
                    { icon: <LocationIcon />, text: booking.location },
                  ].map(({ icon, text }, i) => (
                    <span key={i} style={{ display: "flex", alignItems: "center", gap: "5px", color: "#64748b", fontSize: "12px" }}>
                      <span style={{ color: "#6366f1" }}>{icon}</span>{text}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "4px", flexWrap: "wrap" }}>
                  <span style={{ background: "#1e293b", color: "#94a3b8", fontSize: "11px", padding: "3px 10px", borderRadius: "6px" }}>
                    🎟 {booking.ticket}
                  </span>
                  <span style={{ background: "#1e293b", color: "#94a3b8", fontSize: "11px", padding: "3px 10px", borderRadius: "6px" }}>
                    👥 {booking.qty} ticket{booking.qty > 1 ? "s" : ""}
                  </span>
                  <span style={{ background: "#1e293b", color: booking.total === 0 ? "#10b981" : "#94a3b8", fontSize: "11px", padding: "3px 10px", borderRadius: "6px", fontWeight: 700 }}>
                    {booking.total === 0 ? "FREE" : `₹${booking.total.toLocaleString()}`}
                  </span>
                </div>
              </div>
              {/* Action */}
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px", borderLeft: "1px solid #1e293b" }}>
                <button style={{
                  background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
                  color: "#a5b4fc", padding: "8px 14px", borderRadius: "10px",
                  fontSize: "12px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
                }}>View Ticket</button>
                {booking.status === "confirmed" && !isPast(booking.date) && (
                  <button style={{
                    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                    color: "#fca5a5", padding: "8px 14px", borderRadius: "10px",
                    fontSize: "12px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
                  }}>Cancel</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Notifications Page ───────────────────────────────────────────────────────

function NotificationsPage({ notifications, setNotifications }) {
  const [filter, setFilter] = useState("all");
  const unread = notifications.filter(n => !n.read);
  const shown = filter === "unread" ? unread : notifications;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  const typeConfig = {
    confirmed: { color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)", dot: "#10b981" },
    update:    { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", dot: "#f59e0b" },
    reminder:  { color: "#6366f1", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)", dot: "#6366f1" },
    promo:     { color: "#8b5cf6", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)", dot: "#8b5cf6" },
    cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)", dot: "#ef4444" },
  };

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        padding: "40px 24px 36px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ maxWidth: "720px", margin: "0 auto", position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "30px", fontWeight: 800, color: "#f1f5f9", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "12px" }}>
              Notifications
              {unread.length > 0 && (
                <span style={{
                  background: "#ef4444", color: "#fff",
                  fontSize: "13px", fontWeight: 800,
                  padding: "2px 8px", borderRadius: "99px",
                }}>{unread.length}</span>
              )}
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
              {unread.length > 0 ? `${unread.length} unread notifications` : "All caught up!"}
            </p>
          </div>
          {unread.length > 0 && (
            <button
              onClick={markAllRead}
              style={{
                background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
                color: "#a5b4fc", padding: "9px 18px", borderRadius: "10px",
                fontSize: "13px", fontWeight: 700, cursor: "pointer",
              }}
            >Mark all read</button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "28px 24px 60px" }}>
        {/* Filter + type legend */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { id: "all", label: `All (${notifications.length})` },
              { id: "unread", label: `Unread (${unread.length})` },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  background: filter === f.id ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#0f172a",
                  border: `1px solid ${filter === f.id ? "transparent" : "#1e293b"}`,
                  color: filter === f.id ? "#fff" : "#94a3b8",
                  padding: "7px 16px", borderRadius: "99px",
                  fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                }}
              >{f.label}</button>
            ))}
          </div>
        </div>

        {shown.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔔</div>
            <div style={{ color: "#475569", fontSize: "16px", fontWeight: 700 }}>No notifications</div>
            <div style={{ color: "#334155", fontSize: "13px", marginTop: "6px" }}>You're all caught up!</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {shown.map(notif => {
              const cfg = typeConfig[notif.type] || typeConfig.update;
              return (
                <div
                  key={notif.id}
                  style={{
                    background: notif.read ? "#0f172a" : cfg.bg,
                    border: `1px solid ${notif.read ? "#1e293b" : cfg.border}`,
                    borderRadius: "16px", padding: "16px 18px",
                    display: "flex", alignItems: "flex-start", gap: "14px",
                    transition: "all 0.2s", cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => markRead(notif.id)}
                >
                  {/* Unread dot */}
                  {!notif.read && (
                    <span style={{
                      position: "absolute", top: "16px", right: "16px",
                      width: "8px", height: "8px", borderRadius: "50%",
                      background: cfg.dot,
                      boxShadow: `0 0 8px ${cfg.dot}`,
                    }} />
                  )}

                  {/* Icon */}
                  <div style={{
                    width: "42px", height: "42px", borderRadius: "12px",
                    background: cfg.bg, border: `1px solid ${cfg.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px", flexShrink: 0,
                  }}>{notif.icon}</div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ color: notif.read ? "#e2e8f0" : "#f1f5f9", fontSize: "14px", fontWeight: notif.read ? 600 : 700 }}>
                        {notif.title}
                      </span>
                      <span style={{ color: "#475569", fontSize: "11px", flexShrink: 0 }}>{notif.time}</span>
                    </div>
                    <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.55, margin: 0 }}>
                      {notif.message}
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={e => { e.stopPropagation(); deleteNotif(notif.id); }}
                    style={{
                      background: "transparent", border: "none",
                      color: "#334155", cursor: "pointer", fontSize: "16px",
                      padding: "2px 4px", lineHeight: 1, flexShrink: 0,
                      transition: "color 0.15s",
                    }}
                    title="Dismiss"
                  >×</button>
                </div>
              );
            })}
          </div>
        )}

        {/* Notification settings nudge */}
        <div style={{
          marginTop: "32px",
          background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)",
          borderRadius: "14px", padding: "16px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "12px",
        }}>
          <div>
            <div style={{ color: "#a5b4fc", fontSize: "13px", fontWeight: 700, marginBottom: "2px" }}>Notification Settings</div>
            <div style={{ color: "#64748b", fontSize: "12px" }}>Control which alerts you receive</div>
          </div>
          <button style={{
            background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
            color: "#a5b4fc", padding: "8px 16px", borderRadius: "9px",
            fontSize: "12px", fontWeight: 700, cursor: "pointer",
          }}>Manage</button>
        </div>
      </div>
    </div>
  );
}

// ─── Listing Page ─────────────────────────────────────────────────────────────

function ListingPage({ onNavigateToDetail }) {
  const [events] = useState(EVENTS_DATA);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");

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

  return (
    <div style={{ background: "#020617", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" }}>
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

      {/* Search + filters */}
      <div style={{
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
                  padding: "11px 14px 11px 44px", outline: "none", boxSizing: "border-box",
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
              <EventCard key={event.id} event={event} onNavigate={onNavigateToDetail} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function EventBookingApp() {
  const [page, setPage] = useState("listing"); // listing | detail | profile | bookings | notifications
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const navigate = (target, data = null) => {
    if (target === "detail" && data) {
      setSelectedEvent(data);
      setPage("detail");
    } else {
      setPage(target);
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #020617; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 99px; }
        input::placeholder { color: #475569; }
        select option { background: #0f172a; color: #e2e8f0; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#020617" }}>
        {/* Show global navbar on all pages except event detail */}
        {page !== "detail" && (
          <GlobalNavbar
            activePage={page}
            onNavigate={navigate}
            notifications={notifications}
          />
        )}

        {page === "listing" && (
          <ListingPage onNavigateToDetail={(event) => navigate("detail", event)} />
        )}
        {page === "detail" && selectedEvent && (
          <EventDetailPage event={selectedEvent} onBack={() => navigate("listing")} />
        )}
        {page === "profile" && (
          <ProfilePage onNavigate={navigate} />
        )}
        {page === "bookings" && (
          <BookingsPage onNavigate={navigate} />
        )}
        {page === "notifications" && (
          <NotificationsPage notifications={notifications} setNotifications={setNotifications} />
        )}
      </div>
    </>
  );
}
