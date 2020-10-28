import * as fb from 'firebase'
class Note {
  constructor (name, color = null, show = false, ownerID, noteId = null) {
    this.name = name
    this.color = color
    this.show = show
    this.ownerID = ownerID
    this.noteId = noteId
  }
}

// Create New Class TODO, where we scpecify new fields
// Next step we will create the new method wich will be work on user's click on the button at the Todo.vue comp

export default {
  state: {
    notes: []
  },
  mutations: {
    createNote (state, payload) {
      state.notes.push(payload)
    },
    loadNotes (state, payload) {
      state.notes = payload
    },
    deleteNote (state, note) {
      const idx = state.notes.indexOf(note)
      state.notes.splice(idx, 1)
    }
  },
  actions: {
    async createNote ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const note = new Note(
          payload.name,
          payload.color,
          payload.show,
          getters.user.id
        )
        const fbVal = await fb.database().ref('notes').push(note)
        commit('createNote', {
          ...note,
          noteId: fbVal.key
        })
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
    },
    async fetchNotes ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      const resultNotes = []
      try {
        const fbVal = await fb.database().ref('notes').once('value')
        const notes = fbVal.val()
        Object.keys(notes).forEach(key => {
          const note = notes[key]
          resultNotes.push(
            new Note(note.name, note.color, note.show, note.ownerID, key)
          )
        })
        commit('loadNotes', resultNotes)
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
        throw e
      }
      return resultNotes
    },
    async deleteNote ({ commit }, { index, note }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const noteId = note.noteId
        // eslint-disable-next-line no-unused-vars
        const fbDelNote = await fb.database().ref('notes').child(noteId).remove(null).then(() => commit('deleteNote', note))
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
      }
    }
  },
  getters: {
    notes (state, getters) {
      return state.notes.filter(note => {
        return note.ownerID === getters.user.id
      })
    }
  }
}
