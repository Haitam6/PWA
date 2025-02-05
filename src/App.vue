<template>
  <div id="app">
    <nav>
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
  background-color: rgba(255, 255, 255, 0.85);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
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
