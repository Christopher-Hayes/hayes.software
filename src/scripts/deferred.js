// Check that service workers are supported
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('DOMContentLoaded', async () => {
    try {
      navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      console.error('Service worker registration failed: ', error);
    }
  });
}
