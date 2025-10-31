# Instruktioner til at finde de rigtige PDF-URL'er

## ⚠️ VIGTIGT

Appen er lige nu konfigureret med en **test-PDF** for at demonstrere funktionaliteten. Denne test-PDF indeholder ikke Svøm Danmark regler.

For at søge efter "butterfly", "SW 4.4" osv., skal du først tilføje de rigtige PDF-dokumenter fra Svøm Danmark.

Da websitet https://www.svoem.org/Redskaber/Regler-og-vedtaegter/ har beskyttelse mod automatisk adgang, skal du manuelt finde de korrekte PDF-URL'er.

## 📋 Trin-for-trin vejledning

### 1. Besøg Svøm Danmarks hjemmeside

Gå til: https://www.svoem.org/Redskaber/Regler-og-vedtaegter/

### 2. Find de dokumenter du vil indeksere

De vigtigste dokumenter inkluderer typisk:

- **SW - Svømmeregler** (Swimming Rules)
- **SW 10** - Automatisk officielt tidtagningsudstyr
- **FR - Frit Vands Regler** (Open Water Rules)
- **GR - Generalforsamlingsregler** (General Assembly Rules)
- **Vedtægter** (Statutes)
- **Konkurrencebestemmelser** (Competition Regulations)
- **Coaching Code**
- **Dommerregler**

### 3. Kopier PDF-links

For hvert dokument:

1. Find download-linket på siden
2. **Højreklik** på linket
3. Vælg **"Kopier link-adresse"** (Chrome) eller **"Copy Link"** (Safari/Firefox)
4. URL'en skulle ligne: `https://www.svoem.org/media/XXXX/filnavn.pdf`

### 4. Opdater konfigurationsfilen

Åbn `documents-config.js` og udskift eksempel-URL'erne med de rigtige:

```javascript
{
    name: 'SW - Svømmeregler 2022-2025',
    url: 'DIN_KOPIEREDE_URL_HER',
    category: 'SW',
    type: 'Svømmeregler',
    description: 'Officielle svømmeregler for konkurrencer'
}
```

## 📱 Eksempel på korrekt URL-format

De rigtige URL'er fra svoem.org ser sådan ud:

```
https://www.svoem.org/media/[NUMBER]/[filename].pdf
```

For eksempel:
```
https://www.svoem.org/media/12345/sw-svoemmeregler-2023.pdf
```

## ⚠️ Vigtige noter

1. **URL'erne i `documents-config.js` er kun eksempler** - de skal erstattes med de aktuelle URL'er fra hjemmesiden
2. Dokumenterne opdateres regelmæssigt, så tjek datoen på dokumenterne
3. Nogle dokumenter kan være beskyttet eller kræve login
4. Test hver URL ved at åbne den direkte i browseren

## 🔍 Alternative metoder

### Metode 1: Browser Developer Tools

1. Åbn siden i Chrome/Firefox
2. Tryk F12 for at åbne Developer Tools
3. Gå til "Network" fanen
4. Klik på et dokument for at downloade det
5. Se URL'en i Network-loggen

### Metode 2: Inspicer Element

1. Højreklik på download-knappen
2. Vælg "Inspicér" eller "Inspect Element"
3. Find `<a href="...">` tagget
4. Kopier URL'en fra href-attributten

## 📝 Dokumentliste til reference

Her er en tjekliste over typiske dokumenter at indeksere:

- [ ] SW - Svømmeregler (seneste version)
- [ ] SW 10 - Tidtagningsudstyr
- [ ] FR - Frit Vands Regler
- [ ] GR - Generalforsamlingsregler
- [ ] Vedtægter for Dansk Svømme Union
- [ ] Konkurrencebestemmelser
- [ ] Coaching Code
- [ ] Dommerregler og -vejledninger
- [ ] Masters-regler (hvis relevant)
- [ ] Håndbold i vand regler (hvis relevant)

## 🆘 Problemer?

Hvis du har problemer med at finde URL'erne:

1. Kontakt Svøm Danmark direkte
2. Spørg din klub eller forbund
3. Tjek om dokumenterne er flyttet til en ny placering
4. Verificer at du har adgang til dokumenterne

---

**Efter opdatering af URL'erne:**
1. Gem `documents-config.js`
2. Genindlæs appen
3. Dokumenterne vil blive indekseret automatisk
