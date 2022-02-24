import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import zhHans from 'vuetify/src/locale/zh-Hans';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // 默认值 - 仅用于展示目的
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#673AB7',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
  lang: {
    locales: {
      zhHans
    },
    current: 'zhHans',
  },
});