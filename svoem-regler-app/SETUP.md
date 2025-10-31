# Opsætningsvejledning - Svøm Danmark Regelsøgning

## 🚀 Hurtig start

### 1. Klon eller download projektet

```bash
cd svoem-regler-app
```

### 2. Start en lokal server

**Python 3 (anbefalet):**
```bash
python3 -m http.server 8000
```

eller brug npm script:
```bash
npm start
```

**Alternativer:**

Node.js:
```bash
npx http-server -p 8000
```

PHP:
```bash
php -S localhost:8000
```

### 3. Åbn appen

Åbn din browser og gå til:
```
http://localhost:8000
```

## 📱 Installation på mobile enheder

### iOS (iPhone/iPad)

1. Åbn appen i Safari
2. Tryk på "Del"-knappen (firkant med pil opad)
3. Scroll ned og vælg "Tilføj til hjemmeskærm"
4. Indtast et navn (f.eks. "Svøm Regler")
5. Tryk "Tilføj"

Appen åbner nu som en standalone app uden browser-interface.

### Android

1. Åbn appen i Chrome
2. Tryk på menu-knappen (tre prikker)
3. Vælg "Tilføj til startskærm"
4. Bekræft navnet
5. Tryk "Tilføj"

## 📄 Tilføj egne PDF-dokumenter

### Metode 1: Find PDF-URLs fra Svøm Danmark

1. Gå til https://www.svoem.org/Redskaber/Regler-og-vedtaegter/
2. Find det dokument du vil tilføje
3. Højreklik på download-linket
4. Vælg "Kopier link-adresse" eller "Copy Link"

### Metode 2: Rediger konfigurationsfilen

Åbn `documents-config.js` i en teksteditor og tilføj:

```javascript
{
    name: 'SW - Svømmeregler 2023',
    url: 'https://www.svoem.org/media/XXXX/filename.pdf',
    category: 'SW',
    type: 'Svømmeregler',
    description: 'Beskrivelse af dokumentet'
}
```

**Vigtige felter:**

- `name`: Dokumentets navn (vises i søgeresultater)
- `url`: Direkte link til PDF-filen
- `category`: Kategori (SW, FR, GR, Vedtægter, etc.)
- `type`: Dokumenttype (Svømmeregler, Teknisk, etc.)
- `description`: Kort beskrivelse

## 🎨 Opret app-ikoner (valgfrit)

Projektet inkluderer en SVG-fil (`icon.svg`) som kan konverteres til PNG:

### Online konvertering:

1. Gå til https://cloudconvert.com/svg-to-png
2. Upload `icon.svg`
3. Opret to versioner:
   - `icon-192.png` (192x192 pixels)
   - `icon-512.png` (512x512 pixels)
4. Placer filerne i projektmappen

### Kommandolinje (ImageMagick):

```bash
# Installer ImageMagick hvis nødvendigt
# macOS: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick

# Konverter til PNG
convert icon.svg -resize 192x192 icon-192.png
convert icon.svg -resize 512x512 icon-512.png
```

## 🔧 Konfiguration

### Tilpas farver

Rediger `styles.css` og ændr CSS-variablerne:

```css
:root {
    --primary-color: #0066cc;    /* Primær farve */
    --secondary-color: #00a8e8;  /* Sekundær farve */
    --background: #f5f7fa;       /* Baggrund */
}
```

### Tilpas kategorier

Filterkategorier kan tilføjes i `index.html`:

```html
<button class="chip" data-filter="ny-kategori">Ny Kategori</button>
```

## 🌐 Deploy til produktion

### GitHub Pages

1. Upload filerne til et GitHub repository
2. Gå til Settings → Pages
3. Vælg branch (normalt `main`)
4. Gem indstillinger
5. Din app er nu tilgængelig på `https://[username].github.io/[repo]`

### Netlify

1. Drag-and-drop projektmappen til https://app.netlify.com/drop
2. Din app er nu live på en Netlify URL
3. Valgfrit: Tilføj et custom domain

### Eget domæne/server

Upload alle filer til din webserver via FTP eller SSH:

```bash
# Eksempel med rsync
rsync -avz svoem-regler-app/ user@server:/var/www/html/
```

## 🔍 Fejlfinding

### Problem: PDF'er indlæses ikke

**Løsning:**
1. Tjek internetforbindelse
2. Åbn browser-konsollen (F12) og tjek for fejl
3. Bekræft at PDF-URL'erne er korrekte
4. Tjek at serveren tillader CORS-requests

### Problem: Appen virker ikke lokalt

**Løsning:**
Appen SKAL køres fra en webserver (ikke bare ved at åbne index.html direkte).
Start en lokal server som beskrevet ovenfor.

### Problem: Søgning virker ikke

**Løsning:**
1. Vent til alle dokumenter er fuldt indlæst
2. Genindlæs siden (Cmd/Ctrl + Shift + R)
3. Tjek at JavaScript er aktiveret

### Problem: Langsom indlæsning

**Forklaring:**
Første gang appen indlæses, skal alle PDF'er downloades og indekseres.
Dette kan tage 30-60 sekunder afhængigt af:
- Antal dokumenter
- Dokumentstørrelser
- Internetforbindelse

**Løsning:**
- Vær tålmodig ved første indlæsning
- Efterfølgende besøg er hurtigere (browser cache)
- Overvej at reducere antallet af dokumenter

## 📊 Ydeevne

### Optimering

For bedre ydeevne:

1. **Reducer dokumentantal**: Start med de vigtigste dokumenter
2. **Komprimér PDF'er**: Brug PDF-komprimeringsværktøjer
3. **Host lokalt**: Overvej at hoste PDF'erne på samme server som appen

### Tekniske begrænsninger

- Browser memory limit: ~100-200 MB
- Anbefalet max antal dokumenter: 10-15
- Anbefalet max PDF størrelse: 5 MB per dokument

## 🔒 Sikkerhed og privatliv

- Alle data behandles lokalt i browseren
- Ingen analytics eller tracking
- Ingen data sendes til eksterne servere
- PDF'er hentes direkte fra Svøm Danmarks servere

## 📝 Opdatering af dokumenter

Når Svøm Danmark opdaterer deres dokumenter:

1. Åbn `documents-config.js`
2. Opdater URL'en for det relevante dokument
3. Gem filen
4. Brugere skal genindlæse appen (hard refresh)

## ⚙️ Avanceret konfiguration

### Service Worker (PWA)

For at tilføje offline-funktionalitet, opret `service-worker.js`:

```javascript
const CACHE_NAME = 'svoem-regler-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/app.js',
                '/documents-config.js'
            ]);
        })
    );
});
```

Registrer i `index.html`:

```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}
```

## 📞 Support

For teknisk hjælp:
- Tjek README.md for generel information
- Åbn browser-konsollen (F12) for fejlmeddelelser
- Opret et issue i GitHub repository'et

For spørgsmål om dokumenter:
- Kontakt Dansk Svømme Union: https://www.svoem.org

---

**God fornøjelse med appen! 🏊‍♂️**
