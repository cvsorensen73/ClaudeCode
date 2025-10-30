//
//  FilterView.swift
//  DokumentSoegning
//
//  Filtervisning til dokumentsøgning
//

import SwiftUI

struct FilterView: View {
    @ObservedObject var viewModel: SearchViewModel
    @Environment(\.dismiss) var dismiss

    var body: some View {
        NavigationView {
            List {
                // Kategorier sektion
                Section(header: Text("Kategorier")) {
                    ForEach(DokumentKategori.allCases, id: \.self) { kategori in
                        Button(action: {
                            viewModel.toggleKategori(kategori)
                        }) {
                            HStack {
                                Image(systemName: kategori.ikon)
                                    .foregroundColor(farveForKategori(kategori.farve))
                                Text(kategori.rawValue)
                                    .foregroundColor(.primary)
                                Spacer()
                                if viewModel.valgtKategorier.contains(kategori) {
                                    Image(systemName: "checkmark")
                                        .foregroundColor(.blue)
                                }
                            }
                        }
                    }
                }

                // Filtyper sektion
                Section(header: Text("Filtyper")) {
                    ForEach([FilType.pdf, .word, .excel, .anden], id: \.self) { filType in
                        Button(action: {
                            viewModel.toggleFilType(filType)
                        }) {
                            HStack {
                                Image(systemName: filType.ikon)
                                Text(filType.rawValue)
                                    .foregroundColor(.primary)
                                Spacer()
                                if viewModel.valgtFilTyper.contains(filType) {
                                    Image(systemName: "checkmark")
                                        .foregroundColor(.blue)
                                }
                            }
                        }
                    }
                }

                // Sortering sektion
                Section(header: Text("Sortering")) {
                    Picker("Sortér efter", selection: $viewModel.sorteringsmetode) {
                        ForEach(Sorteringsmetode.allCases, id: \.self) { metode in
                            Text(metode.rawValue).tag(metode)
                        }
                    }
                    .pickerStyle(.menu)
                }

                // Nulstil sektion
                Section {
                    Button(action: {
                        viewModel.rydFiltre()
                    }) {
                        HStack {
                            Image(systemName: "arrow.counterclockwise")
                            Text("Nulstil alle filtre")
                        }
                        .foregroundColor(.red)
                    }
                }
            }
            .navigationTitle("Filtre")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Færdig") {
                        dismiss()
                    }
                }
            }
        }
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
