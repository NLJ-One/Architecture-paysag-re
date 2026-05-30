// Gestion du loader plein écran
// Événements : window load → setTimeout 1500ms → loader.classList.add('hidden')
//              + document.body.classList.remove('loading')

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    if (loader) loader.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 1500);
});

