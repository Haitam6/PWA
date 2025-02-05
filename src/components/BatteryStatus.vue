<template>
    <div class="battery-status">
    <p v-if="isCharging">⚡🔋 {{ batteryLevel }}% </p>
    <p v-else>🔋 {{ batteryLevel }}% </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      batteryLevel: null,
      isCharging: false,
    };
  },

  methods: {
    async getBatteryStatus() {
      if ('getBattery' in navigator) {
        const battery = await navigator.getBattery();
        this.batteryLevel = Math.round(battery.level * 100);
        this.isCharging = battery.charging;
        battery.addEventListener('levelchange', () => {
          this.batteryLevel = Math.round(battery.level * 100);
        });
        battery.addEventListener('chargingchange', () => {
          this.isCharging = battery.charging;
        });
      } else {
        console.log("L'API Battery Status n'est pas supportée.");
      }
    },
  },

  mounted() {
    this.getBatteryStatus();
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
