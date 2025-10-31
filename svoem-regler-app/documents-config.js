// PDF Documents Configuration
// Add or modify PDF documents here
// To add a new document, copy the template below and fill in the details

const documentsConfig = [
    {
        name: 'SW - Svømmeregler 2022-2025',
        url: 'https://www.svoem.org/media/9686/sw-svoemmeregler-2022-2025-opdateret-18-maj-2023.pdf',
        category: 'SW',
        type: 'Svømmeregler',
        description: 'Officielle svømmeregler for konkurrencer'
    },
    {
        name: 'SW 10 - Automatisk officielt tidtagningsudstyr',
        url: 'https://www.svoem.org/media/9687/sw-10-automatisk-officielt-tidtagningsudstyr.pdf',
        category: 'SW',
        type: 'Teknisk',
        description: 'Regler for automatisk tidtagning'
    },
    {
        name: 'Vedtægter for Dansk Svømme Union 2023',
        url: 'https://www.svoem.org/media/9688/vedtaegter-for-dansk-svomme-union-2023.pdf',
        category: 'Vedtægter',
        type: 'Organisatorisk',
        description: 'Foreningens officielle vedtægter'
    },
    {
        name: 'FR - Frit Vands Regler',
        url: 'https://www.svoem.org/media/9689/fr-frit-vands-regler.pdf',
        category: 'FR',
        type: 'Specialregler',
        description: 'Regler for langdistancesvømning'
    },
    {
        name: 'Konkurrencebestemmelser',
        url: 'https://www.svoem.org/media/9690/konkurrencebestemmelser.pdf',
        category: 'Konkurrence',
        type: 'Bestemmelser',
        description: 'Generelle bestemmelser for konkurrencer'
    },
    {
        name: 'GR - Generalforsamlingsregler',
        url: 'https://www.svoem.org/media/9691/gr-generalforsamlingsregler.pdf',
        category: 'GR',
        type: 'Organisatorisk',
        description: 'Regler for afholdelse af generalforsamling'
    },
    {
        name: 'C - Coaching Code',
        url: 'https://www.svoem.org/media/9692/c-coaching-code.pdf',
        category: 'Coaching',
        type: 'Etik',
        description: 'Etiske retningslinjer for trænere'
    }

    /*
    Template for adding new documents:

    {
        name: 'Document Title',
        url: 'https://www.svoem.org/media/XXXX/filename.pdf',
        category: 'SW|FR|GR|Vedtægter|Konkurrence|etc',
        type: 'Type of document',
        description: 'Brief description in Danish'
    }

    Instructions:
    1. Visit https://www.svoem.org/Redskaber/Regler-og-vedtaegter/
    2. Find the PDF you want to add
    3. Right-click on the download link and copy the URL
    4. Add a new object to this array with the details
    5. Save the file
    6. The app will automatically index the new document on next load

    Categories:
    - SW: Swimming rules
    - FR: Open water rules
    - GR: General assembly rules
    - Vedtægter: Statutes
    - Konkurrence: Competition rules
    - Coaching: Coaching guidelines
    - Add your own as needed
    */
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = documentsConfig;
}
