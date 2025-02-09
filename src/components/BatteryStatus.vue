<template>
  <div class="battery-status">
    <p v-if="isCharging">⚡🔋 {{ batteryLevel }}% </p>
    <p v-else>🔋 {{ batteryLevel }}% </p>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const batteryLevel = ref<number | null>(null);
    const isCharging = ref<boolean>(false);

    const getBatteryStatus = async () => {
      if ('getBattery' in navigator) {
        const battery = await (navigator as any).getBattery();
        batteryLevel.value = Math.round(battery.level * 100);
        isCharging.value = battery.charging;

        battery.addEventListener('levelchange', () => {
          batteryLevel.value = Math.round(battery.level * 100);
        });

        battery.addEventListener('chargingchange', () => {
          isCharging.value = battery.charging;
        });
      } else {
        console.log("L'API Battery Status n'est pas supportée.");
      }
    };

    onMounted(() => {
      getBatteryStatus();
    });

    return {
      batteryLevel,
      isCharging,
    };
  },
};
</script>

<style scoped>
.battery-status {
  font-size: 18px;
  font-weight: bold;
  color: #ff9900;
  padding: 10px;
}
</style>
