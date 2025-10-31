# Svøm Danmark - Regelsøgning App

En mobil-optimeret web-applikation til søgning i Dansk Svømme Unions regler og vedtægter.

## ⚠️ VIGTIGT - Først læsning

**Søgningen returnerer ingen resultater for "butterfly" eller "SW 4.4"?**

Dette er normalt! Appen er konfigureret med en **test-PDF** for at demonstrere funktionaliteten.

**For at søge i Svøm Danmark regler:**
1. Læs **QUICK_START.md** for hurtig vejledning
2. Tilføj rigtige PDF-URL'er i `documents-config.js`
3. Se browser-konsollen (F12) for indlæsnings-status

## 📱 Funktioner

- **Mobil-først design**: Optimeret til iPhone 14 og andre mobile enheder
- **Fuld-tekst søgning**: Søg i alle PDF-dokumenter fra Svøm Danmark
- **Dansk interface**: Komplet dansk brugergrænseflade
- **Kategorifiltrering**: Filtrer resultater efter SW-regler, vedtægter, etc.
- **Offline-kompatibel**: Al indeksering sker i browseren
- **Hurtig søgning**: Lynhurtige søgeresultater med fremhævning af søgeord
- **Responsivt design**: Fungerer på alle skærmstørrelser

## 🚀 Kom i gang

### Simpel brug

1. Åbn `index.html` i en moderne webbrowser
2. Appen vil automatisk hente og indeksere alle PDF-dokumenter
3. Begynd at søge!

### Lokal webserver (anbefalet)

For bedste ydeevne, kør appen fra en lokal webserver:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (npx)
npx http-server

# PHP
php -S localhost:8000
```

Åbn derefter `http://localhost:8000` i din browser.

## 📄 Tilføj flere dokumenter

### Metode 1: Rediger konfigurationsfilen

1. Åbn `documents-config.js`
2. Tilføj et nyt dokument til arrayet:

```javascript
{
    name: 'Dokumenttitel',
    url: 'https://www.svoem.org/media/XXXX/filnavn.pdf',
    category: 'SW',
    type: 'Svømmeregler',
    description: 'Kort beskrivelse'
}
```

3. Gem filen og genindlæs appen

### Metode 2: Find PDF-URLs fra Svøm Danmarks hjemmeside

1. Gå til https://www.svoem.org/Redskaber/Regler-og-vedtaegter/
2. Højreklik på download-linket for det ønskede dokument
3. Vælg "Kopier link-adresse"
4. Tilføj URL'en til `documents-config.js`

## 🎨 Teknologier

- **PDF.js**: PDF-parsing og tekstudtrækning
- **Lunr.js**: Fuld-tekst søgeindeksering
- **Vanilla JavaScript**: Ingen framework-afhængigheder
- **CSS3**: Moderne, responsivt design
- **HTML5**: Semantisk markup

## 📱 Mobile enheder

Appen er optimeret til:
- iPhone 14 (390x844px)
- Alle moderne smartphones
- Tablets
- Desktop-browsere

### iOS Installation

For at tilføje til hjemmeskærmen på iOS:
1. Åbn appen i Safari
2. Tryk på "Del"-knappen
3. Vælg "Tilføj til hjemmeskærm"
4. Appen åbner nu som en standalone app

## 🔍 Søgefunktioner

### Grundlæggende søgning
Indtast søgeord i søgefeltet. Søgningen inkluderer:
- Dokumenttitler
- Fuldt tekstindhold
- Kategorier

### Avancerede søgeteknikker

- **Enkeltord**: `svømning`
- **Flere ord**: `svømning konkurrence regler`
- **Specifikke regler**: `SW 10`
- **Kategorier**: Brug filterchips til at filtrere efter kategori

## 📂 Fil-struktur

```
svoem-regler-app/
├── index.html              # Hovedfil
├── styles.css              # Styling og responsivt design
├── app.js                  # Hovedapplikationslogik
├── documents-config.js     # PDF-dokumentkonfiguration
└── README.md              # Denne fil
```

## 🌐 Browser-kompatibilitet

- Chrome/Edge (v90+)
- Safari (v14+)
- Firefox (v88+)
- Opera (v76+)

## 🔒 Privatliv

- Alle data behandles lokalt i browseren
- Ingen data sendes til eksterne servere
- PDF'er hentes direkte fra Svøm Danmarks servere

## 📝 Kategori-oversigt

Appen understøtter følgende kategorier:

- **SW**: Svømmeregler
- **FR**: Frit vands regler
- **GR**: Generalforsamlingsregler
- **Vedtægter**: Foreningens vedtægter
- **Konkurrence**: Konkurrencebestemmelser
- **Coaching**: Trænerretningslinjer

## 🛠️ Fejlfinding

### PDF'er indlæses ikke

1. Tjek din internetforbindelse
2. Bekræft at PDF-URL'erne er korrekte
3. Tjek browser-konsollen for fejlmeddelelser
4. Prøv at åbne appen via en lokal webserver

### Søgning virker ikke

1. Vent til alle dokumenter er indlæst
2. Prøv at genindlæse siden
3. Tjek at JavaScript er aktiveret

### Langsom indlæsning

- Første indlæsning kan tage tid, da alle PDF'er skal hentes og indekseres
- Senere besøg vil være hurtigere takket være browser-cache

## 📞 Support

For problemer med:
- **Appen**: Opret et issue i repository'et
- **Dokumenter**: Kontakt Dansk Svømme Union på https://www.svoem.org

## 🙏 Anerkendelser

- **Svøm Danmark**: For at stille regler og dokumenter til rådighed
- **PDF.js**: Mozilla's PDF-læser
- **Lunr.js**: Fuld-tekst søgebibliotek

## 📄 Licens

Applikationen er open source. Dokumenterne tilhører Dansk Svømme Union.

---

**Dansk Svømme Union (Svøm Danmark)**
https://www.svoem.org
