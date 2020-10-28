<template>
    <div class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox" v-model="completed" @change="doneEdit">
        <div
          v-if="!editing"
          @dblclick="editTodo"
          class="todo-item-label"
          :class="{ completed : completed }"
        >{{ title }}</div>
        <input
          v-else
          class="todo-item-edit"
          type="text"
          v-model="title"
          @blur="doneEdit"
          @keyup.enter="doneEdit"
          @keyup.esc="cancelEdit"
          v-focus>
      </div>
      <div
        class="remove-item"
        @click="removeTodo(index)"
      >
        &times;
      </div>
    </div>
</template>
<script>
export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      id: this.todo.id,
      todoID: this.todo.todoID,
      beforeEditCache: ''
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  watch: {
    checkAll () {
      if (this.checkAll) {
        this.completed = true
      } else {
        this.completed = this.todo.completed
      }
    }
  },
  methods: {
    removeTodo (index) {
      this.$store.dispatch('removeTodo', {
        todoID: this.todoID,
        id: this.id,
        index
      })
    },
    editTodo () {
      this.beforeEditCache = this.title
      this.editing = true
      console.log()
    },
    doneEdit () {
      if (this.title.trim() === '') {
        this.title = this.beforeEditCache
      }
      this.editing = false

      this.$emit('finishedEdit', {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing,
          todoID: this.todoID
        }
      })
    },
    cancelEdit () {
      this.title = this.beforeEditCache
      this.editing = false
    }
  }

}
</script>
<style scoped>
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    font-size: 20px;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }
  .todo-item-left {
    display: flex;
    align-items: center;
  }
  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }
  .todo-item-edit {
    font-size: 20px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    &:focus {
      outline: none;
    }
  }
</style>
