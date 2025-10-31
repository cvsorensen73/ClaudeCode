// Configure PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Application State
const appState = {
    documents: [],
    searchIndex: null,
    currentFilter: 'all',
    searchResults: [],
    isLoading: true
};

// PDF Documents to index - loaded from documents-config.js
const pdfDocuments = documentsConfig;

// Initialize Application
async function initializeApp() {
    showLoading(true);
    updateLoadingStatus('Starter indlæsning...');

    try {
        // Load and index all documents
        await loadDocuments();

        // Check if any documents were loaded
        if (appState.documents.length === 0) {
            showError('Ingen dokumenter kunne indlæses',
                'Tjek at PDF-URL\'erne i documents-config.js er korrekte. Se browser-konsollen (F12) for detaljer.');
            return;
        }

        // Build search index
        buildSearchIndex();

        // Setup UI
        setupEventListeners();

        // Show search interface
        showLoading(false);
        document.getElementById('searchSection').style.display = 'block';

        // Update document count
        document.getElementById('docCount').textContent = appState.documents.length;

        console.log(`✓ App initialiseret succesfuldt med ${appState.documents.length} dokumenter`);
        console.log(`✓ Søgeindeks indeholder ${appState.flatDocuments.length} sider`);
    } catch (error) {
        console.error('✗ Kritisk fejl ved initialisering:', error);
        showError('Fejl ved indlæsning', error.message);
    }
}

// Load and parse all PDF documents
async function loadDocuments() {
    const totalDocs = pdfDocuments.length;
    let loadedDocs = 0;
    let failedDocs = [];

    for (const pdfDoc of pdfDocuments) {
        try {
            updateLoadingStatus(`Indlæser ${pdfDoc.name} (${loadedDocs + 1}/${totalDocs})...`);

            const pages = await loadPDF(pdfDoc.url);

            // Add document with all pages to app state
            appState.documents.push({
                ...pdfDoc,
                pages: pages,
                pageCount: pages.length
            });

            loadedDocs++;
            console.log(`✓ Succesfuldt indlæst: ${pdfDoc.name} (${pages.length} sider)`);
            updateLoadingStatus(`Indlæst ${loadedDocs}/${totalDocs} dokumenter`);
        } catch (error) {
            console.error(`✗ Fejl ved indlæsning af ${pdfDoc.name}:`, error);
            failedDocs.push({ name: pdfDoc.name, url: pdfDoc.url, error: error.message });
            // Continue loading other documents even if one fails
        }
    }

    // Log summary
    console.log(`\n=== INDLÆSNINGS RESUMÉ ===`);
    console.log(`Totalt forsøgt: ${totalDocs}`);
    console.log(`Succesfuldt indlæst: ${loadedDocs}`);
    console.log(`Fejlede: ${failedDocs.length}`);

    if (failedDocs.length > 0) {
        console.log(`\nFejlede dokumenter:`);
        failedDocs.forEach(doc => {
            console.log(`- ${doc.name}`);
            console.log(`  URL: ${doc.url}`);
            console.log(`  Fejl: ${doc.error}`);
        });
    }

    if (loadedDocs === 0) {
        throw new Error('Ingen dokumenter kunne indlæses. Tjek PDF-URL\'erne i documents-config.js');
    }
}

// Load and parse a single PDF
async function loadPDF(url) {
    try {
        const loadingTask = pdfjsLib.getDocument({
            url: url,
            disableAutoFetch: false,
            disableStream: false
        });

        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        const pages = [];

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();

            // Extract text from page
            const pageText = textContent.items
                .map(item => item.str)
                .join(' ')
                .replace(/\s+/g, ' ')
                .trim();

            pages.push({
                pageNumber: pageNum,
                text: pageText
            });
        }

        return pages;
    } catch (error) {
        console.error('Error loading PDF:', error);
        throw error;
    }
}

// Build Lunr search index
function buildSearchIndex() {
    updateLoadingStatus('Bygger søgeindeks...');

    const documents = [];

    // Flatten all pages from all documents into searchable items
    appState.documents.forEach((doc, docIndex) => {
        doc.pages.forEach((page, pageIndex) => {
            documents.push({
                id: `${docIndex}-${pageIndex}`,
                docIndex: docIndex,
                pageIndex: pageIndex,
                docName: doc.name,
                category: doc.category,
                type: doc.type,
                pageNumber: page.pageNumber,
                text: page.text
            });
        });
    });

    // Build Lunr index
    appState.searchIndex = lunr(function() {
        this.ref('id');
        this.field('docName', { boost: 10 });
        this.field('category', { boost: 5 });
        this.field('text');

        documents.forEach(doc => {
            this.add(doc);
        });
    });

    // Store flattened documents for retrieval
    appState.flatDocuments = documents;
}

// Search function
function performSearch(query) {
    if (!query || query.trim().length < 2) {
        showEmptyState();
        return;
    }

    try {
        const results = appState.searchIndex.search(query);

        // Get full document data for results
        const enrichedResults = results.map(result => {
            const doc = appState.flatDocuments.find(d => d.id === result.ref);
            return {
                ...doc,
                score: result.score
            };
        });

        // Apply category filter
        const filteredResults = appState.currentFilter === 'all'
            ? enrichedResults
            : enrichedResults.filter(r => {
                if (appState.currentFilter === 'SW') {
                    return r.category.includes('SW');
                } else if (appState.currentFilter === 'vedtægter') {
                    return r.category.toLowerCase().includes('vedtægt');
                }
                return true;
            });

        appState.searchResults = filteredResults;
        displayResults(filteredResults, query);
    } catch (error) {
        console.error('Search error:', error);
        showNoResults();
    }
}

// Display search results
function displayResults(results, query) {
    const container = document.getElementById('resultsContainer');
    const emptyState = document.getElementById('emptyState');
    const noResults = document.getElementById('noResults');
    const resultsInfo = document.getElementById('resultsInfo');
    const resultsCount = document.getElementById('resultsCount');

    // Hide states
    emptyState.style.display = 'none';
    noResults.style.display = 'none';

    if (results.length === 0) {
        container.innerHTML = '';
        resultsInfo.style.display = 'none';
        noResults.style.display = 'flex';
        return;
    }

    // Show results count
    resultsInfo.style.display = 'block';
    resultsCount.textContent = `${results.length} resultat${results.length !== 1 ? 'er' : ''} fundet`;

    // Generate result cards
    container.innerHTML = results.map((result, index) => {
        const excerpt = createExcerpt(result.text, query);

        return `
            <div class="result-card" data-result-index="${index}">
                <div class="result-header">
                    <div>
                        <div class="result-title">${result.docName}</div>
                        <div class="result-meta">
                            <span>📄 Side ${result.pageNumber}</span>
                            <span>📁 ${result.category}</span>
                        </div>
                    </div>
                    <div class="result-badge">${result.category}</div>
                </div>
                <div class="result-excerpt">${excerpt}</div>
            </div>
        `;
    }).join('');

    // Add click handlers to result cards
    container.querySelectorAll('.result-card').forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.dataset.resultIndex);
            showDocumentDetail(results[index], query);
        });
    });
}

// Create excerpt with highlighted search terms
function createExcerpt(text, query, maxLength = 200) {
    if (!text) return 'Ingen tekstindhold tilgængeligt';

    const queryTerms = query.toLowerCase().split(/\s+/);
    const lowerText = text.toLowerCase();

    // Find first occurrence of any query term
    let startPos = 0;
    for (const term of queryTerms) {
        const pos = lowerText.indexOf(term);
        if (pos !== -1) {
            startPos = Math.max(0, pos - 80);
            break;
        }
    }

    let excerpt = text.substr(startPos, maxLength);

    // Add ellipsis if needed
    if (startPos > 0) excerpt = '...' + excerpt;
    if (startPos + maxLength < text.length) excerpt += '...';

    // Highlight query terms
    queryTerms.forEach(term => {
        const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
        excerpt = excerpt.replace(regex, '<mark>$1</mark>');
    });

    return excerpt;
}

// Show document detail in modal
function showDocumentDetail(result, query) {
    const modal = document.getElementById('documentModal');
    const modalTitle = document.getElementById('modalTitle');
    const docName = document.getElementById('docName');
    const pageNumber = document.getElementById('pageNumber');
    const documentContent = document.getElementById('documentContent');

    modalTitle.textContent = result.docName;
    docName.textContent = result.docName;
    pageNumber.textContent = result.pageNumber;

    // Highlight query terms in content
    let content = result.text;
    const queryTerms = query.toLowerCase().split(/\s+/);
    queryTerms.forEach(term => {
        const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
        content = content.replace(regex, '<mark>$1</mark>');
    });

    documentContent.innerHTML = content;

    modal.classList.add('active');
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterChips = document.querySelectorAll('.chip');
    const closeModal = document.getElementById('closeModal');
    const modal = document.getElementById('documentModal');

    // Search input
    searchInput.addEventListener('input', debounce((e) => {
        performSearch(e.target.value);
    }, 300));

    // Search button
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    // Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    // Filter chips
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active state
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            // Update filter
            appState.currentFilter = chip.dataset.filter;

            // Re-run search if there's a query
            if (searchInput.value) {
                performSearch(searchInput.value);
            }
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Utility functions
function showLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = show ? 'flex' : 'none';
}

function updateLoadingStatus(message) {
    const loadingStatus = document.getElementById('loadingStatus');
    loadingStatus.textContent = message;
}

function showEmptyState() {
    document.getElementById('resultsContainer').innerHTML = '';
    document.getElementById('emptyState').style.display = 'flex';
    document.getElementById('noResults').style.display = 'none';
    document.getElementById('resultsInfo').style.display = 'none';
}

function showNoResults() {
    document.getElementById('resultsContainer').innerHTML = '';
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('noResults').style.display = 'flex';
    document.getElementById('resultsInfo').style.display = 'none';
}

function showError(title, message) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style="color: #ff3d00; margin-bottom: 16px;">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <h3 style="color: #1a1a1a; margin-bottom: 8px;">${title}</h3>
            <p style="color: #666666; margin-bottom: 16px;">${message}</p>
            <button onclick="location.reload()" style="
                background: #0066cc;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 14px;
                cursor: pointer;
            ">Genindlæs siden</button>
        </div>
    `;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
