<template>
  <div class="home">
    <div class="components">
      <div class="box"><CameraComponent /></div>
      <div class="box"><GeoLocation /></div>
      <div class="box"><CallButton /></div>
      <div class="box"><OtpValidation /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GeoLocation from '@/components/GeoLocation.vue';
import CameraComponent from '@/components/Camera.vue';
import CallButton from '@/components/CallButton.vue';
import OtpValidation from '@/components/OtpValidation.vue';

export default defineComponent({
  components: {
    CameraComponent,
    GeoLocation,
    CallButton,
    OtpValidation,
  },
  data() {
    return {
      prenom: 'Jean' as string,
    };
  },
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

/* Batterie fixée sous la navbar */
.battery-container {
  width: 15%;
  text-align: center;
  padding: 10px 0;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

/* Flexbox pour les composants, alignés verticalement */
.components {
  display: flex;
  flex-direction: column; /* Aligner verticalement */
  gap: 20px; /* Espacement entre les boîtes */
  max-width: 900px;
  width: 100%;
  justify-content: center;
  align-items: center; /* Centrer horizontalement */
}

/* Style des boîtes */
.box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%; /* Occupe toute la largeur de son parent */
  max-width: 400px; /* Largeur maximale pour chaque box */
  margin: auto;
}
</style>
