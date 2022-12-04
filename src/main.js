/* eslint-disable compat/compat */
// This import is only needed for running in dev mode
import.meta.env.DEV && import('./styles/main.css');

const loadAlpine = async () => {
  window.Alpine = (await import('alpinejs')).default;

  // Collapse is only used in on mobile
  if (window.innerWidth < 768) {
    const collapse = (await import('@alpinejs/collapse')).default;
    window.Alpine.plugin(collapse);
  }

  window.Alpine.start();

  // Adds capability to load HTML pages when hovering over a link
  window.htmlPreload = function (url) {
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  };
};

window.addEventListener('DOMContentLoaded', async () => {
  loadAlpine();

  // Check that service workers are supported
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      console.error('Service worker registration failed: ', error);
    }
  }
});
