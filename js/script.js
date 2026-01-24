/* ============================================
   Al Sami Associates - Main JavaScript
   ============================================ */

// Global variables
let swiperInstance = null;
const projectsData = [];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    loadComponents();
    initializeNavigation();
    initializeSwiper();
    initializeLazyLoading();
    initializeFormHandlers();
    initializeSmoothScroll();
    initializeMobileMenu();
    initializePDFDownload();
    loadProjectsData();
});

// ============================================
// Component Loading (Header & Footer)
// ============================================

async function loadComponents() {
    // Use pages/components for all pages
    const isRootPage = !window.location.pathname.includes('/pages/');

    // Load header
    const headerPlaceholder = document.getElementById('header');
    if (headerPlaceholder) {
        try {
            const headerPath = isRootPage ? 'pages/components/header.html' : '../pages/components/header.html';
            const response = await fetch(headerPath);
            if (response.ok) {
                const html = await response.text();
                headerPlaceholder.innerHTML = html;
                // Fix paths based on current page location
                fixComponentPaths(isRootPage);
                // Reinitialize navigation after header loads
                setTimeout(() => {
                    initializeNavigation();
                    setActiveNavLink();
                }, 100);
            }
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    // Load footer
    const footerPlaceholder = document.getElementById('footer');
    if (footerPlaceholder) {
        try {
            const footerPath = isRootPage ? 'pages/components/footer.html' : '../pages/components/footer.html';
            const response = await fetch(footerPath);
            if (response.ok) {
                const html = await response.text();
                footerPlaceholder.innerHTML = html;
                // Fix footer paths based on current page location
                fixFooterPaths(isRootPage);
            }
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
}

function fixComponentPaths(isRootPage) {
    // Fix header links and images based on page location
    const brandLink = document.querySelector('[data-nav-brand]');
    const brandImg = document.querySelector('[data-nav-logo]');
    const navLinks = document.querySelectorAll('[data-nav-link]');

    // Paths configuration
    const paths = {
        root: {
            brand: 'index.html',
            logo: 'public/images/logo.jpg',
            home: 'index.html',
            about: 'pages/about.html',
            services: 'pages/services.html',
            products: 'pages/products.html',
            projects: 'pages/projects.html',
            contact: 'pages/contact.html'
        },
        pages: {
            brand: '../index.html',
            logo: '../public/images/logo.jpg',
            home: '../index.html',
            about: 'about.html',
            services: 'services.html',
            products: 'products.html',
            projects: 'projects.html',
            contact: 'contact.html'
        }
    };

    const pathSet = isRootPage ? paths.root : paths.pages;

    if (brandLink) brandLink.href = pathSet.brand;
    if (brandImg) brandImg.src = pathSet.logo;

    navLinks.forEach(link => {
        const linkType = link.getAttribute('data-nav-link');
        if (linkType && pathSet[linkType]) {
            link.href = pathSet[linkType];
        }
    });

    // Fix dropdown links (which are hardcoded in header.html)
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.startsWith('pages/') && !isRootPage) {
            // If we are in a subpage (isRootPage is false), remove 'pages/' prefix
            // e.g. 'pages/heat-proofing.html' becomes 'heat-proofing.html'
            item.href = href.replace('pages/', '');
        }
    });
}

function fixFooterPaths(isRootPage) {
    // Fix footer links based on page location
    const footerLinks = document.querySelectorAll('[data-footer-link]');
    const footerPdf = document.querySelector('[data-footer-pdf]');

    const paths = {
        root: {
            home: 'index.html',
            about: 'pages/about.html',
            services: 'pages/services.html',
            projects: 'pages/projects.html',
            contact: 'pages/contact.html',
            'services-construction': 'pages/services.html#construction',
            'services-renovation': 'pages/services.html#renovation',
            'services-waterproofing': 'pages/services.html#waterproofing',
            'services-heat-proofing': 'pages/services.html#heat-proofing',
            'services-pest-control': 'pages/services.html#pest-control',
            pdf: 'public/Al Sami Associates Pvt Ltd 2025.pdf'
        },
        pages: {
            home: '../index.html',
            about: 'about.html',
            services: 'services.html',
            projects: 'projects.html',
            contact: 'contact.html',
            'services-construction': 'services.html#construction',
            'services-renovation': 'services.html#renovation',
            'services-waterproofing': 'services.html#waterproofing',
            'services-heat-proofing': 'services.html#heat-proofing',
            'services-pest-control': 'services.html#pest-control',
            pdf: '../public/Al Sami Associates Pvt Ltd 2025.pdf'
        }
    };

    const pathSet = isRootPage ? paths.root : paths.pages;

    footerLinks.forEach(link => {
        const linkType = link.getAttribute('data-footer-link');
        if (linkType && pathSet[linkType]) {
            link.href = pathSet[linkType];
        }
    });

    if (footerPdf && pathSet.pdf) {
        footerPdf.href = pathSet.pdf;
    }
}

function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (currentPath.includes('about') && href.includes('about')) {
            link.classList.add('active');
        } else if (currentPath.includes('services') && href.includes('services')) {
            link.classList.add('active');
        } else if (currentPath.includes('projects') && href.includes('projects')) {
            link.classList.add('active');
        } else if (currentPath.includes('contact') && href.includes('contact')) {
            link.classList.add('active');
        } else if ((currentPath === '/' || currentPath.includes('index')) && href.includes('index')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Navigation Functions
// ============================================

function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return; // Exit if navbar not loaded yet

    // Add scroll effect to navbar
    window.addEventListener('scroll', function () {
        if (navbar && window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else if (navbar) {
            navbar.classList.remove('scrolled');
        }
    });

    // Set active nav link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath ||
            (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Swiper Slider Initialization
// ============================================

function initializeSwiper() {
    const swiperContainer = document.querySelector('.swiper');
    if (!swiperContainer) return;

    swiperInstance = new Swiper('.swiper', {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        loop: true,
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1200,
        grabCursor: true,
        on: {
            slideChange: function () {
                // Reset Ken Burns animation on slide change
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    const img = activeSlide.querySelector('img');
                    if (img) {
                        img.style.animation = 'none';
                        setTimeout(() => {
                            img.style.animation = 'kenBurns 8s ease-out forwards';
                        }, 10);
                    }
                }
            }
        }
    });
}

// ============================================
// Project Data Loading
// ============================================

async function loadProjectsData() {
    // Populate projectsData from the global configuration
    if (typeof window.PROJECTS_DATA !== 'undefined') {
        Object.values(window.PROJECTS_DATA).forEach(project => {
            projectsData.push(project);
        });
    }

    // Load images for slider
    loadSliderImages();

    // Load projects grid if on projects page
    loadProjectsGrid();
}

function loadSliderImages() {
    const sliderContainer = document.querySelector('.swiper-wrapper');
    if (!sliderContainer) return;

    // Clear existing slides
    sliderContainer.innerHTML = '';

    // Add slides for each project (up to 4 images per project)
    projectsData.forEach((project) => {
        // Take first 4 images, or all if less than 4
        const displayImages = project.images.slice(0, 4);
        
        displayImages.forEach(imageName => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            const imagePath = `public/images/projects/${project.folder}/${imageName}`;
            
            slide.innerHTML = `
                <img src="${imagePath}" 
                     alt="${project.name}" 
                     loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop'">
                <div class="swiper-caption animated-caption">
                    <h3 class="slide-title">${project.name}</h3>
                    <p class="slide-desc">${project.description}</p>
                    <span class="badge bg-primary mt-2">${project.category.toUpperCase()}</span>
                </div>
            `;
            sliderContainer.appendChild(slide);
        });
    });

    // Reinitialize Swiper if it exists
    if (swiperInstance) {
        swiperInstance.update();
    } else {
        // Initialize Swiper if not already initialized
        initializeSwiper();
    }
}

function loadProjectsGrid() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    projectsData.forEach(project => {
        const col = document.createElement('div');
        col.className = 'col-md-4 project-item';
        col.setAttribute('data-category', project.category);
        
        // Use first image as thumbnail, or placeholder
        const thumbnail = project.images.length > 0 
            ? `../public/images/projects/${project.folder}/${project.images[0]}`
            : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop';

        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                <div class="position-relative overflow-hidden">
                    <img src="${thumbnail}" class="card-img-top project-image" alt="${project.name}" loading="lazy">
                    <div class="project-overlay">
                        <button class="btn btn-light btn-sm" onclick="viewProject('${project.name}')">
                            <i class="fas fa-images me-1"></i> View Gallery
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${project.name}</h5>
                    <p class="card-text text-muted small">${project.description}</p>
                    <span class="badge bg-light text-dark border">${project.category}</span>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });

    initializeProjectFilters();
}

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Make viewProject available globally
window.viewProject = function(projectName) {
    const project = projectsData.find(p => p.name === projectName);
    if (!project) return;

    // Create modal dynamically if it doesn't exist
    let modal = document.getElementById('projectGalleryModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'projectGalleryModal';
        modal.className = 'modal fade';
        modal.setAttribute('tabindex', '-1');
        modal.innerHTML = `
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h5 class="modal-title fw-bold"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <p class="project-description lead text-muted mb-4"></p>
                        <div class="row g-3 gallery-grid"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Populate modal content
    const modalTitle = modal.querySelector('.modal-title');
    const modalDesc = modal.querySelector('.project-description');
    const galleryGrid = modal.querySelector('.gallery-grid');

    modalTitle.textContent = project.name;
    modalDesc.textContent = project.description;
    galleryGrid.innerHTML = '';

    project.images.forEach(imageName => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';
        const imagePath = `../public/images/projects/${project.folder}/${imageName}`;
        
        col.innerHTML = `
            <div class="gallery-item position-relative rounded overflow-hidden shadow-sm">
                <img src="${imagePath}" class="img-fluid w-100" alt="${project.name}" loading="lazy" style="height: 250px; object-fit: cover;">
            </div>
        `;
        galleryGrid.appendChild(col);
    });

    // Show modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
};

// ============================================
// Lazy Loading
// ============================================

function initializeLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
}

// ============================================
// Form Handlers
// ============================================

function initializeFormHandlers() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Quote form handlers
    const quoteForms = document.querySelectorAll('.quote-form');
    quoteForms.forEach(form => {
        form.addEventListener('submit', handleQuoteForm);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Basic validation
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
        showAlert('Please fill in all required fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
    }

    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    showAlert('Thank you for your message! We will get back to you soon.', 'success');
    form.reset();
}

function handleQuoteForm(e) {
    e.preventDefault();
    // Similar to contact form handler
    showAlert('Quote request submitted! We will contact you shortly.', 'success');
    e.target.reset();
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showAlert(message, type) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'success' ? 'success' : 'danger'}`;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 5px;
        z-index: 9999;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    alert.textContent = message;

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.style.opacity = '0';
        alert.style.transition = 'opacity 0.3s';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// ============================================
// Smooth Scroll
// ============================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// Mobile Menu
// ============================================

function initializeMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function () {
            navbarCollapse.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });

        // Close menu when clicking a link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navbarCollapse.classList.remove('show');
            });
        });
    }
}

// ============================================
// PDF Download Handler
// ============================================

function initializePDFDownload() {
    const downloadButtons = document.querySelectorAll('.btn-download-pdf');

    downloadButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const pdfPath = 'public/Al Sami Associates Pvt Ltd_ 2025.pdf';

            // Create a temporary link and trigger download
            const link = document.createElement('a');
            link.href = pdfPath;
            link.download = 'Al Sami Associates - Company Profile.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
}

// ============================================
// Service Estimator (if needed)
// ============================================

function calculateEstimate(area, serviceType) {
    const basePrice = 50000; // Base price in PKR
    const pricePerSqFt = {
        'waterproofing': 75,
        'heat-proofing': 80,
        'construction': 150,
        'renovation': 100
    };

    const rate = pricePerSqFt[serviceType] || 75;
    const total = basePrice + (area * rate);

    return {
        min: total * 0.9,
        max: total * 1.1
    };
}

// ============================================
// Utility Functions
// ============================================

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

// ============================================
// Project Image Loader
// ============================================

async function loadProjectImages(projectFolder) {
    // This function will load actual images from project folders
    // For now, returns placeholder structure
    const projectImages = [];

    // Project folder names
    const folders = [
        'AIOU Construction Page',
        'Bank Al Falah',
        'CABI Mardan',
        'DHA - II',
        'Girls Guide Association',
        'MINISter Enclave',
        'MoFA House',
        'NCP',
        'NIC',
        'PCSIR',
        'PCSIR Chairmen Office',
        'PCST',
        'PTV'
    ];

    // Match folder name
    const matchedFolder = folders.find(f =>
        f.toLowerCase().replace(/\s+/g, '') === projectFolder.toLowerCase().replace(/\s+/g, '')
    );

    if (matchedFolder) {
        // In production, this would fetch actual images from the folder
        // For now, return placeholder structure
        return {
            folder: matchedFolder,
            images: [] // Will be populated with actual image paths
        };
    }

    return null;
}

// ============================================
// Enhanced PDF Download
// ============================================

function downloadPDF() {
    const pdfPath = 'public/Al Sami Associates Pvt Ltd_ 2025.pdf';
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'Al Sami Associates - Company Profile.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Export for use in other scripts if needed
window.AlSamiAssociates = {
    calculateEstimate,
    showAlert,
    projectsData,
    loadProjectImages,
    downloadPDF
};
