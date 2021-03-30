import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'bulma/css/bulma.css'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import DropzoneContainer from '@/components/DropzoneContainer.vue'

Vue.config.productionTip = false
Vue.component('vue-dropzone', vue2Dropzone)
Vue.component('dropzone-container', DropzoneContainer)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
