const pkg = require("./package");
const path = require('path')
const baseUrl = "https://tgccoin.top";
const imgServerUrl = "https://buybit.oss-cn-hongkong.aliyuncs.com/";
const webSocketUrl = "wss://www.buybit.com";
const webSocketHttpUrl = "https://tgccoin.top";

module.exports = {
  // mode: "universal",
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
      },
      {
        hid: "description",
        name: "description",
        content: pkg.description
      }
    ],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/buybit.ico"
    }]
  },

  env: {
    varsion: pkg.version,
    baseUrl: baseUrl,
    imgServerUrl: imgServerUrl,
    webSocketUrl: webSocketUrl,
    webSocketHttpUrl: webSocketHttpUrl
  },

  server: {
    host: "0.0.0.0",
    port: "3001"
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#02AD8F",
    height: "3px"
  },

  manifest: {
    name: "BuyBit-H5",
    short_name: "币买",
    description: "全球最具影响力的矿机算力交易平台，全球首创矿机算力交易平台，全球首家矿机算力交易平台，全球最好最优质的数字货币交易交易平台",
    background_color: "#02AD8F",
    theme_color: "#02AD8F",
    lang: "zh",
    start_url: "/"
  },

  render: {
    // resourceHints 提升页面加载性能与体验（页面太多的话就不适合用默认的true）
    resourceHints: false,
    http2: {
      push: true
    },
    static: {
      maxAge: "1y",
      setHeaders(res, path) {
        if (path.includes("sw.js")) {
          res.setHeader("Cache-Control", `public, max-age=${15 * 60}`);
        }
      }
    }
  },

  /*
   ** Global CSS
   */
  css: [{
      src: "~assets/css/mixins.scss",
      lang: "scss"
    },
    "~assets/icon/iconfont.css",
    "~assets/css/main.css",
    '~assets/css/tailwind.css',
    "vant/lib/index.css",
    'vue-virtual-scroller/dist/vue-virtual-scroller.css'
  ],

  router: {
    middleware: ["i18n"],
    // 打包APP需要使用
    // base: './',
    // mode: 'hash'
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: "~plugins/localStorage",
      ssr: false
    },
    {
      src: "~plugins/authentication",
      ssr: false
    },
    {
      src: "~plugins/websocket",
      ssr: false
    },
    {
      src: "~plugins/VueClipboard",
      ssr: false
    },
    {
      src: "~plugins/rem",
      ssr: false
    },
    {
      src: "~plugins/qrcode",
      ssr: false
    },
    {
      src: "~plugins/GlobalComponents",
      ssr: false
    },
    {
      src: "~plugins/commonFn",
      ssr: false
    },
    "~plugins/lodash",
    "~plugins/i18n",
    "~plugins/filters",
    // "~plugins/commonFn",
    "~plugins/Calculation",
    "~plugins/Bus",
    "~plugins/ResponseErrMsg",
    "~plugins/vant",
    "~plugins/axios",
    "~plugins/api",
    "~plugins/Mixin",
    "~plugins/directive",
    "~plugins/np",
    "~plugins/echarts",
    "~plugins/base64"
  ],

  // 全局属性
  globalName: "coinpool",

  buildModules: [
    '@nuxtjs/pwa',
    "@nuxtjs/axios",
    "@nuxtjs/svg",
    '@nuxtjs/tailwindcss',
    "@nuxtjs/style-resources",
    // "@nuxtjs/google-analytics",
    // 'nuxt-swaggerjsonapi',
  ],

  // googleAnalytics: {
  //   id: "UA-138097730-1"
  // },

  axios: {
    progress: false, // 是否开启请求进度条
    https: true // 是否开启https请求
  },

  // swaggerJsonApi: {
  //   // SourcePath: path.resolve(__dirname, 'swagger.json'), 
  //   FileUrl: `${baseUrl}/v2/api-docs`,
  //   OutputPath: path.resolve(__dirname, './plugins/api/api.js'),
  //   Model: 'details'
  // },

  styleResources: {
    scss: ["~assets/css/mixins.scss"],
    stylus: ["~assets/css/main.css", "vant/lib/index.css"]
  },

  build: {
    extractCSS: true,
    transpile: [/^vant/],
    // 开启打包分析
    // analyze: true, 	
    assetFilter: function(assetFilename) {	    		
      return assetFilename.endsWith('.js');	    	
    },
    extend(config, ctx) {}
  }
};
