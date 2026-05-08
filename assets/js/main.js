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
    const closeMenu = () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    const openMenu = () => {
      links.classList.add('open');
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    };
    toggle.addEventListener('click', () => {
      if (links.classList.contains('open')) closeMenu();
      else openMenu();
    });
    // Close drawer when any link inside it is clicked
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        if (links.classList.contains('open')) closeMenu();
      });
    });
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) closeMenu();
    });
    // Close if window resizes back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 960 && links.classList.contains('open')) closeMenu();
    }, { passive: true });
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
          status.textContent = "Thanks — Jim or someone on the team will get back to you directly.";
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

  // --- Hero slideshow ---
  const slideshow = document.querySelector('[data-slideshow]');
  if (slideshow) {
    const slides = Array.from(slideshow.querySelectorAll('.hero-slide'));
    const dots = Array.from(slideshow.querySelectorAll('.hero-slide-dot'));
    const ROTATE_MS = 6000;
    let current = 0;
    let timer = null;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const goTo = (idx) => {
      current = (idx + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === current));
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    };

    const start = () => {
      stop();
      if (reduceMotion) return;
      timer = setInterval(() => goTo(current + 1), ROTATE_MS);
    };
    const stop = () => {
      if (timer) { clearInterval(timer); timer = null; }
    };

    dots.forEach((d, i) => {
      d.addEventListener('click', () => { goTo(i); start(); });
    });

    // Pause on hover, resume on leave
    slideshow.addEventListener('mouseenter', stop);
    slideshow.addEventListener('mouseleave', start);

    // Pause when tab not visible (saves battery / cycles)
    document.addEventListener('visibilitychange', () => {
      document.hidden ? stop() : start();
    });

    start();
  }

  // --- Year placeholder ---
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
