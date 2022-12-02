import './styles/main.css';

//import Alpine from 'alpinejs'
//import collapse from '@alpinejs/collapse'

const env = document.querySelector('body').dataset.env;

const loadAlpine = async () => {
  window.Alpine = (await import('alpinejs')).default;
  const collapse = (await import('@alpinejs/collapse')).default;

  window.Alpine.plugin(collapse);
  window.Alpine.start();
};

// Check that service workers are supported
if ('serviceWorker' in navigator && env === 'production') {
  // use the window load event to keep the page load performant
  window.addEventListener('DOMContentLoaded', async () => {
    loadAlpine();
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
