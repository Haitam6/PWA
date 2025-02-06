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
        msg: this.message,
        roomId: this.roomId,
      };

      this.socket.emit('chat-msg', msgData);
      this.message = '';
    },
  },
};
</script>
