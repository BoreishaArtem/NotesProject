import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fb from 'firebase'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyAiGjUZiMh30it7gxJssKL2-o-frxuJ0S8',
      authDomain: 'todolist-da532.firebaseapp.com',
      databaseURL: 'https://todolist-da532.firebaseio.com',
      projectId: 'todolist-da532',
      storageBucket: 'todolist-da532.appspot.com',
      messagingSenderId: '1030852766890',
      appId: '1:1030852766890:web:3019244aad8365ae2b34d3'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
        this.$store.dispatch('fetchNotes')
      }
    })
  }
}).$mount('#app')
