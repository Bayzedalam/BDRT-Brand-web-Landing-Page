/* BDRT Holdings — lightweight interactions */
(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const navLinks = nav ? nav.querySelectorAll('a') : [];

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !isOpen);
    });

    navLinks.forEach((link) => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
    }));

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) {
        menuButton.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Reveal selected content as it enters the viewport. The page remains usable without JS.
  const revealTargets = document.querySelectorAll('.intro-copy, .intro-visual, .business-card, .project-card, .story-copy, .story-image, .vision-copy, .expansion-grid > *, .contact-image, .contact-copy');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealTargets.forEach((element) => element.classList.add('js-reveal'));
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    revealTargets.forEach((element) => observer.observe(element));
  }
})();
