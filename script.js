/* Aturat Al Dubai - Premium Luxury Perfume Website JS */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loading');

  // 24. Inject Animation Keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // 1. Loading Screen
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
      }, 1800);
    }
  });
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }
  }, 3000);

  // 2. Custom Cursor (desktop only)
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  if (cursorDot && cursorOutline && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX - 3 + 'px';
      cursorDot.style.top = mouseY - 3 + 'px';
    });
    const lerp = (a, b, t) => a + (b - a) * t;
    function animateCursor() {
      outlineX = lerp(outlineX, mouseX, 0.15);
      outlineY = lerp(outlineY, mouseY, 0.15);
      cursorOutline.style.left = outlineX - 18 + 'px';
      cursorOutline.style.top = outlineY - 18 + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    const hoverTargets = document.querySelectorAll('a, button, .product-card, .category-card, .feature-card, .gallery-item');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
  }

  // 3. Scroll Progress Bar
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percent = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = percent + '%';
    });
  }

  // 4. Sticky Navbar & Active Nav Link
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  function updateNav() {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current || link.getAttribute('href') === current + '.html') {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateNav);
  updateNav();

  // 5. Hamburger / Mobile Menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  function closeMobileMenu() {
    if (hamburger) hamburger.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        hamburger.classList.add('active');
        if (mobileMenu) mobileMenu.classList.add('active');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  document.querySelectorAll('#mobileMenu .close-btn, #mobileMenu .mobile-menu-close').forEach(btn => {
    btn.addEventListener('click', closeMobileMenu);
  });
  document.querySelectorAll('#mobileMenu .nav-link, #mobileMenu .mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  // Accordion submenu
  document.querySelectorAll('.mobile-accordion .accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const submenu = item.querySelector('.mobile-submenu');
      const icon = header.querySelector('.accordion-icon');
      if (submenu) {
        const isOpen = submenu.style.maxHeight;
        // close all others
        document.querySelectorAll('.mobile-submenu').forEach(s => s.style.maxHeight = null);
        document.querySelectorAll('.accordion-icon').forEach(i => i.style.transform = '');
        if (!isOpen) {
          submenu.style.maxHeight = submenu.scrollHeight + 'px';
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      }
    });
  });

  // 6. Search Bar
  const searchToggle = document.getElementById('searchToggle');
  const searchBar = document.getElementById('searchBar');
  const searchClose = document.getElementById('searchClose');
  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', () => {
      searchBar.classList.add('active');
      const input = searchBar.querySelector('input');
      if (input) input.focus();
    });
  }
  if (searchClose && searchBar) {
    searchClose.addEventListener('click', () => {
      searchBar.classList.remove('active');
    });
  }

  // 7. Hero Slider (index only)
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 5000);
  }

  // 8. Hero Particles
  const heroParticles = document.getElementById('heroParticles');
  if (heroParticles) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      const size = Math.random() * 3 + 1;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.animationDelay = Math.random() * 5 + 's';
      p.style.animationDuration = (Math.random() * 10 + 5) + 's';
      heroParticles.appendChild(p);
    }
  }

  // 9. Counter Animation
  const countersEl = document.querySelector('.about-counters') || document.querySelector('.counters-section') || document.querySelector('.counters');
  if (countersEl) {
    let counterAnimated = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
          counterAnimated = true;
          document.querySelectorAll('.counter-number').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            function updateCounter() {
              current += step;
              if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target.toLocaleString();
              }
            }
            updateCounter();
          });
        }
      });
    }, { threshold: 0.3 });
    counterObserver.observe(countersEl);
  }

  // 10. Product Filter
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 11. Product Search
  const productSearch = document.getElementById('productSearch');
  if (productSearch) {
    productSearch.addEventListener('input', () => {
      const query = productSearch.value.toLowerCase();
      const activeFilter = document.querySelector('.filter-tab.active');
      const currentFilter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
      productCards.forEach(card => {
        const name = card.querySelector('.product-name, h3, h4');
        const text = name ? name.textContent.toLowerCase() : '';
        const category = card.getAttribute('data-category');
        const matchesSearch = text.includes(query);
        const matchesFilter = currentFilter === 'all' || category === currentFilter;
        if (matchesSearch && matchesFilter) {
          card.style.display = '';
          card.style.animation = 'fadeUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 12. Wishlist
  let wishlist = [];
  const wishlistCount = document.getElementById('wishlistCount');
  const wishlistItems = document.getElementById('wishlistItems');
  const wishlistSidebar = document.getElementById('wishlistSidebar');
  const wishlistOverlay = document.getElementById('wishlistOverlay');
  function updateWishlistCount() {
    if (wishlistCount) wishlistCount.textContent = wishlist.length;
  }
  function renderWishlist() {
    if (!wishlistItems) return;
    wishlistItems.innerHTML = '';
    if (wishlist.length === 0) {
      wishlistItems.innerHTML = '<p class="empty-msg">Your wishlist is empty.</p>';
      return;
    }
    wishlist.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'wishlist-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>${item.price}</p>
        </div>
        <button class="remove-wishlist-item" data-index="${index}">&times;</button>
      `;
      wishlistItems.appendChild(div);
    });
    wishlistItems.querySelectorAll('.remove-wishlist-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        wishlist.splice(idx, 1);
        updateWishlistCount();
        renderWishlist();
        showToast('Removed from wishlist');
      });
    });
  }
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      if (!card) return;
      const name = card.querySelector('.product-name, h3, h4');
      const price = card.querySelector('.product-price, .price');
      const img = card.querySelector('img');
      const item = {
        name: name ? name.textContent.trim() : 'Product',
        price: price ? price.textContent.trim() : '',
        image: img ? img.src : ''
      };
      const exists = wishlist.findIndex(w => w.name === item.name);
      if (exists >= 0) {
        wishlist.splice(exists, 1);
        showToast('Removed from wishlist');
      } else {
        wishlist.push(item);
        showToast('Added to wishlist');
      }
      updateWishlistCount();
      renderWishlist();
    });
  });
  if (wishlistSidebar) {
    const openWishlist = document.getElementById('openWishlist');
    if (openWishlist) {
      openWishlist.addEventListener('click', (e) => {
        e.preventDefault();
        wishlistSidebar.classList.add('active');
        if (wishlistOverlay) wishlistOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
    function closeWishlistSidebar() {
      wishlistSidebar.classList.remove('active');
      if (wishlistOverlay) wishlistOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (wishlistOverlay) wishlistOverlay.addEventListener('click', closeWishlistSidebar);
    const closeWishlistBtn = document.getElementById('closeWishlist');
    if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', closeWishlistSidebar);
  }
  updateWishlistCount();
  renderWishlist();

  // 13. Cart
  let cart = [];
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartFooter = document.querySelector('.cart-footer');
  function updateCartCount() {
    if (cartCount) cartCount.textContent = cart.length;
  }
  function updateCartTotal() {
    if (cartTotal) {
      let total = 0;
      cart.forEach(item => {
        const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        if (!isNaN(priceNum)) total += priceNum;
      });
      cartTotal.textContent = '$' + total.toFixed(2);
    }
  }
  function renderCart() {
    if (!cartItems) return;
    cartItems.innerHTML = '';
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }
    if (cartFooter) cartFooter.style.display = '';
    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>${item.price}</p>
        </div>
        <button class="remove-cart-item" data-index="${index}">&times;</button>
      `;
      cartItems.appendChild(div);
    });
    cartItems.querySelectorAll('.remove-cart-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        cart.splice(idx, 1);
        updateCartCount();
        updateCartTotal();
        renderCart();
        showToast('Removed from cart');
      });
    });
  }
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      if (!card) return;
      const name = card.querySelector('.product-name, h3, h4');
      const price = card.querySelector('.product-price, .price');
      const img = card.querySelector('img');
      cart.push({
        name: name ? name.textContent.trim() : 'Product',
        price: price ? price.textContent.trim() : '$0',
        image: img ? img.src : ''
      });
      updateCartCount();
      updateCartTotal();
      renderCart();
      showToast('Added to cart');
    });
  });
  if (cartSidebar) {
    const openCart = document.getElementById('openCart');
    if (openCart) {
      openCart.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        if (cartOverlay) cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
    function closeCartSidebar() {
      cartSidebar.classList.remove('active');
      if (cartOverlay) cartOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);
    const closeCartBtn = document.getElementById('closeCart');
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartSidebar);
  }
  updateCartCount();
  renderCart();

  // 14. Toast
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  window.showToast = function (message) {
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }
  };
  // also allow close button on toast
  const toastClose = document.getElementById('toastClose');
  if (toastClose) toastClose.addEventListener('click', () => toast.classList.remove('show'));

  // 15. Lightbox (gallery)
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  if (galleryItems.length > 0 && lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    let galleryData = [];
    let currentIndex = 0;
    galleryItems.forEach((item, i) => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption, .caption, p');
      galleryData.push({
        src: img ? img.src : '',
        caption: caption ? caption.textContent : ''
      });
      item.addEventListener('click', () => {
        currentIndex = i;
        openLightbox();
      });
    });
    function openLightbox() {
      if (lightboxImg) lightboxImg.src = galleryData[currentIndex].src;
      if (lightboxCaption) lightboxCaption.textContent = galleryData[currentIndex].caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
      openLightbox();
    });
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % galleryData.length;
      openLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length; openLightbox(); }
      if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % galleryData.length; openLightbox(); }
    });
  }

  // 16. Back to Top
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 17. Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.offsetTop - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // 18. Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent successfully!');
      contactForm.reset();
    });
  }

  // 19. Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing!');
      newsletterForm.reset();
    });
  }

  // 20. Review Form Star Selector
  const starRating = document.querySelector('.star-rating');
  if (starRating) {
    let selectedRating = 0;
    const stars = starRating.querySelectorAll('.star');
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        selectedRating = index + 1;
        stars.forEach((s, i) => {
          s.classList.toggle('selected', i < selectedRating);
        });
        const ratingInput = document.getElementById('ratingValue');
        if (ratingInput) ratingInput.value = selectedRating;
      });
      star.addEventListener('mouseenter', () => {
        stars.forEach((s, i) => {
          s.classList.toggle('hovered', i <= index);
        });
      });
      star.addEventListener('mouseleave', () => {
        stars.forEach((s, i) => {
          s.classList.remove('hovered');
        });
      });
    });
    // Review form submit
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (selectedRating === 0) {
          showToast('Please select a rating');
          return;
        }
        showToast('Thank you for your review!');
        reviewForm.reset();
        selectedRating = 0;
        stars.forEach(s => s.classList.remove('selected'));
      });
    }
  }

  // 21. FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');
      // close all
      document.querySelectorAll('.faq-item').forEach(fi => {
        fi.classList.remove('active');
        const fa = fi.querySelector('.faq-answer');
        if (fa) fa.style.maxHeight = null;
      });
      if (!isActive && answer) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // 22. Swiper Initialization (Reviews)
  if (typeof Swiper !== 'undefined' && document.querySelector('.reviews-swiper')) {
    new Swiper('.reviews-swiper', {
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.reviews-pagination', clickable: true },
      navigation: { nextEl: '.reviews-next', prevEl: '.reviews-prev' },
      breakpoints: {
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  // 22b. Swiper Initialization (Hero)
  if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
    new Swiper('.hero-swiper', {
      loop: true,
      autoplay: { delay: 2000, disableOnInteraction: false },
      pagination: { el: '.hero-pagination', clickable: true },
      effect: 'fade',
      fadeEffect: { crossFade: true }
    });
  }

  // 23. AOS Initialization
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }
});
