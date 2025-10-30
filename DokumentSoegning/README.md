# DokumentSøgning - iOS Dokumentsøgnings App

En moderne iOS-app til søgning og filtrering af SVOEM dokumenter på dansk.

## Funktioner

### 🔍 Søgning
- Kraftfuld fuldtekstsøgning i dokumenttitler, beskrivelser og tags
- Real-time søgning med debounce for optimal ydeevne
- Søg på tværs af alle dokumentfelter

### 🎯 Filtrering
- Filtrer efter dokumentkategorier:
  - Regler
  - Vedtægter
  - Retningslinjer
  - Politikker
  - Formularer
  - Anden
- Filtrer efter filtyper (PDF, Word, Excel)
- Kombiner flere filtre for præcise resultater
- Visuel indikator for antal aktive filtre

### 📊 Sortering
- Nyeste først
- Ældste først
- Alfabetisk
- Efter kategori

### 📱 Brugervenlig Interface
- Moderne SwiftUI design
- Dansk grænseflade
- Responsivt layout til iPhone og iPad
- Farvekodede kategorier for nem identifikation
- Safari-integration til dokumentvisning
- Del-funktionalitet

## Teknologi

- **SwiftUI** - Moderne deklarativ UI
- **Combine** - Reaktiv programmering til søgning og filtrering
- **MVVM arkitektur** - Klar separation mellem UI og forretningslogik
- **SafariServices** - In-app dokumentvisning

## Projektstruktur

```
DokumentSoegning/
├── DokumentSoegning/
│   ├── DokumentSoegningApp.swift      # App entry point
│   ├── Models/
│   │   └── Document.swift             # Dokument datamodel
│   ├── Views/
│   │   ├── ContentView.swift          # Hovedvisning med søgning
│   │   ├── FilterView.swift           # Filtervisning
│   │   ├── DocumentRowView.swift      # Dokument række komponent
│   │   └── DocumentDetailView.swift   # Dokument detalje side
│   ├── ViewModels/
│   │   └── SearchViewModel.swift      # Søge- og filtreringslogik
│   ├── Services/
│   │   └── DocumentService.swift      # Dokument datahåndtering
│   └── Assets.xcassets/               # App ressourcer
└── DokumentSoegning.xcodeproj/        # Xcode projekt
```

## Installation

### Forudsætninger
- macOS med Xcode 15.0 eller nyere
- iOS 16.0+ til deployment
- Gyldig Apple Developer konto (til kørsel på fysisk enhed)

### Trin-for-trin

1. **Åbn projektet i Xcode:**
   ```bash
   cd DokumentSoegning
   open DokumentSoegning.xcodeproj
   ```

2. **Vælg destination:**
   - For simulator: Vælg en iOS simulator fra device menuen
   - For fysisk enhed: Tilslut din iPhone/iPad og vælg den

3. **Konfigurer signing (kun for fysiske enheder):**
   - Vælg projektet i Project Navigator
   - Gå til "Signing & Capabilities"
   - Vælg dit Team
   - Xcode vil automatisk oprette provisioning profiles

4. **Kør appen:**
   - Tryk Cmd+R eller klik på Play-knappen
   - Appen bygges og starter på valgte destination

## Tilpasning af Dokumenter

### Tilføj Dokumenter fra SVOEM Hjemmesiden

Dokumenterne er defineret i `DocumentService.swift`. For at tilføje faktiske dokumenter fra SVOEM hjemmesiden:

1. **Åbn** `DokumentSoegning/Services/DocumentService.swift`

2. **Tilføj dokumenter** i `loadDokumenter()` metoden:

```swift
dokumenter = [
    Document(
        titel: "Dit dokument titel",
        beskrivelse: "Beskrivelse af dokumentet",
        kategori: .regler,  // eller .vedtaegter, .retningslinjer, etc.
        url: "https://www.svoem.org/din-dokument-url.pdf",
        filType: .pdf,
        tags: ["relevante", "søgeord", "tags"]
    ),
    // Tilføj flere dokumenter...
]
```

### Kategorier

Tilgængelige kategorier (defineret i `Document.swift`):
- `.regler` - Regler
- `.vedtaegter` - Vedtægter
- `.retningslinjer` - Retningslinjer
- `.politikker` - Politikker
- `.formularer` - Formularer
- `.anden` - Anden

### Filtyper

Tilgængelige filtyper:
- `.pdf` - PDF dokumenter
- `.word` - Word dokumenter
- `.excel` - Excel dokumenter
- `.anden` - Andre filtyper

## Fremtidige Forbedringer

### Foreslåede udvidelser:
- [ ] Automatisk hentning af dokumenter fra SVOEM hjemmeside
- [ ] Offline caching af dokumenter
- [ ] Bogmærke funktionalitet
- [ ] Seneste søgninger
- [ ] Push notifikationer ved nye dokumenter
- [ ] Dark mode support
- [ ] PDF preview direkte i appen
- [ ] Eksport af søgeresultater

### Web Scraping Implementation

For at automatisere dokumenthentning fra SVOEM hjemmesiden, kan du implementere følgende i `DocumentService.swift`:

```swift
func fetchDokumenterFraWeb() async throws {
    let url = URL(string: "https://www.svoem.org/Redskaber/Regler-og-vedtaegter/")!
    let (data, _) = try await URLSession.shared.data(from: url)

    // Parse HTML og udtr dokumenter
    // Implementer HTML parsing logik her
    // Opdater dokumenter array
}
```

Du kan bruge biblioteker som SwiftSoup til HTML parsing.

## Brugsanvisning

### Søgning
1. Åbn appen
2. Indtast søgeord i søgefeltet øverst
3. Resultater filtreres automatisk mens du skriver

### Filtrering
1. Tryk på "Filtre" knappen
2. Vælg ønskede kategorier og filtyper
3. Tryk "Færdig" for at anvende filtre
4. Eller tryk på kategori chips i top-baren for hurtig filtrering

### Sortering
1. Tryk på sorteringsknappen (pile-ikon) øverst til højre
2. Vælg ønsket sorteringsmetode

### Se Dokument
1. Tryk på et dokument i listen
2. Se detaljer og metadata
3. Tryk "Åbn dokument" for at åbne i Safari
4. Eller brug "Del dokument" for at dele linket

## Support

For problemer eller spørgsmål:
- Kontakt SVOEM support
- Opret et issue i projektets repository

## Licens

© 2024 SVOEM. Alle rettigheder forbeholdes.

## Bidrag

Dette projekt er udviklet til SVOEM. For at bidrage, kontakt venligst projektejerne.
