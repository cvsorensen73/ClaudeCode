# 🚀 Hurtig Start Guide

## Problem: Søgningen returnerer ingen resultater?

Hvis du søger efter "butterfly" eller "SW 4.4" og ikke får resultater, er det fordi de rigtige Svøm Danmark PDF-dokumenter endnu ikke er tilføjet til appen.

## Nuværende Status

✅ Appen er fuldt funktionel
⚠️ Kun en test-PDF er indlæst
❌ Svøm Danmark dokumenter mangler

## Løsning: Tilføj de rigtige PDF'er

### Trin 1: Test at appen virker

1. Start appen:
   ```bash
   cd svoem-regler-app
   python3 -m http.server 8000
   ```

2. Åbn http://localhost:8000

3. Vent til "Test PDF - PDF.js Eksempel" er indlæst

4. Prøv at søge efter "trace" eller "dynamic" - du skulle få resultater fra test-PDF'en

### Trin 2: Find Svøm Danmark PDF'er

1. Gå til https://www.svoem.org/Redskaber/Regler-og-vedtaegter/

2. Find dokumentet "SW - Svømmeregler" (eller lignende)

3. **Højreklik** på download-knappen/linket

4. Vælg **"Kopier link-adresse"** (Chrome) eller **"Copy Link"** (Firefox/Safari)

5. URL'en skulle ligne: `https://www.svoem.org/media/XXXX/sw-svoemmeregler-20XX.pdf`

### Trin 3: Opdater konfigurationen

1. Åbn filen `documents-config.js` i en teksteditor

2. Find linjen:
   ```javascript
   {
       name: 'Test PDF - PDF.js Eksempel',
       ...
   }
   ```

3. Tilføj et komma efter `}` og tilføj dit dokument:
   ```javascript
   {
       name: 'Test PDF - PDF.js Eksempel',
       url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
       category: 'Test',
       type: 'Demo',
       description: 'Test dokument til at verificere PDF-indlæsning'
   },
   {
       name: 'SW - Svømmeregler 2022-2025',
       url: 'INDSÆT_DIN_KOPIEREDE_URL_HER',
       category: 'SW',
       type: 'Svømmeregler',
       description: 'Officielle svømmeregler for konkurrencer'
   }
   ```

4. Gem filen

### Trin 4: Test igen

1. Genindlæs appen i browseren (Cmd/Ctrl + Shift + R)

2. Åbn browser-konsollen (F12) for at se indlæsnings-status

3. Du skulle se noget som:
   ```
   ✓ Succesfuldt indlæst: Test PDF - PDF.js Eksempel (14 sider)
   ✓ Succesfuldt indlæst: SW - Svømmeregler 2022-2025 (XX sider)

   === INDLÆSNINGS RESUMÉ ===
   Totalt forsøgt: 2
   Succesfuldt indlæst: 2
   Fejlede: 0
   ```

4. Prøv nu at søge efter "butterfly" eller "SW 4.4"

## Fejlfinding

### Fejl: PDF kan ikke indlæses

**I konsollen ser du:**
```
✗ Fejl ved indlæsning af SW - Svømmeregler 2022-2025: ...
```

**Løsninger:**
1. Tjek at URL'en er korrekt kopieret
2. Prøv at åbne URL'en direkte i browseren - virker den?
3. Nogle PDF'er kan være beskyttet eller kræve login
4. Prøv med et andet dokument fra svoem.org

### Fejl: CORS-fejl

Hvis du ser en CORS-fejl i konsollen, skal appen køres fra en webserver (ikke bare ved at åbne index.html direkte).

**Løsning:** Brug en af disse metoder:
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

### Søgningen finder stadig intet

1. Åbn browser-konsollen (F12)
2. Tjek "Dokumenter indekseret" i bunden af appen
3. Hvis det står "0", blev ingen dokumenter indlæst
4. Tjek konsol-loggen for fejlmeddelelser

## Anbefalede dokumenter at tilføje

For at kunne søge efter svømmeregler, tilføj som minimum:

1. **SW - Svømmeregler** (vigtigst!)
   - Indeholder alle SW-regler inkl. butterfly, brystsvømning, etc.
   - Søg efter: "butterfly", "SW 4", "SW 8", "crawl", etc.

2. **Konkurrencebestemmelser**
   - Generelle konkurrenceregler

3. **Vedtægter**
   - Foreningens vedtægter

4. **SW 10 - Tidtagningsudstyr**
   - Tekniske specifikationer

## Eksempel på fuldt konfigureret documents-config.js

```javascript
const documentsConfig = [
    {
        name: 'SW - Svømmeregler 2022-2025',
        url: 'https://www.svoem.org/media/9686/sw-svoemmeregler-2022-2025.pdf',
        category: 'SW',
        type: 'Svømmeregler',
        description: 'Officielle svømmeregler'
    },
    {
        name: 'Konkurrencebestemmelser',
        url: 'https://www.svoem.org/media/9690/konkurrencebestemmelser.pdf',
        category: 'Konkurrence',
        type: 'Bestemmelser',
        description: 'Generelle konkurrencebestemmelser'
    },
    {
        name: 'Vedtægter for Dansk Svømme Union',
        url: 'https://www.svoem.org/media/9688/vedtaegter.pdf',
        category: 'Vedtægter',
        type: 'Organisatorisk',
        description: 'Foreningens vedtægter'
    }
];
```

**Bemærk:** URL'erne ovenfor er kun eksempler. Du skal finde de aktuelle URL'er fra svoem.org.

## Næste skridt

1. ✅ Test appen med test-PDF'en (søg efter "trace")
2. 🔍 Find mindst én rigtig PDF-URL fra svoem.org
3. ✏️ Tilføj den til documents-config.js
4. 🔄 Genindlæs appen
5. 🎉 Søg efter svømmeregler!

---

**Brug for mere hjælp?**
- Se SETUP.md for detaljeret opsætning
- Se DOCUMENTS_URLS.md for mere om PDF-URL'er
- Tjek browser-konsollen (F12) for fejlmeddelelser
