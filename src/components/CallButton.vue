<template>
    <div class="call-container">
        <label for="phone-input">
            Numéro de téléphone :
            <input
                id="phone-input"
                v-model="phoneNumber"
                type="tel"
                placeholder="Entrez un numéro"
                pattern="[0-9+]+" />
        </label>
        <button @click="makeCall">📞 Appeler</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '',
    };
  },
  methods: {
    makeCall() {
      if (this.phoneNumber.trim()) {
        window.location.href = `tel:${this.phoneNumber}`;
      } else {
        alert('Veuillez entrer un numéro valide !');
      }
    },
  },
};
</script>

<style scoped>
.call-container {
    margin-top: 20px;
    text-align: center;
}

label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
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
