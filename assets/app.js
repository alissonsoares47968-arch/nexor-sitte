// ===== Toast =====
function showToast(msg){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(window.__toast);
  window.__toast = setTimeout(()=> t.style.display='none', 1700);
}

// ===== Copy helper =====
async function copyText(elId, okMsg){
  const el = document.getElementById(elId);
  if(!el) return;
  try{
    await navigator.clipboard.writeText(el.value);
    showToast(okMsg || 'Copiado ✅');
  }catch{
    el.select?.();
    document.execCommand('copy');
    showToast(okMsg || 'Copiado ✅');
  }
}

// ===== Scroll reveal =====
function initReveal(){
  const items = Array.from(document.querySelectorAll('.reveal'));
  if(!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if(en.isIntersecting){
        en.target.classList.add('show');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => io.observe(el));
}

// ===== Countdown =====
function initCountdown(){
  const el = document.getElementById('countdown');
  if(!el) return;

  const endsAt = el.getAttribute('data-ends-at') || "2026-02-10T23:59:59-03:00";
  const end = new Date(endsAt).getTime();

  function pad(n){ return String(n).padStart(2,'0'); }

  function tick(){
    const now = Date.now();
    let diff = Math.max(0, end - now);

    const d = Math.floor(diff / (1000*60*60*24));
    diff -= d * (1000*60*60*24);
    const h = Math.floor(diff / (1000*60*60));
    diff -= h * (1000*60*60);
    const m = Math.floor(diff / (1000*60));
    diff -= m * (1000*60);
    const s = Math.floor(diff / 1000);

    const D = document.getElementById('cd_d');
    const H = document.getElementById('cd_h');
    const M = document.getElementById('cd_m');
    const S = document.getElementById('cd_s');

    if(D) D.textContent = pad(d);
    if(H) H.textContent = pad(h);
    if(M) M.textContent = pad(m);
    if(S) S.textContent = pad(s);

    if(end - now <= 0){
      clearInterval(window.__cd);
    }
  }

  tick();
  window.__cd = setInterval(tick, 1000);
}

// ===== Testimonials Pro (20) =====
function initTestimonials(){
  const track = document.getElementById('tTrack');
  const dots = document.getElementById('tDots');
  const prev = document.getElementById('tPrev');
  const next = document.getElementById('tNext');
  const carousel = document.getElementById('tCarousel');

  if(!track || !dots || !carousel) return;

  const data = [
    { name:"Lucas Martins", role:"Owner • Comunidade", stars:5, verify:true,  text:"Design muito premium. Passa confiança e deixa tudo mais organizado no servidor." },
    { name:"Ana Costa", role:"Staff • Suporte", stars:5, verify:true, text:"O fluxo ficou perfeito: compra, ticket e ativação. Bem profissional." },
    { name:"Rafael Souza", role:"Owner • Vendas", stars:5, verify:false, text:"A experiência ficou produto de verdade. Visual clean e bonito." },
    { name:"João Pereira", role:"Admin • Comunidade", stars:5, verify:true, text:"Ativaram rápido e o atendimento foi direto. Vale pelo mensal." },
    { name:"Bianca Ribeiro", role:"Owner • Loja", stars:5, verify:false, text:"Checkout bem feito. QR e copiar Pix ajudam demais." },
    { name:"Matheus Gomes", role:"Moderação", stars:5, verify:false, text:"Servidor ficou com cara profissional. Bem mais organizado." },
    { name:"Pedro Henrique", role:"Owner • Guilda", stars:5, verify:false, text:"Visual premium mesmo. A galera curtiu o padrão do site." },
    { name:"Camila Nunes", role:"Admin • Suporte", stars:5, verify:true, text:"Layout e textos claros. Reduziu dúvidas na compra." },
    { name:"Thiago Lima", role:"Owner • Serviços", stars:5, verify:false, text:"Clean e sem poluição visual. Passa muita confiança." },
    { name:"Mariana Vieira", role:"Staff", stars:5, verify:false, text:"Ficou fácil orientar: paga e envia comprovante no ticket." },
    { name:"Guilherme Alves", role:"Owner", stars:5, verify:true, text:"O estilo luxo/clean ficou perfeito pro Nexor Premium." },
    { name:"Vitória Kaori", role:"Admin", stars:5, verify:false, text:"Cards e brilho suave bem premium. Muito bonito." },
    { name:"Bruno Ferreira", role:"Owner • Comunidade", stars:5, verify:false, text:"Site leve e rápido. No celular ficou ótimo." },
    { name:"Isabela Teixeira", role:"Suporte", stars:5, verify:true, text:"Checkout bem explicado. Evita confusão com Pix." },
    { name:"Henrique Duarte", role:"Owner • Trade", stars:5, verify:false, text:"Acabamento top. Parece site de SaaS mesmo." },
    { name:"Larissa Barros", role:"Admin", stars:5, verify:false, text:"Termos e privacidade deixam tudo muito mais profissional." },
    { name:"Felipe Jesus", role:"Owner", stars:5, verify:true, text:"Urgência com countdown ajudou muito na conversão." },
    { name:"Natália Silva", role:"Staff", stars:5, verify:false, text:"Layout bonito e alinhado. Dá vontade de comprar." },
    { name:"Daniel Xavier", role:"Owner • Loja", stars:5, verify:false, text:"Fluxo completo: home, checkout, sucesso e como ativar." },
    { name:"Sarah Pires", role:"Admin • Comunidade", stars:5, verify:true, text:"Tudo com cara de marca. Muito premium e consistente." },
  ];

  const starStr = (n) => "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));
  const initials = (full) => {
    const parts = full.trim().split(/\s+/).slice(0,2);
    return parts.map(p => p[0]?.toUpperCase() || "").join("");
  };

  track.innerHTML = "";
  dots.innerHTML = "";

  data.forEach((t, i) => {
    const slide = document.createElement("div");
    slide.className = "card t-card";
    slide.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
        <div class="stars">${starStr(t.stars)}</div>
        ${t.verify ? `<div class="badge-verify"><span class="v"></span> Verificado</div>` : ``}
      </div>

      <blockquote class="quote" style="margin-top:10px;">
        “${t.text}”
        <div class="who-row">
          <div class="avatar">${initials(t.name)}</div>
          <div class="who-meta">
            <div class="who-name">${t.name}</div>
            <div class="who-role">${t.role}</div>
          </div>
        </div>
      </blockquote>
    `;
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "t-dot";
    dot.type = "button";
    dot.textContent = String(i + 1);
    dot.addEventListener("click", () => goTo(i, true));
    dots.appendChild(dot);
  });

  let index = 0;
  let timer = null;
  let slideW = 560;

  function measure(){
    const first = track.children[0];
    if(first){
      slideW = first.getBoundingClientRect().width + 14;
    }
  }

  function paintDots(){
    [...dots.children].forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function goTo(i, userAction=false){
    index = (i + data.length) % data.length;
    track.style.transform = `translateX(-${index * slideW}px)`;
    paintDots();
    if(userAction) restart();
  }

  function nextSlide(userAction=false){ goTo(index + 1, userAction); }
  function prevSlide(userAction=false){ goTo(index - 1, userAction); }

  function restart(){
    if(timer) clearInterval(timer);
    timer = setInterval(() => nextSlide(false), 3400);
  }

  if(next) next.addEventListener("click", () => nextSlide(true));
  if(prev) prev.addEventListener("click", () => prevSlide(true));

  carousel.addEventListener("mouseenter", () => { if(timer) clearInterval(timer); });
  carousel.addEventListener("mouseleave", () => restart());

  window.addEventListener("resize", () => {
    measure();
    goTo(index, false);
  });

  measure();
  goTo(0, false);
  restart();
}

// ===== Boot =====
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCountdown();
  initTestimonials();
});
