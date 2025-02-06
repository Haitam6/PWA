<template>
  <div class="camera-container">
    <h2>Caméra</h2>
    <video ref="video" autoplay playsinline>
      <track kind="captions" src="captions_en.vtt" srclang="en" label="English" />
    </video>
    <br />
    <button @click="takePhoto">🎥 Capture</button>
    <canvas ref="canvas" style="display: none;"></canvas>

    <div v-if="photo">
      <h3>Photo Capturée :</h3>
      <img :src="photo" alt="Captured photo" class="captured-photo" />
      <button @click="addToGallery(photo)">Ajouter à la galerie</button>
    </div>

    <div v-if="gallery.length > 0">
      <h3>Galerie :</h3>
      <div class="gallery">
        <div v-for="(image, index) in gallery" :key="index" class="gallery-item">
          <img :src="image" alt="Captured photo" class="gallery-image" />
          <button @click="removeFromGallery(index)">🗑 Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CameraComponent',
  data() {
    return {
      photo: null,
      gallery: [],
      deferredPrompt: null,
      notificationPermission: 'default',
    };
  },

  methods: {
    async startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.$refs.video.srcObject = stream;
      } catch (error) {
        alert("Erreur d'accès à la caméra.");
      }
    },
    async requestNotificationPermission() {
      if ('Notification' in window) {
        if (Notification.permission === 'granted') return true;
        if (Notification.permission !== 'denied') {
          const permission = await Notification.requestPermission();
          return permission === 'granted';
        }
      }
      return false;
    },
    async showNotification(message) {
      if (await this.requestNotificationPermission()) {
        if ('vibrate' in navigator) {
          navigator.vibrate(200); // Vibre pendant 200ms
        }
        return new Notification('Notification', {
          body: message,
          icon: this.photo || '/icons/icon-192x192.png',
        });
      }
      return null;
    },

    // Capture et sauvegarde la photo
    takePhoto() {
      const { video, canvas } = this.$refs;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      this.photo = canvas.toDataURL('image/png'); // Convertir en base64
      this.showNotification('Photo capturée avec succès !');
    },

    // Ajouter la photo à la galerie et la stocker
    addToGallery(photo) {
      this.gallery.push(photo);
      this.photo = null;
      this.saveGallery();
      this.showNotification('Photo ajoutée à la galerie !');
    },

    // Supprimer une image et mettre à jour le stockage
    removeFromGallery(index) {
      this.gallery.splice(index, 1);
      this.saveGallery();
      this.showNotification('Photo supprimée.');
    },

    // Sauvegarder la galerie dans localStorage
    saveGallery() {
      localStorage.setItem('photoGallery', JSON.stringify(this.gallery));
    },

    // Charger les images stockées au démarrage
    loadGallery() {
      const storedGallery = localStorage.getItem('photoGallery');
      if (storedGallery) {
        this.gallery = JSON.parse(storedGallery);
      }
    },

    installApp() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choice) => {
          if (choice.outcome === 'accepted') {
            console.log('Installation acceptée');
          }
          this.deferredPrompt = null;
        });
      }
    },
  },

  mounted() {
    this.startCamera();
    this.requestNotificationPermission();
    this.loadGallery(); // Charger les photos au démarrage

    // Gérer l'événement d'installation PWA
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
  },
};
</script>

<style scoped>
.camera-container {
  text-align: center;
}

video {
  width: 100%;
  max-width: 500px;
}

.captured-photo {
  margin-top: 20px;
  width: 200px;
  border: 2px solid #ccc;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.gallery-item {
  margin: 10px;
}

.gallery-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 2px solid #ccc;
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

</style>
