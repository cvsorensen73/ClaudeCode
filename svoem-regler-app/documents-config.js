// TEST KONFIGURATION - Demo PDF for at teste funktionaliteten
// Denne fil indeholder en test-PDF der garanteret virker

const documentsConfig = [
    // TEST PDF - PDF.js test dokument
    {
        name: 'Test PDF - PDF.js Eksempel',
        url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
        category: 'Test',
        type: 'Demo',
        description: 'Test dokument til at verificere PDF-indlæsning'
    }

    /*
    ===================================================================
    SVØM DANMARK DOKUMENTER
    ===================================================================

    For at tilføje de rigtige Svøm Danmark dokumenter, skal du:

    1. Gå til: https://www.svoem.org/Redskaber/Regler-og-vedtaegter/
    2. Find hvert dokument på siden
    3. Højreklik på download-linket
    4. Vælg "Kopier link-adresse"
    5. Tilføj dokumentet nedenfor ved at fjerne kommentaren og indsætte URL'en

    Eksempel på hvordan du tilføjer et dokument:

    ,{
        name: 'SW - Svømmeregler 2022-2025',
        url: 'https://www.svoem.org/media/XXXX/filnavn.pdf',
        category: 'SW',
        type: 'Svømmeregler',
        description: 'Officielle svømmeregler for konkurrencer'
    }

    ===================================================================
    DOKUMENTER AT TILFØJE:
    ===================================================================

    Kommentér disse ind og opdater URL'erne:

    ,{
        name: 'SW - Svømmeregler',
        url: 'URL_HER',
        category: 'SW',
        type: 'Svømmeregler',
        description: 'Officielle svømmeregler - indeholder butterfly, brystsvømning, rygsvømning, fri svømning'
    }
    ,{
        name: 'SW 10 - Automatisk officielt tidtagningsudstyr',
        url: 'URL_HER',
        category: 'SW',
        type: 'Teknisk',
        description: 'Regler for automatisk tidtagning'
    }
    ,{
        name: 'Vedtægter for Dansk Svømme Union',
        url: 'URL_HER',
        category: 'Vedtægter',
        type: 'Organisatorisk',
        description: 'Foreningens officielle vedtægter'
    }
    ,{
        name: 'FR - Frit Vands Regler',
        url: 'URL_HER',
        category: 'FR',
        type: 'Specialregler',
        description: 'Regler for langdistancesvømning'
    }
    ,{
        name: 'Konkurrencebestemmelser',
        url: 'URL_HER',
        category: 'Konkurrence',
        type: 'Bestemmelser',
        description: 'Generelle bestemmelser for konkurrencer'
    }
    ,{
        name: 'GR - Generalforsamlingsregler',
        url: 'URL_HER',
        category: 'GR',
        type: 'Organisatorisk',
        description: 'Regler for afholdelse af generalforsamling'
    }
    ,{
        name: 'Coaching Code',
        url: 'URL_HER',
        category: 'Coaching',
        type: 'Etik',
        description: 'Etiske retningslinjer for trænere'
    }

    ===================================================================
    VIGTIG INFORMATION:
    ===================================================================

    - Kun test-PDF'en er aktiveret lige nu
    - Du SKAL finde de rigtige URL'er fra svoem.org
    - URL'erne i eksemplerne ovenfor er IKKE rigtige
    - Se DOCUMENTS_URLS.md for detaljeret vejledning
    - Efter opdatering, genindlæs appen (Cmd/Ctrl + Shift + R)

    ===================================================================
    */
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = documentsConfig;
}
