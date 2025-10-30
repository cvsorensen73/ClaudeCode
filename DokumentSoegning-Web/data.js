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
        titel: 'Vedtægter for SVOEM',
        beskrivelse: 'Officielle vedtægter for Sammenslutningen af Vandværker i Odense og Omegn. Dokumentet indeholder alle vedtægter og regler for organisationen.',
        kategori: CATEGORIES.VEDTAEGTER,
        url: 'https://www.svoem.org/vedtaegter.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2024-01-15'),
        tags: ['vedtægter', 'organisation', 'regler', 'bestyrelse']
    },
    {
        id: '2',
        titel: 'Forretningsorden',
        beskrivelse: 'Forretningsorden for bestyrelsesmøder og generalforsamlinger. Beskriver procedurer og protokol for mødeafholdelse.',
        kategori: CATEGORIES.REGLER,
        url: 'https://www.svoem.org/forretningsorden.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2023-11-20'),
        tags: ['bestyrelse', 'møder', 'procedure', 'protokol']
    },
    {
        id: '3',
        titel: 'Persondatapolitik',
        beskrivelse: 'Politik for håndtering af persondata i overensstemmelse med GDPR. Indeholder retningslinjer for databeskyttelse og privatlivspolitik.',
        kategori: CATEGORIES.POLITIKKER,
        url: 'https://www.svoem.org/persondatapolitik.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2024-02-10'),
        tags: ['GDPR', 'persondata', 'databeskyttelse', 'privatliv']
    },
    {
        id: '4',
        titel: 'Retningslinjer for vandkvalitet',
        beskrivelse: 'Retningslinjer og krav til drikkevandskvalitet. Indeholder målinger, standarder og overvågningsprocedurer.',
        kategori: CATEGORIES.RETNINGSLINJER,
        url: 'https://www.svoem.org/vandkvalitet.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2024-03-05'),
        tags: ['vandkvalitet', 'drikkevand', 'sundhed', 'målinger']
    },
    {
        id: '5',
        titel: 'Ansøgningsskema medlemskab',
        beskrivelse: 'Formular til ansøgning om medlemskab af SVOEM. Skal udfyldes af vandværker der ønsker at blive medlem.',
        kategori: CATEGORIES.FORMULARER,
        url: 'https://www.svoem.org/medlemskab.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2023-12-01'),
        tags: ['medlemskab', 'ansøgning', 'tilmelding', 'vandværk']
    },
    {
        id: '6',
        titel: 'Beredskabsplan',
        beskrivelse: 'Plan for håndtering af beredskabssituationer og nødsituationer. Indeholder procedurer for krisestyring og kommunikation.',
        kategori: CATEGORIES.RETNINGSLINJER,
        url: 'https://www.svoem.org/beredskab.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2024-01-25'),
        tags: ['beredskab', 'nødsituation', 'sikkerhed', 'krise']
    },
    {
        id: '7',
        titel: 'Økonomireglement',
        beskrivelse: 'Reglement for økonomistyring og regnskabsføring. Beskriver procedurer for budget, regnskab og revision.',
        kategori: CATEGORIES.REGLER,
        url: 'https://www.svoem.org/oekonomi.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2023-10-15'),
        tags: ['økonomi', 'regnskab', 'budget', 'revision']
    },
    {
        id: '8',
        titel: 'Miljøpolitik',
        beskrivelse: 'Politik for miljøbeskyttelse og bæredygtighed. Indeholder mål og strategier for miljøvenlig drift.',
        kategori: CATEGORIES.POLITIKKER,
        url: 'https://www.svoem.org/miljoe.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2024-02-28'),
        tags: ['miljø', 'bæredygtighed', 'klima', 'grøn omstilling']
    },
    {
        id: '9',
        titel: 'Sikkerhedsprocedurer',
        beskrivelse: 'Procedurer for sikkerhed ved vandværker. Omfatter arbejdsmiljø, beredskab og sikkerhedsudstyr.',
        kategori: CATEGORIES.RETNINGSLINJER,
        url: 'https://www.svoem.org/sikkerhed.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2023-09-10'),
        tags: ['sikkerhed', 'arbejdsmiljø', 'procedurer', 'udstyr']
    },
    {
        id: '10',
        titel: 'Kvalitetssikringssystem',
        beskrivelse: 'System for kvalitetssikring af vandproduktion. Indeholder standarder, målinger og dokumentationskrav.',
        kategori: CATEGORIES.RETNINGSLINJER,
        url: 'https://www.svoem.org/kvalitet.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2024-01-05'),
        tags: ['kvalitet', 'sikring', 'standarder', 'dokumentation']
    },
    {
        id: '11',
        titel: 'Kommunikationspolitik',
        beskrivelse: 'Politik for intern og ekstern kommunikation. Beskriver retningslinjer for pressehåndtering og information.',
        kategori: CATEGORIES.POLITIKKER,
        url: 'https://www.svoem.org/kommunikation.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2023-11-30'),
        tags: ['kommunikation', 'information', 'presse', 'medier']
    },
    {
        id: '12',
        titel: 'Årsberetning 2023',
        beskrivelse: 'Årsberetning for SVOEM 2023. Indeholder aktivitetsrapport, regnskab og fremtidsplaner.',
        kategori: CATEGORIES.ANDEN,
        url: 'https://www.svoem.org/aarsberetning-2023.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2024-03-15'),
        tags: ['årsberetning', 'rapport', 'regnskab', 'aktiviteter']
    },
    {
        id: '13',
        titel: 'Kontingentregler',
        beskrivelse: 'Regler for kontingentbetaling for medlemmer. Beskriver satser, betalingsfrister og procedurer.',
        kategori: CATEGORIES.REGLER,
        url: 'https://www.svoem.org/kontingent.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2024-01-01'),
        tags: ['kontingent', 'betaling', 'medlemskab', 'satser']
    },
    {
        id: '14',
        titel: 'Samarbejdsaftale skabelon',
        beskrivelse: 'Skabelon for samarbejdsaftaler mellem vandværker. Kan tilpasses til specifikke samarbejdsprojekter.',
        kategori: CATEGORIES.FORMULARER,
        url: 'https://www.svoem.org/samarbejdsaftale.pdf',
        filType: FILE_TYPES.WORD,
        sidstOpdateret: new Date('2023-08-20'),
        tags: ['samarbejde', 'aftale', 'kontrakt', 'vandværk']
    },
    {
        id: '15',
        titel: 'Whistleblower-ordning',
        beskrivelse: 'Retningslinjer for whistleblower-ordning. Beskriver procedurer for anmeldelse af bekymringer.',
        kategori: CATEGORIES.POLITIKKER,
        url: 'https://www.svoem.org/whistleblower.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2023-12-15'),
        tags: ['whistleblower', 'anmeldelse', 'etik', 'compliance']
    }
];
