// Document categories with icons and colors
const CATEGORIES = {
    REGLER: {
        name: 'Regler',
        icon: '📋',
        color: 'regler'
    },
    VEDTAEGTER: {
        name: 'Vedtægter',
        icon: '📘',
        color: 'vedtaegter'
    },
    RETNINGSLINJER: {
        name: 'Retningslinjer',
        icon: '📝',
        color: 'retningslinjer'
    },
    POLITIKKER: {
        name: 'Politikker',
        icon: '🛡️',
        color: 'politikker'
    },
    FORMULARER: {
        name: 'Formularer',
        icon: '📄',
        color: 'formularer'
    },
    ANDEN: {
        name: 'Anden',
        icon: '📁',
        color: 'anden'
    }
};

// File types
const FILE_TYPES = {
    PDF: 'PDF',
    WORD: 'Word',
    EXCEL: 'Excel',
    ANDEN: 'Anden'
};

// Sample documents data
// Replace these with actual documents from https://www.svoem.org/Redskaber/Regler-og-vedtaegter/
const DOCUMENTS = [
    {
        id: '1',
        titel: 'Adfaerdskodes for SVOEM',
        beskrivelse: 'Adfaerdskodeks for alle grene af SVOEM.',
        kategori: CATEGORIES.RETNINGSLINJER,
        url: 'https://www.svoem.org/_files/_database/database105/AdfrdskodeksSvmDanmark.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2015-10-01'),
        tags: ['retningslinjer', 'organisation', 'regler', 'bestyrelse', 'kodeks'],
        content: 'ADFÆRDSKODEKS FOR SVØM DANMARK. Dette adfærdskodeks gælder for alle tillidsvalgte, ansatte, trænere, dommere, frivillige samt andre personer med tilknytning til Svøm Danmark. Formålet med dette kodeks er at sikre en sund og tryg idrætskultur. Alle medlemmer skal behandle hinanden med respekt og værdighed. Diskrimination på baggrund af køn, race, religion eller seksuel orientering accepteres ikke. Alle har et ansvar for at skabe et positivt miljø.'
    },
    {
        id: '2',
        titel: 'Forretningsorden',
        beskrivelse: 'Forretningsorden for bestyrelsesmøder og generalforsamlinger. Beskriver procedurer og protokol for mødeafholdelse.',
        kategori: CATEGORIES.REGLER,
        url: 'https://www.svoem.org/_files/_database/database105/Forretningsordenforbestyrelsenjanuar2024.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2024-01-01'),
        tags: ['bestyrelse', 'møder', 'procedure', 'protokol'],
        content: 'FORRETNINGSORDEN FOR BESTYRELSEN I SVØM DANMARK. Bestyrelsen holder møder efter behov, dog mindst fire gange årligt. Formanden indkalder til møderne med mindst 14 dages varsel. Mødet er beslutningsdygtigt når mindst halvdelen af bestyrelsens medlemmer er tilstede. Beslutninger træffes ved simpelt flertal. Ved stemmelighed er formandens stemme afgørende. Der føres referat af alle møder som skal godkendes på næste møde.'
    },
    {
        id: '3',
        titel: 'Eventbestemmelser',
        beskrivelse: 'Eventbestemmelser for SVØM events',
        kategori: CATEGORIES.REGLER,
        url: 'https://www.svoem.org/_files/_database/database105/Eventbestemmelser_svoemning.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2025-10-1'),
        tags: ['regler', 'events'],
        content: 'EVENTBESTEMMELSER FOR SVØMNING. Alle stævner skal afholdes i henhold til gældende regler og forskrifter. Stævnearrangøren er ansvarlig for at faciliteter lever op til sikkerhedskrav. Deltagere skal være registreret og have gyldig licens. Tidtagning skal følge officielle procedurer. Svømmere skal møde rettidigt til opvarmning og konkurrence. Protest skal indgives skriftligt inden 30 minutter efter konkurrencens afslutning.'
    },
    {
        id: '4',
        titel: 'Svømmeregler',
        beskrivelse: 'World Aquatics svømmeregler i dansk oversættelse.',
        kategori: CATEGORIES.REGLER,
        url: 'https://www.svoem.org/_files/_database/database105/WorldAquaticsSvoemmereglerjanuar2024.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2024-01-01'),
        tags: ['regler', 'svømning', 'world aquatics'],
        content: 'WORLD AQUATICS SVØMMEREGLER. Alle discipliner skal svømmes i henhold til reglerne fastsat af World Aquatics. **SW 2.1.1** Når starteren har modtaget signal fra hovedtidstageren om, at tidtagerne er klar, skal starteren tage kontrol over **starten**. **SW 2.1.2** Fra **starten** og gennem løbet skal svømmeren svømme en distance på 50 meter. **SW 2.1.3** Crawl: Svømmeren skal hele tiden være i vandret stilling på maven fra **starten**. **SW 2.2** Brystsvømning: Skuldrene skal holdes i horisontal stilling. **SW 2.3** Butterfly: Begge arme skal føres frem over vandet samtidigt fra **starten**. **SW 2.4** Rygcrawl: Svømmeren skal ligge på ryggen gennem hele distancen. Ved vending og mål skal berøring ske med begge hænder samtidigt i brystsvømning og butterfly.'
    }
];
