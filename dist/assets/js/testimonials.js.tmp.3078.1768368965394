// ============================================================================
// TESTIMONIALS SLIDER
// ============================================================================
// 3-card grid slider with responsive behavior
// Shows navigation only when more than 3 cards exist
// ============================================================================

(function() {
  'use strict';

  const track = document.getElementById('testimonialsTrack');
  const nav = document.getElementById('testimonialsNav');
  const dotsContainer = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');

  if (!track || !nav || !dotsContainer || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.testimonial-card-wrapper');
  let currentIndex = 0;
  let cardsPerView = 3;
  let totalPages = 1;
  let isTransitioning = false;

  function calculateCardsPerView() {
    const width = window.innerWidth;
    if (width < 768) {
      return 1;
    } else if (width < 992) {
      return 2;
    } else {
      return 3;
    }
  }

  function updateLayout() {
    cardsPerView = calculateCardsPerView();
    totalPages = Math.ceil(cards.length / cardsPerView);

    // Hide navigation if all cards fit on one page
    if (totalPages <= 1) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
      createDots();
    }

    // Reset to first page if current page doesn't exist anymore
    if (currentIndex >= totalPages) {
      currentIndex = 0;
    }

    updateSlider();
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.className = 'testimonial-dot';
      dot.setAttribute('aria-label', 'Seite ' + (i + 1));
      dot.addEventListener('click', function() {
        goToPage(i);
      });
      dotsContainer.appendChild(dot);
    }
    updateDots();
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.testimonial-dot');
    dots.forEach(function(dot, index) {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const offset = -(currentIndex * cardsPerView * (cardWidth + gap));

    track.style.transform = 'translateX(' + offset + 'px)';

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalPages - 1;

    updateDots();
  }

  function goToPage(index) {
    if (isTransitioning) return;

    if (index < 0) {
      currentIndex = 0;
    } else if (index >= totalPages) {
      currentIndex = totalPages - 1;
    } else {
      currentIndex = index;
    }

    isTransitioning = true;
    updateSlider();

    setTimeout(function() {
      isTransitioning = false;
    }, 600);
  }

  function nextPage() {
    goToPage(currentIndex + 1);
  }

  function prevPage() {
    goToPage(currentIndex - 1);
  }

  // Event listeners
  prevBtn.addEventListener('click', function(e) {
    e.preventDefault();
    prevPage();
  });

  nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    nextPage();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (nav.classList.contains('hidden')) return;
    if (e.key === 'ArrowLeft') prevPage();
    if (e.key === 'ArrowRight') nextPage();
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    touchEndX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    isDragging = false;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextPage();
      } else {
        prevPage();
      }
    }
  }

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      updateLayout();
    }, 250);
  });

  // Initialize
  updateLayout();

  // Recalculate on images loaded
  window.addEventListener('load', function() {
    updateLayout();
  });
})();
