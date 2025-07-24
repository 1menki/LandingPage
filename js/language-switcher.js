document.addEventListener('DOMContentLoaded', function() {
    // Verfügbare Sprachen und deren Dateien
    const languages = {
        'de': {
            'index': '../html/index.html',
            'impressum': '../html/impressum.html',
            'datenschutz': '../html/datenschutz.html',
            'agb': '../html/agb.html'
        },
        'en': {
            'index': '../html/index-en.html',
            'impressum': '../html/impressum-en.html',
            'datenschutz': '../html/datenschutz-en.html',
            'agb': '../html/agb-en.html'
        },
        'tr': {
            'index': '../html/index-tr.html',
            'impressum': '../html/impressum-tr.html',
            'datenschutz': '../html/datenschutz-tr.html',
            'agb': '../html/agb-tr.html'
        }
    };

    // Aktuelle Sprache aus URL oder localStorage
    const urlParams = new URLSearchParams(window.location.search);
    let currentLang = urlParams.get('lang') || localStorage.getItem('websiteLanguage') || 'de';
    
    // Sprachmenü aufbauen
    const languageDropdown = document.querySelector('.language-dropdown');
    const currentLanguageElement = document.querySelector('.current-language');
    
    // Aktuelle Sprache anzeigen
    currentLanguageElement.textContent = currentLang.toUpperCase();
    
    // Dropdown mit verfügbaren Sprachen füllen (ohne aktuelle)
    Object.keys(languages).forEach(lang => {
        if (lang !== currentLang) {
            const listItem = document.createElement('li');
            listItem.className = 'language-option';
            listItem.dataset.lang = lang;
            
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'nav-link';
            link.textContent = lang.toUpperCase();
            
            listItem.appendChild(link);
            languageDropdown.appendChild(listItem);
        }
    });
    
    // Sprachwechsel Event Handler
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLang = this.dataset.lang;
            
            // Aktuelle Seite identifizieren
            const currentPage = document.body.dataset.page || 'index'; // data-page Attribut im body-Tag
            
            // Ziel-URL für die gewählte Sprache
            const targetUrl = languages[selectedLang][currentPage];
            
            // Sprache speichern
            localStorage.setItem('websiteLanguage', selectedLang);
            
            // Weiterleitung
            if (targetUrl) {
                window.location.href = targetUrl + '?lang=' + selectedLang;
            }
        });
    });
});