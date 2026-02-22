'use strict';

/* ============================================================
   UTILS.JS — back-to-top, scroll reveal, accordion toggle
   ============================================================ */


/* ── Back to top ─────────────────────────────────────────── */

function initBackToTop(id) {
  const btn = document.getElementById(id || 'js-back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  }, { passive: true });
}


/* ── Scroll reveal ───────────────────────────────────────── */

function initScrollReveal(selector) {
  const items = document.querySelectorAll(selector || '.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  items.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = [
      `opacity 0.65s ease ${i * 0.1}s`,
      `transform 0.65s ease ${i * 0.1}s`
    ].join(', ');
    observer.observe(el);
  });
}


/* ── Accordion: experience entry toggle ──────────────────── */

function initAccordion() {
  document.querySelectorAll('.experience-entry__header').forEach((header) => {
    header.addEventListener('click', () => {
      const entry  = header.closest('.experience-entry');
      const btn    = header.querySelector('.accent-dash');
      const body   = entry.querySelector('.experience-entry__body');
      if (!btn || !body) return;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.classList.toggle('is-collapsed', isOpen);
      body.classList.toggle('is-hidden', isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}


/* ── Menu navigation: hamburger opens menu.html ─────────── */

function initNavMenu(menuUrl) {
  const btn = document.querySelector('.nav-menu-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.location.href = menuUrl || 'menu.html';
  });
}
