// ============================================================================
// LIQUID PRECISION NAVIGATION - Interactive Behaviors
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileMenu();
});

function initNavigation() {
  const liquidIndicator = document.querySelector('.liquid-indicator');
  const navLinks = document.querySelectorAll('.nav-link');
  const dockItems = document.querySelectorAll('.dock-item');

  // Set active state based on current page
  setActiveNavItem();

  // Update liquid indicator position
  updateLiquidIndicator();

  // Add hover listeners for magnetic effect on desktop
  addMagneticEffect();

  // Active page detection
  function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    // Desktop nav
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.remove('active');

      // Check if link matches current page
      if (href === currentPath ||
          href === currentPath.split('/').pop() ||
          (href.includes('#') && href === currentPath.split('/').pop() + currentHash)) {
        link.classList.add('active');
      }

      // Home page special handling
      if ((currentPath === '/' || currentPath === '/index.html') && href === 'index.html') {
        link.classList.add('active');
      }
    });

    // Mobile dock
    dockItems.forEach(item => {
      const href = item.getAttribute('href');
      item.classList.remove('active');

      // Skip items without href (like the menu button)
      if (!href) return;

      if (href === currentPath ||
          href === currentPath.split('/').pop() ||
          (href.includes('#') && href === currentPath.split('/').pop() + currentHash)) {
        item.classList.add('active');
      }

      if ((currentPath === '/' || currentPath === '/index.html') && href === 'index.html') {
        item.classList.add('active');
      }
    });
  }

  // Update liquid indicator position based on active item
  function updateLiquidIndicator() {
    if (!liquidIndicator) return;

    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
      const navItem = activeLink.closest('.nav-item');
      if (navItem) {
        const rect = navItem.getBoundingClientRect();
        const navRail = document.querySelector('.nav-rail');
        const railRect = navRail?.getBoundingClientRect();

        if (railRect) {
          const offsetY = rect.top - railRect.top + (rect.height / 2) - 25; // Center the indicator
          liquidIndicator.style.transform = `translateX(-50px) translateY(${offsetY}px)`;
          liquidIndicator.classList.add('active');
        }
      }
    }
  }

  // Magnetic hover effect for icons
  function addMagneticEffect() {
    const iconWrappers = document.querySelectorAll('.nav-icon-wrapper');

    iconWrappers.forEach(wrapper => {
      const link = wrapper.closest('.nav-link');
      if (!link) return;

      link.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.15;
        const deltaY = (e.clientY - centerY) * 0.15;

        wrapper.style.transform = `translateY(-3px) scale(1.1) translate(${deltaX}px, ${deltaY}px)`;
      });

      link.addEventListener('mouseleave', () => {
        wrapper.style.transform = '';
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update URL
        history.pushState(null, null, href);
      }
    });
  });

  // Update indicator on scroll (for single-page sections)
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  });

  function checkActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        // Update nav links
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}` ||
              link.getAttribute('href').includes(`#${id}`)) {
            link.classList.add('active');
          }
        });

        dockItems.forEach(item => {
          const href = item.getAttribute('href');
          item.classList.remove('active');
          if (href && (href === `#${id}` || href.includes(`#${id}`))) {
            item.classList.add('active');
          }
        });

        updateLiquidIndicator();
      }
    });
  }
}

// ============================================================================
// MOBILE OVERLAY MENU
// ============================================================================

function initMobileMenu() {
  const menuToggle = document.getElementById('dock-menu-toggle');
  const overlay = document.getElementById('nav-overlay');
  const overlayClose = document.getElementById('overlay-close');
  const overlayBackdrop = document.getElementById('overlay-backdrop');
  const overlayLinks = document.querySelectorAll('.overlay-link');

  if (!menuToggle || !overlay) return;

  // Open menu
  menuToggle.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close menu - close button
  if (overlayClose) {
    overlayClose.addEventListener('click', closeMenu);
  }

  // Close menu - backdrop
  if (overlayBackdrop) {
    overlayBackdrop.addEventListener('click', closeMenu);
  }

  // Close menu - after clicking a link
  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeMenu, 200); // Small delay for better UX
    });
  });

  // Close menu with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeMenu();
    }
  });

  function closeMenu() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================================================
// DEV: Live Reload
// ============================================================================

if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
  const source = new EventSource("/__reload");
  source.onmessage = () => {
    window.location.reload();
  };
}
