const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const replayBtn = document.getElementById("replayBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function releaseStars(x, y, count=18, parent=document.body) {
  for (let i=0;i<count;i++){
    const s=document.createElement("span");
    s.className="star";
    s.style.left=x+"px"; s.style.top=y+"px";
    const angle=Math.random()*Math.PI*2, dist=50+Math.random()*180;
    s.style.setProperty("--dx", Math.cos(angle)*dist+"px");
    s.style.setProperty("--dy", Math.sin(angle)*dist+"px");
    parent.appendChild(s);
    setTimeout(()=>s.remove(),1600);
  }
}

function startIntro(){
  intro.classList.add("hide");
  document.body.classList.remove("lock");
  releaseStars(innerWidth/2, innerHeight/2, 35);
}
enterBtn.addEventListener("click", startIntro);
replayBtn.addEventListener("click", ()=>{ window.scrollTo({top:0,behavior:"smooth"}); setTimeout(()=>{intro.classList.remove("hide"); document.body.classList.add("lock")},700); });

menuBtn.addEventListener("click",()=>navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const countEl=document.querySelector("[data-count]");
let counted=false;
const countObs=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting && !counted){
    counted=true; let n=0;
    const t=setInterval(()=>{n++;countEl.textContent=n;if(n>=50)clearInterval(t)},35);
  }
},{threshold:.5});
countObs.observe(countEl);

let opened=new Set();
document.querySelectorAll(".wish-card").forEach(card=>{
  card.addEventListener("click",e=>{
    if(e.target.classList.contains("close-card")) return;
    document.querySelectorAll(".wish-card.open").forEach(c=>{if(c!==card)c.classList.remove("open")});
    card.classList.toggle("open");
    if(card.classList.contains("open")){
      opened.add(card.dataset.card);
      const r=card.getBoundingClientRect();
      releaseStars(r.left+r.width/2,r.top+r.height/2,14);
      if(opened.size===3)document.getElementById("allOpened").classList.add("show");
    }
  });
});
document.querySelectorAll(".close-card").forEach(btn=>btn.addEventListener("click",e=>{e.stopPropagation();btn.closest(".wish-card").classList.remove("open")}));

const canvas=document.getElementById("fiftyCanvas");
const message=document.getElementById("fiftyMessage");
let taps=0;
canvas.addEventListener("click",e=>{
  const r=canvas.getBoundingClientRect();
  releaseStars(e.clientX,e.clientY,10,document.body);
  taps++;
  if(taps>=8){
    message.textContent="50 YEARS OF BEING AMAZING";
    message.style.fontSize=".85rem";
    message.style.fontWeight="700";
  }
});
document.getElementById("resetFifty").addEventListener("click",()=>{
  taps=0; message.textContent="Click to celebrate"; message.style.fontSize=""; message.style.fontWeight="";
});

const lightbox=document.getElementById("lightbox"), lightImg=document.getElementById("lightboxImg"), caption=document.getElementById("lightboxCaption");
document.querySelectorAll(".gallery-card").forEach(card=>card.addEventListener("click",()=>{
  lightImg.src=card.querySelector("img").src; caption.textContent=card.querySelector("figcaption").textContent; lightbox.classList.add("show");
}));
document.getElementById("lightboxClose").addEventListener("click",()=>lightbox.classList.remove("show"));
lightbox.addEventListener("click",e=>{if(e.target===lightbox)lightbox.classList.remove("show")});

window.addEventListener("load",()=>document.body.classList.add("lock"));
