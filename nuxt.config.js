const pkg = require('./package')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')



//static  静态打包的环境
let baseUrl = "",
  base = "",
  name = "";
switch (process.env.NODE_ENV) {
  case "uat": //uat
    baseUrl = "http://118.190.202.65:8086/"
    base = "/"
    name = "dist_uat"
    break;
  case "static": //线上
    baseUrl = "http://118.190.202.65:8081/"
    base = "/dist"
    name = "dist"
    break;
  default: //默认
    // http://118.190.202.65:8081/swagger-ui.html  swagger地址
    //http://yapi.demo.qunar.com/mock/29556
    //http://118.190.202.65:8081/  服务器
    //于:10.112.124.114
    baseUrl = "http://118.190.202.65:8086/"
    base = "/"
    name = "dist"
}



module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    script: [{
      src: "https://www.sobot.com/chat/frame/js/entrance.js?sysNum=050254822180413db3b0425e362ea64b&channelFlag=5",
      id: "zhichiScript",
      class: "zhiCustomBtn",
      "data-args": "manual=true"
    },{
      src:"http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"
    }],
    title: "暄桐", //pkg.name,
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
      },
      {
        hid: 'description',
        name: 'description',
        content: "书法,写字,书法课,书法零基础,美育,临帖,暄桐,暄桐教室,林曦,林糊糊,ask林曦,儿童书法,齐白石,丰子恺,小世界,闹事集,文人"
      },
      {
        hid: 'description',
        name: 'description',
        content: "暄桐是一间教室，基于中式文人审美，教授以书法为主的传统文化与技艺，推崇非功利的学习态度。教室认为写字是一种生活方式，师生共同以书法为原点延展深入传统与艺术的种种乐趣，探索着心手相应，知行合一的可能。"
      },
      {
        "http-equiv": "X-UA-Compatible",
        content: "IE=EmulateIE7"
      }

    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/iconimg/xuantonghead.png'
    }]
  },
  router: {
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    base: base,
    middleware: 'router'
  },
  generate: {
    dir: name,
  },

  /*
   ** Customize the progress-bar color
   */
  //loading颜色条
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    'assets/css/normalize.css',
    'assets/css/Project.css',
    'assets/main.css',
    'element-ui/lib/theme-chalk/index.css',
    'assets/css/template.css',
    'swiper/dist/css/swiper.css',
    'assets/icon.css',
    {
      src: 'assets/css/themb.scss',
      lang: "scss"
    }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    { //axios的二次封装
      src: "@/plugins/axios",
      ssr: false
    },
    "@/plugins/utils.js",
    "@/plugins/vaildRule.js",
    '~/plugins/vue-lazyLoad.js',
    { //axios的二次封装
      src: '~/plugins/vue-corp.js',
      ssr: false
    },
    '@/plugins/route.js',
    '@/plugins/resize.js',
    {
      src: '~/plugins/swiper.js',
      ssr: false
    },
    '@/plugins/directives.js',
    "@/plugins/polyfill.js",
    "@/plugins/wx.js",
    "@/plugins/crypto-js.js"

    // "@/plugins/vueInfiniteScroll.js"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    proxy: true,
    prefix: '/api', // baseURL
    credentials: true,
    retry: {
      retries: 3
    }, //自动拦截失败的请求
    // baseURL: "http://118.190.202.65:8081/", //服务端baseUrl
    browserBaseURL: baseUrl,
    // See https://github.com/nuxt-community/axios-module#options
  },

  // proxy: {
  //   '/api/': {
  //     target: 'http://10.112.124.114:8081/', // 代理地址
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': ''
  //     },
  //   },
  // },
  /*
   ** Build configuration
   */
  build: {
    vendor: ['axios', 'vue-cropper', 'moment'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // console.log(config)
      // console.log("分割线")
      // console.log(ctx)
      console.log(process.env.NODE_ENV, "环江")
      if (process.env.NODE_ENV == "uat") {
        // config.output.publicPath="/dist/_nuxt/"
        config.plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                warnings: true,
                drop_console: true
              },
            },
          })

        )
      }
      //使用sass
      // const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader');
      // vueLoader.options.loaders.sass = 'vue-style-loader!css-loader!sass-loader';
      // console.log(config,1,ctx)

    },
    // postcss: [
    //   require('postcss-nested')(),
    //   require('postcss-responsive-type')(),
    //   require('postcss-hexrgba')(),
    // ]
    plugins: [

    ]
  }
}
