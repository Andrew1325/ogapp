import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    script: [{
      src: 'https://js.stripe.com/v3'
    }],
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Raleway:100,200,400,500|Playfair Display|Material+Icons|Material+Icons+Outlined|Overlock&display=swap'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/style/app.styl',
    '~/assets/main.css',
    '~/assets/stylus/main.styl',

  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vuetify',
    '@plugins/aos.client.js',
    '~/plugins/nuxt-client-init.client.js',
    '~/plugins/chart.client.js',
    '~/plugins/vue2editor.client.js',
    '~/plugins/glob-mixns.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    'nuxt-device-detect',
    ['cookie-universal-nuxt', {
      alias: 'cookiez'
    }],
    '@nuxtjs/sitemap',
    ['@nuxtjs/robots', {
      robots: {
        UserAgent: '*',
        Disallow: '/admin'
      }
    }]
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://enigmatic-sands-68843.herokuapp.com/',
        wsEndpoint: 'wss://enigmatic-sands-68843.herokuapp.com/'
      }
    }
  },

  sitemap: {
    hostname: 'https://ordinarygoddesses.com.au',
    gzip: true,
    exclude: [
      '/admin/**'
    ]
  },

  serverMiddleware: [
    // 'redirect-ssl',
    '~/api/upload',
    '~/api/email'
  ],

  router: {
    middleware: ['auth']
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  /*
   ** Build configuration
   */
  build: {
    babel: {
      presets({
        isServer
      }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: {
                version: 3
              }
            }
          ]
        ]
      }
    },
    watch: ['api'],
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    serverMiddleware: [
      // 'redirect-ssl',
      '~/api/upload'
    ]
  }
}
