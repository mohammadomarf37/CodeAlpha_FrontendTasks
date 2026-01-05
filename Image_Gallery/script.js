 // Image data with categories
        const images = [
            { src: "https://placehold.co/600x400/4f46e5/white?text=Nature+1", alt: "Majestic mountain landscape", category: "nature" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=Animal+1", alt: "Cute puppy in a garden", category: "animals" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=Tech+1", alt: "Modern laptop with code", category: "technology" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=People+1", alt: "Business team meeting", category: "people" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=Nature+2", alt: "Serene forest with sunlight", category: "nature" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=Animal+2", alt: "Bird on a branch", category: "animals" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=Tech+2", alt: "Smartphones and gadgets", category: "technology" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=People+2", alt: "Friends laughing together", category: "people" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=Nature+3", alt: "Ocean waves crashing", category: "nature" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=Animal+3", alt: "Family of elephants", category: "animals" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=Tech+3", alt: "Virtual reality headset", category: "technology" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=People+3", alt: "Artist painting", category: "people" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=Nature+4", alt: "Colorful autumn trees", category: "nature" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=Animal+4", alt: "Tiger in the wild", category: "animals" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=Tech+4", alt: "Data visualization on screen", category: "technology" },
            { src: "https://placehold.co/600x400/4f46e5/white?text=People+4", alt: "Musician playing guitar", category: "people" }
        ];

        // DOM Elements
        const galleryGrid = document.getElementById('galleryGrid');
        const categoryBtns = document.querySelectorAll('.category-btn');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const closeBtn = document.getElementById('closeBtn');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const backToTop = document.getElementById('backToTop');
        const navLinks = document.querySelectorAll('.nav-link');

        // Current lightbox state
        let currentIndex = 0;
        let currentFilter = 'all';

        // Generate gallery items
        function generateGallery(filter = 'all') {
            galleryGrid.innerHTML = '';
            const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);
            
            filteredImages.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item animate-fade-in';
                galleryItem.setAttribute('data-category', image.category);
                galleryItem.setAttribute('data-index', index);
                
                galleryItem.innerHTML = `
                    <img src="${image.src}" alt="${image.alt}">
                    <div class="gallery-overlay">
                        <i class="fas fa-search-plus mr-2"></i> View
                    </div>
                `;
                
                galleryItem.addEventListener('click', () => openLightbox(filter === 'all' ? index : filteredImages.indexOf(image), filter));
                galleryGrid.appendChild(galleryItem);
            });
        }

        // Open lightbox
        function openLightbox(index, filter = 'all') {
            currentIndex = index;
            currentFilter = filter;
            const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);
            lightboxImg.src = filteredImages[index].src;
            lightboxImg.alt = filteredImages[index].alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Navigate lightbox
        function navigateLightbox(direction) {
            const filteredImages = currentFilter === 'all' ? images : images.filter(img => img.category === currentFilter);
            currentIndex += direction;
            
            if (currentIndex < 0) {
                currentIndex = filteredImages.length - 1;
            } else if (currentIndex >= filteredImages.length) {
                currentIndex = 0;
            }
            
            lightboxImg.src = filteredImages[currentIndex].src;
            lightboxImg.alt = filteredImages[currentIndex].alt;
        }

        // Filter gallery
        function filterGallery(filter) {
            currentFilter = filter;
            categoryBtns.forEach(btn => {
                if (btn.dataset.filter === filter) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            generateGallery(filter);
        }

        // Smooth scrolling
        function smoothScroll(target) {
            const element = document.querySelector(target);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }

        // Show/hide back to top button
        function handleScroll() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            generateGallery();
            
            // Category filtering
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterGallery(btn.dataset.filter);
                });
            });
            
            // Lightbox controls
            closeBtn.addEventListener('click', closeLightbox);
            prevBtn.addEventListener('click', () => navigateLightbox(-1));
            nextBtn.addEventListener('click', () => navigateLightbox(1));
            
            // Keyboard controls
            document.addEventListener('keydown', (e) => {
                if (lightbox.classList.contains('active')) {
                    if (e.key === 'Escape') closeLightbox();
                    if (e.key === 'ArrowLeft') navigateLightbox(-1);
                    if (e.key === 'ArrowRight') navigateLightbox(1);
                }
            });
            
            // Mobile menu toggle
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
            
            // Navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = link.getAttribute('href');
                    smoothScroll(target);
                    navMenu.classList.remove('active');
                    
                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                });
            });
            
            // Back to top
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Scroll event
            window.addEventListener('scroll', handleScroll);
            
            // Initialize active nav link
            const sections = document.querySelectorAll('section');
            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= (sectionTop - 100)) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
        });