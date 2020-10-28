import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import note from './note'
import todo from './todo'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    note,
    todo,
    shared
  }
})
