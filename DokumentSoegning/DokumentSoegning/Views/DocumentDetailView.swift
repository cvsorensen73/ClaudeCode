//
//  DocumentDetailView.swift
//  DokumentSoegning
//
//  Detaljeret visning af et dokument
//

import SwiftUI
import SafariServices

struct DocumentDetailView: View {
    let dokument: Document
    @State private var visSafari = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Header med ikon
                HStack {
                    ZStack {
                        RoundedRectangle(cornerRadius: 12)
                            .fill(farveForKategori(dokument.kategori.farve).opacity(0.2))
                            .frame(width: 80, height: 80)
                        Image(systemName: dokument.kategori.ikon)
                            .foregroundColor(farveForKategori(dokument.kategori.farve))
                            .font(.system(size: 36))
                    }
                    Spacer()
                }

                // Titel
                Text(dokument.titel)
                    .font(.title)
                    .fontWeight(.bold)

                // Kategori og filtype badges
                HStack(spacing: 12) {
                    HStack(spacing: 6) {
                        Image(systemName: dokument.kategori.ikon)
                        Text(dokument.kategori.rawValue)
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(farveForKategori(dokument.kategori.farve).opacity(0.2))
                    .foregroundColor(farveForKategori(dokument.kategori.farve))
                    .cornerRadius(8)

                    HStack(spacing: 6) {
                        Image(systemName: dokument.filType.ikon)
                        Text(dokument.filType.rawValue)
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(Color.secondary.opacity(0.2))
                    .foregroundColor(.secondary)
                    .cornerRadius(8)
                }

                Divider()

                // Beskrivelse
                VStack(alignment: .leading, spacing: 8) {
                    Text("Beskrivelse")
                        .font(.headline)
                    Text(dokument.beskrivelse)
                        .font(.body)
                        .foregroundColor(.secondary)
                }

                // Sidst opdateret
                VStack(alignment: .leading, spacing: 8) {
                    Text("Sidst opdateret")
                        .font(.headline)
                    Text(formatDate(dokument.sidstOpdateret))
                        .font(.body)
                        .foregroundColor(.secondary)
                }

                // Tags
                if !dokument.tags.isEmpty {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Tags")
                            .font(.headline)
                        FlowLayout(spacing: 8) {
                            ForEach(dokument.tags, id: \.self) { tag in
                                Text(tag)
                                    .font(.caption)
                                    .padding(.horizontal, 10)
                                    .padding(.vertical, 5)
                                    .background(Color.blue.opacity(0.1))
                                    .foregroundColor(.blue)
                                    .cornerRadius(6)
                            }
                        }
                    }
                }

                Divider()

                // Åbn dokument knap
                Button(action: {
                    visSafari = true
                }) {
                    HStack {
                        Image(systemName: "doc.text.fill")
                        Text("Åbn dokument")
                            .fontWeight(.semibold)
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(12)
                }
                .buttonStyle(PlainButtonStyle())

                // Del knap
                ShareLink(item: URL(string: dokument.url)!) {
                    HStack {
                        Image(systemName: "square.and.arrow.up")
                        Text("Del dokument")
                            .fontWeight(.semibold)
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.secondary.opacity(0.2))
                    .foregroundColor(.primary)
                    .cornerRadius(12)
                }
                .buttonStyle(PlainButtonStyle())
            }
            .padding()
        }
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $visSafari) {
            if let url = URL(string: dokument.url) {
                SafariView(url: url)
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

    private func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "da_DK")
        formatter.dateStyle = .long
        formatter.timeStyle = .none
        return formatter.string(from: date)
    }
}

// Safari View Wrapper
struct SafariView: UIViewControllerRepresentable {
    let url: URL

    func makeUIViewController(context: Context) -> SFSafariViewController {
        return SFSafariViewController(url: url)
    }

    func updateUIViewController(_ uiViewController: SFSafariViewController, context: Context) {}
}

// FlowLayout for tags
struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let result = FlowResult(
            in: proposal.replacingUnspecifiedDimensions().width,
            subviews: subviews,
            spacing: spacing
        )
        return result.size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = FlowResult(
            in: bounds.width,
            subviews: subviews,
            spacing: spacing
        )
        for (index, subview) in subviews.enumerated() {
            subview.place(at: CGPoint(x: bounds.minX + result.frames[index].minX,
                                     y: bounds.minY + result.frames[index].minY),
                         proposal: .unspecified)
        }
    }

    struct FlowResult {
        var frames: [CGRect] = []
        var size: CGSize = .zero

        init(in maxWidth: CGFloat, subviews: Subviews, spacing: CGFloat) {
            var currentX: CGFloat = 0
            var currentY: CGFloat = 0
            var lineHeight: CGFloat = 0

            for subview in subviews {
                let size = subview.sizeThatFits(.unspecified)
                if currentX + size.width > maxWidth && currentX > 0 {
                    currentX = 0
                    currentY += lineHeight + spacing
                    lineHeight = 0
                }
                frames.append(CGRect(x: currentX, y: currentY, width: size.width, height: size.height))
                lineHeight = max(lineHeight, size.height)
                currentX += size.width + spacing
            }

            self.size = CGSize(width: maxWidth, height: currentY + lineHeight)
        }
    }
}
