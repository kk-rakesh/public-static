document.addEventListener('DOMContentLoaded', () => {
    const moreLink = document.getElementById('more-link');
    const expandedText = document.getElementById('expanded-text');
    const overlay = document.getElementById('coming-soon-overlay');
    const closeOverlay = document.getElementById('close-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const navLinks = document.querySelectorAll('nav a');

    if (moreLink) {
        moreLink.addEventListener('click', () => {
            expandedText.classList.add('show');
            moreLink.style.display = 'none';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // For now, all links show Coming Soon
            // but we only do it for internal sounding links
            const text = link.textContent;
            overlayTitle.textContent = text;
            overlay.classList.remove('hidden');
            e.preventDefault();
        });
    });

    if (closeOverlay) {
        closeOverlay.addEventListener('click', () => {
            overlay.classList.add('hidden');
        });
    }

    // Close overlay on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
            overlay.classList.add('hidden');
        }
    });
});
