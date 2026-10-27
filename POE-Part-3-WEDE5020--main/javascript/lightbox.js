document.addEventListener('DOMContentLoaded', () => {
    // Create lightbox modal elements dynamically if they don't exist in the DOM
    let lightboxModal = document.getElementById('lightboxModal');
    
    if (!lightboxModal) {
        lightboxModal = document.createElement('div');
        lightboxModal.id = 'lightboxModal';
        lightboxModal.className = 'lightbox-modal';
        lightboxModal.setAttribute('role', 'dialog');
        lightboxModal.setAttribute('aria-modal', 'true');
        
        lightboxModal.innerHTML = `
            <button id="lightboxClose" class="lightbox-close" type="button" aria-label="Close">&times;</button>
            <img id="lightboxImage" class="lightbox-content" src="" alt="Enlarged View">
        `;
        document.body.appendChild(lightboxModal);
    }

    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');

    // Select images intended for lightbox (e.g., service images or gallery thumbs)
    const triggerImages = document.querySelectorAll('.service-image, .gallery-thumb');

    triggerImages.forEach(img => {
        // Add cursor pointer style for visual feedback
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt || 'Enlarged service view';
            lightboxModal.classList.add('active');
            lightboxModal.style.display = 'flex';
        });
    });

    const closeLightbox = () => {
        lightboxModal.classList.remove('active');
        lightboxModal.style.display = 'none';
        lightboxImage.src = '';
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close when clicking outside the image
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });
});