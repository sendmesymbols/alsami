/* ============================================
   Al Sami Associates - Main JavaScript
   ============================================ */

// Global variables
let swiperInstance = null;
let lightGalleryInstance = null;
const projectsData = [];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    loadComponents();
    initializeNavigation();
    initializeLazyLoading();
    initializeFormHandlers();
    initializeSmoothScroll();
    initializeMobileMenu();
    initializePDFDownload();
    loadProjectsData();

    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-in-out-cubic'
        });
    }
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
            gallery: 'pages/projects.html',
            'year-wise-summary': 'pages/year-wise-summary.html',
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
            gallery: 'projects.html',
            'year-wise-summary': 'year-wise-summary.html',
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
            'services-roofing': 'pages/services.html#roofing',
            'services-interior': 'pages/services.html#interior',
            'services-partition': 'pages/services.html#partition',
            'services-plumbing': 'pages/services.html#plumbing',
            'services-electrical': 'pages/services.html#electrical',
            'services-pest': 'pages/services.html#pest-control',
            'services-furniture': 'pages/services.html#furniture',
            'services-supplies': 'pages/services.html#supplies',
            pdf: 'public/Al Sami Associates Pvt Ltd 2025.pdf'
        },
        pages: {
            home: '../index.html',
            about: 'about.html',
            services: 'services.html',
            projects: 'projects.html',
            contact: 'contact.html',
            'services-construction': 'services.html#construction',
            'services-roofing': 'services.html#roofing',
            'services-interior': 'services.html#interior',
            'services-partition': 'services.html#partition',
            'services-plumbing': 'services.html#plumbing',
            'services-electrical': 'services.html#electrical',
            'services-pest': 'services.html#pest-control',
            'services-furniture': 'services.html#furniture',
            'services-supplies': 'services.html#supplies',
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
        } else if ((currentPath.includes('projects') || currentPath.includes('year-wise-summary')) && href.includes('projects')) {
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

    swiperInstance = new Swiper('.project-slider', {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
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

/**
 * Helper to get correctly encoded path for project images
 * Handles root vs pages directory and special characters like ()
 */
function getProjectImagePath(projectFolder, imageName) {
    const isRootPage = !window.location.pathname.includes('/pages/');
    const prefix = isRootPage ? '' : '../';
    const path = `public/images/projects/${projectFolder}/${imageName}`;

    // encodeURI handles spaces but not parentheses. We encode everything properly.
    return encodeURI(prefix + path)
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29');
}

function loadSliderImages() {
    const sliderContainer = document.querySelector('.swiper-wrapper');
    if (!sliderContainer) return;

    // Clear existing slides
    sliderContainer.innerHTML = '';

    // Add slides for each project (up to 4 images per project)
    projectsData.filter(p => p.show_on_main_page === 1).forEach((project) => {
        // Take first 4 images, or all if less than 4
        const displayImages = project.images.slice(0, 4);

        displayImages.forEach(imageName => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            const imagePath = getProjectImagePath(project.folder, imageName);



            slide.innerHTML = `
                <img src="${imagePath}" 
                     alt="${project.name}" 
                     loading="lazy"
                     onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop'">
                <div class="swiper-caption animated-caption">
                    <h3 class="slide-title">${project.name}</h3>
                    <p class="slide-desc">${project.description}</p>
                    <p class="slide-location"><i class="fas fa-map-marker-alt me-1"></i> ${project.location}</p>
                </div>
            `;
            sliderContainer.appendChild(slide);
        });
    });

    // Safety check: If we have fewer than 2 slides, Swiper loop will fail.
    // Duplicate slides if needed to ensure loop mode works.
    const finalSlidesCount = sliderContainer.querySelectorAll('.swiper-slide').length;
    if (finalSlidesCount === 1) {
        const firstSlide = sliderContainer.querySelector('.swiper-slide');
        const clone = firstSlide.cloneNode(true);
        sliderContainer.appendChild(clone);
    }

    // Initialize or Reinitialize Swiper
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
    }

    // Small delay to ensure DOM is ready
    setTimeout(() => {
        initializeSwiper();
        if (swiperInstance && swiperInstance.autoplay) {
            swiperInstance.autoplay.start();
        }
    }, 100);
}

function loadProjectsGrid() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    projectsData.forEach(project => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 project-item';
        col.setAttribute('data-category', project.category);

        // Use first image as thumbnail, or placeholder
        const thumbnail = project.images.length > 0
            ? getProjectImagePath(project.folder, project.images[0])
            : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop';

        col.innerHTML = `
            <div class="project-card" data-aos="fade-up" data-aos-delay="${(projectsData.indexOf(project) % 3) * 100}">
                <img src="${thumbnail}" 
                     alt="${project.name}" 
                     loading="lazy"
                     onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop'">
                <div class="project-card-overlay">
                    <span class="project-card-category">${project.category}</span>
                    <h3 class="project-card-title">${project.name}</h3>
                    <p class="project-card-desc text-white-50 small mb-2">${project.description}</p>
                    <p class="project-card-location"><i class="fas fa-map-marker-alt me-2"></i> ${project.location}</p>
                    <button class="project-card-btn" onclick="viewProject('${project.name.replace(/'/g, "\\'")}')">
                        <i class="fas fa-expand-alt me-2"></i> Explore Project
                    </button>
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

window.viewProject = function (projectName) {
    const project = projectsData.find(p => p.name === projectName);
    if (!project) return;

    const dynamicItems = project.images.map(imageName => {
        const imagePath = getProjectImagePath(project.folder, imageName);
        return {
            src: imagePath,
            thumb: imagePath,
            subHtml: `< h4 > ${project.name}</h4 ><p>${project.description}</p><p><small><i class="fas fa-map-marker-alt me-1"></i> ${project.location}</small></p>`
        };
    });

    let galleryHost = document.getElementById('lightgallery-dynamic');
    if (!galleryHost) {
        galleryHost = document.createElement('div');
        galleryHost.id = 'lightgallery-dynamic';
        document.body.appendChild(galleryHost);
    }

    if (lightGalleryInstance) {
        lightGalleryInstance.refresh(dynamicItems);
    } else {
        lightGalleryInstance = lightGallery(galleryHost, {
            dynamic: true,
            dynamicEl: dynamicItems,
            plugins: [lgThumbnail, lgAutoplay, lgFullscreen],
            thumbnail: true,
            autoplay: true,
            download: false
        });
    }

    lightGalleryInstance.openGallery(0);
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
    alert.className = `alert alert - ${type === 'success' ? 'success' : 'danger'} `;
    alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background - color: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            border - radius: 5px;
            z - index: 9999;
            box - shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
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
