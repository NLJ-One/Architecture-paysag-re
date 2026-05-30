// Extracted from projects.html
const cursor = document.getElementById('cursor');
const cursorFollow = document.getElementById('cursor-follower');
const loader = document.getElementById('loader');
const nav = document.getElementById('nav');

let mouseX = 0, mouseY = 0;
let followX = 0, followY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateCursor() {
  followX += (mouseX - followX) * 0.1;
  followY += (mouseY - followY) * 0.1;
  if (cursorFollow) {
    cursorFollow.style.left = followX + 'px';
    cursorFollow.style.top = followY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover interactions
document.querySelectorAll('a, button, .card-link, .filter-tag, .toggle-btn').forEach(el => {
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

// Counter
const counterEl = document.getElementById('projectCounter');
const totalProjects = document.querySelectorAll('.project-card').length;

function animateCounter(target, el, duration = 1500) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = String(Math.floor(eased * target));
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = String(target);
  };
  requestAnimationFrame(step);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    if (counterEl) animateCounter(totalProjects, counterEl);
  }, 1700);
});

// View toggle
const btnGrid = document.getElementById('btnGrid');
const btnList = document.getElementById('btnList');
const projectsGrid = document.getElementById('projectsGrid');
const projectsList = document.getElementById('projectsList');

function setView(view) {
  if (view === 'grid') {
    if (projectsGrid) projectsGrid.classList.remove('hidden');
    if (projectsList) projectsList.classList.add('hidden');
    if (btnGrid) btnGrid.classList.add('active');
    if (btnList) btnList.classList.remove('active');
  } else {
    if (projectsGrid) projectsGrid.classList.add('hidden');
    if (projectsList) projectsList.classList.remove('hidden');
    if (btnList) btnList.classList.add('active');
    if (btnGrid) btnGrid.classList.remove('active');
  }
}

if (btnGrid) btnGrid.addEventListener('click', () => setView('grid'));
if (btnList) btnList.addEventListener('click', () => setView('list'));

// Filters (persist state across views)
const filterBtns = document.querySelectorAll('.filter-tag');
const gridCards = document.querySelectorAll('.project-card');
const listRows = document.querySelectorAll('.list-row');

let activeFilter = 'all';

function applyFilter() {
  [...gridCards].forEach(card => {
    const show = activeFilter === 'all' || card.dataset.category === activeFilter;
    card.classList.toggle('hidden', !show);
  });

  [...listRows].forEach(row => {
    const show = activeFilter === 'all' || row.dataset.category === activeFilter;
    row.classList.toggle('hidden', !show);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;

    // Small cinematic out
    [...gridCards, ...listRows].forEach(el => el.classList.add('filtering'));
    setTimeout(() => {
      [...gridCards, ...listRows].forEach(el => el.classList.remove('filtering'));
      applyFilter();
    }, 280);
  });
});

// Ghost image on list hover
const hoverImg = document.getElementById('listHoverImg');

listRows.forEach(row => {
  row.addEventListener('mouseenter', () => {
    if (!hoverImg) return;
    const imgUrl = row.dataset.img;
    hoverImg.style.backgroundImage = `url(${imgUrl})`;
    hoverImg.classList.add('visible');
  });
  row.addEventListener('mouseleave', () => {
    if (!hoverImg) return;
    hoverImg.classList.remove('visible');
  });
});

document.addEventListener('mousemove', (e) => {
  if (!hoverImg) return;
  hoverImg.style.left = e.clientX + 'px';
  hoverImg.style.top = e.clientY + 'px';
});

// Scroll reveal
const revealEls = document.querySelectorAll('.project-card, .list-row, .projects-controls, #projects-hero .page-hero-content');
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Smooth scroll for anchors within same page (and avoid preventing mailto)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Keep filter applied on load
applyFilter();
