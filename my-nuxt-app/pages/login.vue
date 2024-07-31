<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Login</h1>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input 
            v-model="username"
            id="username"
            type="text"
            placeholder="Enter your username"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            v-model="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button 
          type="submit"
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </button>
        <p class="mt-4 text-sm text-gray-600">
          Don't have an account? <p v-if="user">Hello, {{ user.username }}!</p>
          <router-link to="/register" class="text-indigo-600 hover:text-indigo-700">Register</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    user() {
      return this.$auth.user;
    }
  },
  methods: {
  async login() {
    let loader = this.$loading.show();
    try {
      const response = await this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password
        }
      });
      console.log('Login response:', response);
      this.$toast.success('Login successful');
      this.$router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      this.$toast.error('Login failed: ' + (error.response?.data?.detail || 'Unknown error'));
    } finally {
      loader.hide();
    }
  }
}
}
</script>