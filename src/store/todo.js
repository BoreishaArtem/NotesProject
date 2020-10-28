import * as fb from 'firebase'
class Todo {
  constructor (id = null, title = '', completed = false, editing = false, todoID = null) {
    this.id = id
    this.title = title
    this.completed = completed
    this.editing = editing
    this.todoID = todoID
  }
}

export default {
  state: {
    todos: [],
    todoForMain: []
  },
  mutations: {
    loadTodos (state, payload) {
      state.todos = payload
    },
    createTodo (state, payload) {
      state.todos.push(payload)
    },
    updateTodo (state, { title, editing, completed, todoID }) {
      const todo = state.todos.find(todo => todo.todoID === todoID)
      todo.completed = completed
      todo.editing = editing
      todo.title = title
    },
    removeTodo (state, { index, todoID }) {
      state.todos.splice(index, 1)
    },
    clearCompleted (state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    getTodos (state, payload) {
      state.todoForMain = payload
    }
  },
  actions: {
    async fetchTodos ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      const newTodo = []
      try {
        const fbVal = await fb.database().ref(`notes/${payload}/todos`).once('value')
        const todos = fbVal.val()
        if (todos !== null) {
          Object.keys(todos).forEach(key => {
            const todo = todos[key]
            newTodo.push(new Todo(todo.id, todo.title, todo.completed, todo.editing, key))
          })
          commit('loadTodos', newTodo)
        } else {
          commit('loadTodos', [])
        }
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async createTodo ({ commit }, { id, title, completed }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newTodo = new Todo(id, title, completed)
        const fbDB = await fb.database().ref(`notes/${id}/todos/`).push(newTodo)
        commit('createTodo', {
          ...newTodo,
          todoID: fbDB.key
        })
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
      }
    },
    async updateTodo ({ commit }, { id, title, completed, editing, todoID }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // eslint-disable-next-line no-unused-vars
        const fbDB = await fb.database().ref(`notes/${id}/todos/`).child(todoID).update({
          title,
          completed,
          editing,
          todoID,
          id
        })
        commit('updateTodo', {
          todoID,
          title,
          completed,
          editing
        })
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
      }
    },
    async removeTodo ({ commit }, { id, todoID, index }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        // eslint-disable-next-line no-unused-vars
        const fbDEL = await fb.database().ref(`notes/${id}/todos`).child(todoID).remove(null)
        commit('removeTodo', { index, todoID })
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async clearCompleted ({ commit }, { data, id }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        // eslint-disable-next-line no-unused-vars
        const fbDel = await fb.database().ref(`notes/${id}/todos`).remove(data)
        commit('clearCompleted')
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async clearCompletedEL ({ commit }, { todoID, id }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        // eslint-disable-next-line no-unused-vars
        const fbDel = await fb.database().ref(`notes/${id}/todos`).child(todoID).remove(null)
        commit('clearCompleted')
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async getTodosForUI ({ commit }, note) {
      commit('setLoading', true)
      commit('clearError')
      const arr = []
      try {
        const fbV = await fb.database().ref('notes/').once('value')
        const notes = fbV.val()
        Object.keys(notes).forEach(key => {
          const todos = notes[key].todos
          if (typeof todos !== 'undefined') {
            arr.push(todos)
          }
        })
        commit('getTodos', arr)
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    }
  },
  getters: {
    todos (state) {
      return state.todos
    },
    todoForMain (state) {
      return state.todoForMain
    }
  }
}
