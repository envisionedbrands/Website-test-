/* ==========================================================================
   Aureum — JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navigation scroll effect ---------- */
  const nav = document.getElementById('nav');
  let lastScrollY = 0;

  const handleNavScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* ---------- Mobile navigation toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Scroll reveal animations ---------- */
  const revealElements = () => {
    const reveals = [
      '.philosophy__lead',
      '.philosophy__image',
      '.philosophy__text',
      '.service-card',
      '.process__step',
      '.metric',
      '.journal-card',
      '.contact__lead',
      '.contact__form-wrapper',
      '.section__header',
      '.statement__inner'
    ];

    reveals.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
        }
      });
    });
  };

  revealElements();

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  /* ---------- Staggered reveal for grid items ---------- */
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll('.reveal');
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.1}s`;
          child.classList.add('reveal--visible');
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.services__grid, .metrics__inner, .journal__grid').forEach(grid => {
    staggerObserver.observe(grid);
  });

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.form__submit');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span>Message Sent</span>';
    btn.style.background = 'var(--color-accent-dark)';
    btn.style.borderColor = 'var(--color-accent-dark)';
    btn.style.color = 'var(--color-dark)';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });

  /* ---------- Current year in footer ---------- */
  const yearEl = document.querySelector('.footer__bottom p:first-child');
  if (yearEl) {
    const currentYear = new Date().getFullYear();
    yearEl.textContent = `\u00A9 ${currentYear} Aureum. All rights reserved.`;
  }
});
