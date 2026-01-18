document.addEventListener('DOMContentLoaded', () => {
    const moreLink = document.getElementById('more-link');
    const expandedText = document.getElementById('expanded-text');
    const overlay = document.getElementById('coming-soon-overlay');
    const closeOverlay = document.getElementById('close-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const navLinks = document.querySelectorAll('nav a');

    if (moreLink) {
        moreLink.addEventListener('click', () => {
            expandedText.classList.remove('hidden');
            expandedText.classList.add('show');
            moreLink.style.display = 'none';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Allow login link to bypass overlay
            if (link.getAttribute('href') === 'login.html') {
                return;
            }

            const text = link.textContent;
            overlayTitle.textContent = text;

            const overlayBody = overlay.querySelector('p');

            if (link.id === 'who-we-are-link') {
                const dataRaw = document.getElementById('who-we-are-data').textContent;
                console.log('Loading Who We Are data:', dataRaw);
                try {
                    const data = JSON.parse(dataRaw);
                    let html = '<div class="who-we-are-content" style="text-align: left; margin-top: 20px;">';
                    data.forEach(line => {
                        html += `<div style="margin-bottom: 25px;">
                                    <p style="font-size: 14px; color: #5f6368; line-height: 1.6; font-weight: 300;">${line}</p>
                                 </div>`;
                    });
                    html += '</div>';
                    overlayBody.innerHTML = html;
                } catch (err) {
                    console.error('Error parsing who-we-are data:', err);
                    overlayBody.textContent = "Error loading content.";
                }
            } else {
                overlayBody.textContent = "We're polishing this section for you. Check back later!";
            }

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
