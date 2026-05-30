// Nav scroll + hamburger menu mobile
// Fonctions  : aucune nommée — listeners directs
// Événements : window scroll → nav.classList.toggle('scrolled')
//              click hamburger → toggle classes open, body overflow
//              click liens overlay → fermeture menu
//              window resize → fermeture menu si > 768px

const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (!nav) return;
  if (window.scrollY > 80) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}, { passive: true });

// ── HAMBURGER MENU (mobile) ─────────────────────────
const hamburger = document.getElementById('navHamburger');
const mobileOverlay = document.getElementById('navMobileOverlay');

if (hamburger && mobileOverlay) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileOverlay.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

