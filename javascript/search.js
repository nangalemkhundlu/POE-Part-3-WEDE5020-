document.addEventListener('DOMContentLoaded', () => {
    // Create a search input container dynamically if a search container placeholder exists, 
    // or attach to an existing search input with id="siteSearch"
    let searchInput = document.getElementById('siteSearch');
    
    if (!searchInput) {
        const servicesHeader = document.querySelector('.page-header .container') || document.querySelector('.services-section');
        if (servicesHeader && window.location.pathname.includes('services.html')) {
            const searchWrapper = document.createElement('div');
            searchWrapper.className = 'search-wrapper';
            searchWrapper.style.margin = '20px 0';
            searchWrapper.innerHTML = `
                <input type="text" id="siteSearch" placeholder="Search services (e.g., brakes, diagnostics)..." 
                       style="width: 100%; max-width: 400px; padding: 10px 15px; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem;">
            `;
            servicesHeader.appendChild(searchWrapper);
            searchInput = document.getElementById('siteSearch');
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const serviceCards = document.querySelectorAll('.service-card');

            serviceCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = card.querySelector('p')?.textContent.toLowerCase() || '';

                if (title.includes(query) || description.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});