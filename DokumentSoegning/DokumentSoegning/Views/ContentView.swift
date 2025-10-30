//
//  ContentView.swift
//  DokumentSoegning
//
//  Hoved søgevisning
//

import SwiftUI

struct ContentView: View {
    @StateObject private var documentService = DocumentService()
    @StateObject private var searchViewModel: SearchViewModel

    init() {
        let service = DocumentService()
        _documentService = StateObject(wrappedValue: service)
        _searchViewModel = StateObject(wrappedValue: SearchViewModel(documentService: service))
    }

    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Søgeboks
                SearchBarView(soegeord: $searchViewModel.soegeord)
                    .padding()

                // Filter bar
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        // Filter knap
                        Button(action: {
                            searchViewModel.visFiltre = true
                        }) {
                            HStack(spacing: 6) {
                                Image(systemName: "line.3.horizontal.decrease.circle")
                                Text("Filtre")
                                if searchViewModel.antalAktiveFiltre > 0 {
                                    Text("(\(searchViewModel.antalAktiveFiltre))")
                                        .fontWeight(.bold)
                                }
                            }
                            .padding(.horizontal, 12)
                            .padding(.vertical, 8)
                            .background(searchViewModel.antalAktiveFiltre > 0 ? Color.blue : Color.secondary.opacity(0.2))
                            .foregroundColor(searchViewModel.antalAktiveFiltre > 0 ? .white : .primary)
                            .cornerRadius(20)
                        }

                        // Kategori filter chips
                        ForEach(DokumentKategori.allCases, id: \.self) { kategori in
                            Button(action: {
                                searchViewModel.toggleKategori(kategori)
                            }) {
                                HStack(spacing: 6) {
                                    Image(systemName: kategori.ikon)
                                    Text(kategori.rawValue)
                                }
                                .padding(.horizontal, 12)
                                .padding(.vertical, 8)
                                .background(searchViewModel.valgtKategorier.contains(kategori) ?
                                           farveForKategori(kategori.farve) : Color.secondary.opacity(0.2))
                                .foregroundColor(searchViewModel.valgtKategorier.contains(kategori) ? .white : .primary)
                                .cornerRadius(20)
                            }
                        }
                    }
                    .padding(.horizontal)
                }
                .padding(.bottom, 8)

                // Resultat header
                HStack {
                    Text("\(searchViewModel.filtreretDokumenter.count) dokument\(searchViewModel.filtreretDokumenter.count == 1 ? "" : "er")")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                    Spacer()
                    Menu {
                        ForEach(Sorteringsmetode.allCases, id: \.self) { metode in
                            Button(action: {
                                searchViewModel.sorteringsmetode = metode
                            }) {
                                HStack {
                                    Text(metode.rawValue)
                                    if searchViewModel.sorteringsmetode == metode {
                                        Image(systemName: "checkmark")
                                    }
                                }
                            }
                        }
                    } label: {
                        HStack(spacing: 4) {
                            Image(systemName: "arrow.up.arrow.down")
                            Text(searchViewModel.sorteringsmetode.rawValue)
                        }
                        .font(.subheadline)
                        .foregroundColor(.blue)
                    }
                }
                .padding(.horizontal)
                .padding(.vertical, 8)

                Divider()

                // Dokument liste
                if searchViewModel.filtreretDokumenter.isEmpty {
                    EmptyStateView(harSoegeord: !searchViewModel.soegeord.isEmpty)
                } else {
                    List(searchViewModel.filtreretDokumenter) { dokument in
                        NavigationLink(destination: DocumentDetailView(dokument: dokument)) {
                            DocumentRowView(dokument: dokument)
                        }
                    }
                    .listStyle(.plain)
                }
            }
            .navigationTitle("Dokumentsøgning")
            .navigationBarTitleDisplayMode(.large)
            .sheet(isPresented: $searchViewModel.visFiltre) {
                FilterView(viewModel: searchViewModel)
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

// Søgebar komponent
struct SearchBarView: View {
    @Binding var soegeord: String
    @FocusState private var isFocused: Bool

    var body: some View {
        HStack {
            Image(systemName: "magnifyingglass")
                .foregroundColor(.secondary)
            TextField("Søg i dokumenter...", text: $soegeord)
                .focused($isFocused)
                .textFieldStyle(.plain)
            if !soegeord.isEmpty {
                Button(action: {
                    soegeord = ""
                }) {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.secondary)
                }
            }
        }
        .padding(12)
        .background(Color.secondary.opacity(0.1))
        .cornerRadius(12)
    }
}

// Tom tilstand visning
struct EmptyStateView: View {
    let harSoegeord: Bool

    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: harSoegeord ? "doc.text.magnifyingglass" : "doc.text")
                .font(.system(size: 64))
                .foregroundColor(.secondary)
            Text(harSoegeord ? "Ingen dokumenter fundet" : "Brug søgefeltet ovenfor")
                .font(.title2)
                .fontWeight(.semibold)
            Text(harSoegeord ? "Prøv at ændre søgekriterierne eller filtrene" : "Søg efter dokumenter, regler og vedtægter")
                .font(.body)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

#Preview {
    ContentView()
}
