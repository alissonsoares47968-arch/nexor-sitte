function showToast(msg){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(window.__toast);
  window.__toast = setTimeout(()=> t.style.display='none', 1700);
}

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

function initReveal(){
  const items = Array.from(document.querySelectorAll('.reveal'));
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

function initCountdown(){
  const el = document.getElementById('countdown');
  if(!el) return;

  // Ajuste o fim da promo aqui no HTML (data-ends-at), ex:
  // data-ends-at="2026-02-10T23:59:59-03:00"
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

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCountdown();
});
