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
        content: 'WORLD AQUATICS SVØMMEREGLER. Alle discipliner skal svømmes i henhold til reglerne fastsat af World Aquatics. **SW 2 OFFICIALS** **SW 2.1** Stævnedirektør. Stævnedirektøren har den overordnede kontrol over konkurrencen. **SW 2.1.1** Stævnedirektøren skal sikre at alle officials er til stede ved deres respektive stationer. **SW 2.1.2** Stævnedirektøren skal håndhæve alle regler og afgørelser fra World Aquatics. **SW 2.2** Referee. Referee skal have fuld kontrol over alle officials. **SW 2.3** Kontrol dommer. Kontroldommere skal sikre korrekt svømning i henhold til reglerne. **SW 2.4** Inspektører for vending. Inspektørerne skal sikre at svømmerne udfører vendingerne korrekt. **SW 3 STÆVNER** **SW 3.1** Alle stævner skal foregå i bassiner godkendt af World Aquatics. **SW 3.2** Bassinet skal være 50 meter langt eller 25 meter langt. **SW 4 STARTEN** **SW 4.1** Starten skal gives med et startsignal. **SW 4.2** Ved langebane konkurrencer skal starten foregå med et spring fra startskamlen. **SW 4.3** Ved rygcrawl og medley skal starten foregå i vandet. **SW 4.4** Når alle svømmere står stille skal starteren give startsignalet. **SW 5 FRISTYLING** **SW 5.1** Fristyling betyder at svømmeren kan svømme enhver stil. **SW 5.2** Svømmeren skal berøre væggen ved vending og ved mål. **SW 6 RYGCRAWL** **SW 6.1** Svømmeren skal ligge på ryggen gennem hele løbet. **SW 6.2** Ved vending skal svømmeren berøre væggen med en hvilken som helst del af kroppen. **SW 7 BRYSTSVØMNING** **SW 7.1** Fra starten og gennem hele løbet skal kropspositionen være på brystet. **SW 7.2** Alle bevægelser af armene skal være samtidige og i samme vandrette plan. **SW 7.3** Hænderne skal føres frem fra brystet under eller over vandet. **SW 7.4** Albuerne skal være under vandet undtagen ved det sidste armtræk før vendingen. **SW 8 BUTTERFLY** **SW 8.1** Begge arme skal føres frem samtidigt over vandet. **SW 8.2** Alle opad- og nedadbevægelser af benene skal være samtidige.'
    }
];
