<template>
  <div class="container">
    <h1 class="content">Create your Note!</h1>
    <template>
        <v-text-field
          label="Give the name to your note"
          solo
          class="todo-inp"
          v-model="noteName"
        ></v-text-field>
    </template>
    <div class="content">
      <h1 >You can select the color, that will be shown at your card!</h1>
      <div class="content-note" :style="boardColor"></div>
        <template>
          <div class="select__circles" v-for="(circleColor, index) in colors" :style="{ backgroundColor: circleColor }"
               :key="index" :data-color="circleColor" @click="setUpColor"></div>
        </template>
      <v-layout row>
        <v-flex xs12>
          <v-btn class="mt-5" @click="createNote">Create note
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
export default {
  name: 'newTodo',
  data () {
    return {
      noteName: '',
      colors: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1',
        '#95a5a6'],
      color: ''
    }
  },
  methods: {
    createNote () {
      if (this.noteName === '') {
        alert('Please give name to the note')
      } else if (this.color === '' && this.img === '') {
        alert('Please select at least one feature color or image')
      } else {
        const newNote = {
          name: this.noteName,
          color: this.color,
          show: false
        }
        this.$store.dispatch('createNote', newNote)
        this.$router.push('/')
      }
    },
    setUpColor (e) {
      const chosenColor = e.target.dataset.color
      this.color = chosenColor
    }
  },
  computed: {
    boardColor () {
      return {
        'background-color': this.color,
        'border-color': this.color
      }
    }
  }

}
</script>

<style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  .content {
    text-align: center;
    justify-content: center;
  }
  .todo-inp {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 18px;
  }
  .content-note {
    border: 3px solid lightblue;
    width: 303px;
    border-radius: 5%;
    height: 200px;
    margin: 50px auto;
  }
  .content-img {
    width: 100px;
    border-radius: 5%;
    height: 100px;
    margin: 50px auto;
  }
  .select__circles{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: red;
    margin-left: 5px;
    display: inline-block;
    margin-bottom: 10px;
    cursor: pointer;
  }
  hr {
    background-color: red;
    display: block;
    width: 20px;
    transform: rotate(90deg);
    margin: 10px auto;
  }
</style>
