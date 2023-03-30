import * as fb from 'firebase/app'

// class User {
//   constructor(id) {
//     this.id = id
//   }
// }

export default {
  namespaced: true,

  state: {
    user: null,
    token: null,
  },

  getters: {
    user(state) {
      return state.user
    },
    isAuth(state) {
      return !!state.token
    }
  },

  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    }
  },

  actions: {
    registerUser(context, { email, password }) {
      fb.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user)
        // commit('setUser', new User(user.uid))
      }).catch((error) => {
        console.log(error)
      })
    },
    setToken({ commit }, token) {
      localStorage.setItem('token', token)
      commit("setToken", token)
    },
  },
}