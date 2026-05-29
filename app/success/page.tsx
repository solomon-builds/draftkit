"use client";

export default function SuccessPage() {
  return (
    <div style={{
      background: "#EEF7F2",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "inherit"
    }}>
      <div style={{ textAlign: "center", maxWidth: "480px" }}>
        <div style={{
          width: "80px", height: "80px",
          background: "#2D6A4F",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 2rem",
          fontSize: "2.5rem"
        }}>
          ✓
        </div>
        <a href="/" style={{ textDecoration: "none" }}>
          <div style={{ color: "#2D6A4F", fontWeight: 700, fontSize: "1.5rem", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
            Draft<span style={{ color: "#74C69D" }}>Kit</span>
          </div>
        </a>
        <h1 style={{ color: "#1A2E2A", fontWeight: 700, fontSize: "2rem", marginBottom: "1rem" }}>
          Your SOP is ready.
        </h1>
        <p style={{ color: "#4A7A6B", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          Welcome to DraftKit! Your account is set up and you&apos;re ready to start generating professional SOP documents for your business.
        </p>
        <div style={{
          background: "#fff",
          border: "1px solid #C8E6D4",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem",
          textAlign: "left"
        }}>
          <h3 style={{ color: "#1A2E2A", fontWeight: 700, fontSize: "1rem", marginBottom: "1rem" }}>What happens next:</h3>
          {[
            "Check your email for a confirmation and login link",
            "Log in to your DraftKit dashboard",
            "Start generating your first SOP document",
            "Download and share with your team"
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "0.8rem", marginBottom: "0.8rem", alignItems: "flex-start" }}>
              <span style={{
                background: "#EEF7F2", color: "#2D6A4F",
                width: "1.5rem", height: "1.5rem",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", fontWeight: 700, flexShrink: 0
              }}>{i + 1}</span>
              <span style={{ color: "#4A7A6B", fontSize: "0.9rem", paddingTop: "0.15rem" }}>{step}</span>
            </div>
          ))}
        </div>
        <a href="/" style={{
          display: "inline-block",
          background: "#2D6A4F", color: "#fff",
          padding: "0.9rem 2rem", borderRadius: "8px",
          textDecoration: "none", fontWeight: 600, fontSize: "1rem"
        }}>
          Go to DraftKit →
        </a>
        <p style={{ color: "#74C69D", fontSize: "0.8rem", marginTop: "1rem" }}>
          Questions? Email us at hello@draftkit.io
        </p>
      </div>
    </div>
  );
}
