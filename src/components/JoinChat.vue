<template>
    <div>
      <h2>Chat Room</h2>
      <input v-model="pseudo" placeholder="Entrez votre pseudo" />
      <button @click="joinRoom">Rejoindre</button>

      <div v-if="joined">
        <div v-for="msg in messages" :key="msg.dateEmis">
          <strong>{{ msg.pseudo }}:</strong> {{ msg.content }} ({{ msg.dateEmis }})
        </div>

        <input v-model="message" placeholder="Écrire un message" />
        <button @click="sendMessage">Envoyer</button>
      </div>
    </div>
  </template>

<script>
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      socket: null,
      pseudo: '',
      message: '',
      messages: [],
      joined: false,
      roomId: 'general',
      serverId: 'tchat_server_1', // Identifiant du serveur
    };
  },
  methods: {
    joinRoom() {
      this.socket = io('http://mohammedelmehdi.makhlouk.angers.mds-project.fr:40220/socketio/tchat');
      this.socket.emit('chat-join-room', { pseudo: this.pseudo, roomId: this.roomId });

      this.socket.on('chat-msg', (data) => {
        console.log('Message reçu :', data);
        this.messages.push(data);
      });

      this.joined = true;
    },
    sendMessage() {
      if (!this.message.trim()) return;

      const msgData = {
        content: this.message,
        dateEmis: new Date().toISOString(), // Date au format ISO
        serverId: this.serverId,
        autorId: this.pseudo, // L'ID de l'auteur est le pseudo de l'utilisateur
      };

      this.socket.emit('chat-msg', msgData);
      this.message = '';
    },
  },
};
</script>

  <style scoped>
  div {
    color: #0767a3;
  }
  </style>
