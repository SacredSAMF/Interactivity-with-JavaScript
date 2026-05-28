document.addEventListener('DOMContentLoaded', function() {
    const _body = document.body;

    // Toggle mobile navigation
    const toggleButton = document.querySelector('.navbar-toggler');
    if( toggleButton ){
        const toggleNav = function(e) {
            e.preventDefault();

            if( _body.classList.contains('nav-open') ){
                _body.classList.remove('nav-open');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
            else{
                _body.classList.add('nav-open');
                toggleButton.setAttribute('aria-expanded', 'true');
            }
        };

        // Open/close mobile navigation when clicking the toggle button
        toggleButton.addEventListener('click', toggleNav);

        // Close mobile navigation when pressing the Escape key
        document.addEventListener('keydown', function(e) {
            if( e.key === 'Escape' && _body.classList.contains('nav-open') ){
                toggleNav(e);
            }
        });
    }


    // Request random collection photos
    const galleryContainer = document.querySelectorAll('.section-gallery.section-dynamic');
    if(  galleryContainer.length > 0 ){
        fetch('json/gallery.json')
            .then(response => response.json())
            .then(data => {
                const randomElements = getRandomElements(data, 3);

                galleryContainer.forEach(container => {
                    const dynamicContent = container.querySelector('.dynamic-content');
                    
                    if( dynamicContent ){
                        let html = '<ul class="gallery-list">';
                        html += randomElements.map(item => `
                            <li>
                                <a href="${item.url}" class="glightbox-dynamic" target="_blank">
                                    <img src="${item.thumb}" width="360" height="480" alt="${item.alt}" title="${item.title}" loading="lazy">
                                </a>
                            </li>
                        `).join('');
                        html += '</ul>';

                        dynamicContent.innerHTML = html;
                    }

                    container.classList.remove('is-loading');
                });

                // Initialize GLightbox
                if( typeof GLightbox !== 'undefined' ){
                    const lightbox_dynamic = GLightbox({
                        selector: '.glightbox-dynamic'
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching gallery snippet:', error);
                galleryContainer.forEach(container => {
                    container.innerHTML = '<p>Sorry, we couldn\'t load the gallery at this time.</p>';
                });
            });
    }

    // Request random quote
    const quoteContainer = document.querySelectorAll('.section-quote.section-dynamic');
    if(  quoteContainer.length > 0 ){
        fetch('json/quotes.json')
            .then(response => response.json())
            .then(data => {
                const randomElements = getRandomElements(data, 1);

                quoteContainer.forEach(container => {
                    const dynamicContent = container.querySelector('.dynamic-content');
                    
                    if( dynamicContent ){
                        let html = '<ul class="quotes-list">';
                        html += randomElements.map(item => `
                            <li>
                                <figure>
                                    <blockquote>"${item.quote}</blockquote>
                                    <figcaption>— <cite>${item.cite}</cite></figcaption>
                                </figure>
                            </li>
                        `).join('');
                        html += '</ul>';
                        
                        dynamicContent.innerHTML = html;
                    }

                    container.classList.remove('is-loading');
                });


            })
            .catch(error => {
                console.error('Error fetching quote snippet:', error);
                quoteContainer.forEach(container => {
                    container.innerHTML = '<p>Sorry, we couldn\'t load the quote at this time.</p>';
                });
            });
    }

    // Initialize GLightbox
    if( typeof GLightbox !== 'undefined' ){
        const lightbox = GLightbox({
            selector: '.glightbox'
        });
    }
});

function getRandomElements(arr, count) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    
    return shuffled.slice(0, count);
}