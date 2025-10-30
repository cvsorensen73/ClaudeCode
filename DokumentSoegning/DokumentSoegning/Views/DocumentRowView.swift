//
//  DocumentRowView.swift
//  DokumentSoegning
//
//  Række visning for et enkelt dokument
//

import SwiftUI

struct DocumentRowView: View {
    let dokument: Document

    var body: some View {
        HStack(spacing: 12) {
            // Kategori ikon
            ZStack {
                RoundedRectangle(cornerRadius: 8)
                    .fill(farveForKategori(dokument.kategori.farve).opacity(0.2))
                    .frame(width: 50, height: 50)
                Image(systemName: dokument.kategori.ikon)
                    .foregroundColor(farveForKategori(dokument.kategori.farve))
                    .font(.system(size: 20))
            }

            VStack(alignment: .leading, spacing: 4) {
                // Titel
                Text(dokument.titel)
                    .font(.headline)
                    .lineLimit(2)

                // Beskrivelse
                Text(dokument.beskrivelse)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .lineLimit(2)

                // Metadata
                HStack(spacing: 12) {
                    // Kategori badge
                    HStack(spacing: 4) {
                        Image(systemName: dokument.kategori.ikon)
                            .font(.caption2)
                        Text(dokument.kategori.rawValue)
                            .font(.caption)
                    }
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(farveForKategori(dokument.kategori.farve).opacity(0.2))
                    .foregroundColor(farveForKategori(dokument.kategori.farve))
                    .cornerRadius(4)

                    // Filtype
                    HStack(spacing: 4) {
                        Image(systemName: dokument.filType.ikon)
                            .font(.caption2)
                        Text(dokument.filType.rawValue)
                            .font(.caption)
                    }
                    .foregroundColor(.secondary)

                    Spacer()
                }
            }

            Spacer()

            // Pil
            Image(systemName: "chevron.right")
                .foregroundColor(.secondary)
                .font(.caption)
        }
        .padding(.vertical, 8)
    }

    private func farveForKategori(_ farveName: String) -> Color {
        switch farveName {
        case "blue": return .blue
        case "green": return .green
        case "orange": return .orange
        case "purple": return .purple
        case "red": return .red
        default: return .gray
        }
    }
}
