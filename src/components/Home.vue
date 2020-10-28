<template>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" height="900">
  <v-container grid-list-lg v-if="notes.length > 0">
    <v-layout row wrap v-if="!loading">
      <v-flex xs-12 sm-6 md-4 lg-2 v-for="(item, index) in notes" :key="item.noteId" >
        <v-card class="mx-auto pb-2 mb-16" max-width="344" >
          <v-img
            class="white--text align-end"
            height="220px"
            width="344"
            :style="{backgroundColor: item.color}">
            <v-card-title class="justify-center">{{item.name | toUpperCase}}</v-card-title>
          </v-img>
          <!---->
          <v-card-subtitle class="pb-0 text-md-center">Watch Your Todos</v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text v-if="item" :to="'/todo/' + item.noteId">Open</v-btn>
            <v-btn text v-else :to="'/todo/' + item.noteId">Create todo</v-btn>
            <delete-note-modal :index="index" :note="item"></delete-note-modal>
<!--            <h1>@click="item.show != item.show"</h1>-->
            <v-btn
              icon
              @click="getTodos(item)"
            >
              <v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="item.show">
              <v-card-text>
                <v-list-item
                  v-for="element in todoShow"
                  :key="element.todoID"
                  class=" text-lg-h6"
                >
                  {{ element.title }}
                  <v-spacer></v-spacer>
                  <v-icon>{{ element.completed ? 'mdi-check-outline' : 'mdi-minus-circle' }}</v-icon>
                </v-list-item>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else row wrap justify-space-between>
      <v-flex class="text-md-center mx-auto" xs-12 sm-6 md-4 lg-2>
        <v-progress-circular
          :size="100"
          :width="4"
          color="amber"
          indeterminate
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container grid-list-lg v-else-if="notes.length <= 0">
    <v-layout row wrap justify-space-between>
      <v-flex class="showCaseTitle text-md-center" xs-12 sm-6 md-4 lg-2>
        <h1>Create your own TODO :-)</h1>
        <v-btn to="/new" class="mt-5" v-if="notes.length === 0">Create Note</v-btn>
<!--        <v-btn to="/login" class="mt-5" v-else-if="!user">Login</v-btn>-->
      </v-flex>
    </v-layout>
  </v-container>
    </v-parallax>
</template>
<script>
import deleteNote from './Notes/DeleteNote'
export default {
  components: {
    deleteNoteModal: deleteNote
  },
  data () {
    return {
      todoShow: []
    }
  },
  computed: {
    todos () {
      return this.$store.getters.todos
    },
    notes () {
      return this.$store.getters.notes
    },
    loading () {
      return this.$store.getters.loading
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    getTodos (note) {
      const todoForMain = this.$store.getters.todoForMain
      const newArr = []
      todoForMain.forEach(todo => {
        Object.keys(todo).forEach(key => {
          if (todo[key].id === note.noteId) {
            if (todo[key]) {
              newArr.push(todo[key])
            }
          }
        })
      })
      this.todoShow = newArr
      note.show = !note.show
    }
  },
  filters: {
    toUpperCase (value) {
      return value.toUpperCase()
    }
  },
  created () {
    this.$store.dispatch('getTodosForUI')
  }

}
</script>
<style scoped>
</style>
