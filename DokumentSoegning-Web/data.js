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
        content: '**ADFÆRDSKODEKS FOR SVØM DANMARK** Dette adfærdskodeks gælder for alle tillidsvalgte, ansatte, trænere, dommere, frivillige samt andre personer med tilknytning til Svøm Danmark. **1. FORMÅL** Formålet med dette kodeks er at sikre en sund og tryg idrætskultur. **2. RESPEKT OG VÆRDIGHED** Alle medlemmer skal behandle hinanden med **respekt** og værdighed. Diskrimination på baggrund af køn, race, religion eller seksuel orientering accepteres ikke. **3. ANSVAR** Alle har et ansvar for at skabe et positivt miljø. **4. TILLID** Medlemmer skal opbygge og bevare tillid gennem ærlig og åben kommunikation.'
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
        content: '**FORRETNINGSORDEN FOR BESTYRELSEN I SVØM DANMARK** **§ 1 MØDER** Bestyrelsen holder **møder** efter behov, dog mindst fire gange årligt. **§ 2 INDKALDELSE** Formanden indkalder til møderne med mindst 14 dages varsel. **§ 3 BESLUTNINGSDYGTIGHED** Mødet er beslutningsdygtigt når mindst halvdelen af bestyrelsens medlemmer er tilstede. **§ 4 AFSTEMNING** Beslutninger træffes ved simpelt flertal. Ved stemmelighed er formandens stemme afgørende. **§ 5 REFERAT** Der føres referat af alle møder som skal godkendes på næste møde. **§ 6 TAVSHEDSPLIGT** Bestyrelsesmedlemmer har tavshedspligt om fortrolige oplysninger.'
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
        content: '**EVENTBESTEMMELSER FOR SVØMNING** **1. GENERELT** Alle **stævner** skal afholdes i henhold til gældende regler og forskrifter. **2. ARRANGØRENS ANSVAR** Stævnearrangøren er ansvarlig for at faciliteter lever op til sikkerhedskrav. **3. DELTAGELSE** Deltagere skal være registreret og have gyldig **licens**. **4. TIDTAGNING** Tidtagning skal følge officielle procedurer. **5. FREMMØDE** Svømmere skal møde rettidigt til **opvarmning** og konkurrence. **6. PROTEST** Protest skal indgives skriftligt inden 30 minutter efter konkurrencens afslutning. **7. DOPING** Dopingkontrol kan foretages ved alle stævner.'
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
        content: 'WORLD AQUATICS SVØMMEREGLER. Alle discipliner skal svømmes i henhold til reglerne fastsat af World Aquatics. **SW 2 STARTEN** **SW 2.1** Starten i crawl, brystsvømning, butterfly og medley skal foregå med et spring. **SW 2.1.1** Når starteren har modtaget signal fra hovedtidstageren om, at tidtagerne er klar, skal starteren tage kontrol over **starten**. **SW 2.1.2** Fra **starten** og gennem løbet skal svømmeren svømme en distance på 50 meter. **SW 2.1.3** Startsignalet skal være et langt fløjt efterfulgt af kommandoen "på pladsen". **SW 2.2** Ved kommandoen "på pladsen" skal svømmerne straks indtage deres startposition. **SW 2.3** Når alle svømmere står stille, skal starteren give startsignalet. **SW 2.4** Enhver svømmer der starter før startsignalet skal diskvalificeres. **SW 3 FRISTYLING** **SW 3.1** Fristyling betyder at svømmeren i et sådant løb kan svømme enhver stil. **SW 3.2** Svømmeren skal berøre væggen ved vending og ved mål. **SW 4 BRYSTSVØMNING** **SW 4.1** Fra **starten** og gennem hele løbet skal kropspositionen være på brystet. **SW 4.2** Alle bevægelser af armene skal være samtidige og i samme vandrette plan. **SW 4.3** Hænderne skal føres frem fra brystet under eller over vandet. **SW 4.4** Albuerne skal være under vandet undtagen ved det sidste armtræk før vendingen, under vendingen og ved det sidste armtræk ved målet. **SW 4.5** Hænderne må ikke føres tilbage bag hoftelinjen, undtagen under eller efter den afsluttende armtræk, under vendingen eller ved det sidste armtræk ved målet. **SW 5 BUTTERFLY** **SW 5.1** Fra **starten** og gennem hele løbet skal kropspositionen være på brystet. **SW 5.2** Begge arme skal føres frem samtidigt over vandet og trækkes tilbage samtidigt gennem hele løbet. **SW 5.3** Alle opad- og nedadbevægelser af benene skal være samtidige. **SW 6 RYGCRAWL** **SW 6.1** Svømmeren skal ligge på ryggen gennem hele løbet undtagen ved vendingen.'
    }
];
