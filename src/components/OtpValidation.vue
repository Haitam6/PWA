<template>
  <div class="otp-container">
    <h2>Saisissez votre OTP </h2>
    <br />
    <label for="otp-input">
      <input
        id="otp-input"
        ref="otpInput"
        v-model="otp"
        type="text"
        placeholder="Saisir le code OTP"
        inputmode="numeric"
        autocomplete="one-time-code"
      />
    </label>
    <br />
    <button @click="submitOtp">Valider</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'OtpComponent',
  data() {
    return {
      otp: '' as string,
    };
  },
  mounted() {
    this.listenForOtp();
  },
  methods: {
    async listenForOtp(): Promise<void> {
      if ('OTPCredential' in window) {
        try {
          const otp = await navigator.credentials.get({ otp: { transport: ['sms'] } });
          if (otp) {
            this.otp = otp.id;
            this.submitOtp();
          }
        } catch (error) {
          console.error("Impossible de récupérer l'OTP :", error);
        }
      }
    },
    submitOtp(): void {
      console.log('OTP soumis :', this.otp);
    },
  },
});
</script>

<style scoped>
.otp-container {
    text-align: center;
    margin-top: 20px;
}

h2 {
    font-weight: bold;
    color: #0767a3;
}

label {
    display: block;
    margin-bottom: 10px;
}

input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
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
    background-color: #c3d21b;
}
</style>
