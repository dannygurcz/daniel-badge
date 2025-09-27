<!-- Place this anywhere near the end of <body> -->
<script>
(function() {
  // ====== Styles (injected once) ======
  const style = document.createElement("style");
  style.textContent = `
  .dg-badge-wrap{position:fixed;right:16px;bottom:16px;z-index:9999;font-family:Arial,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Ubuntu,Cantarell,'Noto Sans',sans-serif}
  .dg-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 10px;background:rgba(17,17,17,.9);color:#fff;border-radius:999px;text-decoration:none;font-weight:600;
            box-shadow:0 8px 24px rgba(0,0,0,.2);transition:transform .2s,box-shadow .2s,background .2s;font-size:12px;line-height:1}
  .dg-badge:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(0,0,0,.24);background:rgba(17,17,17,1)}
  .dg-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 10px rgba(74,222,128,.9)}
  .dg-orbit{position:absolute;left:0;top:0;inset:auto;pointer-events:none}
  .dg-icon{position:absolute;left:0;top:0;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;
           box-shadow:0 2px 8px rgba(0,0,0,.25);opacity:.95;will-change:transform,opacity;animation:dg-float var(--dur,3s) ease-in-out var(--delay,0s) infinite alternate}
  @keyframes dg-float{
    from{transform:translate(var(--ix,0px),var(--iy,0px)) scale(1)}
    to{transform:translate(var(--ox,0px),var(--oy,0px)) scale(1.05)}
  }
  @media (prefers-reduced-motion:reduce){
    .dg-icon{animation-duration:.01ms;animation-iteration-count:1}
    .dg-badge{transition:none}
  }
  `;
  document.head.appendChild(style);

  // ====== Wrapper & Badge ======
  const wrap = document.createElement("div");
  wrap.className = "dg-badge-wrap";

  const badge = document.createElement("a");
  badge.className = "dg-badge";
  badge.href = "https://danielgurczynski.com";
  badge.target = "_blank";
  badge.rel = "noopener noreferrer";
  badge.ariaLabel = "Visit Daniel Gurczynski website";

  const dot = document.createElement("span");
  dot.className = "dg-dot";
  badge.appendChild(dot);
  badge.appendChild(document.createTextNode("Daniel Gurczynski"));

  // ====== Floating Dev Icons ======
  const orbit = document.createElement("div");
  orbit.className = "dg-orbit";

  // Icons (label, bg, textColor)
  const icons = [
    ["HTML","%23e34f26","#fff"],
    ["CSS","%231572b6","#fff"],
    ["JS","#f7df1e","#111"],
    ["TS","%233178c6","#fff"],
    ["React","#61dafb","#111"],
    ["Vue","%2342b883","#111"],
    ["Node","%233c873a","#fff"],
    ["Git","%23f05032","#fff"],
  ];

  // Helper to create an icon bubble
  function makeIcon([label,bg,fg], i){
    const el = document.createElement("span");
    el.className = "dg-icon";
    el.textContent = label.length > 2 ? label[0] : label; // tiny text (H,C,JS,TS,R,V,N,G)
    // Colors
    el.style.background = decodeURIComponent(bg);
    el.style.color = fg;

    // Randomized motion around the badge
    const angle = (i / icons.length) * 2 * Math.PI; // base ring
    const radius = 44 + Math.random()*28;           // 44–72px
    const jitter = () => (Math.random()*20 - 10);   // -10..10

    const ox = Math.cos(angle) * radius + jitter();
    const oy = Math.sin(angle) * radius + jitter();
    el.style.setProperty("--ox", ox.toFixed(1) + "px");
    el.style.setProperty("--oy", oy.toFixed(1) + "px");
    el.style.setProperty("--ix", (ox*0.2).toFixed(1) + "px");
    el.style.setProperty("--iy", (oy*0.2).toFixed(1) + "px");
    el.style.setProperty("--dur", (2.6 + Math.random()*1.6).toFixed(2) + "s");
    el.style.setProperty("--delay", (Math.random()*-2).toFixed(2) + "s");

    // Place relative to badge using CSS transform origin via translate from badge top-left
    // We position the orbit container to badge's position later.
    orbit.appendChild(el);
  }

  icons.forEach(makeIcon);

  // Position orbit relative to badge by tracking badge box
  function syncOrbit(){
    const r = badge.getBoundingClientRect();
    orbit.style.width = r.width + "px";
    orbit.style.height = r.height + "px";
    orbit.style.transform = `translate(${r.left + window.scrollX}px, ${r.top + window.scrollY}px)`;
  }
  // Keep in sync on scroll/resize
  ["scroll","resize"].forEach(evt => window.addEventListener(evt, syncOrbit, {passive:true}));

  // Initial mount
  wrap.appendChild(badge);
  document.body.appendChild(wrap);
  document.body.appendChild(orbit);
  // next frame to ensure layout is ready
  requestAnimationFrame(syncOrbit);
})();
</script>
