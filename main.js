document.addEventListener('DOMContentLoaded', function() {
    // Initialize different components based on the current page
    if (document.querySelector('.home-page')) {
        initSlideshow();
    }
    
    if (document.querySelector('.project-page')) {
        initLightbox();
    }
    
    if (document.querySelector('.contact-page')) {
        initContactForm();
    }
});

// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    
    // Start automatic slideshow
    startSlideshow();
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
        updateSlideshow();
        startSlideshow();
    });
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        updateSlideshow();
        startSlideshow();
    });
    
    // Dot indicators click
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval);
            currentSlide = index;
            updateSlideshow();
            startSlideshow();
        });
    });
    
    // Update slideshow to show current slide
    function updateSlideshow() {
        slides.forEach(function(slide) {
            slide.classList.remove('active');
        });
        
        dots.forEach(function(dot) {
            dot.classList.remove('active');
        });
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Start automatic slideshow with 5 second interval
    function startSlideshow() {
        slideInterval = setInterval(function() {
            currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
            updateSlideshow();
        }, 5000);
    }
}

// Lightbox gallery functionality
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentImageIndex = 0;
    let galleryImages = [];
    
    // Get all gallery image sources
    galleryItems.forEach(function(item) {
        galleryImages.push(item.getAttribute('data-src'));
    });
    
    // Open lightbox when clicking on a gallery item
    galleryItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            lightboxImage.src = galleryImages[currentImageIndex];
            lightbox.classList.add('active');
        });
    });
    
    // Close lightbox when clicking on close button
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });
    
    // Click outside the image to close
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
    
    // Previous image button
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex === 0) ? galleryImages.length - 1 : currentImageIndex - 1;
        lightboxImage.src = galleryImages[currentImageIndex];
    });
    
    // Next image button
    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex === galleryImages.length - 1) ? 0 : currentImageIndex + 1;
        lightboxImage.src = galleryImages[currentImageIndex];
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex === 0) ? galleryImages.length - 1 : currentImageIndex - 1;
            lightboxImage.src = galleryImages[currentImageIndex];
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex === galleryImages.length - 1) ? 0 : currentImageIndex + 1;
            lightboxImage.src = galleryImages[currentImageIndex];
        }
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formConfirmation = document.getElementById('formConfirmation');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real implementation, you would send the form data to a server
        // For now, we'll just simulate a successful submission
        
        // Show confirmation message
        formConfirmation.classList.add('active');
        
        // Reset form
        contactForm.reset();
        
        // Hide confirmation after 5 seconds
        setTimeout(function() {
            formConfirmation.classList.remove('active');
        }, 5000);
    });
}
