<template>
  <div class="call-container">
    <h2>Numéro de téléphone</h2>
    <br />
    <label for="phone-input">
      <input
        id="phone-input"
        v-model="phoneNumber"
        type="tel"
        placeholder="Entrez un numéro"
        pattern="[0-9+]+"
      />
    </label>
    <br />
    <button @click="makeCall">📞 Appeler</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const phoneNumber = ref<string>('');

    const makeCall = () => {
      if (phoneNumber.value.trim()) {
        window.location.href = `tel:${phoneNumber.value}`;
      } else {
        alert('Veuillez entrer un numéro valide !');
      }
    };

    return {
      phoneNumber,
      makeCall,
    };
  },
};
</script>

<style scoped>
.call-container {
  margin-top: 20px;
  text-align: center;
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
  background-color: #218838;
}
</style>
