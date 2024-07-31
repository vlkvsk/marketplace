<template>
    <div>
      <nav class="bg-gray-800 p-4">
        <div class="container mx-auto flex justify-between items-center">
          <div class="text-white font-bold text-xl">MyApp</div>
          <div>
            <ul class="flex items-center space-x-4">
              <li>
                <nuxt-link to="/" class="text-white hover:text-gray-300">Home</nuxt-link>
              </li>
              <li v-if="$auth.loggedIn">
                <span class="text-white">Hello, {{ $auth.user.username }}</span>
              </li>
              <li v-else>
                <nuxt-link to="/login" class="text-white hover:text-gray-300">Login</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nuxt />
    </div>
</template>

<script>
export default {
async fetch() {
    if (this.$auth.loggedIn) {
    await this.$auth.fetchUser();
    }
},
}
</script>  