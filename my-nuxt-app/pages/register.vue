<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Register</h1>
      <form @submit.prevent="register" class="space-y-6">
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
          Register
        </button>
      </form>
      <div class="mt-4 text-sm text-gray-600">
        Already have an account? <nuxt-link to="/login" class="text-indigo-600 hover:text-indigo-700">Log in</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async register() {
      let loader = this.$loading.show();
      try {
        await this.$axios.post('/api/register/', {
          username: this.username,
          password: this.password
        });
        this.$toast.success('Registration successful');
        this.$router.push('/login');
      } catch (error) {
        this.$toast.error('Registration failed: ' + (error.response?.data?.username?.[0] || 'Unknown error'));
      } finally {
        loader.hide();
      }
    }
  }
}
</script>
