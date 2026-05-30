# Portfolio Créatif - Noah Jean-Louis

Un portfolio moderne et minimaliste fusionnant architecture paysagère, design digital et photographie. Inspiré par des sites d'excellence comme Omai Villas et Cargo Architecture.

## Contenu

### Pages

- **index.html** - Page d'accueil avec hero section et projets en vedette
- **projects.html** - Galerie complète avec filtres (Architecture, Design, Photographie)
- **services.html** - Description détaillée des services et processus de travail
- **about.html** - Biographie, expertise, parcours et valeurs
- **contact.html** - Formulaire de contact et informations

### Structure des Dossiers

```bash
Portfolio/
├── index.html           # Page d'accueil
├── projects.html        # Galerie de projets
├── services.html        # Services détaillés
├── about.html           # À propos
├── contact.html         # Contact
├── README.md            # Documentation
├── css/
│   └── style.css        # Feuille de style principale
├── js/
│   └── script.js        # JavaScript pour interactivité
└── images/              # Dossier pour les images
```

## Design

### Palette de Couleurs

- **Primary**: `#1a1a1a` (Noir) - Couleur principale
- **Secondary**: `#ffffff` (Blanc) - Fond
- **Accent**: `#c4a77d` (Doré/Beige) - Accents élégants
- **Light**: `#f5f5f5` (Gris très clair)

### Typographie

- **Font Display**: Playfair Display (titres)
- **Font Main**: Inter (corps de texte)

### Inspirations

- **Omai Villas**: Minimalisme élégant, navigation épurée, images de qualité
- **Cargo Architecture**: Organisation des projets, filtres, formulaire professionnel

## Fonctionnalités

### Frontend

✓ **Navigation responsive** - Menu hamburger sur mobile
✓ **Filtrage de projets** - Par catégorie (Architecture, Design, Photographie)
✓ **Formulaire de contact** - Validation en temps réel
✓ **Animations** - Smooth scroll, hover effects, transitions fluides
✓ **Lazy loading** - Images optimisées
✓ **SEO friendly** - Meta tags, structure sémantique
✓ **Responsive design** - Mobile, tablet, desktop

### JavaScript

- Toggle du menu de navigation
- Filtrage dynamique des projets
- Validation de formulaire
- Smooth scroll pour les ancres
- Animations d'entrée (Intersection Observer)
- Notifications utilisateur
- Bouton "Retour au haut"

## 📱 Points de Rupture Responsive

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🎯 Utilisation

1. **Remplacer les images** - Ajouter vos images dans le dossier `/images`
   - `hero-image.jpg` - Image hero page d'accueil
   - `project-*.jpg` - Images des projets
   - `service-*.jpg` - Images des services
   - `about-portrait.jpg` - Portrait pour la page À propos

2. **Personnaliser les informations**
   - Modifier les contacts dans `contact.html`
   - Updater les réseaux sociaux
    - Ajouter vos projets dans `projects.html`

3. **Héberger** - Utiliser n'importe quel hébergeur statique (Netlify, Vercel, GitHub Pages)

## 💻 Technologies

- **HTML5** - Structure sémantique
- **CSS3** - Grid, Flexbox, Variables CSS, Media Queries
- **JavaScript** - Vanilla JS (pas de dépendances)
- **Fonts** - Google Fonts (Playfair Display, Inter)

## 🔧 Personnalisation

### Changer les couleurs

Modifier les variables CSS dans `css/style.css`:

```css
:root {
    --color-primary: #1a1a1a;
    --color-accent: #c4a77d;
    /* ... */
}
```

### Ajouter des projets

Dupliquer une section `project-item` dans `projects.html` et modifier:

```html
<article class="project-item" data-category="architecture">
    <!-- ... -->
</article>
```

### Modifier le formulaire

Ajouter/retirer des champs dans `contact.html` et adapter la validation dans `js/script.js`.

## 📊 Performance

- ⚡ Aucune dépendance externe (vanille JS)
- 📦 CSS optimisé (~15KB)
- 🖼️ Lazy loading des images
- 🎯 Structure légère et rapide

## ♿ Accessibilité

- Labels explicites sur tous les champs
- Attributs ARIA appropriés
- Contraste suffisant
- Navigation au clavier
- Sémantique HTML5

## 📝 Notes

- Le formulaire de contact est fonctionnel côté frontend (validation)
- Pour l'envoi réel, intégrer un service backend (Formspree, Netlify Forms, etc.)
- Les images sont des placeholders - à remplacer par vos propres fichiers

## 🎓 Bonus

Fichiers inclus pour inspiration:
- Structure basée sur les meilleures pratiques du design web moderne
- Mobile-first approach
- Code propre et bien documenté
- Facilement extensible

---

**Créé en 2026** | Portfolio moderne fusionnant architecture paysagère, design digital et photographie.
