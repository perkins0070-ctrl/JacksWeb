/**
 * Gallery Module
 * Handles photo gallery functionality with filtering and lightbox
 */

class GalleryManager {
    constructor() {
        this.galleryGrid = document.getElementById('galleryGrid');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.currentFilter = 'all';
        this.galleryItems = [];
        this.lightboxActive = false;
        
        // Gallery data - in a real implementation, this would come from a CMS or API
        this.galleryData = [
            {
                id: 1,
                title: 'Mountain Sunset',
                category: 'nature',
                description: 'Beautiful sunset over the mountain range',
                src: 'assets/images/placeholder-gallery.svg', // Using placeholder
                alt: 'Mountain sunset landscape'
            },
            {
                id: 2,
                title: 'Forest Path',
                category: 'nature',
                description: 'Peaceful walking path through autumn forest',
                src: 'assets/images/placeholder-gallery.svg',
                alt: 'Forest path in autumn'
            },
            {
                id: 3,
                title: 'Ocean Waves',
                category: 'nature',
                description: 'Powerful waves crashing against rocky shore',
                src: 'assets/images/placeholder-gallery.svg',
                alt: 'Ocean waves on rocky shore'
            },
            {
                id: 4,
                title: 'Desert Landscape',
                category: 'nature',
                description: 'Vast desert with sand dunes at golden hour',
                src: 'assets/images/placeholder-gallery.svg',
                alt: 'Desert landscape at sunset'
            },
            {
                id: 5,
                title: 'Family Gathering',
                category: 'people',
                description: 'Happy family moment during holiday celebration',
                src: 'assets/images/placeholder-gallery.svg',
                alt: 'Family gathering photo'
            },
            {
                id: 6,
                title: 'Friends Adventure',
                category: 'people',
                description: 'Adventure trip with close friends',
                src: 'assets/images/placeholder-gallery.svg',
                alt: 'Friends on adventure trip'
            },
            {
                id: 7,
                title: 'Wedding Celebration',
                category: 'people',
                description: 'Joyful wedding celebration moment',
                src: 'assets/images/placeholder-gallery.svg',
                alt: 'Wedding celebration'
            },
            {
                id: 8,
                title: 'Graduation Day',
                category: 'people',
                description: 'Proud graduation day memories',
                src: 'assets/images/placeholder-gallery.svg',
                alt: 'Graduation ceremony'
            },
            {
                id: 9,
                title: 'Luna Sleeping',
                category: 'cats',
                description: 'My cat Luna taking her afternoon nap',
                src: 'assets/images/placeholder-gallery.svg',
                alt: 'Cat sleeping peacefully'
            },
            {
                id: 10,
                title: 'Shadow Playing',
                category: 'cats',
                description: 'Shadow being playful with his favorite toy',
                src: 'assets/images/placeholder-gallery.svg',
                alt: 'Cat playing with toy'
            },
            {
                id: 11,
                title: 'Whiskers Portrait',
                category: 'cats',
                description: 'Beautiful portrait of Whiskers in natural light',
                src: 'assets/images/placeholder-gallery.svg',
                alt: 'Cat portrait in natural light'
            },
            {
                id: 12,
                title: 'Cat Trio',
                category: 'cats',
                description: 'All three cats enjoying sunny window spot',
                src: 'assets/images/placeholder-gallery.svg',
                alt: 'Three cats by window'
            }
        ];

        this.init();
    }

    init() {
        this.createLightbox();
        this.setupEventListeners();
        this.renderGallery();
    }

    setupEventListeners() {
        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.setActiveFilter(filter);
                this.filterGallery(filter);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightboxActive) {
                this.handleLightboxKeyboard(e);
            }
        });

        // Close lightbox on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('lightbox') && this.lightboxActive) {
                this.closeLightbox();
            }
        });
    }

    setActiveFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        this.filterBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    renderGallery() {
        if (!this.galleryGrid) return;

        const galleryHTML = this.galleryData.map(item => {
            return this.createGalleryItemHTML(item);
        }).join('');

        this.galleryGrid.innerHTML = galleryHTML;

        // Add event listeners to gallery items
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const itemId = parseInt(item.dataset.id);
                this.openLightbox(itemId);
            });
        });
    }

    createGalleryItemHTML(item) {
        return `
            <div class="gallery-item ${item.category}" data-id="${item.id}">
                <img src="${item.src}" alt="${item.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <div class="overlay-content">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                </div>
            </div>
        `;
    }

    filterGallery(filter) {
        if (!this.galleryItems.length) return;

        this.galleryItems.forEach((item, index) => {
            const itemCategory = item.classList[1]; // Second class is the category
            const shouldShow = filter === 'all' || itemCategory === filter;

            if (shouldShow) {
                item.style.display = 'block';
                // Animate in with delay
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, index * 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    createLightbox() {
        const lightboxHTML = `
            <div class="lightbox" id="lightbox">
                <div class="lightbox-content">
                    <button class="lightbox-close" id="lightboxClose">
                        <i class="fas fa-times"></i>
                    </button>
                    <button class="lightbox-nav lightbox-prev" id="lightboxPrev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="lightbox-nav lightbox-next" id="lightboxNext">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <div class="lightbox-image-container">
                        <img class="lightbox-image" id="lightboxImage" src="" alt="">
                    </div>
                    <div class="lightbox-info">
                        <h3 class="lightbox-title" id="lightboxTitle"></h3>
                        <p class="lightbox-description" id="lightboxDescription"></p>
                        <div class="lightbox-meta">
                            <span class="lightbox-category" id="lightboxCategory"></span>
                            <span class="lightbox-counter" id="lightboxCounter"></span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        // Add lightbox styles
        this.addLightboxStyles();

        // Setup lightbox event listeners
        document.getElementById('lightboxClose').addEventListener('click', () => this.closeLightbox());
        document.getElementById('lightboxPrev').addEventListener('click', () => this.navigateLightbox('prev'));
        document.getElementById('lightboxNext').addEventListener('click', () => this.navigateLightbox('next'));
    }

    addLightboxStyles() {
        const lightboxStyles = `
            <style id="lightbox-styles">
                .lightbox {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .lightbox.active {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 1;
                }
                
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    display: flex;
                    flex-direction: column;
                }
                
                .lightbox-close {
                    position: absolute;
                    top: -50px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    z-index: 10001;
                    padding: 10px;
                    transition: color 0.3s ease;
                }
                
                .lightbox-close:hover {
                    color: var(--primary-color);
                }
                
                .lightbox-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    padding: 15px;
                    cursor: pointer;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }
                
                .lightbox-nav:hover {
                    background: var(--primary-color);
                    transform: translateY(-50%) scale(1.1);
                }
                
                .lightbox-prev {
                    left: -70px;
                }
                
                .lightbox-next {
                    right: -70px;
                }
                
                .lightbox-image-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 2rem;
                }
                
                .lightbox-image {
                    max-width: 100%;
                    max-height: 70vh;
                    object-fit: contain;
                    border-radius: 8px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                }
                
                .lightbox-info {
                    text-align: center;
                    color: white;
                }
                
                .lightbox-title {
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                    color: white;
                }
                
                .lightbox-description {
                    font-size: 1rem;
                    margin-bottom: 1rem;
                    color: rgba(255, 255, 255, 0.8);
                }
                
                .lightbox-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.6);
                }
                
                .lightbox-category {
                    background: var(--primary-color);
                    color: white;
                    padding: 0.3rem 0.8rem;
                    border-radius: 20px;
                    font-weight: 500;
                }
                
                @media (max-width: 768px) {
                    .lightbox-nav {
                        position: fixed;
                        top: auto;
                        bottom: 20px;
                        transform: none;
                    }
                    
                    .lightbox-prev {
                        left: 20px;
                    }
                    
                    .lightbox-next {
                        right: 20px;
                    }
                    
                    .lightbox-close {
                        top: 20px;
                        right: 20px;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', lightboxStyles);
    }

    openLightbox(itemId) {
        const item = this.galleryData.find(item => item.id === itemId);
        if (!item) return;

        this.currentLightboxIndex = this.galleryData.findIndex(item => item.id === itemId);
        this.lightboxActive = true;

        const lightbox = document.getElementById('lightbox');
        const image = document.getElementById('lightboxImage');
        const title = document.getElementById('lightboxTitle');
        const description = document.getElementById('lightboxDescription');
        const category = document.getElementById('lightboxCategory');
        const counter = document.getElementById('lightboxCounter');

        // Update lightbox content
        image.src = item.src;
        image.alt = item.alt;
        title.textContent = item.title;
        description.textContent = item.description;
        category.textContent = item.category.charAt(0).toUpperCase() + item.category.slice(1);
        counter.textContent = `${this.currentLightboxIndex + 1} / ${this.galleryData.length}`;

        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        this.lightboxActive = false;
    }

    navigateLightbox(direction) {
        if (direction === 'next') {
            this.currentLightboxIndex = (this.currentLightboxIndex + 1) % this.galleryData.length;
        } else {
            this.currentLightboxIndex = this.currentLightboxIndex === 0 ? 
                this.galleryData.length - 1 : this.currentLightboxIndex - 1;
        }

        const item = this.galleryData[this.currentLightboxIndex];
        this.openLightbox(item.id);
    }

    handleLightboxKeyboard(e) {
        switch(e.key) {
            case 'Escape':
                this.closeLightbox();
                break;
            case 'ArrowLeft':
                this.navigateLightbox('prev');
                break;
            case 'ArrowRight':
                this.navigateLightbox('next');
                break;
        }
    }

    // Method to add new gallery items (for future expansion)
    addGalleryItem(item) {
        this.galleryData.push({
            id: Date.now(),
            ...item
        });
        this.renderGallery();
    }

    // Method to remove gallery items
    removeGalleryItem(itemId) {
        this.galleryData = this.galleryData.filter(item => item.id !== itemId);
        this.renderGallery();
    }

    // Method to get gallery statistics
    getGalleryStats() {
        const stats = {};
        this.galleryData.forEach(item => {
            stats[item.category] = (stats[item.category] || 0) + 1;
        });
        return {
            totalImages: this.galleryData.length,
            categories: stats
        };
    }
}

// Initialize Gallery Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.galleryManager = new GalleryManager();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GalleryManager;
}
