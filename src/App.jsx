import { useState } from "react";

const tutors = [
  {
    id: 1,
    name: "Amina Wanjiku",
    subjects: ["Mathematics", "Physics"],
    level: "KCSE & University",
    location: "Westlands",
    rate: "KSh 500/hr",
    rating: 4.9,
    reviews: 34,
    bio: "Former KU lecturer with 6 years experience. Specialises in exam prep and weak-foundation rebuilding.",
    avatar: "AW",
    color: "#e8f4e8",
    accent: "#2d7a3a",
  },
  {
    id: 2,
    name: "Brian Otieno",
    subjects: ["English", "Kiswahili", "Literature"],
    level: "Primary & KCSE",
    location: "Kasarani",
    rate: "KSh 350/hr",
    rating: 4.7,
    reviews: 21,
    bio: "BA Literature graduate. Passionate about language and helping students find their voice in essays and oral work.",
    avatar: "BO",
    color: "#e8eef8",
    accent: "#1a3f8f",
  },
  {
    id: 3,
    name: "Cynthia Muthoni",
    subjects: ["Biology", "Chemistry"],
    level: "KCSE & A-Level",
    location: "Thika Road",
    rate: "KSh 600/hr",
    rating: 5.0,
    reviews: 18,
    bio: "Med school student at UoN. Breaks down complex science into memorable, real-world concepts.",
    avatar: "CM",
    color: "#fdf0e8",
    accent: "#c25a00",
  },
  {
    id: 4,
    name: "Dennis Kamau",
    subjects: ["Computer Studies", "Mathematics"],
    level: "Primary, KCSE & Uni",
    location: "Online / Nairobi-wide",
    rate: "KSh 700/hr",
    rating: 4.8,
    reviews: 47,
    bio: "Software engineer moonlighting as a tutor. Teaches coding basics, MS Office and KCSE comp revision.",
    avatar: "DK",
    color: "#f0e8fd",
    accent: "#5a00c2",
  },
  {
    id: 5,
    name: "Faith Achieng",
    subjects: ["History", "CRE", "Geography"],
    level: "KCSE",
    location: "Embakasi",
    rate: "KSh 400/hr",
    rating: 4.6,
    reviews: 12,
    bio: "Education degree from Daystar. Uses maps, timelines and story arcs to make humanities click.",
    avatar: "FA",
    color: "#fef8e0",
    accent: "#8a6500",
  },
];

const allSubjects = ["All", ...new Set(tutors.flatMap((t) => t.subjects))];
const allLocations = ["All locations", ...new Set(tutors.map((t) => t.location))];

function StarRating({ rating }) {
  return (
    <span style={{ color: "#f5a623", fontSize: "0.85rem", letterSpacing: "1px" }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 ? "½" : ""}
      <span style={{ color: "#999", marginLeft: 4, fontSize: "0.8rem" }}>{rating}</span>
    </span>
  );
}

function Modal({ tutor, onClose, onPay }) {
  const [paid, setPaid] = useState(false);

  function handlePay() {
    setPaid(true);
    onPay(tutor.id);
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 100, padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: "1.25rem", maxWidth: 420, width: "100%",
          padding: "2rem", boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
          fontFamily: "'Lora', Georgia, serif",
        }}
      >
        {/* Avatar + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: tutor.color, color: tutor.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: "1.1rem", border: `2px solid ${tutor.accent}`,
          }}>
            {tutor.avatar}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{tutor.name}</div>
            <StarRating rating={tutor.rating} />
            <span style={{ color: "#888", fontSize: "0.78rem", marginLeft: 6 }}>({tutor.reviews} reviews)</span>
          </div>
        </div>

        <p style={{ color: "#444", fontSize: "0.93rem", lineHeight: 1.6, marginBottom: "1rem" }}>{tutor.bio}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.2rem" }}>
          {tutor.subjects.map((s) => (
            <span key={s} style={{
              background: tutor.color, color: tutor.accent,
              borderRadius: 20, padding: "3px 10px", fontSize: "0.78rem", fontWeight: 600,
            }}>{s}</span>
          ))}
        </div>

        <div style={{ background: "#f8f8f8", borderRadius: "0.75rem", padding: "0.9rem 1rem", marginBottom: "1.4rem", fontSize: "0.88rem", color: "#555" }}>
          <div>📍 {tutor.location}</div>
          <div style={{ marginTop: 4 }}>🕐 {tutor.level}</div>
          <div style={{ marginTop: 4 }}>💰 {tutor.rate}</div>
        </div>

        {!paid ? (
          <>
            <div style={{
              background: "#fffbea", border: "1px solid #f5d06b",
              borderRadius: "0.75rem", padding: "0.8rem 1rem",
              fontSize: "0.85rem", color: "#7a5c00", marginBottom: "1.2rem",
            }}>
              🔒 Pay <strong>KSh 50</strong> to unlock this tutor's contact details (WhatsApp / phone).
            </div>
            <button
              onClick={handlePay}
              style={{
                width: "100%", padding: "0.85rem",
                background: "#1a7a3a", color: "#fff", border: "none",
                borderRadius: "0.75rem", fontWeight: 700, fontSize: "1rem",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Pay KSh 50 via M-Pesa
            </button>
          </>
        ) : (
          <div style={{
            background: "#e8f8ed", border: "1px solid #5cb87a",
            borderRadius: "0.75rem", padding: "1rem",
            textAlign: "center", fontSize: "0.95rem", color: "#1a7a3a",
          }}>
            ✅ <strong>Payment received!</strong><br />
            <span style={{ fontSize: "1.05rem", fontWeight: 700, display: "block", marginTop: 6 }}>
              📱 +254 7XX XXX XXX
            </span>
            <span style={{ fontSize: "0.8rem", color: "#555" }}>
              WhatsApp preferred · Mention TutorNairobi
            </span>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: "100%", marginTop: "0.8rem", padding: "0.6rem",
            background: "transparent", border: "1px solid #ddd",
            borderRadius: "0.75rem", color: "#888", cursor: "pointer",
            fontFamily: "inherit", fontSize: "0.88rem",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function TutorNairobi() {
  const [subject, setSubject] = useState("All");
  const [location, setLocation] = useState("All locations");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [unlocked, setUnlocked] = useState([]);

  const filtered = tutors.filter((t) => {
    const matchSubject = subject === "All" || t.subjects.includes(subject);
    const matchLocation = location === "All locations" || t.location === location;
    const matchSearch =
      search === "" ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchSubject && matchLocation && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f4f1ec", fontFamily: "'Lora', Georgia, serif" }}>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap');`}</style>

      {/* Header */}
      <div style={{
        background: "#0f2d1a",
        padding: "2rem 1.5rem 1.5rem",
        color: "#fff",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.3rem" }}>
            <span style={{ fontSize: "1.5rem" }}>📚</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "1.3rem", letterSpacing: "-0.5px" }}>
              TutorNairobi
            </span>
          </div>
          <p style={{ color: "#9fc7a8", fontSize: "0.88rem", margin: 0 }}>
            Find trusted local tutors. Pay KSh 50 to connect.
          </p>

          {/* Search */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or subject…"
            style={{
              width: "100%", marginTop: "1.2rem", padding: "0.75rem 1rem",
              borderRadius: "0.75rem", border: "none", fontSize: "0.93rem",
              background: "#1e4a2a", color: "#fff", outline: "none",
              fontFamily: "inherit", boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e0d8", padding: "0.8rem 1.5rem" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", gap: "0.7rem", overflowX: "auto" }}>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{
              padding: "0.45rem 0.8rem", borderRadius: 20, border: "1.5px solid #ccc",
              fontSize: "0.82rem", background: "#fff", cursor: "pointer",
              fontFamily: "inherit", flexShrink: 0,
            }}
          >
            {allSubjects.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              padding: "0.45rem 0.8rem", borderRadius: 20, border: "1.5px solid #ccc",
              fontSize: "0.82rem", background: "#fff", cursor: "pointer",
              fontFamily: "inherit", flexShrink: 0,
            }}
          >
            {allLocations.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 640, margin: "1.2rem auto", padding: "0 1rem" }}>
        <p style={{ fontSize: "0.82rem", color: "#888", marginBottom: "1rem" }}>
          {filtered.length} tutor{filtered.length !== 1 ? "s" : ""} found
        </p>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem 0", color: "#aaa" }}>
            No tutors match your search.
          </div>
        )}

        {filtered.map((tutor) => (
          <div
            key={tutor.id}
            onClick={() => setSelected(tutor)}
            style={{
              background: "#fff", borderRadius: "1rem", padding: "1.2rem",
              marginBottom: "0.9rem", cursor: "pointer",
              border: "1.5px solid transparent",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              transition: "box-shadow 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
              e.currentTarget.style.borderColor = tutor.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              {/* Avatar */}
              <div style={{
                width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                background: tutor.color, color: tutor.accent,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "0.95rem", border: `2px solid ${tutor.accent}`,
              }}>
                {tutor.avatar}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>{tutor.name}</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1a7a3a", flexShrink: 0, marginLeft: 8 }}>
                    {tutor.rate}
                  </div>
                </div>

                <div style={{ marginTop: 3 }}>
                  <StarRating rating={tutor.rating} />
                  <span style={{ color: "#aaa", fontSize: "0.77rem", marginLeft: 4 }}>
                    ({tutor.reviews})
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.5rem" }}>
                  {tutor.subjects.map((s) => (
                    <span key={s} style={{
                      background: tutor.color, color: tutor.accent,
                      borderRadius: 20, padding: "2px 9px", fontSize: "0.75rem", fontWeight: 600,
                    }}>{s}</span>
                  ))}
                </div>

                <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "#888" }}>
                  📍 {tutor.location} · {tutor.level}
                </div>

                {unlocked.includes(tutor.id) && (
                  <div style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: "#1a7a3a", fontWeight: 600 }}>
                    ✅ Contact unlocked
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA for tutors */}
      <div style={{
        background: "#0f2d1a", color: "#9fc7a8",
        textAlign: "center", padding: "2rem 1.5rem",
        fontSize: "0.88rem", marginTop: "1rem",
      }}>
        <div style={{ fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>Are you a tutor?</div>
        List your profile for free and start getting clients.
        <div style={{ marginTop: "0.8rem" }}>
          <button style={{
            background: "#2d7a3a", color: "#fff", border: "none",
            borderRadius: "0.75rem", padding: "0.6rem 1.4rem",
            fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>
            Join as a Tutor →
          </button>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <Modal
          tutor={selected}
          onClose={() => setSelected(null)}
          onPay={(id) => setUnlocked((prev) => [...prev, id])}
        />
      )}
    </div>
  );
}
