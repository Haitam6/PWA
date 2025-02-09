<template>
  <div class="chat-container">
    <h2 class="chat-header">Chat Room</h2>

    <div v-if="!joined" class="join-container">
      <input v-model="pseudo" placeholder="Entrez votre pseudo" class="input-field" />
      <button @click="joinRoom" class="button">Rejoindre</button>
    </div>

    <div v-if="joined" class="chat-box">
      <div class="messages-container">
        <div v-for="msg in messages" :key="msg.dateEmis" class="message">
          <strong class="pseudo">{{ msg.pseudo }}:</strong>
          <span class="content">{{ msg.content }}</span>
          <span class="timestamp">({{ msg.dateEmis }})</span>
        </div>
      </div>

      <div class="message-input">
        <input v-model="message" placeholder="Écrire un message..." class="input-field" />
        <button @click="sendMessage" class="button">Envoyer</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { io, Socket } from 'socket.io-client';

interface Message {
  pseudo: string;
  content: string;
  dateEmis: string;
  roomId: string;
}

export default defineComponent({
  data() {
    return {
      socket: null as Socket | null,
      pseudo: '',
      message: '',
      messages: [] as Message[],
      joined: false,
      roomId: 'general',
      serverId: 'tchat_server_1',
    };
  },
  methods: {
    joinRoom(): void {
      console.log('Tentative de connexion...');
      this.socket = io('https://mohammedelmehdi.makhlouk.angers.mds-project.fr:40220', {
        transports: ['websocket'],
      });

      this.socket.on('connect', () => {
        console.log('Connecté au serveur Socket.IO');
      });

      this.socket.on('connect_error', (error: Error) => {
        console.error('Erreur de connexion au serveur:', error);
      });

      this.socket.emit('chat-join-room', {
        pseudo: this.pseudo,
        roomId: this.roomId,
      });

      this.socket.on('chat-msg', (data: Message) => {
        console.log('Message reçu :', data);
        this.messages.push(data);
      });

      this.joined = true;
    },

    sendMessage(): void {
      if (!this.message.trim()) {
        console.error('Le message est vide, il ne sera pas envoyé');
        return;
      }

      const msgData: Message = {
        pseudo: this.pseudo,
        content: this.message,
        roomId: this.roomId,
        dateEmis: new Date().toISOString(),
      };

      console.log('Envoi du message:', msgData);
      this.socket?.emit('chat-msg', msgData);
      this.message = '';
    },
  },
});
</script>

<style scoped>
.chat-container {
  width: 90%;
  max-width: 600px;
  margin: 20px auto;
  padding: 15px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.chat-header {
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
}
.join-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input-field {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
  font-size: 1rem;
  margin-bottom: 10px;
}
.button {
  padding: 12px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #0767a3;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.button:hover {
  background-color: #054b78;
}

.chat-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.messages-container {
  max-height: 350px;
  overflow-y: auto;
  padding: 10px;
  border-radius: 8px;
  background: #f9f9f9;
  border: 1px solid #ddd;
}

.message {
  background: #e6f7ff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 8px;
  color: #333;
  display: flex;
  flex-direction: column;
}

.pseudo {
  font-weight: bold;
  color: #0056b3;
}

.timestamp {
  font-size: 0.8rem;
  color: #888;
  align-self: flex-end;
}

.message-input {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.message-input .input-field {
  flex-grow: 1;
}

.message-input .button {
  width: auto;
}
</style>
