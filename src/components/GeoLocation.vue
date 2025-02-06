<template>
    <div class="geolocation">
        <h2>Position géographique</h2>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-else-if="latitude && longitude">
            Latitude : {{ latitude }} <br>
            Longitude : {{ longitude }}
        </p>
        <button @click="getLocation">ℹ Obtenir ma position</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const latitude = ref(null);
const longitude = ref(null);
const error = ref(null);

const getLocation = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
      },
      (err) => {
        error.value = `Erreur : ${err.message}`;
      },
    );
  } else {
    error.value = "La géolocalisation n'est pas supportée par votre navigateur.";
  }
};
</script>

<style scoped>
.geolocation {
    text-align: center;
    padding: 20px;
}

.error {
    color: red;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-weight: 500;
}

button:hover {
    background-color: #0056b3;
}
div {
    color: #0767a3;
}
</style>
