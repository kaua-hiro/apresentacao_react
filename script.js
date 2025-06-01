let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const progressBar = document.getElementById('progressBar');
const slideCounter = document.getElementById('slideCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = n;
    slides[currentSlide].classList.add('active');
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    progressBar.style.width = progress + '%';
    slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

function changeSlide(direction) {
    const newSlide = currentSlide + direction;
    if (newSlide >= 0 && newSlide < totalSlides) {
        showSlide(newSlide);
    }
}

prevBtn.addEventListener('click', () => changeSlide(-1));
nextBtn.addEventListener('click', () => changeSlide(1));

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentSlide < totalSlides - 1) {
            changeSlide(1);
        }
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentSlide > 0) {
            changeSlide(-1);
        }
    } else if (e.key === 'Home') {
        e.preventDefault();
        showSlide(0);
    } else if (e.key === 'End') {
        e.preventDefault();
        showSlide(totalSlides - 1);
    }
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentSlide < totalSlides - 1) {
            changeSlide(1);
        } else if (diff < 0 && currentSlide > 0) {
            changeSlide(-1);
        }
    }
}

showSlide(0);