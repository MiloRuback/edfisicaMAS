/* =========================================================
   Jiu-Jitsu no Brasil — Interações
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

  /* ---------- Active link on scroll (scrollspy) ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const setActiveLink = () => {
    const scrollPos = window.scrollY + 120;
    let currentId = '';

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navItems.forEach((item) => {
      const href = item.getAttribute('href');
      if (href === '#' + currentId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Reveal on scroll (fade-up) ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-head, .img-card, .pos-card, .tech-card, .athlete-card, .timeline-item, .score-table, .benefits-list, .sub-list, .lead-para.center, .royce-banner, .dual-portraits'
  );

  revealTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const reveal = () => {
    const trigger = window.innerHeight * 0.88;
    revealTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < trigger) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };

  window.addEventListener('scroll', reveal, { passive: true });
  window.addEventListener('resize', reveal);
  // Initial reveal after a small delay so hero content shows first
  setTimeout(reveal, 80);

  /* ---------- Smooth scroll fallback for older browsers ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();
