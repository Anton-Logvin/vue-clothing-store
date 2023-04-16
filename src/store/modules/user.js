// import * as fb from 'firebase/app'

// import { collection } from 'firebase/firestore'
// import { doc, setDoc } from "firebase/firestore"; 


import Vue from "vue";
import { doc, setDoc } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
    // registerUser({commit}, { email, password }) {
    //   fb.auth().createUserWithEmailAndPassword(email, password)
    //   .then(user => {
    //     commit('setUser', { email, password })
    //     console.log(user)
    //   }).catch((error) => {
    //     console.log(error)
    //   })


    // },

    registerUser({commit}, { email, password, name }) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password, name)
        .then((userCredential) => {
          commit('setUser', { email, password, name })
          console.log(userCredential)
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        });
        
      setDoc(doc(Vue.$db, "users", email), {
        email: email,
        name: name,
        password: password
      });
   

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