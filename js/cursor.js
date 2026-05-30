// Curseur custom + follower avec lag
// Variables : cursor, cursorFollow, mouseX, mouseY, followX, followY
// Fonctions  : animateCursor() — appelée immédiatement
// Événements : mousemove sur document
//              mouseenter/mouseleave sur a, button, .project-link, .card-link, .list-row

const cursor       = document.getElementById('cursor');
const cursorFollow = document.getElementById('cursor-follower');

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

document.querySelectorAll('a, button, .project-link, .card-link, .filter-tag, .toggle-btn, .list-row').forEach(el => {
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

