(function() {
  const badge = document.createElement("a");
  badge.href = "https://danielgurczynski.com";
  badge.target = "_blank";
  badge.rel = "noopener noreferrer";
  badge.textContent = "Daniel Gurczynski";

  Object.assign(badge.style, {
    position: "fixed",
    right: "16px",
    bottom: "16px",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    background: "rgba(17,17,17,0.9)",
    color: "#fff",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: "600",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
    zIndex: "9999",
    fontFamily: "Arial, sans-serif"
  });

  const dot = document.createElement("span");
  Object.assign(dot.style, {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#4ade80",
    boxShadow: "0 0 12px rgba(74,222,128,0.9)"
  });

  badge.prepend(dot);

  badge.addEventListener("mouseenter", () => {
    badge.style.transform = "translateY(-2px)";
    badge.style.boxShadow = "0 12px 28px rgba(0,0,0,0.24)";
    badge.style.background = "rgba(17,17,17,1)";
  });
  badge.addEventListener("mouseleave", () => {
    badge.style.transform = "translateY(0)";
    badge.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
    badge.style.background = "rgba(17,17,17,0.9)";
  });

  document.body.appendChild(badge);
})();
