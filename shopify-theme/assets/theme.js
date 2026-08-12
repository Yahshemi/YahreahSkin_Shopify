// Yahreah Skin Shopify Theme Interactive JS
document.addEventListener('DOMContentLoaded', () => {
  // Hero Slider Logic
  const slides = document.querySelectorAll('.hero-slide-item');
  const dots = document.querySelectorAll('.js-dot-btn');
  const currentNum = document.querySelector('.js-current-slide-num');
  const badgeLabel = document.querySelector('.js-slide-badge-label');
  const prevBtn = document.querySelector('.js-prev-slide');
  const nextBtn = document.querySelector('.js-next-slide');
  const toggleAutoplayBtn = document.querySelector('.js-toggle-autoplay');

  let activeIndex = 0;
  let autoplayTimer = null;
  let isAutoplay = true;

  function showSlide(index) {
    if (!slides.length) return;
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove('hidden');
      } else {
        slide.classList.add('hidden');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.className = 'js-dot-btn h-2.5 rounded-full transition-all duration-300 w-10 bg-[#7C9F8A]';
      } else {
        dot.className = 'js-dot-btn h-2.5 rounded-full transition-all duration-300 w-2.5 bg-[#E2DBD0]';
      }
    });

    if (currentNum) currentNum.textContent = `0${index + 1}`;
    if (badgeLabel && slides[index]) {
      badgeLabel.textContent = slides[index].getAttribute('data-badge') || '';
    }
    activeIndex = index;
  }

  function nextSlide() {
    let next = (activeIndex + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (activeIndex - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-target') || '0', 10);
      showSlide(idx);
    });
  });

  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, 6000);
  }

  if (toggleAutoplayBtn) {
    toggleAutoplayBtn.addEventListener('click', () => {
      isAutoplay = !isAutoplay;
      if (isAutoplay) {
        startAutoplay();
        toggleAutoplayBtn.querySelector('span').textContent = 'Autoplay';
      } else {
        if (autoplayTimer) clearInterval(autoplayTimer);
        toggleAutoplayBtn.querySelector('span').textContent = 'Paused';
      }
    });
  }

  if (slides.length > 1) {
    startAutoplay();
  }

  // Cart Drawer Logic
  const openCartBtns = document.querySelectorAll('.js-open-cart-drawer, .js-add-to-cart');
  const closeCartBtns = document.querySelectorAll('.js-close-cart-drawer, .js-cart-drawer-backdrop');
  const backdrop = document.querySelector('.js-cart-drawer-backdrop');
  const panel = document.querySelector('.js-cart-drawer-panel');

  function openCart() {
    if (backdrop && panel) {
      backdrop.classList.remove('hidden');
      setTimeout(() => {
        panel.classList.remove('translate-x-full');
      }, 10);
    }
  }

  function closeCart() {
    if (backdrop && panel) {
      panel.classList.add('translate-x-full');
      setTimeout(() => {
        backdrop.classList.add('hidden');
      }, 300);
    }
  }

  openCartBtns.forEach(btn => btn.addEventListener('click', openCart));
  closeCartBtns.forEach(btn => btn.addEventListener('click', (e) => {
    if (e.target === backdrop || e.target.classList.contains('js-close-cart-drawer')) {
      closeCart();
    }
  }));
});
