module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: '柠檬监控',
    manifestOptions:{
      start_url:"/user/web/list",
      background_color:"#673AB7",
      theme_color:"#673AB7",
      display:"standalone",
      icons:[
        {
          src: "/img/icons/android-chrome-96x96.png",
          sizes: "96x96",
          type: "image/png"
        },
        {
          src: "/img/icons/msapplication-icon-144x144.png",
          sizes: "144x144",
          type: "image/png"
        }
      ]
    }
  }
}