<template>
  <div>
    <!-- Loader -->
    <loading :active="isLoading" :is-full-page="true" />

    <div v-if="!nickname">
      <!-- Форма для ввода никнейма -->
      <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-2xl font-semibold text-gray-800 mb-6">Enter Your Nickname</h1>
          <form @submit.prevent="setNickname" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Nickname
                <input 
                  v-model="nicknameInput"
                  type="text" 
                  placeholder="Enter your nickname" 
                  required 
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            <button 
              type="submit"
              class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- Чат -->
      <div class="min-h-screen flex flex-col bg-gray-50 p-6">
        <div class="flex-1 overflow-y-auto">
          <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 flex-1">
            <h1 class="text-2xl font-semibold text-gray-800 mb-6">Chat Room</h1>
            <div class="h-80 overflow-y-auto mb-4" ref="messagesContainer">
              <div v-for="(message, index) in messages" :key="index" class="mb-2 flex">
                <div :class="{'ml-auto': message.nickname === nickname, 'mr-auto': message.nickname !== nickname}">
                  <div class="p-3 rounded-lg" :class="{'bg-blue-100 text-blue-900': message.nickname === nickname, 'bg-gray-100 text-gray-900': message.nickname !== nickname}">
                    <p>{{ message.message }}</p>
                    <span class="text-xs block mt-1" :class="{'text-right': message.nickname === nickname, 'text-left': message.nickname !== nickname}">
                      {{ formatTime(message.timestamp) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <form @submit.prevent="sendMessage" class="flex space-x-2">
              <input 
                v-model="messageInput"
                type="text" 
                placeholder="Type a message" 
                required 
                class="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button 
                type="submit"
                class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';

export default {
  components: {
    Loading
  },
  data() {
    return {
      nickname: null,
      nicknameInput: '',
      messageInput: '',
      messages: [],
      socket: null,
      isLoading: false // состояние лоадера
    };
  },
  methods: {
    setNickname() {
      this.nickname = this.nicknameInput;
      this.nicknameInput = ''; // Clear the input field
      
      this.isLoading = true; // Показать лоадер при установке никнейма

      this.socket = new WebSocket('ws://localhost:8000/ws/');

      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.messages.push(message);
        this.$nextTick(() => {
          const container = this.$refs.messagesContainer;
          container.scrollTop = container.scrollHeight;
        });
      };

      this.socket.onopen = () => {
        this.isLoading = false; // Скрыть лоадер при успешном подключении
      };

      this.socket.onclose = () => {
        this.isLoading = true; // Показать лоадер при потере соединения
        setTimeout(() => {
          this.isLoading = false; // Скрыть лоадер через некоторое время
        }, 3000); // Пример задержки 3 секунды
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isLoading = false; // Скрыть лоадер при ошибке
      };
    },
    sendMessage() {
      if (this.messageInput.trim() !== '') {
        const message = {
          nickname: this.nickname,
          text: this.messageInput,
          timestamp: new Date().toISOString()
        };
        this.socket.send(JSON.stringify(message));
        this.messageInput = '';
      }
    },
    formatTime(timestamp) {
      const messageTime = new Date(timestamp);
      const hours = messageTime.getHours().toString().padStart(2, '0');
      const minutes = messageTime.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  }
}
</script>

<style scoped>
/* Loader Style */
</style>
