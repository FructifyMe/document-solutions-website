// Document Solutions — UI behavior
(function () {
  'use strict';

  // --- Sticky nav scroll state ---
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Reveal-on-scroll (Intersection Observer) ---
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    document.querySelectorAll('.fade-up').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('in'));
  }

  // --- Smooth anchor scroll with header offset ---
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          const top = el.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top, behavior: 'smooth' });
          history.replaceState(null, '', id);
        }
      }
    });
  });

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // --- Lead form (front-end only, posts to Formspree-style endpoint) ---
  const forms = document.querySelectorAll('[data-lead-form]');
  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const status = form.querySelector('[data-status]');
      const original = btn ? btn.textContent : '';
      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
      try {
        const fd = new FormData(form);
        const endpoint = form.getAttribute('action');
        if (endpoint) {
          const res = await fetch(endpoint, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });
          if (!res.ok) throw new Error('Bad response');
        }
        if (status) {
          status.textContent = "Thanks — Jim will be in touch within one business day.";
          status.style.color = 'var(--success)';
        }
        form.reset();
      } catch (err) {
        if (status) {
          status.textContent = "Hmm — that didn't go through. Email jim@documentsolution.org or call 978-750-0444.";
          status.style.color = 'var(--accent-deep)';
        }
      } finally {
        if (btn) { btn.textContent = original; btn.disabled = false; }
      }
    });
  });

  // --- Year placeholder ---
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
