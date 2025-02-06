<template>
  <div class="otp-container">
    <h2>Saisissez votre OTP </h2>
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

<script>
export default {
  data() {
    return {
      otp: '',
    };
  },
  mounted() {
    this.listenForOtp();
  },
  methods: {
    async listenForOtp() {
      if ('OTPCredential' in window) {
        try {
          const otp = await navigator.credentials.get({ otp: { transport: ['sms'] } });
          if (otp) {
            this.otp = otp.code;
            this.submitOtp();
          }
        } catch (error) {
          console.error("Impossible de récupérer l'OTP :", error);
        }
      }
    },
    submitOtp() {
      console.log('OTP soumis :', this.otp);
      // Ici, tu envoies le code au backend pour vérification
    },
  },
};
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
