/* Yahreah Skin — storefront behaviour. No dependencies. */
(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const strings = window.themeStrings || {};
  const routes = window.routes || { root_url: '/', cart_add_url: '/cart/add', cart_change_url: '/cart/change', cart_url: '/cart' };

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(message) {
    const el = $('#Toast');
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 3200);
  }

  /* ---------- Overlay panels (menu, drawer, search) ---------- */
  let lastFocus = null;
  function openPanel(panel, bodyClass) {
    if (!panel) return;
    lastFocus = document.activeElement;
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    if (bodyClass) document.body.classList.add(bodyClass);
    const focusTarget = panel.querySelector('[data-autofocus]') || panel.querySelector('button, a, input');
    if (focusTarget) setTimeout(() => focusTarget.focus(), 50);
  }
  function closePanel(panel, bodyClass) {
    if (!panel) return;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    if (bodyClass) document.body.classList.remove(bodyClass);
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener('click', (e) => {
    const menuOpen = e.target.closest('[data-menu-open]');
    const menuClose = e.target.closest('[data-menu-close]');
    const searchOpen = e.target.closest('[data-search-open]');
    const searchClose = e.target.closest('[data-search-close]');
    const cartOpen = e.target.closest('[data-cart-open]');
    const cartClose = e.target.closest('[data-cart-close]');

    if (menuOpen) { e.preventDefault(); openPanel($('#MobileMenu'), 'menu-open'); }
    if (menuClose) { e.preventDefault(); closePanel($('#MobileMenu'), 'menu-open'); }
    if (searchOpen) { e.preventDefault(); openPanel($('#SearchModal')); }
    if (searchClose) { e.preventDefault(); closePanel($('#SearchModal')); }
    if (cartOpen && $('#CartDrawer')) { e.preventDefault(); openPanel($('#CartDrawer'), 'drawer-open'); }
    if (cartClose) { e.preventDefault(); closePanel($('#CartDrawer'), 'drawer-open'); }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closePanel($('#MobileMenu.is-open'), 'menu-open');
    closePanel($('#SearchModal.is-open'));
    closePanel($('#CartDrawer.is-open'), 'drawer-open');
  });

  /* ---------- Cart ---------- */
  function updateCartCount(count) {
    $$('[data-cart-count]').forEach((el) => {
      el.textContent = count > 0 ? count : '';
      el.dataset.count = count;
    });
  }

  async function refreshCartDrawer() {
    const drawer = $('#CartDrawer');
    if (!drawer) return;
    try {
      const res = await fetch(`${routes.root_url.replace(/\/$/, '')}/?section_id=cart-drawer`);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const fresh = doc.querySelector('#CartDrawer');
      if (fresh) {
        $('[data-drawer-inner]', drawer).replaceWith(fresh.querySelector('[data-drawer-inner]'));
        const count = fresh.dataset.count;
        if (count !== undefined) updateCartCount(parseInt(count, 10));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function changeLine(line, quantity) {
    const drawer = $('#CartDrawer');
    if (drawer) drawer.classList.add('is-loading');
    try {
      const res = await fetch(`${routes.cart_change_url}.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ line, quantity })
      });
      if (!res.ok) throw new Error('change failed');
      if (document.body.classList.contains('template-cart')) {
        window.location.reload();
        return;
      }
      await refreshCartDrawer();
    } catch (err) {
      toast(strings.error || 'Something went wrong.');
    } finally {
      if (drawer) drawer.classList.remove('is-loading');
    }
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-line-change]');
    if (!btn) return;
    e.preventDefault();
    const line = parseInt(btn.dataset.line, 10);
    const qty = parseInt(btn.dataset.quantity, 10);
    changeLine(line, Math.max(0, qty));
  });

  document.addEventListener('change', (e) => {
    const input = e.target.closest('[data-line-input]');
    if (!input) return;
    changeLine(parseInt(input.dataset.line, 10), Math.max(0, parseInt(input.value, 10) || 0));
  });

  // Intercept product forms so the drawer opens instead of a page reload.
  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('form[data-product-form]');
    if (!form) return;
    if (form.dataset.cartType === 'page') return; // let the browser go to /cart
    e.preventDefault();

    const button = form.querySelector('[type="submit"]');
    const errorEl = form.querySelector('[data-form-error]');
    if (button) { button.classList.add('loading'); button.setAttribute('aria-disabled', 'true'); }
    if (errorEl) { errorEl.hidden = true; errorEl.textContent = ''; }

    try {
      const res = await fetch(`${routes.cart_add_url}.js`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: new FormData(form)
      });
      const data = await res.json();
      if (!res.ok || data.status) {
        const message = data.description || data.message || strings.error;
        if (errorEl) { errorEl.textContent = message; errorEl.hidden = false; } else { toast(message); }
        return;
      }
      await refreshCartDrawer();
      if ($('#CartDrawer')) {
        openPanel($('#CartDrawer'), 'drawer-open');
      } else {
        toast(`${data.product_title || ''} — added`);
      }
    } catch (err) {
      toast(strings.error || 'Something went wrong.');
    } finally {
      if (button) { button.classList.remove('loading'); button.removeAttribute('aria-disabled'); }
    }
  });

  /* ---------- Quantity steppers (product page) ---------- */
  document.addEventListener('click', (e) => {
    const step = e.target.closest('[data-qty-step]');
    if (!step) return;
    const wrap = step.closest('.quantity');
    const input = wrap && wrap.querySelector('input');
    if (!input) return;
    const next = (parseInt(input.value, 10) || 1) + parseInt(step.dataset.qtyStep, 10);
    input.value = Math.max(parseInt(input.min || '1', 10), next);
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* ---------- Variant picker ---------- */
  function initProduct(root) {
    const dataEl = root.querySelector('[data-variants-json]');
    if (!dataEl) return;
    const variants = JSON.parse(dataEl.textContent);
    const form = root.querySelector('form[data-product-form]');
    const idInput = form && form.querySelector('input[name="id"]');
    const submit = form && form.querySelector('[type="submit"]');
    const priceEl = root.querySelector('[data-price]');
    const fieldsets = $$('[data-option-index]', root);

    function selectedOptions() {
      return fieldsets.map((fs) => {
        const checked = fs.querySelector('input:checked');
        const select = fs.querySelector('select');
        return checked ? checked.value : select ? select.value : null;
      });
    }

    function render() {
      const opts = selectedOptions();
      const variant = variants.find((v) => v.options.every((o, i) => o === opts[i]));
      // Mark unavailable combinations
      fieldsets.forEach((fs, idx) => {
        $$('input', fs).forEach((input) => {
          const test = opts.slice(); test[idx] = input.value;
          const match = variants.find((v) => v.options.every((o, i) => o === test[i]));
          input.classList.toggle('is-unavailable', !match || !match.available);
        });
      });
      if (!variant) {
        if (submit) { submit.disabled = true; submit.textContent = 'Unavailable'; }
        return;
      }
      if (idInput) idInput.value = variant.id;
      if (priceEl) {
        priceEl.innerHTML = variant.compare
          ? `<span class="price__compare">${variant.compare}</span><span>${variant.price}</span>`
          : `<span>${variant.price}</span>`;
      }
      if (submit) {
        submit.disabled = !variant.available;
        submit.textContent = variant.available ? strings.addToCart : strings.soldOut;
      }
      if (variant.media_id) showMedia(root, String(variant.media_id));
      const url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', url.toString());
    }

    fieldsets.forEach((fs) => fs.addEventListener('change', render));

    // Gallery thumbnails
    $$('[data-thumb]', root).forEach((thumb) => {
      thumb.addEventListener('click', () => showMedia(root, thumb.dataset.thumb));
    });

    // Purchase options (one-time vs subscription)
    const planInput = form && form.querySelector('input[name="selling_plan"]');
    const planSelect = root.querySelector('[data-selling-plan-select]');
    $$('input[name="purchase_type"]', root).forEach((radio) => {
      radio.addEventListener('change', () => {
        if (!planInput) return;
        planInput.value = radio.value === 'subscription' && planSelect ? planSelect.value : '';
        if (planSelect) planSelect.disabled = radio.value !== 'subscription';
      });
    });
    if (planSelect) {
      planSelect.addEventListener('change', () => {
        const sub = root.querySelector('input[name="purchase_type"][value="subscription"]');
        if (sub && sub.checked && planInput) planInput.value = planSelect.value;
      });
    }
  }

  function showMedia(root, mediaId) {
    const items = $$('[data-media-id]', root);
    const target = items.find((m) => m.dataset.mediaId === mediaId);
    if (!target) return;
    items.forEach((m) => { m.hidden = m !== target; });
    $$('[data-thumb]', root).forEach((t) => t.setAttribute('aria-current', t.dataset.thumb === mediaId ? 'true' : 'false'));
  }

  /* ---------- Hero slider ---------- */
  function initHero(root) {
    const slides = $$('.hero__slide', root);
    const dots = $$('.hero__dot', root);
    if (slides.length < 2) return;
    let index = 0;
    let timer;
    const delay = (parseInt(root.dataset.autoplay, 10) || 0) * 1000;
    function go(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('is-active', n === index));
      dots.forEach((d, n) => { d.classList.toggle('is-active', n === index); d.setAttribute('aria-current', n === index ? 'true' : 'false'); });
    }
    function start() { if (delay > 0) { stop(); timer = setInterval(() => go(index + 1), delay); } }
    function stop() { clearInterval(timer); }
    dots.forEach((d, n) => d.addEventListener('click', () => { go(n); start(); }));
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    start();
  }

  /* ---------- Tabs (Inside-Out matrix) ---------- */
  function initTabs(root) {
    const tabs = $$('[role="tab"]', root);
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => {
          const selected = t === tab;
          t.setAttribute('aria-selected', selected ? 'true' : 'false');
          t.tabIndex = selected ? 0 : -1;
          const panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !selected;
        });
      });
      tab.addEventListener('keydown', (e) => {
        const i = tabs.indexOf(tab);
        if (e.key === 'ArrowRight') { tabs[(i + 1) % tabs.length].focus(); tabs[(i + 1) % tabs.length].click(); }
        if (e.key === 'ArrowLeft') { tabs[(i - 1 + tabs.length) % tabs.length].focus(); tabs[(i - 1 + tabs.length) % tabs.length].click(); }
      });
    });
  }

  /* ---------- Skin quiz ---------- */
  function initQuiz(root) {
    const steps = $$('[data-quiz-step]', root);
    const progress = root.querySelector('.quiz__progress span');
    const history = [];
    let resultIndex = null;

    function show(name) {
      steps.forEach((s) => { s.hidden = s.dataset.quizStep !== name; });
      const visibleIndex = steps.findIndex((s) => s.dataset.quizStep === name);
      if (progress) progress.style.width = `${((visibleIndex + 1) / steps.length) * 100}%`;
      const heading = steps[visibleIndex] && steps[visibleIndex].querySelector('h2, h3');
      if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
    }

    root.addEventListener('click', (e) => {
      const option = e.target.closest('[data-quiz-next]');
      const back = e.target.closest('[data-quiz-back]');
      const restart = e.target.closest('[data-quiz-restart]');
      if (option) {
        const current = option.closest('[data-quiz-step]').dataset.quizStep;
        history.push(current);
        if (option.dataset.result !== undefined) resultIndex = option.dataset.result;
        let next = option.dataset.quizNext;
        if (next === 'result') next = `result-${resultIndex || 0}`;
        show(next);
      }
      if (back && history.length) show(history.pop());
      if (restart) { history.length = 0; resultIndex = null; show('concern'); }
    });

    show('concern');
  }

  /* ---------- Collection filters / sort ---------- */
  document.addEventListener('change', (e) => {
    const sort = e.target.closest('[data-sort-by]');
    if (sort) {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', sort.value);
      url.searchParams.delete('page');
      window.location.href = url.toString();
    }
    const filterInput = e.target.closest('[data-filter-form] input[type="checkbox"]');
    if (filterInput) filterInput.form.submit();
  });

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const items = $$('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('is-visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    items.forEach((i) => io.observe(i));
  }

  /* ---------- Init (also re-runs inside the theme editor) ---------- */
  function init(scope = document) {
    $$('[data-product-root]', scope).forEach(initProduct);
    $$('[data-hero]', scope).forEach(initHero);
    $$('[data-tabs]', scope).forEach(initTabs);
    $$('[data-quiz]', scope).forEach(initQuiz);
    initReveal();
  }

  document.addEventListener('DOMContentLoaded', () => init());
  document.addEventListener('shopify:section:load', (e) => init(e.target));
})();
