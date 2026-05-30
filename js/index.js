// Extracted from index.html
const cursor       = document.getElementById('cursor');
const cursorFollow = document.getElementById('cursor-follower');
const loader       = document.getElementById('loader');
const nav          = document.getElementById('nav');

let mouseX = 0, mouseY = 0;
let followX = 0, followY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }
});

function animateCursor() {
  followX += (mouseX - followX) * 0.1;
  followY += (mouseY - followY) * 0.1;
  if (cursorFollow) {
    cursorFollow.style.left = followX + 'px';
    cursorFollow.style.top  = followY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .project-link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (!cursor || !cursorFollow) return;
    cursor.classList.add('hovering');
    cursorFollow.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    if (!cursor || !cursorFollow) return;
    cursor.classList.remove('hovering');
    cursorFollow.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

window.addEventListener('load', () => {
  setTimeout(() => {
    if (loader) loader.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 1500);
});

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


const revealTargets = document.querySelectorAll(
  '#intro .intro-grid, .project, .about-grid, .footer-title, .projects-header, h2, .about-stats, .stat'
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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

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
