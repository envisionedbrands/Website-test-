document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Nav scroll ---------- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ---------- Mobile nav ---------- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
    document.body.style.overflow = links.classList.contains('active') ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Smooth scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- Scroll reveals ---------- */
  const revealSelectors = [
    '.about__col-left', '.about__col-right',
    '.service', '.approach__text', '.approach__image',
    '.stat', '.post', '.contact__text', '.contact__form',
    '.services__header', '.journal__header', '.image-break'
  ];

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ---------- Staggered grid reveals ---------- */
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.reveal').forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.12}s`;
          child.classList.add('reveal--visible');
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.services__grid, .stats__inner, .journal__grid').forEach(grid => {
    staggerObserver.observe(grid);
  });

  /* ---------- Form ---------- */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    btn.textContent = 'Sent! We\'ll be in touch.';
    btn.style.background = 'var(--gold)';
    btn.style.borderColor = 'var(--gold)';
    btn.style.color = 'white';
    setTimeout(() => {
      btn.textContent = 'Send Enquiry →';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      form.reset();
    }, 3000);
  });
});
