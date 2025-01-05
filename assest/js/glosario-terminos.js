let currentSlide = 0;
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.nav-dot');
const progress = document.querySelector('.progress');
const totalSlides = slides.length;

function updateCarousel() {
    // Actualizar posición del carrusel
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Actualizar dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Actualizar barra de progreso
    progress.style.transform = `translateX(${currentSlide * 100}%)`;
}

// Añadir event listeners a los dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// Gestos táctiles
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0 && currentSlide < totalSlides - 1) {
            // Swipe izquierda
            currentSlide++;
        } else if (difference < 0 && currentSlide > 0) {
            // Swipe derecha
            currentSlide--;
        }
        updateCarousel();
    }
}

// Autoplay
function autoplay() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

let autoplayInterval = setInterval(autoplay, 5000);

// Pausar autoplay cuando el usuario interactúa
carousel.addEventListener('touchstart', () => clearInterval(autoplayInterval));
carousel.addEventListener('touchend', () => {
    autoplayInterval = setInterval(autoplay, 5000);
});

// Animación inicial con GSAP
gsap.from('.carousel-container', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});