// js/css-check.js
// Vérifie que toutes les feuilles CSS locales chargent correctement.
// Si une feuille locale échoue, redirige vers error.html avec la liste des fichiers fautifs.

(function checkCSSLoaded() {
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

  window.addEventListener('load', function () {
    const failed = [];

    links.forEach(function (link) {
      const href = link.getAttribute('href') || '';

      // On ignore les ressources externes (http/https) et les fonts/CDN
      if (/^https?:\/\//i.test(href)) return;

      try {
        // Si la feuille n'a pas été chargée, link.sheet est souvent null
        if (!link.sheet) {
          failed.push(href);
        }
      } catch (e) {
        // Cas cross-origin : on ignore
      }
    });

    if (failed.length > 0) {
      const params = new URLSearchParams();
      params.set('files', failed.join(','));
      params.set('from', window.location.pathname);
      window.location.replace('error.html?' + params.toString());
    }
  });
})();

