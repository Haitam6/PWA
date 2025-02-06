<template>
    <div class="gallery-container">
      <h2>Galerie</h2>
      <div v-if="gallery.length > 0" class="gallery">
        <div v-for="(image, index) in gallery" :key="index" class="gallery-item">
          <img :src="image" alt="Photo enregistrée" class="gallery-image" />
          <br />
          <button @click="removeFromGallery(index)">🗑 Supprimer</button>
        </div>
      </div>
      <p v-else>Aucune photo dans la galerie.</p>
    </div>
  </template>

<script>
export default {
  name: 'GalleryComponent',
  data() {
    return {
      gallery: [],
    };
  },
  methods: {
    loadGallery() {
      const storedGallery = localStorage.getItem('photoGallery');
      if (storedGallery) {
        this.gallery = JSON.parse(storedGallery);
      }
    },
    removeFromGallery(index) {
      this.gallery.splice(index, 1);
      localStorage.setItem('photoGallery', JSON.stringify(this.gallery));
    },
  },
  mounted() {
    this.loadGallery();
  },
};
</script>

<style scoped>
.gallery-container {
  text-align: center;
  padding: 20px;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.gallery-item {
  margin: 10px;
}

.gallery-image {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border: 2px solid #ccc;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

.gallery-image:hover {
  transform: scale(1.1);
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
  background-color: #e03e3e;
}
h2 {
    font-weight: bold;
    color: white;
}
p {
    font-weight: bold;
    color: white;
}
</style>
