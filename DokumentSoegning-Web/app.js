// Application State
const state = {
    documents: DOCUMENTS,
    filteredDocuments: [],
    searchQuery: '',
    selectedCategories: new Set(),
    selectedFileTypes: new Set(),
    sortMethod: 'newest',
    isFilterPanelOpen: false
};

// DOM Elements
const elements = {
    searchInput: document.getElementById('searchInput'),
    clearSearch: document.getElementById('clearSearch'),
    filterToggle: document.getElementById('filterToggle'),
    filterCount: document.getElementById('filterCount'),
    categoryChips: document.getElementById('categoryChips'),
    sortButton: document.getElementById('sortButton'),
    sortLabel: document.getElementById('sortLabel'),
    sortMenu: document.getElementById('sortMenu'),
    resultsCount: document.getElementById('resultsCount'),
    documentList: document.getElementById('documentList'),
    emptyState: document.getElementById('emptyState'),
    emptyTitle: document.getElementById('emptyTitle'),
    emptyMessage: document.getElementById('emptyMessage'),
    filterPanel: document.getElementById('filterPanel'),
    filterOverlay: document.getElementById('filterOverlay'),
    closeFilters: document.getElementById('closeFilters'),
    categoryFilters: document.getElementById('categoryFilters'),
    fileTypeFilters: document.getElementById('fileTypeFilters'),
    clearFilters: document.getElementById('clearFilters'),
    applyFilters: document.getElementById('applyFilters'),
    documentModal: document.getElementById('documentModal'),
    modalBody: document.getElementById('modalBody'),
    closeModal: document.getElementById('closeModal')
};

// Initialize App
function init() {
    renderCategoryChips();
    renderFilterOptions();
    updateDocuments();
    attachEventListeners();
}

// Event Listeners
function attachEventListeners() {
    // Search
    elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
    elements.clearSearch.addEventListener('click', clearSearch);

    // Filter Panel
    elements.filterToggle.addEventListener('click', toggleFilterPanel);
    elements.closeFilters.addEventListener('click', toggleFilterPanel);
    elements.filterOverlay.addEventListener('click', toggleFilterPanel);
    elements.clearFilters.addEventListener('click', clearAllFilters);
    elements.applyFilters.addEventListener('click', applyFilters);

    // Sort
    elements.sortButton.addEventListener('click', toggleSortMenu);
    elements.sortMenu.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => handleSort(e.target.dataset.sort));
    });

    // Modal
    elements.closeModal.addEventListener('click', closeModal);
    elements.documentModal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Close menus on outside click
    document.addEventListener('click', (e) => {
        if (!elements.sortButton.contains(e.target) && !elements.sortMenu.contains(e.target)) {
            elements.sortMenu.classList.add('hidden');
        }
    });
}

// Search Functions
function handleSearch(e) {
    state.searchQuery = e.target.value.toLowerCase().trim();
    updateClearButtonVisibility();
    updateDocuments();
}

function clearSearch() {
    state.searchQuery = '';
    elements.searchInput.value = '';
    updateClearButtonVisibility();
    updateDocuments();
}

function updateClearButtonVisibility() {
    if (state.searchQuery) {
        elements.clearSearch.classList.add('visible');
    } else {
        elements.clearSearch.classList.remove('visible');
    }
}

// Filter Functions
function toggleFilterPanel() {
    state.isFilterPanelOpen = !state.isFilterPanelOpen;
    if (state.isFilterPanelOpen) {
        elements.filterPanel.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        elements.filterPanel.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function toggleCategory(categoryName) {
    if (state.selectedCategories.has(categoryName)) {
        state.selectedCategories.delete(categoryName);
    } else {
        state.selectedCategories.add(categoryName);
    }
    updateFilterUI();
}

function toggleFileType(fileType) {
    if (state.selectedFileTypes.has(fileType)) {
        state.selectedFileTypes.delete(fileType);
    } else {
        state.selectedFileTypes.add(fileType);
    }
    updateFilterUI();
}

function updateFilterUI() {
    // Update category chips
    document.querySelectorAll('.filter-chip[data-category]').forEach(chip => {
        const category = chip.dataset.category;
        if (state.selectedCategories.has(category)) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });

    // Update filter options in panel
    document.querySelectorAll('.filter-option[data-category]').forEach(option => {
        const category = option.dataset.category;
        if (state.selectedCategories.has(category)) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    document.querySelectorAll('.filter-option[data-filetype]').forEach(option => {
        const fileType = option.dataset.filetype;
        if (state.selectedFileTypes.has(fileType)) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    // Update filter count
    const totalFilters = state.selectedCategories.size + state.selectedFileTypes.size;
    if (totalFilters > 0) {
        elements.filterCount.textContent = totalFilters;
        elements.filterCount.classList.remove('hidden');
        elements.filterToggle.classList.add('active');
    } else {
        elements.filterCount.classList.add('hidden');
        elements.filterToggle.classList.remove('active');
    }
}

function clearAllFilters() {
    state.selectedCategories.clear();
    state.selectedFileTypes.clear();
    state.searchQuery = '';
    elements.searchInput.value = '';
    updateFilterUI();
    updateClearButtonVisibility();
    updateDocuments();
}

function applyFilters() {
    toggleFilterPanel();
    updateDocuments();
}

// Sort Functions
function toggleSortMenu() {
    elements.sortMenu.classList.toggle('hidden');
}

function handleSort(sortMethod) {
    state.sortMethod = sortMethod;
    const sortLabels = {
        'newest': 'Nyeste først',
        'oldest': 'Ældste først',
        'alphabetical': 'Alfabetisk',
        'category': 'Efter kategori'
    };
    elements.sortLabel.textContent = sortLabels[sortMethod];
    elements.sortMenu.classList.add('hidden');
    updateDocuments();
}

// Document Functions
function updateDocuments() {
    // Filter documents
    state.filteredDocuments = state.documents.filter(doc => {
        // Search filter
        if (state.searchQuery) {
            const searchableText = `${doc.titel} ${doc.beskrivelse} ${doc.tags.join(' ')}`.toLowerCase();
            if (!searchableText.includes(state.searchQuery)) {
                return false;
            }
        }

        // Category filter
        if (state.selectedCategories.size > 0) {
            if (!state.selectedCategories.has(doc.kategori.name)) {
                return false;
            }
        }

        // File type filter
        if (state.selectedFileTypes.size > 0) {
            if (!state.selectedFileTypes.has(doc.filType)) {
                return false;
            }
        }

        return true;
    });

    // Sort documents
    sortDocuments();

    // Render
    renderDocuments();
    updateResultsCount();
}

function sortDocuments() {
    switch (state.sortMethod) {
        case 'newest':
            state.filteredDocuments.sort((a, b) => b.sidstOpdateret - a.sidstOpdateret);
            break;
        case 'oldest':
            state.filteredDocuments.sort((a, b) => a.sidstOpdateret - b.sidstOpdateret);
            break;
        case 'alphabetical':
            state.filteredDocuments.sort((a, b) => a.titel.localeCompare(b.titel, 'da'));
            break;
        case 'category':
            state.filteredDocuments.sort((a, b) => a.kategori.name.localeCompare(b.kategori.name, 'da'));
            break;
    }
}

function renderDocuments() {
    if (state.filteredDocuments.length === 0) {
        elements.documentList.classList.add('hidden');
        elements.emptyState.classList.remove('hidden');

        if (state.searchQuery) {
            elements.emptyTitle.textContent = 'Ingen dokumenter fundet';
            elements.emptyMessage.textContent = 'Prøv at ændre søgekriterierne eller filtrene';
        } else {
            elements.emptyTitle.textContent = 'Brug søgefeltet ovenfor';
            elements.emptyMessage.textContent = 'Søg efter dokumenter, regler og vedtægter';
        }
        return;
    }

    elements.documentList.classList.remove('hidden');
    elements.emptyState.classList.add('hidden');

    elements.documentList.innerHTML = state.filteredDocuments.map(doc => createDocumentCard(doc)).join('');

    // Attach click handlers
    elements.documentList.querySelectorAll('.document-card').forEach((card, index) => {
        card.addEventListener('click', () => openDocumentModal(state.filteredDocuments[index]));
    });
}

function createDocumentCard(doc) {
    return `
        <div class="document-card" data-id="${doc.id}">
            <div class="document-card-header">
                <div class="document-icon" data-category="${doc.kategori.name}">
                    ${doc.kategori.icon}
                </div>
                <div class="document-content">
                    <h3 class="document-title">${doc.titel}</h3>
                    <p class="document-description">${doc.beskrivelse}</p>
                </div>
            </div>
            <div class="document-meta">
                <span class="badge badge-category" data-category="${doc.kategori.name}">
                    ${doc.kategori.icon} ${doc.kategori.name}
                </span>
                <span class="badge badge-filetype">
                    📄 ${doc.filType}
                </span>
            </div>
        </div>
    `;
}

function updateResultsCount() {
    const count = state.filteredDocuments.length;
    elements.resultsCount.textContent = `${count} dokument${count === 1 ? '' : 'er'}`;
}

// Render Filter UI
function renderCategoryChips() {
    const chips = Object.values(CATEGORIES).map(category => `
        <button class="filter-chip" data-category="${category.name}">
            <span>${category.icon}</span>
            <span>${category.name}</span>
        </button>
    `).join('');

    elements.categoryChips.innerHTML = chips;

    // Attach click handlers
    elements.categoryChips.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            toggleCategory(chip.dataset.category);
            updateDocuments();
        });
    });
}

function renderFilterOptions() {
    // Category filters
    const categoryOptions = Object.values(CATEGORIES).map(category => `
        <div class="filter-option" data-category="${category.name}">
            <span class="filter-option-icon">${category.icon}</span>
            <div class="filter-option-content">
                <div class="filter-option-label">${category.name}</div>
            </div>
            <svg class="filter-option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
    `).join('');

    elements.categoryFilters.innerHTML = categoryOptions;

    // File type filters
    const fileTypeOptions = Object.values(FILE_TYPES).map(fileType => `
        <div class="filter-option" data-filetype="${fileType}">
            <span class="filter-option-icon">📄</span>
            <div class="filter-option-content">
                <div class="filter-option-label">${fileType}</div>
            </div>
            <svg class="filter-option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
    `).join('');

    elements.fileTypeFilters.innerHTML = fileTypeOptions;

    // Attach click handlers
    elements.categoryFilters.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', () => {
            toggleCategory(option.dataset.category);
        });
    });

    elements.fileTypeFilters.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', () => {
            toggleFileType(option.dataset.filetype);
        });
    });
}

// Modal Functions
function openDocumentModal(doc) {
    const formattedDate = new Intl.DateTimeFormat('da-DK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(doc.sidstOpdateret);

    elements.modalBody.innerHTML = `
        <div class="modal-document-icon" data-category="${doc.kategori.name}">
            ${doc.kategori.icon}
        </div>
        <h2 class="modal-document-title">${doc.titel}</h2>
        <div class="modal-badges">
            <span class="badge badge-category" data-category="${doc.kategori.name}">
                ${doc.kategori.icon} ${doc.kategori.name}
            </span>
            <span class="badge badge-filetype">
                📄 ${doc.filType}
            </span>
        </div>
        <div class="modal-section">
            <h3 class="modal-section-title">Beskrivelse</h3>
            <p class="modal-section-content">${doc.beskrivelse}</p>
        </div>
        <div class="modal-section">
            <h3 class="modal-section-title">Sidst opdateret</h3>
            <p class="modal-section-content">${formattedDate}</p>
        </div>
        ${doc.tags.length > 0 ? `
            <div class="modal-section">
                <h3 class="modal-section-title">Tags</h3>
                <div class="modal-tags">
                    ${doc.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        ` : ''}
        <div class="modal-actions">
            <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="button-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                Åbn dokument
            </a>
            <button class="button-share" onclick="shareDocument('${doc.titel}', '${doc.url}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                Del dokument
            </button>
        </div>
    `;

    elements.documentModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    elements.documentModal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Share Function
function shareDocument(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(url);
        });
    } else {
        fallbackShare(url);
    }
}

function fallbackShare(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('Link kopieret til udklipsholder!');
    }).catch(() => {
        prompt('Kopier dette link:', url);
    });
}

// Utility Functions
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

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
