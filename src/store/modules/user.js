import * as fb from 'firebase/app'

class User {
  constructor(id) {
    this.id = id
  }
}

export default {
  state: {
    user: null,
    
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerUser({commit}, {email, password}) {
      fb.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        commit('setUser', new User(user.uid))
      })
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
}