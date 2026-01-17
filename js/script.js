/* ============================================
   Al Sami Associates - Main JavaScript
   ============================================ */

// Global variables
let swiperInstance = null;
const projectsData = [];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
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
// Navigation Functions
// ============================================

function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
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
            delay: 5000,
            disableOnInteraction: false,
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
            type: 'progressbar',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
    });
}

// ============================================
// Project Data Loading
// ============================================

async function loadProjectsData() {
    // This will be populated with actual project data
    // For now, we'll create a structure based on folder names
    const projectFolders = [
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
    
    projectFolders.forEach(folder => {
        projectsData.push({
            name: folder,
            folder: folder,
            images: []
        });
    });
    
    // Load images for slider
    loadSliderImages();
}

function loadSliderImages() {
    const sliderContainer = document.querySelector('.swiper-wrapper');
    if (!sliderContainer) return;
    
    // Project folders with their display names
    const projects = [
        { name: 'MoFA House', folder: 'MoFA House', description: 'Complete construction and renovation project' },
        { name: 'PCSIR Office', folder: 'PCSIR', description: 'Institutional building construction' },
        { name: 'PCSIR Chairmen Office', folder: 'PCSIR Chairmen Office', description: 'Executive office construction' },
        { name: 'Bank Al Falah', folder: 'Bank Al Falah', description: 'Commercial building renovation' },
        { name: 'Minister Enclave', folder: 'MINISter Enclave', description: 'Government residential complex' },
        { name: 'AIOU Construction', folder: 'AIOU Construction Page', description: 'University construction projects' },
        { name: 'DHA - II', folder: 'DHA - II', description: 'Infrastructure development' },
        { name: 'PTV Data Center', folder: 'PTV', description: 'Data center construction' }
    ];
    
    // Clear existing slides (except first placeholder)
    const existingSlides = sliderContainer.querySelectorAll('.swiper-slide');
    if (existingSlides.length > 0) {
        existingSlides.forEach((slide, index) => {
            if (index > 0) slide.remove(); // Keep first slide as fallback
        });
    }
    
    // Add project slides
    projects.forEach((project, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <img src="https://images.unsplash.com/photo-${1486406146926 + index}?w=1200&h=600&fit=crop" 
                 alt="${project.name}" 
                 loading="lazy"
                 data-src="public/images/projects/${project.folder}">
            <div class="swiper-caption">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            </div>
        `;
        sliderContainer.appendChild(slide);
    });
    
    // Reinitialize Swiper if it exists
    if (swiperInstance) {
        swiperInstance.update();
    }
}

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
        anchor.addEventListener('click', function(e) {
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
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
        
        // Close menu when clicking a link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
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
        button.addEventListener('click', function(e) {
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
