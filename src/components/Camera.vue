<template>
  <div class="camera-container">
    <h2>Caméra</h2>
    <video ref="video" autoplay playsinline>
      <track kind="captions" src="captions_en.vtt" srclang="en" label="English" />
    </video>
    <br />
    <button @click="takePhoto">🎥 Capture</button>
    <canvas ref="canvas" style="display: none;"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

export default {
  name: 'CameraComponent',
  setup() {
    const video = ref<HTMLVideoElement | null>(null);
    const canvas = ref<HTMLCanvasElement | null>(null);
    const gallery = ref<string[]>([]);
    let deferredPrompt: Event | null = null;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (video.value) {
          video.value.srcObject = stream;
        }
      } catch (error) {
        alert("Erreur d'accès à la caméra.");
      }
    };

    const requestNotificationPermission = async (): Promise<boolean> => {
      if ('Notification' in window) {
        if (Notification.permission === 'granted') return true;
        if (Notification.permission !== 'denied') {
          const permission = await Notification.requestPermission();
          return permission === 'granted';
        }
      }
      return false;
    };

    const showNotification = async (message: string) => {
      if (await requestNotificationPermission()) {
        if ('vibrate' in navigator) {
          navigator.vibrate(200);
        }
        const notification = new Notification('Notification', {
          body: message,
          icon: '/icons/icon-192x192.png',
        });
      }
    };

    const takePhoto = () => {
      if (!video.value || !canvas.value) return;
      const ctx = canvas.value.getContext('2d');
      if (!ctx) return;

      canvas.value.width = video.value.videoWidth;
      canvas.value.height = video.value.videoHeight;
      ctx.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

      const capturedPhoto = canvas.value.toDataURL('image/png');
      gallery.value.push(capturedPhoto);
      localStorage.setItem('photoGallery', JSON.stringify(gallery.value));

      showNotification('Photo ajoutée à la galerie !');
    };

    const loadGallery = () => {
      const storedGallery = localStorage.getItem('photoGallery');
      if (storedGallery) {
        gallery.value = JSON.parse(storedGallery);
      }
    };

    const installApp = () => {
      if (deferredPrompt) {
        (deferredPrompt as any).prompt();
        (deferredPrompt as any).userChoice.then((choice: any) => {
          if (choice.outcome === 'accepted') {
            console.log('Installation acceptée');
          }
          deferredPrompt = null;
        });
      }
    };

    onMounted(() => {
      startCamera();
      requestNotificationPermission();
      loadGallery();
      window.addEventListener('beforeinstallprompt', (event: Event) => {
        event.preventDefault();
        deferredPrompt = event;
      });
    });

    return {
      video,
      canvas,
      gallery,
      takePhoto,
      installApp,
    };
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

div {
  color: #0767a3;
}
</style>
