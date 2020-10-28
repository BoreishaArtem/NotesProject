<template>
  <v-row justify="center">
    <v-btn text color="red" @click.stop="dialog=true">Delete</v-btn>
  <v-dialog
    v-model="dialog"
    max-width="400"
  >
    <v-card>
      <v-card-title class="text-md-center">Delete this note?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="dialog = false"
        >
          No
        </v-btn>
        <v-btn
          color="red darken-1"
          text
          @click="deleteNote"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    index: {
      required: true,
      type: Number
    },
    note: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    deleteNote () {
      // const note = this.$store.getters.notes[index]
      // this.$store.dispatch('deleteNote', {
      //   index,
      //   note
      // })
      this.$store.dispatch('deleteNote', {
        index: this.index,
        note: this.note
      })
      console.log(this.index, this.note)
      this.dialog = false
    }
  }
}
</script>
