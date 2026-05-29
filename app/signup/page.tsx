"use client";

import { useState, useEffect } from "react";

export default function SignupPage() {
  const [plan, setPlan] = useState<"single" | "monthly">("monthly");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("Plumber");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const p = params.get("plan");
      if (p === "single") setPlan("single");
      else setPlan("monthly");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !businessName) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, businessName, businessType, plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Could not start checkout. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      background: "#FAFFFE",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "inherit"
    }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <span style={{ color: "#2D6A4F", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
              Draft<span style={{ color: "#74C69D" }}>Kit</span>
            </span>
          </a>
          <h1 style={{ color: "#1A2E2A", fontWeight: 700, fontSize: "1.5rem", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
            Get started with DraftKit
          </h1>
          <p style={{ color: "#4A7A6B", fontSize: "0.9rem", margin: 0 }}>
            Professional SOP documents for your service business.
          </p>
        </div>

        {/* Plan Tabs */}
        <div style={{
          display: "flex",
          border: "1px solid #C8E6D4",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "2rem"
        }}>
          <button
            onClick={() => setPlan("single")}
            style={{
              flex: 1,
              padding: "0.8rem",
              border: "none",
              background: plan === "single" ? "#2D6A4F" : "#EEF7F2",
              color: plan === "single" ? "#fff" : "#4A7A6B",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            Single Export ($9)
          </button>
          <button
            onClick={() => setPlan("monthly")}
            style={{
              flex: 1,
              padding: "0.8rem",
              border: "none",
              borderLeft: "1px solid #C8E6D4",
              background: plan === "monthly" ? "#2D6A4F" : "#EEF7F2",
              color: plan === "monthly" ? "#fff" : "#4A7A6B",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            Monthly Unlimited ($29/mo)
          </button>
        </div>

        {plan === "monthly" && (
          <div style={{
            background: "#EEF7F2", border: "1px solid #C8E6D4",
            borderRadius: "8px", padding: "0.8rem 1rem", marginBottom: "1.5rem",
            display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <span style={{ color: "#2D6A4F", fontWeight: 700 }}>✓</span>
            <span style={{ color: "#4A7A6B", fontSize: "0.85rem" }}>14-day free trial included. No charge until day 15.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{
          background: "#fff",
          border: "1px solid #C8E6D4",
          borderRadius: "12px",
          padding: "2rem"
        }}>
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", color: "#1A2E2A", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
              Business Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Smith's Plumbing"
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
            />
          </div>
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", color: "#1A2E2A", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourbusiness.com"
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
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", color: "#1A2E2A", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
              Business Type
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
            {loading ? "Redirecting to checkout..." : plan === "single" ? "Continue to Payment ($9) →" : "Start Free Trial →"}
          </button>
          <p style={{ textAlign: "center", color: "#74C69D", fontSize: "0.78rem", marginTop: "0.8rem", marginBottom: 0 }}>
            Secured by Stripe. Cancel anytime.
          </p>
        </form>
        <p style={{ textAlign: "center", color: "#4A7A6B", fontSize: "0.8rem", marginTop: "1.5rem" }}>
          <a href="/" style={{ color: "#2D6A4F", textDecoration: "none" }}>← Back to DraftKit</a>
        </p>
      </div>
    </div>
  );
}
