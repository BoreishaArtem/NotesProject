<template>
  <div id="main" class="container">
    <v-img src="http://www.goalcollegeathlete.com/wp-content/uploads/2013/10/general-icons-25-300x300.png" class="logo"></v-img>
    <div>
      <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
      <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <todo-item
          v-for="(todo, index) in todosFiltered"
          :key="todo.todoID"
          :todo="todo"
          :index="index"
          :checkAll="!anyRemaining"
          @finishedEdit="finishedEdit"
        >
        </todo-item>
      </transition-group>
      <div class="extra-container">
        <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos"> Check All</label></div>
        <div>{{ remaining }} items left</div>
      </div>
      <div class="extra-container">
        <div>
          <button class="bottom-btn" :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
          <button class="bottom-btn"  :class="{ active: filter === 'active' }" @click="filter = 'active'">Active
          </button>
          <button class="bottom-btn" :class="{ active: filter === 'completed' }" @click="filter = 'completed'">
            Completed</button>
        </div>
        <div>
          <transition name="fade">
            <button v-if="showClearCompletedButton" @click="clearCompleted" class="bottom-btn">Clear Completed</button>
          </transition>
        </div>
      </div>
      <div class="text-md-center save">
        <v-btn class="text-md-center" text @click="sendTodo">Save Your Todo</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import todoItem from './TodoComponents/TodoItem'
export default {
  props: ['id'],
  components: {
    todoItem
  },
  data () {
    return {
      newTodo: '',
      beforeEditCache: '',
      filter: 'all'
    }
  },
  computed: {
    todos () {
      console.log(this.$store.getters.todos, 'Updated TODOS')
      return this.$store.getters.todos
    },
    remaining () {
      return this.todos.filter(todo => !todo.completed).length
    },
    anyRemaining () {
      return this.remaining !== 0
    },
    todosFiltered () {
      if (this.filter === 'all') {
        return this.todos
      } else if (this.filter === 'active') {
        return this.todos.filter(todo => !todo.completed)
      } else if (this.filter === 'completed') {
        return this.todos.filter(todo => todo.completed)
      }
      return this.todos
    },
    showClearCompletedButton () {
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  methods: {
    addTodo () {
      if (this.newTodo.trim().length === 0) {
        return 0
      }
      this.$store.dispatch('createTodo', {
        id: this.id,
        title: this.newTodo
      })
      this.newTodo = ''
    },
    checkAllTodos (event) {
      this.todos.forEach((todo) => todo.completed = event.target.checked)
    },
    clearCompleted () {
      // this.todos = this.todos.filter(todo => !todo.completed)
      const completedTodos = this.todos.filter(todo => !todo.completed)
      if (completedTodos.length > 0) {
        const todos = this.todos.filter(todo => todo.completed)
        todos.forEach(todo => {
          console.log(todo.todoID)
          this.$store.dispatch('clearCompletedEL', {
            todoID: todo.todoID,
            id: todo.id
          })
        })
      } else {
        console.log('Completed TODOS IS []')
        this.$store.dispatch('clearCompleted', {
          data: null,
          id: this.id
        })
      }
    },
    finishedEdit (data) {
      this.todos.splice(data.index, 1, data.todo)
    },
    sendTodo () {
      this.todos.forEach(todo => {
        this.$store.dispatch('updateTodo', {
          id: todo.id,
          title: todo.title,
          todoID: todo.todoID,
          completed: todo.completed,
          editing: todo.editing
        })
      })
      this.$router.push('/')
    }
  },
  created () {
    this.$store.dispatch('fetchTodos', this.id)
  }
}
</script>

<style scoped lang="scss">
  * {
    box-sizing: border-box;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  #main {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    margin-top: 60px;
    font-size: 24px;
  }
  .save {
    display: flex;
    justify-content: center;
  }
  .logo {
    display: block;
    margin-top: 10px;
    margin-bottom: 50px;
    margin-left: 40%;
    height: 100px;
    width: 100px;
    padding-bottom: 20px;
  }
  .bottom-btn {
    border-radius: 2px;
    padding-left: 5px;
    padding-right: 5px;
    margin: 0 2px;
  }
  .bottom-btn:hover {
    border: 1px solid lightgreen;
  }
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    border: 2px solid lightgrey;
    border-radius: 2px;
    &:focus {
      outline: 0;
    }
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }
  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    &:hover {
      background: lightgreen;
    }
    &:focus {
      outline: none;
    }
  }
  .active {
    background: lightgreen;
  }
  // CSS Transitions
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }
</style>
