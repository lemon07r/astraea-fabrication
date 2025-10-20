// Import CSS files - Vite will bundle and optimize them
import '../css/variables.css';
import '../css/critical.css';
import '../css/main.css';

// Minimal JavaScript for navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('is-open');
      menuToggle.setAttribute(
        'aria-expanded',
        siteNav.classList.contains('is-open')
      );
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Close mobile menu if open
          if (siteNav && siteNav.classList.contains('is-open')) {
            siteNav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });
});
