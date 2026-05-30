// IntersectionObserver reveal + parallaxe hero + smooth scroll
// Variables  : revealTargets (querySelectorAll liste complète)
// Fonctions  : revealObserver (IntersectionObserver)
//              updateStickyTop() — (pas présent dans la version inline; laissé absent)
// Événements : window scroll → parallaxe hero
//              window resize → updateStickyTop() (absent dans inline)
//              click a[href^="#"] → smooth scroll

const revealTargets = document.querySelectorAll(
  '#intro .intro-grid, .project, .about-grid, .footer-title, .projects-header, h2, .about-stats, .stat, .projects-controls, #projects-hero .page-hero-content, .project-card, .list-row'
);

revealTargets.forEach(el => {
  if (!el.classList.contains('reveal')) el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
});

revealTargets.forEach(el => revealObserver.observe(el));

const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const rate = scrolled * 0.25;
    heroImg.style.transform = `scale(1) translateY(${rate}px)`;
  }, { passive: true });
}

// Smooth scroll for anchors within same page (avoid mailto)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// CTA hover
const ctaBtn = document.querySelector('.btn-outline');
if (ctaBtn) {
  ctaBtn.addEventListener('mousemove', (e) => {
    const rect = ctaBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    ctaBtn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
  });

  ctaBtn.addEventListener('mouseleave', () => {
    ctaBtn.style.transform = 'translate(0, 0)';
  });
}

// Footer title fade-in observer
const footerTitle = document.querySelector('.footer-title');
if (footerTitle) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      footerTitle.style.opacity = '1';
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  footerTitle.style.opacity = '0';
  footerTitle.style.transition = 'opacity 0.1s';
  observer.observe(footerTitle);
}

