import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => console.log('Service Worker enregistré avec succès.'))
    .catch((error) => console.error('Erreur lors de l\'enregistrement du Service Worker:', error));
}

createApp(App).use(router).mount('#app');
