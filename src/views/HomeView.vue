<template>
  <div class="home">
    <div class="components">
      <div class="box"><CameraComponent /></div>
      <div class="box"><GeoLocation /></div>
      <div class="box"><CallButton /></div>
      <div class="box"><OtpValidation /></div>
      <div class="box"><JoinChat /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GeoLocation from '@/components/GeoLocation.vue';
import CameraComponent from '@/components/Camera.vue';
import CallButton from '@/components/CallButton.vue';
import OtpValidation from '@/components/OtpValidation.vue';
import JoinChat from '@/components/JoinChat.vue';

export default defineComponent({
  components: {
    CameraComponent,
    GeoLocation,
    CallButton,
    OtpValidation,
    JoinChat,
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
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}

.components {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 900px;
  padding: 20px;
}

.box {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  text-align: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
  animation: fadeIn 0.5s ease-in-out;
}

.box:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* Animation d’apparition */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 600px) {
  .components {
    grid-template-columns: 1fr;
  }
}
</style>
