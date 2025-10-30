//
//  SearchViewModel.swift
//  DokumentSoegning
//
//  ViewModel til søgning og filtrering af dokumenter
//

import Foundation
import Combine

class SearchViewModel: ObservableObject {
    @Published var soegeord: String = ""
    @Published var valgtKategorier: Set<DokumentKategori> = []
    @Published var valgtFilTyper: Set<FilType> = []
    @Published var sorteringsmetode: Sorteringsmetode = .nyeste
    @Published var visFiltre: Bool = false

    private let documentService: DocumentService
    private var cancellables = Set<AnyCancellable>()

    @Published var filtreretDokumenter: [Document] = []

    init(documentService: DocumentService) {
        self.documentService = documentService

        // Observer ændringer i søgeord og filtre
        Publishers.CombineLatest4(
            $soegeord,
            $valgtKategorier,
            $valgtFilTyper,
            $sorteringsmetode
        )
        .debounce(for: .milliseconds(300), scheduler: RunLoop.main)
        .combineLatest(documentService.$dokumenter)
        .map { [weak self] (soegeord, kategorier, filTyper, sortering), dokumenter in
            self?.filtrerOgSorterDokumenter(
                dokumenter: dokumenter,
                soegeord: soegeord,
                kategorier: kategorier,
                filTyper: filTyper,
                sortering: sortering
            ) ?? []
        }
        .assign(to: &$filtreretDokumenter)
    }

    private func filtrerOgSorterDokumenter(
        dokumenter: [Document],
        soegeord: String,
        kategorier: Set<DokumentKategori>,
        filTyper: Set<FilType>,
        sortering: Sorteringsmetode
    ) -> [Document] {
        var resultat = dokumenter

        // Filtrer efter søgeord
        if !soegeord.isEmpty {
            let soeg = soegeord.lowercased()
            resultat = resultat.filter { dokument in
                dokument.titel.lowercased().contains(soeg) ||
                dokument.beskrivelse.lowercased().contains(soeg) ||
                dokument.tags.contains { $0.lowercased().contains(soeg) }
            }
        }

        // Filtrer efter kategorier
        if !kategorier.isEmpty {
            resultat = resultat.filter { kategorier.contains($0.kategori) }
        }

        // Filtrer efter filtyper
        if !filTyper.isEmpty {
            resultat = resultat.filter { filTyper.contains($0.filType) }
        }

        // Sorter resultater
        switch sortering {
        case .nyeste:
            resultat.sort { $0.sidstOpdateret > $1.sidstOpdateret }
        case .aeldste:
            resultat.sort { $0.sidstOpdateret < $1.sidstOpdateret }
        case .alfabetisk:
            resultat.sort { $0.titel < $1.titel }
        case .kategori:
            resultat.sort { $0.kategori.rawValue < $1.kategori.rawValue }
        }

        return resultat
    }

    func toggleKategori(_ kategori: DokumentKategori) {
        if valgtKategorier.contains(kategori) {
            valgtKategorier.remove(kategori)
        } else {
            valgtKategorier.insert(kategori)
        }
    }

    func toggleFilType(_ filType: FilType) {
        if valgtFilTyper.contains(filType) {
            valgtFilTyper.remove(filType)
        } else {
            valgtFilTyper.insert(filType)
        }
    }

    func rydFiltre() {
        valgtKategorier.removeAll()
        valgtFilTyper.removeAll()
        soegeord = ""
    }

    var antalAktiveFiltre: Int {
        valgtKategorier.count + valgtFilTyper.count
    }
}

enum Sorteringsmetode: String, CaseIterable {
    case nyeste = "Nyeste først"
    case aeldste = "Ældste først"
    case alfabetisk = "Alfabetisk"
    case kategori = "Efter kategori"
}
