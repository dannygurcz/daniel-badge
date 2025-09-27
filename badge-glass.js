(function() {
  const style = document.createElement("style");
  style.textContent = `
  .dg-badge-wrap{position:fixed;right:16px;bottom:16px;z-index:9999;font-family:Arial,sans-serif}
  .dg-badge{
    display:inline-flex;align-items:center;gap:8px;
    padding:8px 12px;
    font-size:12px;font-weight:600;
    border-radius:999px;
    background:rgba(255,255,255,0.15);
    backdrop-filter:blur(12px) saturate(160%);
    -webkit-backdrop-filter:blur(12px) saturate(160%);
    border:1px solid rgba(255,255,255,0.3);
    color:#fff;
    text-decoration:none;
    box-shadow:0 8px 24px rgba(0,0,0,0.2);
    transition:transform .25s ease,box-shadow .25s ease,background .25s ease;
  }
  .dg-badge:hover{
    transform:translateY(-2px);
    box-shadow:0 12px 28px rgba(0,0,0,0.3);
    background:rgba(255,255,255,0.25);
  }
  .dg-dot{
    width:6px;height:6px;border-radius:50%;
    background:#4ade80;box-shadow:0 0 10px rgba(74,222,128,.9)
  }
  .dg-orbit{position:absolute;left:0;top:0;pointer-events:none}
  .dg-icon{
    position:absolute;width:18px;height:18px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:10px;font-weight:700;color:#fff;
    box-shadow:0 2px 8px rgba(0,0,0,.25);opacity:.95;
    animation:dg-float var(--dur,3s) ease-in-out var(--delay,0s) infinite alternate;
  }
  @keyframes dg-float{
    from{transform:translate(var(--ix,0px),var(--iy,0px)) scale(1)}
    to{transform:translate(var(--ox,0px),var(--oy,0px)) scale(1.05)}
  }
  `;
  document.head.appendChild(style);

  const wrap=document.createElement("div");
  wrap.className="dg-badge-wrap";

  const badge=document.createElement("a");
  badge.className="dg-badge";
  badge.href="https://danielgurczynski.com";
  badge.target="_blank";
  badge.rel="noopener noreferrer";
  badge.innerHTML='<span class="dg-dot"></span>Daniel Gurczynski';

  const orbit=document.createElement("div");
  orbit.className="dg-orbit";

  const icons=[
    ["H","#e34f26","#fff"],["C","#1572b6","#fff"],["JS","#f7df1e","#111"],
    ["TS","#3178c6","#fff"],["R","#61dafb","#111"],["V","#42b883","#111"],
    ["N","#3c873a","#fff"],["G","#f05032","#fff"]
  ];

  icons.forEach(([txt,bg,fg],i)=>{
    const el=document.createElement("span");
    el.className="dg-icon";el.textContent=txt;
    el.style.background=bg;el.style.color=fg;
    const angle=(i/icons.length)*2*Math.PI;
    const radius=44+Math.random()*28;
    const jitter=()=>Math.random()*20-10;
    const ox=Math.cos(angle)*radius+jitter();
    const oy=Math.sin(angle)*radius+jitter();
    el.style.setProperty("--ox",ox+"px");
    el.style.setProperty("--oy",oy+"px");
    el.style.setProperty("--ix",(ox*0.2)+"px");
    el.style.setProperty("--iy",(oy*0.2)+"px");
    el.style.setProperty("--dur",(2.6+Math.random()*1.6)+"s");
    el.style.setProperty("--delay",(Math.random()*-2)+"s");
    orbit.appendChild(el);
  });

  function syncOrbit(){
    const r=badge.getBoundingClientRect();
    orbit.style.width=r.width+"px";
    orbit.style.height=r.height+"px";
    orbit.style.transform=`translate(${r.left+window.scrollX}px,${r.top+window.scrollY}px)`;
  }
  window.addEventListener("scroll",syncOrbit,{passive:true});
  window.addEventListener("resize",syncOrbit);

  wrap.appendChild(badge);
  document.body.appendChild(wrap);
  document.body.appendChild(orbit);
  requestAnimationFrame(syncOrbit);
})();
