(function() {
  const style = document.createElement("style");
  style.textContent = `
  .dg-badge-wrap{position:fixed;right:16px;bottom:16px;z-index:9999;font-family:monospace}
  .dg-badge{
    display:inline-flex;align-items:center;gap:6px;
    padding:10px 16px;
    font-size:14px;font-weight:500;
    border-radius:8px;
    background:rgba(255,255,255,0.15);
    backdrop-filter:blur(14px) saturate(180%);
    -webkit-backdrop-filter:blur(14px) saturate(180%);
    border:1px solid rgba(255,255,255,0.25);
    color:#000;
    text-decoration:none;
    box-shadow:0 6px 20px rgba(0,0,0,0.15);
    white-space:nowrap;
  }
  .dg-code{font-family:monospace; color:#000;}
  .dg-cursor{
    display:inline-block;
    width:8px;
    background:#000;
    margin-left:2px;
    animation:dg-blink 1s step-start infinite;
  }
  @keyframes dg-blink{50%{opacity:0}}
  .dg-dot{
    width:6px;height:6px;border-radius:50%;
    background:#4ade80;box-shadow:0 0 8px rgba(74,222,128,.8)
  }
  .dg-orbit{position:absolute;left:0;top:0;pointer-events:none;opacity:0;transition:opacity 1s ease}
  .dg-orbit.show{opacity:1}
  .dg-icon{
    position:absolute;width:18px;height:18px;
    display:flex;align-items:center;justify-content:center;
    opacity:.95;will-change:transform,opacity;
    animation:dg-float var(--dur,3s) ease-in-out var(--delay,0s) infinite alternate;
  }
  .dg-icon img{width:100%;height:100%;object-fit:contain}
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
  badge.innerHTML='<span class="dg-dot"></span><span class="dg-code"></span><span class="dg-cursor"></span>';

  const orbit=document.createElement("div");
  orbit.className="dg-orbit";

  // Real logos (SVGs)
  const icons=[
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  ];

  icons.forEach((src,i)=>{
    const el=document.createElement("span");
    el.className="dg-icon";
    el.innerHTML=`<img src="${src}" alt="dev logo">`;
    const angle=(i/icons.length)*2*Math.PI;
    const radius=50+Math.random()*20;
    const jitter=()=>Math.random()*14-7;
    const ox=Math.cos(angle)*radius+jitter();
    const oy=Math.sin(angle)*radius+jitter();
    el.style.setProperty("--ox",ox+"px");
    el.style.setProperty("--oy",oy+"px");
    el.style.setProperty("--ix",(ox*0.2)+"px");
    el.style.setProperty("--iy",(oy*0.2)+"px");
    el.style.setProperty("--dur",(2.5+Math.random()*1.5)+"s");
    el.style.setProperty("--delay",(Math.random()*-2)+"s");
    orbit.appendChild(el);
  });

  // Typing animation
  const text="Daniel Gurczynski";
  const codeEl=badge.querySelector(".dg-code");
  const cursorEl=badge.querySelector(".dg-cursor");
  let i=0;
  function typeNext(){
    if(i<text.length){
      codeEl.textContent+=text[i++];
      setTimeout(typeNext,120);
    }else{
      cursorEl.style.display="none";
      orbit.classList.add("show");
    }
  }
  setTimeout(typeNext,600);

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
