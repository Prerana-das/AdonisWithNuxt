
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "/css/bootstrap.min.css" },
      { rel: 'stylesheet', href: "/css/main.css" },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,900&display=swap" },
      { rel: 'stylesheet', href: "https://use.fontawesome.com/releases/v5.8.2/css/all.css" },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' },
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.4.0.min.js',
        integrity: 'sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg=',
        crossorigin: "anonymous"
      },
      { src: "/js/poly.js", body: true },
      { src: "/js/adonis.js", body: true },

    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'iview/dist/styles/iview.css',
    'vuetify/dist/vuetify.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/iview',
    '@/plugins/vuetify',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */

  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/moment'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: "http://localhost:3333/",
    credentials: true
    

  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  server: {
    port: 8000, // default: 3000
    host: 'localhost' // default: localhost
  }

}
