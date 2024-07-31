export default {
  ssr: false,

  head: {
    title: 'Testing',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '@/assets/css/tailwind.css'
  ],

  plugins: ['@/plugins/nprogress.js',
    '~/plugins/websocket.js',
    '~/plugins/auth.js',
    '@/plugins/loading.js',
  ],

  components: true,

  buildModules: [
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/auth-next',
  ],
  axios: {
    baseURL: 'http://localhost:8000', // URL вашего Django API
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access',
          global: true,
          type: 'Bearer',
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
        },
        user: {
          property: '',
        },
        endpoints: {
          login: { url: '/api/login/', method: 'post' },
          refresh: { url: '/api/token/refresh/', method: 'post' },
          user: { url: '/api/user/', method: 'get' },
          logout: false,
        },
      },
    },
  },  
  toast: {
    position: 'top-right',
    duration: 3000,
    singleton: true,
  },
  build: {
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-nested': {},
        'autoprefixer': {},
      }
    }
  }
}