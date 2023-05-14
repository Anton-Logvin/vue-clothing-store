import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithEmailAndPassword, 
  updateProfile, 
  updateEmail, 
  updatePassword, } from "firebase/auth";


export default {
  namespaced: true,

  state: {
    user: null,
    token: null,
    dataUser: {},
  },

  getters: {
    user(state) {
      return state.user
    },

    dataUser(state) {
      return state.dataUser
    },

    isAuth(state) {
      console.log('getters user/isAuth:', !!state.token, typeof state.token)
      return !!state.token
    },
  },

  mutations: {
    setUser(state, user) {
      state.user = user
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
    },

    signIn({ commit }, { email, password}) {
      const auth = getAuth();
      console.log(auth)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          const token = user.accessToken
          // console.log(user)
          if(token) {
            commit('setToken', token)
            commit('setUser', user)
          }
        })
        .catch((error) => {
          console.log(error)
        });
    },

    signOut({ commit }) {
      const auth = getAuth();
      signOut(auth).then(() => {
        localStorage.removeItem('token')
        commit('setToken', null)
        // this.$router.push('/')
        }).catch((error) => {
          console.log(error)
        })
    },

    updateUser({commit}, {name, email, newPassword, newPasswordRepeat, userImageSrc}) {
      console.log(commit, newPassword, newPasswordRepeat)
      const auth = getAuth();
      const currentUser = auth.currentUser
      updateProfile(auth.currentUser, {
        displayName: name, 
        photoURL: userImageSrc || "https://news.store.rambler.ru/img/2b31f673def9712dce283c9301eea18e?img-format=auto&img-1-resize=height:355,fit:max&img-2-filter=sharpen"
      }).then(() => {
        // console.log(currentUser)
      }).catch(() => {
      });
      
      updateEmail(currentUser, email).then(() => {
      }).catch((error) => {
        console.log(error)
      });

      if(newPassword != '' && newPassword === newPasswordRepeat) {
        updatePassword(currentUser, newPassword).then(() => {
          console.log(newPassword)
        }).catch((error) => {
          console.log('updatePassword:', error)
        });
      }


      // this.$toasted.show("Изменения профиля сохранены")
    },

    setToken({ commit }, token) {
      localStorage.setItem('token', token)
      // console.log(token)
      commit("setToken", token)
    },

    setUser({ commit }, user) {
      console.log(user)
      commit('setUser', user)
    },

    setDataUser({commit}, user) {
      commit('setDataUser', user)
    },
  },
}