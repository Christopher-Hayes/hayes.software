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
};

// Check that service workers are supported
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('DOMContentLoaded', async () => {
    loadAlpine();
  });

  // use the window load event to keep the page load performant
  window.addEventListener('load', async () => {
    try {
      navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      console.error('Service worker registration failed: ', error);
    }
  });
} else {
  window.addEventListener('DOMContentLoaded', async () => {
    loadAlpine();
  });
}
