// ========================================
// HUNGRY EYES FOOD CORNER - JAVASCRIPT
// ========================================

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

// Keep navbar always scrolled/solid on inner pages
const isHomePage = !window.location.pathname.includes('/') ||
  window.location.pathname.endsWith('/') ||
  window.location.pathname.endsWith('index.html') ||
  window.location.pathname === '';

const isInnerPage = ['about.html', 'menu.html', 'branches.html', 'gallery.html', 'contact.html']
  .some(p => window.location.pathname.endsWith(p));

if (isInnerPage) {
  navbar.classList.add('scrolled');
}

window.addEventListener('scroll', () => {
  if (!isInnerPage) {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Back to top button
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active nav link on scroll (only on home page)
  if (!isInnerPage) updateActiveNav();
});


// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNav() {
  const sections = ['home', 'about', 'menu', 'branches', 'gallery', 'contact'];
  const scrollPos = window.scrollY + 100;

  sections.forEach(id => {
    const section = document.getElementById(id);
    const navLink = document.getElementById(`nav-${id}`);
    if (!section || !navLink) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ===== MENU FILTER TABS =====
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCards = document.querySelectorAll('.menu-card');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Update active tab
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const category = tab.dataset.category;

    menuCards.forEach((card, index) => {
      const cardCat = card.dataset.category;
      if (category === 'all' || cardCat === category) {
        card.classList.remove('hidden');
        // Stagger animation
        card.style.animationDelay = `${index * 0.05}s`;
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = 'cardFadeIn 0.4s ease forwards';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
  '.branch-card, .about-feat, .contact-card, .gallery-item, .menu-card, .section-header'
);

revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 4 === 1) el.classList.add('reveal-delay-1');
  if (i % 4 === 2) el.classList.add('reveal-delay-2');
  if (i % 4 === 3) el.classList.add('reveal-delay-3');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== CONTACT FORM SUBMIT =====
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('contactSubmitBtn');
  const success = document.getElementById('formSuccess');
  
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate sending (since no backend)
  setTimeout(() => {
    success.classList.add('show');
    btn.textContent = 'Send Message 📨';
    btn.disabled = false;
    e.target.reset();

    setTimeout(() => {
      success.classList.remove('show');
    }, 5000);
  }, 1200);
}

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');

// Simple lightbox
function createLightbox() {
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(5, 1, 0, 0.95);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; cursor: pointer;
    animation: fadeIn 0.3s ease;
    backdrop-filter: blur(10px);
  `;

  const img = document.createElement('img');
  img.style.cssText = `
    max-width: 90vw; max-height: 88vh;
    object-fit: contain; border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.8);
    cursor: default;
  `;

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = `
    position: absolute; top: 24px; right: 24px;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    color: white; width: 44px; height: 44px;
    border-radius: 50%; font-size: 1.2rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: 0.2s ease;
  `;

  closeBtn.addEventListener('mouseenter', () => {
    closeBtn.style.background = 'rgba(255,255,255,0.2)';
  });
  closeBtn.addEventListener('mouseleave', () => {
    closeBtn.style.background = 'rgba(255,255,255,0.1)';
  });

  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === closeBtn) {
      overlay.style.animation = 'fadeOut 0.2s ease forwards';
      setTimeout(() => overlay.remove(), 200);
    }
  });

  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      overlay.remove();
      document.removeEventListener('keydown', escHandler);
    }
  });

  return img;
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const itemImg = item.querySelector('img');
    if (!itemImg) return;
    const lightboxImg = createLightbox();
    lightboxImg.src = itemImg.src;
    lightboxImg.alt = itemImg.alt;
  });
});

// ===== TICKER PAUSE ON HOVER =====
const ticker = document.querySelector('.ticker-track');
if (ticker) {
  ticker.addEventListener('mouseenter', () => {
    ticker.style.animationPlayState = 'paused';
  });
  ticker.addEventListener('mouseleave', () => {
    ticker.style.animationPlayState = 'running';
  });
}

// ===== ADD CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);

// ===== INIT =====
updateActiveNav();
console.log('%c🍕 Hungry Eyes Food Corner', 'color: #E8820C; font-size: 18px; font-weight: bold;');
console.log('%cCome Hungry & Leave Happily — Since 2017', 'color: #F5A623; font-size: 12px;');
