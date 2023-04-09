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
    },
  },

  actions: {
    registerUser({commit}, { email, password, name }) {
      fb.auth().createUserWithEmailAndPassword(email, password, name)
      .then(user => {
        commit('setUser', { email, password, name })
        console.log(user)
        console.log(name)
      }).catch((error) => {
        console.log(error)
      })
    },
    setToken({ commit }, token) {
      localStorage.setItem('token', token)
      // console.log(token)
      commit("setToken", token)
    },
    setUser({ commit }, user) {
      commit('setUser', user)
    }
  },
}