"use client";

import { useState } from "react";

export default function Home() {
  const [description, setDescription] = useState("");
  const [businessType, setBusinessType] = useState("Plumber");
  const [loading, setLoading] = useState(false);
  const [sopOutput, setSopOutput] = useState("");
  const [error, setError] = useState("");

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!description || description.length < 10) {
      setError("Please describe the process in more detail (at least 10 characters).");
      return;
    }
    setError("");
    setLoading(true);
    setSopOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, businessType }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSopOutput(data.sop);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function formatSOP(text: string) {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-2" />;
      if (line.match(/^#{1,3}\s/) || line.match(/^(Title|Purpose|Required|Safety|Procedure|Quality):/i)) {
        return (
          <h3 key={i} style={{ color: "#2D6A4F", fontWeight: 700, fontSize: "0.95rem", marginTop: "1rem", marginBottom: "0.25rem" }}>
            {line.replace(/^#{1,3}\s/, "").replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <span style={{ color: "#2D6A4F", fontWeight: 700, minWidth: "1.5rem" }}>{line.match(/^\d+/)?.[0]}.</span>
            <span style={{ color: "#1A2E2A" }}>{line.replace(/^\d+\.\s/, "").replace(/\*\*/g, "")}</span>
          </div>
        );
      }
      if (line.match(/^[-•]\s/)) {
        return (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.3rem", paddingLeft: "0.5rem" }}>
            <span style={{ color: "#74C69D", fontWeight: 700 }}>•</span>
            <span style={{ color: "#1A2E2A" }}>{line.replace(/^[-•]\s/, "").replace(/\*\*/g, "")}</span>
          </div>
        );
      }
      return (
        <p key={i} style={{ color: "#1A2E2A", marginBottom: "0.3rem" }}>
          {line.replace(/\*\*/g, "")}
        </p>
      );
    });
  }

  return (
    <div style={{ background: "#FAFFFE", color: "#1A2E2A", minHeight: "100vh", fontFamily: "inherit" }}>
      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "#FAFFFE",
        borderBottom: "1px solid #C8E6D4",
        padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px"
      }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ color: "#2D6A4F", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
            Draft<span style={{ color: "#74C69D" }}>Kit</span>
          </span>
        </a>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="#how-it-works" style={{ color: "#1A2E2A", textDecoration: "none", fontWeight: 500, fontSize: "0.9rem" }}>How It Works</a>
          <a href="#pricing" style={{ color: "#1A2E2A", textDecoration: "none", fontWeight: 500, fontSize: "0.9rem" }}>Pricing</a>
          <a href="/signup" style={{
            background: "#2D6A4F", color: "#fff", padding: "0.5rem 1.2rem",
            borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem",
            border: "none", cursor: "pointer"
          }}>Try Free</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem 4rem",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center"
      }}>
        <div>
          <div style={{
            display: "inline-block",
            background: "#EEF7F2", color: "#2D6A4F",
            padding: "0.3rem 0.8rem", borderRadius: "4px",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
            border: "1px solid #C8E6D4", marginBottom: "1.5rem"
          }}>
            SOP GENERATOR FOR SERVICE BUSINESSES
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "#1A2E2A",
            lineHeight: 1.15,
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em"
          }}>
            Stop re-explaining the same job to every new hire.
          </h1>
          <p style={{
            color: "#4A7A6B", fontSize: "1.1rem", lineHeight: 1.7,
            marginBottom: "2rem", maxWidth: "480px"
          }}>
            Describe a process in plain English. DraftKit writes the professional SOP document — formatted, printable, ready to hand to your team.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#demo" style={{
              background: "#2D6A4F", color: "#fff",
              padding: "0.9rem 1.8rem", borderRadius: "8px",
              textDecoration: "none", fontWeight: 600, fontSize: "1rem",
              border: "2px solid #2D6A4F", display: "inline-block"
            }}>
              Generate Your First SOP Free →
            </a>
            <a href="#example" style={{
              background: "transparent", color: "#2D6A4F",
              padding: "0.9rem 1.8rem", borderRadius: "8px",
              textDecoration: "none", fontWeight: 600, fontSize: "1rem",
              border: "2px solid #C8E6D4", display: "inline-block"
            }}>
              See example output
            </a>
          </div>
        </div>

        {/* SOP DOCUMENT MOCKUP */}
        <div id="example" style={{
          background: "#fff",
          border: "1px solid #C8E6D4",
          borderRadius: "12px",
          padding: "2rem",
          position: "relative"
        }}>
          <div style={{
            position: "absolute", top: "-12px", left: "1.5rem",
            background: "#2D6A4F", color: "#fff",
            padding: "0.2rem 0.7rem", borderRadius: "4px",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em"
          }}>
            SOP DOCUMENT
          </div>
          <div style={{ borderBottom: "1px solid #C8E6D4", paddingBottom: "1rem", marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.65rem", color: "#74C69D", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.3rem" }}>STANDARD OPERATING PROCEDURE</div>
            <h3 style={{ color: "#1A2E2A", fontWeight: 700, fontSize: "1.05rem", margin: 0 }}>How to Shut Off Main Water Supply</h3>
            <div style={{ color: "#4A7A6B", fontSize: "0.75rem", marginTop: "0.3rem" }}>Version 1.0 • Plumbing Operations</div>
          </div>
          <div style={{ marginBottom: "0.8rem" }}>
            <div style={{ color: "#2D6A4F", fontWeight: 700, fontSize: "0.75rem", marginBottom: "0.4rem" }}>PURPOSE</div>
            <p style={{ color: "#4A7A6B", fontSize: "0.82rem", lineHeight: 1.6, margin: 0 }}>
              Safely shut off the main water supply to a residential property to perform plumbing repairs or respond to emergencies.
            </p>
          </div>
          <div style={{ marginBottom: "0.8rem" }}>
            <div style={{ color: "#2D6A4F", fontWeight: 700, fontSize: "0.75rem", marginBottom: "0.4rem" }}>PROCEDURE</div>
            {[
              "Locate the main shut-off valve (typically near meter or where supply enters)",
              "Notify occupants that water will be off",
              "Turn valve clockwise until fully closed (gate) or 90° perpendicular (ball)",
              "Open a faucet to confirm pressure has dropped",
              "Verify no water flow at multiple fixtures"
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem", alignItems: "flex-start" }}>
                <span style={{
                  background: "#EEF7F2", color: "#2D6A4F",
                  width: "1.4rem", height: "1.4rem", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", fontWeight: 700, flexShrink: 0, marginTop: "0.05rem"
                }}>{i + 1}</span>
                <span style={{ color: "#1A2E2A", fontSize: "0.8rem", lineHeight: 1.5 }}>{step}</span>
              </div>
            ))}
          </div>
          <div style={{
            background: "#EEF7F2", border: "1px solid #C8E6D4",
            borderRadius: "6px", padding: "0.7rem",
          }}>
            <div style={{ color: "#2D6A4F", fontWeight: 700, fontSize: "0.7rem", marginBottom: "0.3rem" }}>⚠️ SAFETY NOTE</div>
            <p style={{ color: "#4A7A6B", fontSize: "0.75rem", margin: 0 }}>Never force a valve. If resistance is felt, call for valve replacement before proceeding.</p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section style={{
        background: "#EEF7F2",
        border: "1px solid #C8E6D4",
        borderLeft: "none", borderRight: "none",
        padding: "1.5rem 2rem"
      }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "flex", justifyContent: "space-around", alignItems: "center",
          flexWrap: "wrap", gap: "1.5rem"
        }}>
          {[
            { stat: "847", label: "SOPs Generated" },
            { stat: "12 min", label: "Average Time Saved" },
            { stat: "4.9/5", label: "Rating from Service Owners" },
          ].map(({ stat, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ color: "#2D6A4F", fontWeight: 700, fontSize: "1.6rem", lineHeight: 1 }}>{stat}</div>
              <div style={{ color: "#4A7A6B", fontSize: "0.82rem", marginTop: "0.3rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{
            display: "inline-block",
            background: "#EEF7F2", color: "#2D6A4F",
            padding: "0.3rem 0.8rem", borderRadius: "4px",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
            border: "1px solid #C8E6D4", marginBottom: "1rem"
          }}>HOW IT WORKS</div>
          <h2 style={{ color: "#1A2E2A", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
            From your head to a formatted document in minutes
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          {[
            {
              num: "01",
              title: "Describe the job",
              desc: "Type what you do, in plain English. \"When I finish a boiler service I check the pressure, bleed the radiators, and test the thermostat...\"",
              icon: "✍️"
            },
            {
              num: "02",
              title: "AI writes the SOP",
              desc: "DraftKit formats it into a professional, numbered procedure with safety notes, required tools, and quality checklists.",
              icon: "🤖"
            },
            {
              num: "03",
              title: "Download and share",
              desc: "Export as PDF or copy to paste into your team app. Ready to print and hand to your next hire on day one.",
              icon: "📤"
            }
          ].map(({ num, title, desc, icon }) => (
            <div key={num} style={{
              background: "#fff",
              border: "1px solid #C8E6D4",
              borderRadius: "12px",
              padding: "2rem",
              position: "relative"
            }}>
              <div style={{
                position: "absolute", top: "1.5rem", right: "1.5rem",
                color: "#C8E6D4", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1
              }}>{num}</div>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{icon}</div>
              <h3 style={{ color: "#1A2E2A", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.6rem" }}>{title}</h3>
              <p style={{ color: "#4A7A6B", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE DEMO SECTION */}
      <section id="demo" style={{
        background: "#EEF7F2",
        border: "1px solid #C8E6D4",
        borderLeft: "none", borderRight: "none",
        padding: "5rem 2rem"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{
              display: "inline-block",
              background: "#fff", color: "#2D6A4F",
              padding: "0.3rem 0.8rem", borderRadius: "4px",
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
              border: "1px solid #C8E6D4", marginBottom: "1rem"
            }}>LIVE DEMO</div>
            <h2 style={{ color: "#1A2E2A", fontWeight: 700, fontSize: "2rem", marginBottom: "0.5rem" }}>
              Try it right now — free
            </h2>
            <p style={{ color: "#4A7A6B", fontSize: "1rem", margin: 0 }}>
              Describe any job process and get a professional SOP in seconds.
            </p>
          </div>

          <form onSubmit={handleGenerate} style={{
            background: "#fff",
            border: "1px solid #C8E6D4",
            borderRadius: "12px",
            padding: "2rem"
          }}>
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", color: "#1A2E2A", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                Describe the job process
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. 'How to prepare a room for painting — move furniture, cover floors, tape edges, prime walls...'"
                rows={4}
                style={{
                  width: "100%",
                  border: "1px solid #C8E6D4",
                  borderRadius: "8px",
                  padding: "0.8rem",
                  fontSize: "0.9rem",
                  color: "#1A2E2A",
                  background: "#FAFFFE",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", color: "#1A2E2A", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                Business type
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                style={{
                  width: "100%",
                  border: "1px solid #C8E6D4",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  fontSize: "0.9rem",
                  color: "#1A2E2A",
                  background: "#FAFFFE",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box"
                }}
              >
                {["Plumber", "HVAC", "Cleaner", "Landscaper", "Painter", "Electrician", "Salon", "Other"].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            {error && (
              <div style={{
                background: "#FFF3F3", border: "1px solid #FFCDD2",
                borderRadius: "8px", padding: "0.8rem", marginBottom: "1rem",
                color: "#C0392B", fontSize: "0.85rem"
              }}>{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "#74C69D" : "#2D6A4F",
                color: "#fff",
                padding: "0.9rem 2rem",
                borderRadius: "8px",
                border: "none",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: loading ? "not-allowed" : "pointer",
                width: "100%",
                fontFamily: "inherit"
              }}
            >
              {loading ? "Generating SOP..." : "Generate SOP →"}
            </button>
            <p style={{ textAlign: "center", color: "#74C69D", fontSize: "0.8rem", marginTop: "0.8rem", marginBottom: 0 }}>
              Try 3 free, then $9/export or $29/mo unlimited
            </p>
          </form>

          {sopOutput && (
            <div style={{
              background: "#fff",
              border: "1px solid #C8E6D4",
              borderRadius: "12px",
              padding: "2rem",
              marginTop: "1.5rem"
            }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                borderBottom: "1px solid #C8E6D4", paddingBottom: "1rem", marginBottom: "1.5rem"
              }}>
                <div>
                  <div style={{ fontSize: "0.65rem", color: "#74C69D", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.2rem" }}>GENERATED SOP DOCUMENT</div>
                  <div style={{ color: "#1A2E2A", fontWeight: 700, fontSize: "1rem" }}>Your Standard Operating Procedure</div>
                </div>
                <a href="/signup" style={{
                  background: "#2D6A4F", color: "#fff",
                  padding: "0.5rem 1.2rem", borderRadius: "8px",
                  textDecoration: "none", fontWeight: 600, fontSize: "0.85rem"
                }}>Export PDF →</a>
              </div>
              <div style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
                {formatSOP(sopOutput)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ maxWidth: "900px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            display: "inline-block",
            background: "#EEF7F2", color: "#2D6A4F",
            padding: "0.3rem 0.8rem", borderRadius: "4px",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
            border: "1px solid #C8E6D4", marginBottom: "1rem"
          }}>PRICING</div>
          <h2 style={{ color: "#1A2E2A", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
            Simple, honest pricing
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {/* Single */}
          <div style={{
            background: "#fff",
            border: "1px solid #C8E6D4",
            borderRadius: "12px",
            padding: "2.5rem"
          }}>
            <div style={{ color: "#4A7A6B", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>Pay Per Export</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.5rem" }}>
              <span style={{ color: "#1A2E2A", fontWeight: 800, fontSize: "3rem", lineHeight: 1 }}>$9</span>
              <span style={{ color: "#4A7A6B", fontSize: "0.9rem" }}>per SOP document</span>
            </div>
            <div style={{ color: "#74C69D", fontSize: "0.8rem", marginBottom: "2rem" }}>One-time payment, no subscription</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0" }}>
              {["1 SOP export", "PDF download", "Edit and re-export", "No subscription required"].map(f => (
                <li key={f} style={{ display: "flex", gap: "0.5rem", color: "#1A2E2A", fontSize: "0.9rem", marginBottom: "0.7rem" }}>
                  <span style={{ color: "#2D6A4F", fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="/signup?plan=single" style={{
              display: "block", textAlign: "center",
              background: "#EEF7F2", color: "#2D6A4F",
              padding: "0.9rem", borderRadius: "8px",
              textDecoration: "none", fontWeight: 600, fontSize: "0.95rem",
              border: "2px solid #C8E6D4"
            }}>Export for $9</a>
          </div>

          {/* Monthly */}
          <div style={{
            background: "#fff",
            border: "2px solid #2D6A4F",
            borderRadius: "12px",
            padding: "2.5rem",
            position: "relative"
          }}>
            <div style={{
              position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
              background: "#2D6A4F", color: "#fff",
              padding: "0.25rem 1rem", borderRadius: "20px",
              fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", whiteSpace: "nowrap"
            }}>MOST POPULAR</div>
            <div style={{ color: "#4A7A6B", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>Unlimited</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.5rem" }}>
              <span style={{ color: "#1A2E2A", fontWeight: 800, fontSize: "3rem", lineHeight: 1 }}>$29</span>
              <span style={{ color: "#4A7A6B", fontSize: "0.9rem" }}>/month</span>
            </div>
            <div style={{ color: "#74C69D", fontSize: "0.8rem", marginBottom: "2rem" }}>14-day free trial, cancel anytime</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0" }}>
              {["Unlimited SOPs", "Team sharing link", "Version history", "Priority support", "Cancel anytime"].map(f => (
                <li key={f} style={{ display: "flex", gap: "0.5rem", color: "#1A2E2A", fontSize: "0.9rem", marginBottom: "0.7rem" }}>
                  <span style={{ color: "#2D6A4F", fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="/signup?plan=monthly" style={{
              display: "block", textAlign: "center",
              background: "#2D6A4F", color: "#fff",
              padding: "0.9rem", borderRadius: "8px",
              textDecoration: "none", fontWeight: 600, fontSize: "0.95rem",
              border: "2px solid #2D6A4F"
            }}>Start Free Trial</a>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section style={{
        background: "#EEF7F2",
        border: "1px solid #C8E6D4",
        borderLeft: "none", borderRight: "none",
        padding: "5rem 2rem"
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "inline-block",
              background: "#fff", color: "#2D6A4F",
              padding: "0.3rem 0.8rem", borderRadius: "4px",
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
              border: "1px solid #C8E6D4", marginBottom: "1rem"
            }}>USE CASES</div>
            <h2 style={{ color: "#1A2E2A", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
              Built for every service trade
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
            {[
              {
                icon: "🔧", industry: "Plumber",
                title: "Annual Boiler Service Checklist",
                preview: "1. Isolate gas supply and allow unit to cool completely before inspection..."
              },
              {
                icon: "❄️", industry: "HVAC",
                title: "AC Unit Pre-Season Startup",
                preview: "1. Inspect outdoor condenser coils for debris and damage before powering on..."
              },
              {
                icon: "🧹", industry: "Cleaning Service",
                title: "End-of-Tenancy Deep Clean",
                preview: "1. Start with kitchen — degrease oven, clean hob, wipe all surfaces top to bottom..."
              },
              {
                icon: "✂️", industry: "Salon",
                title: "Colour Treatment Consultation",
                preview: "1. Conduct allergy patch test 48 hours prior to appointment, document result..."
              }
            ].map(({ icon, industry, title, preview }) => (
              <div key={industry} style={{
                background: "#fff",
                border: "1px solid #C8E6D4",
                borderRadius: "12px",
                padding: "1.5rem"
              }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>{icon}</div>
                <div style={{ color: "#74C69D", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.5rem" }}>{industry.toUpperCase()}</div>
                <h3 style={{ color: "#1A2E2A", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.8rem", lineHeight: 1.4 }}>{title}</h3>
                <p style={{ color: "#4A7A6B", fontSize: "0.78rem", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{preview}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        background: "#2D6A4F",
        padding: "5rem 2rem",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "2.2rem", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
          Your team does great work.<br />Now it's written down.
        </h2>
        <p style={{ color: "#74C69D", fontSize: "1.1rem", marginBottom: "2.5rem" }}>
          Stop relying on tribal knowledge. Turn your expertise into professional SOPs today.
        </p>
        <a href="/signup" style={{
          background: "#fff", color: "#2D6A4F",
          padding: "1rem 2.5rem", borderRadius: "8px",
          textDecoration: "none", fontWeight: 700, fontSize: "1.05rem",
          display: "inline-block"
        }}>
          Generate First SOP Free →
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1A2E2A", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem", marginBottom: "2rem" }}>
            <div>
              <div style={{ color: "#74C69D", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                Draft<span style={{ color: "#fff" }}>Kit</span>
              </div>
              <p style={{ color: "#4A7A6B", fontSize: "0.85rem", margin: 0, maxWidth: "260px", lineHeight: 1.6 }}>
                AI-powered SOP generation for service businesses. Stop re-explaining. Start scaling.
              </p>
            </div>
            <div style={{ display: "flex", gap: "4rem" }}>
              <div>
                <div style={{ color: "#74C69D", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>PRODUCT</div>
                {["How It Works", "Pricing", "Examples"].map(l => (
                  <div key={l} style={{ marginBottom: "0.5rem" }}>
                    <a href="#" style={{ color: "#4A7A6B", textDecoration: "none", fontSize: "0.85rem" }}>{l}</a>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: "#74C69D", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", marginBottom: "1rem" }}>COMPANY</div>
                {["Privacy Policy", "Terms of Service"].map(l => (
                  <div key={l} style={{ marginBottom: "0.5rem" }}>
                    <a href="#" style={{ color: "#4A7A6B", textDecoration: "none", fontSize: "0.85rem" }}>{l}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #2D6A4F", paddingTop: "1.5rem" }}>
            <p style={{ color: "#4A7A6B", fontSize: "0.8rem", margin: 0 }}>
              © 2024 DraftKit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
