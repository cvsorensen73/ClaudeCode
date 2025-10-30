# 📚 Dokumentsøgning - SVOEM Web App

En moderne, responsiv web-app til søgning og filtrering af SVOEM dokumenter med dansk brugergrænseflade.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)

## ✨ Funktioner

### 🔍 Kraftfuld Søgning
- **Real-time søgning** med automatisk filtrering mens du skriver
- Søg på tværs af titel, beskrivelse og tags
- Debounced input for optimal ydeevne
- Ryd søgning med et enkelt klik

### 🎯 Avanceret Filtrering
- **6 dokumentkategorier**:
  - 📋 Regler
  - 📘 Vedtægter
  - 📝 Retningslinjer
  - 🛡️ Politikker
  - 📄 Formularer
  - 📁 Anden
- **Filtype filtrering**: PDF, Word, Excel
- Hurtige filter-chips i header
- Detaljeret filter-panel med alle muligheder
- Kombiner flere filtre for præcise resultater
- Synlig tæller for antal aktive filtre

### 📊 Fleksibel Sortering
- Nyeste først
- Ældste først
- Alfabetisk (dansk sortering)
- Efter kategori

### 📱 Responsivt Design
- **Mobile-first** tilgang
- Fungerer perfekt på telefon, tablet og desktop
- Touch-optimeret interface
- Glat scrolling og animationer
- Moderne, rent design

### 🎨 Brugervenlig Interface
- Farvekodede kategorier for nem identifikation
- Moderne modal-vinduer til dokumentdetaljer
- Del-funktionalitet (Web Share API + fallback)
- Tom-tilstand med vejledning
- Smooth animationer og transitions

## 🚀 Kom i Gang

### Installation

Ingen installation nødvendig! Det er en statisk web-app der kan køre direkte i browseren.

#### Metode 1: Lokal Udvikling

1. **Klon eller download projektet:**
   ```bash
   cd DokumentSoegning-Web
   ```

2. **Åbn index.html i din browser:**
   ```bash
   # macOS
   open index.html

   # Linux
   xdg-open index.html

   # Windows
   start index.html
   ```

#### Metode 2: Lokal Web Server

For bedre ydeevne og test af alle funktioner, brug en lokal web server:

```bash
# Python 3
python -m http.server 8000

# Node.js (med npx)
npx serve

# PHP
php -S localhost:8000
```

Åbn derefter `http://localhost:8000` i din browser.

## 🌐 Deployment

### GitHub Pages

1. **Push til GitHub:**
   ```bash
   git add .
   git commit -m "Add SVOEM document search web app"
   git push
   ```

2. **Aktivér GitHub Pages:**
   - Gå til repository Settings
   - Scroll ned til "Pages"
   - Vælg branch (f.eks. `main`)
   - Vælg folder (`/DokumentSoegning-Web` eller root)
   - Klik "Save"

3. **Din app er nu tilgængelig på:**
   ```
   https://[dit-brugernavn].github.io/[repo-navn]/
   ```

### Netlify

1. **Drag & drop deployment:**
   - Gå til [netlify.com](https://www.netlify.com/)
   - Træk `DokumentSoegning-Web` mappen til Netlify
   - Din app er live på få sekunder!

2. **CLI deployment:**
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

### Vercel

```bash
npm install -g vercel
cd DokumentSoegning-Web
vercel
```

### Traditionel Web Hosting

Upload alle filer til din webserver via FTP:
- `index.html`
- `styles.css`
- `app.js`
- `data.js`

## 📝 Tilpasning

### Tilføj Dokumenter fra SVOEM Hjemmesiden

Dokumenterne er defineret i `data.js`. For at tilføje faktiske dokumenter:

1. **Åbn `data.js`** i en teksteditor

2. **Tilføj dokumenter til `DOCUMENTS` arrayet:**

```javascript
const DOCUMENTS = [
    {
        id: '16', // Unikt ID
        titel: 'Dit dokument titel',
        beskrivelse: 'Detaljeret beskrivelse af dokumentet...',
        kategori: CATEGORIES.REGLER, // Vælg passende kategori
        url: 'https://www.svoem.org/dit-dokument.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2024-03-20'),
        tags: ['tag1', 'tag2', 'tag3']
    },
    // Tilføj flere dokumenter...
];
```

3. **Gem filen** - ændringerne er med det samme synlige!

### Tilgængelige Kategorier

```javascript
CATEGORIES.REGLER        // 📋 Regler
CATEGORIES.VEDTAEGTER    // 📘 Vedtægter
CATEGORIES.RETNINGSLINJER // 📝 Retningslinjer
CATEGORIES.POLITIKKER    // 🛡️ Politikker
CATEGORIES.FORMULARER    // 📄 Formularer
CATEGORIES.ANDEN         // 📁 Anden
```

### Tilgængelige Filtyper

```javascript
FILE_TYPES.PDF    // PDF
FILE_TYPES.WORD   // Word
FILE_TYPES.EXCEL  // Excel
FILE_TYPES.ANDEN  // Anden
```

### Tilpas Farver og Styling

Rediger CSS-variabler i `styles.css`:

```css
:root {
    /* Primær farve */
    --color-primary: #2563eb;

    /* Kategori farver */
    --color-regler: #2563eb;
    --color-vedtaegter: #10b981;
    --color-retningslinjer: #f59e0b;
    /* ... */
}
```

### Tilpas Organisation

Skift "SVOEM" til din organisation i `index.html`:

```html
<h1 class="app-title">📚 Dokumentsøgning</h1>
<p class="app-subtitle">Din Organisation</p>
```

## 🛠️ Teknologi

- **HTML5** - Semantisk markup
- **CSS3** - Moderne styling med CSS Grid og Flexbox
- **Vanilla JavaScript** - Ingen dependencies, hurtig og let
- **Web Share API** - Native deling på mobile enheder
- **LocalStorage ready** - Kan nemt udvides til at gemme præferencer

### Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 📂 Projektstruktur

```
DokumentSoegning-Web/
├── index.html          # Hovedside med HTML struktur
├── styles.css          # Responsive styling og design
├── app.js              # Application logic (søgning, filtrering, UI)
├── data.js             # Dokument data og kategorier
└── README.md           # Dokumentation
```

## ⚡ Ydeevne

- **Ingen eksterne dependencies** - hurtig indlæsning
- **Optimeret CSS** - Mobile-first, minimal overhead
- **Debounced search** - Smooth performance også med mange dokumenter
- **Lazy rendering** - Effektiv DOM manipulation
- **Total størrelse**: < 100 KB (inklusive 15 dokumenter)

## 🔧 Avanceret Tilpasning

### Automatisk Hentning af Dokumenter

For at automatisere dokumenthentning fra SVOEM hjemmesiden, kan du tilføje en serverside scraper:

```javascript
// Eksempel med Node.js og Cheerio
const cheerio = require('cheerio');
const fetch = require('node-fetch');

async function scrapeSVOEMDocuments() {
    const response = await fetch('https://www.svoem.org/Redskaber/Regler-og-vedtaegter/');
    const html = await response.text();
    const $ = cheerio.load(html);

    const documents = [];
    // Parse dokumenter fra HTML
    // ...

    return documents;
}
```

### Tilføj Søge-Highlighting

Tilføj markering af søgeord i resultaterne:

```javascript
function highlightSearchTerm(text, searchQuery) {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}
```

### Gem Bruger-Præferencer

Gem søge- og filter-præferencer i localStorage:

```javascript
// Gem state
localStorage.setItem('svoem_filters', JSON.stringify({
    selectedCategories: Array.from(state.selectedCategories),
    sortMethod: state.sortMethod
}));

// Gendan state
const saved = JSON.parse(localStorage.getItem('svoem_filters'));
if (saved) {
    state.selectedCategories = new Set(saved.selectedCategories);
    state.sortMethod = saved.sortMethod;
}
```

### Analytics Integration

Tilføj Google Analytics eller lignende:

```html
<!-- I index.html, før </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Fejlfinding

### Dokumenter vises ikke

- Check at `data.js` er korrekt indlæst
- Åbn browser console (F12) for fejlmeddelelser
- Verificer at alle filer er i samme mappe

### Søgning virker ikke

- Check at JavaScript er aktiveret i browseren
- Verificer at `app.js` er korrekt indlæst
- Check browser console for errors

### Styling ser forkert ud

- Clear browser cache
- Check at `styles.css` er korrekt linked i `index.html`
- Verificer at ingen AdBlocker blokerer CSS

## 📱 PWA (Progressive Web App)

For at gøre appen tilgængelig offline, tilføj en Service Worker og manifest:

1. **Opret `manifest.json`:**
```json
{
  "name": "SVOEM Dokumentsøgning",
  "short_name": "SVOEM Docs",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "description": "Søg og filtrer SVOEM dokumenter",
  "icons": [...]
}
```

2. **Tilføj Service Worker** for offline support

## 📄 Licens

© 2024 SVOEM. Alle rettigheder forbeholdes.

Dette projekt er udviklet til intern brug i SVOEM.

## 🤝 Support

For hjælp eller spørgsmål:
- Kontakt SVOEM IT-support
- Åbn et issue i projektets repository

## 🎉 Funktioner Under Udvikling

- [ ] Offline support (PWA)
- [ ] Favoritdokumenter
- [ ] Seneste søgninger
- [ ] Eksport til PDF/CSV
- [ ] Print-venlig visning
- [ ] Dark mode
- [ ] Multi-sprog support

---

Udviklet med ❤️ til SVOEM
