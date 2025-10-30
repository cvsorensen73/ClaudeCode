//
//  DocumentService.swift
//  DokumentSoegning
//
//  Service til håndtering af dokumentdata
//

import Foundation

class DocumentService: ObservableObject {
    @Published var dokumenter: [Document] = []

    init() {
        loadDokumenter()
    }

    private func loadDokumenter() {
        // Eksempel dokumenter - disse kan erstattes med faktiske data fra SVOEM hjemmesiden
        dokumenter = [
            Document(
                titel: "Vedtægter for SVOEM",
                beskrivelse: "Officielle vedtægter for Sammenslutningen af Vandværker i Odense og Omegn",
                kategori: .vedtaegter,
                url: "https://www.svoem.org/vedtaegter.pdf",
                filType: .pdf,
                tags: ["vedtægter", "organisation", "regler"]
            ),
            Document(
                titel: "Forretningsorden",
                beskrivelse: "Forretningsorden for bestyrelsesmøder",
                kategori: .regler,
                url: "https://www.svoem.org/forretningsorden.pdf",
                filType: .pdf,
                tags: ["bestyrelse", "møder", "procedure"]
            ),
            Document(
                titel: "Persondatapolitik",
                beskrivelse: "Politik for håndtering af persondata i overensstemmelse med GDPR",
                kategori: .politikker,
                url: "https://www.svoem.org/persondatapolitik.pdf",
                filType: .pdf,
                tags: ["GDPR", "persondata", "databeskyttelse"]
            ),
            Document(
                titel: "Retningslinjer for vandkvalitet",
                beskrivelse: "Retningslinjer og krav til drikkevandskvalitet",
                kategori: .retningslinjer,
                url: "https://www.svoem.org/vandkvalitet.pdf",
                filType: .pdf,
                tags: ["vandkvalitet", "drikkevand", "sundhed"]
            ),
            Document(
                titel: "Ansøgningsskema medlemskab",
                beskrivelse: "Formular til ansøgning om medlemskab af SVOEM",
                kategori: .formularer,
                url: "https://www.svoem.org/medlemskab.pdf",
                filType: .pdf,
                tags: ["medlemskab", "ansøgning", "tilmelding"]
            ),
            Document(
                titel: "Beredskabsplan",
                beskrivelse: "Plan for håndtering af beredskabssituationer",
                kategori: .retningslinjer,
                url: "https://www.svoem.org/beredskab.pdf",
                filType: .pdf,
                tags: ["beredskab", "nødsituation", "sikkerhed"]
            ),
            Document(
                titel: "Økonomireglement",
                beskrivelse: "Reglement for økonomistyring og regnskabsføring",
                kategori: .regler,
                url: "https://www.svoem.org/oekonomi.pdf",
                filType: .pdf,
                tags: ["økonomi", "regnskab", "budget"]
            ),
            Document(
                titel: "Miljøpolitik",
                beskrivelse: "Politik for miljøbeskyttelse og bæredygtighed",
                kategori: .politikker,
                url: "https://www.svoem.org/miljoe.pdf",
                filType: .pdf,
                tags: ["miljø", "bæredygtighed", "klima"]
            )
        ]
    }

    // Tilføj funktion til at hente dokumenter fra web (til fremtidig brug)
    func fetchDokumenterFraWeb() async throws {
        // Implementer hentning fra SVOEM hjemmeside
        // Dette kan udvides til at parse hjemmesiden og hente dokumenter
    }

    // Tilføj nyt dokument
    func tilfoejDokument(_ dokument: Document) {
        dokumenter.append(dokument)
    }

    // Fjern dokument
    func fjernDokument(_ dokument: Document) {
        dokumenter.removeAll { $0.id == dokument.id }
    }
}
