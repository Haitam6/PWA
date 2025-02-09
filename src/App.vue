<template>
  <div id="app">
    <nav>
      <br />
      <div class="nav-links">
        <router-link to="/">Accueil</router-link>
        <router-link to="/gallery">Galerie</router-link>
        <router-link to="/chat">Chat</router-link>
      </div>
      <h1>TP PWA</h1>
      <BatteryStatus />
    </nav>

    <router-view />
  </div>
</template>

<style>
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
  color: #2c3e50;
}

nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  background-color: #0a3053;
  padding: 10px;
}

.nav-links {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

nav h1 {
  margin: 0 auto;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

nav a {
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: #0767a3;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #f0f0f0;
  transition: all 0.3s ease;
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

.app-footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 0.9rem;
  border-radius: 8px;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
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
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import router from './router';
import BatteryStatus from './components/BatteryStatus.vue';

export default defineComponent({
  name: 'App',
  components: {
    BatteryStatus,
  },
  data() {
    return {
      prenom: 'Haitam',
    };
  },
});
</script>
