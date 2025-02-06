<template>
  <div id="app">
    <nav>
  <div class="nav-links">
    <router-link to="/">Accueil</router-link>
    <router-link to="/gallery">Galerie</router-link>
  </div>
  <h1>TP PWA</h1>
  <BatteryStatus />
</nav>

    <router-view />
  </div>
  <footer class="app-footer">
    <p>PWA réalisé par Haitam El Qassimi</p>
  </footer>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Arial', sans-serif;
  text-align: center;
  background: linear-gradient(135deg, #1c191b, #0767a3);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  color: #2c3e50;
}

nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px; /* Ajoute un espacement entre les éléments */
}

.nav-links {
  display: flex;
  gap: 15px; /* Espacement entre les liens */
}

nav h1 {
  margin: 0 auto;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
}

.app-footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 0.9rem;
  border-radius: 8px;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.battery-status {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff9900;
  padding: 10px;
}

@keyframes slideIn {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

nav, .app-footer {
  animation: slideIn 0.5s ease-out;
}
nav a {
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: #0767a3;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 15px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

nav a:hover {
  background-color: #0767a3;
  color: white;
  transform: scale(1.1);
}

nav a.router-link-exact-active {
  background-color: #054b78;
  color: white;
}
</style>

<script>
import router from './router';
import BatteryStatus from './components/BatteryStatus.vue';

export default {
  components: {
    BatteryStatus,
  },
  data() {
    return {
      prenom: 'Haitam',
    };
  },
};
</script>
