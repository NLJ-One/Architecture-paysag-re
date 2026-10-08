function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    nav.classList.toggle("is-open", isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
    nav.classList.remove("is-open");
  });
}

function setupReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  targets.forEach((target) => observer.observe(target));
}

function renderFilters(projects) {
  const filterRoot = document.getElementById("project-filters");
  const grid = document.getElementById("project-grid");
  if (!filterRoot || !grid) return;

  const categories = ["Tous", ...new Set(projects.map((project) => project.categorie))];
  filterRoot.innerHTML = categories.map((category, index) =>
    `<button type="button" data-category="${escapeHtml(category)}" aria-pressed="${index === 0}">${escapeHtml(category)}</button>`
  ).join("");

  filterRoot.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    filterRoot.querySelectorAll("button").forEach((filter) => filter.setAttribute("aria-pressed", String(filter === button)));
    const category = button.dataset.category;
    grid.querySelectorAll(".project-card").forEach((card) => {
      card.hidden = category !== "Tous" && card.dataset.category !== category;
    });
    const visibleCount = grid.querySelectorAll(".project-card:not([hidden])").length;
    const count = document.getElementById("project-count");
    if (count) count.textContent = `${visibleCount} projet${visibleCount > 1 ? "s" : ""}`;
  });
}

function renderHome(projects) {
  const grid = document.getElementById("project-grid");
  if (!grid) return;
  grid.innerHTML = projects.map((project, index) => {
    const firstImage = project.images[0];
    const cover = project.couverture || firstImage.src;
    const alt = project.couvertureAlt || firstImage.alt;
    const imageAttributes = firstImage.width && firstImage.height
      ? `width="${firstImage.width}" height="${firstImage.height}"`
      : "width=\"1600\" height=\"1000\"";
    return `<article class="project-card" data-category="${escapeHtml(project.categorie)}" data-reveal>
      <a class="project-card-link" href="projet.html?slug=${encodeURIComponent(project.slug)}" aria-label="Voir le projet ${escapeHtml(project.titre)}">
        <figure><img src="${escapeHtml(cover)}" alt="${escapeHtml(alt)}" ${imageAttributes} ${index === 0 ? "fetchpriority=high" : "loading=lazy"}></figure>
        <h3>${escapeHtml(project.titre)}</h3>
        <div class="project-meta"><span>${escapeHtml(project.lieu)}</span><span>${escapeHtml(project.annee)}</span></div>
      </a>
    </article>`;
  }).join("");
  const count = document.getElementById("project-count");
  if (count) count.textContent = `${projects.length} projet${projects.length > 1 ? "s" : ""}`;
  renderFilters(projects);
  setupReveal();
}

function setupLightbox() {
  const dialog = document.getElementById("lightbox");
  if (!dialog) return;
  const image = dialog.querySelector("img");
  const caption = dialog.querySelector(".lightbox-caption");
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest(".lightbox-close")) dialog.close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) dialog.close();
  });
  document.querySelectorAll("[data-lightbox-src]").forEach((button) => {
    button.addEventListener("click", () => {
      image.src = button.dataset.lightboxSrc;
      image.alt = button.dataset.lightboxAlt;
      caption.textContent = button.dataset.lightboxAlt;
      dialog.showModal();
    });
  });
}

function renderProject(projects) {
  const root = document.getElementById("project-content");
  if (!root) return;
  const slug = new URLSearchParams(window.location.search).get("slug");
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) {
    root.innerHTML = `<p class="error-note">Ce projet est introuvable. <a class="text-link" href="index.html#projets">Retour aux projets</a></p>`;
    document.title = "Projet introuvable — Noah Jean-Louis";
    return;
  }

  const project = projects[index];
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const description = Array.isArray(project.description) ? project.description : [project.description];
  const pageDescription = description[0] || `Découvrez le projet ${project.titre} de Noah Jean-Louis.`;
  document.title = `${project.titre} — Noah Jean-Louis`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", pageDescription);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", `${project.titre} — Noah Jean-Louis`);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", pageDescription);
  document.querySelector('meta[property="og:image"]')?.setAttribute("content", new URL(project.couverture, window.location.href).href);

  const facts = [["Lieu", project.lieu], ["Année", project.annee], ["Catégorie", project.categorie], ["Surface", project.surface], ["Mission", project.mission]];
  const gallery = project.images.map((image, imageIndex) => {
    const width = image.width || 1600;
    const height = image.height || 1000;
    return `<figure class="gallery-item" data-reveal>
      <button class="gallery-button" type="button" data-lightbox-src="${escapeHtml(image.src)}" data-lightbox-alt="${escapeHtml(image.alt)}" aria-label="Agrandir : ${escapeHtml(image.alt)}">
        <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" width="${width}" height="${height}" ${imageIndex === 0 ? "fetchpriority=high" : "loading=lazy"}>
      </button>
      <figcaption>${escapeHtml(image.alt)}</figcaption>
    </figure>`;
  }).join("");

  root.innerHTML = `<p class="project-topline">${escapeHtml(project.categorie)} · ${escapeHtml(project.lieu)}</p>
    <h1 class="project-title">${escapeHtml(project.titre)}</h1>
    <div class="project-lead">
      <div class="project-description">${description.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div>
      <dl class="project-facts">${facts.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || "Non renseigné")}</dd></div>`).join("")}</dl>
    </div>
    <section class="project-gallery" aria-label="Galerie du projet">${gallery}</section>
    <nav class="project-navigation" aria-label="Navigation entre les projets">
      ${previous ? `<a href="projet.html?slug=${encodeURIComponent(previous.slug)}">← Projet précédent</a>` : `<span class="is-unavailable" aria-disabled="true">← Projet précédent</span>`}
      <a class="back-link" href="index.html#projets">Retour aux projets</a>
      ${next ? `<a href="projet.html?slug=${encodeURIComponent(next.slug)}">Projet suivant →</a>` : `<span class="is-unavailable" aria-disabled="true">Projet suivant →</span>`}
    </nav>`;
  setupLightbox();
  setupReveal();
}

async function start() {
  setupMenu();
  document.querySelectorAll("#current-year").forEach((element) => { element.textContent = new Date().getFullYear(); });
  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const projects = await response.json();
    if (!Array.isArray(projects)) throw new Error("Le fichier de projets doit contenir une liste.");
    if (document.body.dataset.page === "home") renderHome(projects);
    if (document.body.dataset.page === "project") renderProject(projects);
  } catch (error) {
    document.querySelectorAll(".loading-note").forEach((element) => {
      element.className = "error-note";
      element.textContent = "Impossible de charger les projets. Ouvrez le site via un serveur local (voir le README).";
    });
    console.error("Échec du chargement de data/projects.json", error);
  }
}

await start();