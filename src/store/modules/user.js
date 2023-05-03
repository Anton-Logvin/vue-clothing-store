// import * as fb from 'firebase/app'

// import { collection } from 'firebase/firestore'
// import { doc, setDoc } from "firebase/firestore"; 



import Vue from "vue";
import { doc, setDoc, collection, getDocs, update} from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export default {
  namespaced: true,

  state: {
    user: null,
    token: null,
    dataUser: {},
    usersFirestore: []
  },

  getters: {
    user(state) {
      return state.user
    },

    dataUser(state) {
      return state.dataUser
    },

    isAuth(state) {
      return !!state.token
    },
  },

  mutations: {
    setUser(state, user) {
      state.user = user
      console.log(state.user)
    },

    getUsersFirestore(state, usersFs) {
      state.usersFirestore = usersFs
      console.log('Users Firestore:',usersFs)
    },

    setToken(state, token) {
      state.token = token
    },

    setDataUser(state, user) {
      state.dataUser = {
        createdAt: new Date(+user.createdAt),
        lastRefreshAt: user.lastRefreshAt,
        lastLoginAt: new Date(+user.lastLoginAt),
        passwordUpdatedAt: new Date(user.passwordUpdatedAt),
      }
    },
  },

  actions: {
    async getUser({commit}, email) {
      const usersFs = []
      const users = await getDocs(collection(Vue.$db, "users"));
      users.docs.forEach((doc) => {
        usersFs.push(doc.data())
        if(doc.data().email === email) {
          console.log('getUser:',email)
          update(doc.data().name = 'wwwwwwwwwwwww')
          console.log(doc.data().name)
        }
      });
      commit('getUsersFirestore', usersFs)
    },

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
    },

    setDataUser({commit}, user) {
      commit('setDataUser', user)
    },

  },
}