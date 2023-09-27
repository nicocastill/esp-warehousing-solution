import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import 'mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import {
  createVuetify
} from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.min.css';

const vuetify = createVuetify({
  components,
  directives,
})

import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'


const app = createApp(App)

app.use(vuetify)
app.use(mdiVue, {
  icons: mdijs
})
app.use(router)

app.mount('#app')
