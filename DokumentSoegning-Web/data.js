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
        titel: 'Adfærdskodes for SVOEM',
        beskrivelse: 'Adfærdskodeks for alle grene af SVOEM.',
        kategori: CATEGORIES.RETNINGSLINJER,
        url: 'https://www.svoem.org/_files/_database/database105/AdfrdskodeksSvmDanmark.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2015-10-01'),
        tags: ['retningslinjer', 'organisation', 'regler', 'bestyrelse', 'kodeks']
    },
    {
        id: '2',
        titel: 'Forretningsorden',
        beskrivelse: 'Forretningsorden for bestyrelsesmøder og generalforsamlinger. Beskriver procedurer og protokol for mødeafholdelse.',
        kategori: CATEGORIES.REGLER,
        url: 'https://www.svoem.org/_files/_database/database105/Forretningsordenforbestyrelsenjanuar2024.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2024-01-01'),
        tags: ['bestyrelse', 'møder', 'procedure', 'protokol']
    },
    {
        id: '3',
        titel: 'Eventbestemmelser',
        beskrivelse: 'Eventbestemmelser for SVØM events',
        kategori: CATEGORIES.REGLER,
        url: 'https://www.svoem.org/_files/_database/database105/Eventbestemmelser_svoemning.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2025-10-1'),
        tags: ['regler', 'events']
    },
    {
        id: '4',
        titel: 'Svømmeregler',
        beskrivelse: 'World Aquatics svømmeregler i dansk oversættelse.',
        kategori: CATEGORIES.REGLER,
        url: 'https://www.svoem.org/_files/_database/database105/WorldAquaticsSvoemmereglerjanuar2024.pdf',
        filType: FILE_TYPES.PDF,
        sidstOpdateret: new Date('2024-01-01'),
        tags: ['regler', 'svømning', 'world aquatics']
    }
];
