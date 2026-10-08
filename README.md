# Noah Jean-Louis — Portfolio paysagiste

Portfolio statique en HTML, CSS et JavaScript natifs. Les projets sont définis dans `data/projects.json` ; aucune installation de dépendances ni étape de compilation n'est nécessaire.

## Lancer en local

Dans VS Code, lancez un serveur statique depuis la racine du dépôt (par exemple l'extension Live Server), puis ouvrez l'URL locale affichée. Ce serveur est nécessaire pour charger le fichier JSON ; le double-clic sur `index.html` ne suffit pas.

## Ajouter un projet

1. Créez `images/<slug-du-projet>/` et placez-y `cover.webp`, puis les images de galerie (`01.webp`, `02.webp`…).
2. Ajoutez un objet dans `data/projects.json` avec un slug unique, titre, lieu, année, catégorie, surface, mission, description, couverture et galerie avec textes `alt`.
3. Renseignez les dimensions réelles `width` et `height` de chaque image et vérifiez les chemins.
4. Rechargez le site localement : la grille, le filtre, la fiche projet et la navigation se mettent à jour automatiquement.

## Préparer les images

Privilégiez WebP, largeur de 1600 à 2000 px pour les grands visuels et un poids inférieur à 500 Ko par image lorsque la qualité le permet. Gardez les proportions d'origine et écrivez un `alt` décrivant ce qui est visible. Les images affichées sont en WebP dans `images/terrasse-paysagere/` ; les sources originales sont conservées dans son sous-dossier `sources/`.

## Déployer sur GitHub Pages

Poussez les fichiers sur GitHub, puis ouvrez **Settings → Pages**. Choisissez **Deploy from a branch**, la branche `main` et le dossier `/ (root)`, puis enregistrez. Le site sera publié à l'URL GitHub Pages indiquée dans cette section.
