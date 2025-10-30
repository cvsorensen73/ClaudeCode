//
//  Document.swift
//  DokumentSoegning
//
//  Model for dokumenter
//

import Foundation

struct Document: Identifiable, Codable {
    let id: UUID
    let titel: String
    let beskrivelse: String
    let kategori: DokumentKategori
    let url: String
    let filType: FilType
    let sidstOpdateret: Date
    let tags: [String]

    init(id: UUID = UUID(), titel: String, beskrivelse: String, kategori: DokumentKategori, url: String, filType: FilType, sidstOpdateret: Date = Date(), tags: [String] = []) {
        self.id = id
        self.titel = titel
        self.beskrivelse = beskrivelse
        self.kategori = kategori
        self.url = url
        self.filType = filType
        self.sidstOpdateret = sidstOpdateret
        self.tags = tags
    }
}

enum DokumentKategori: String, Codable, CaseIterable {
    case regler = "Regler"
    case vedtaegter = "Vedtægter"
    case retningslinjer = "Retningslinjer"
    case politikker = "Politikker"
    case formularer = "Formularer"
    case anden = "Anden"

    var ikon: String {
        switch self {
        case .regler: return "doc.text.fill"
        case .vedtaegter: return "book.fill"
        case .retningslinjer: return "list.bullet.clipboard.fill"
        case .politikker: return "shield.fill"
        case .formularer: return "doc.on.doc.fill"
        case .anden: return "folder.fill"
        }
    }

    var farve: String {
        switch self {
        case .regler: return "blue"
        case .vedtaegter: return "green"
        case .retningslinjer: return "orange"
        case .politikker: return "purple"
        case .formularer: return "red"
        case .anden: return "gray"
        }
    }
}

enum FilType: String, Codable {
    case pdf = "PDF"
    case word = "Word"
    case excel = "Excel"
    case anden = "Anden"

    var ikon: String {
        switch self {
        case .pdf: return "doc.fill"
        case .word: return "doc.text.fill"
        case .excel: return "tablecells.fill"
        case .anden: return "doc.fill"
        }
    }
}
