// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// export default {
//   namespaced: true,

//   state: {

//   },

//   getters: {

//   },

//   mutations: {

//   },

//   actions: {
//     signIn() {
//       const auth = getAuth();
//       console.log(auth)
//       signInWithEmailAndPassword(auth, this.form.email, this.form.password)
//         .then((userCredential) => {
//           const user = userCredential.user
//           const token = user.accessToken
//           if(token) {
//             this.$store.dispatch('user/setToken', token)
//             this.$store.dispatch('user/setUser', user)
//             this.$router.push('/')
//           }
//         })
//         .catch((error) => {
//           console.log(error)
//         });
//     },

//     onSubmit(event) {
//       event.preventDefault()
//       alert(JSON.stringify(this.form))
//     },

//     onReset(event) {
//       event.preventDefault()
//       // Reset our form values
//       this.form.email = ''
//       this.form.name = ''
//       // Trick to reset/clear native browser form validation state
//       this.show = false
//       this.$nextTick(() => {
//         this.show = true
//       })
//     },

//     scrollTop() {
//       window.scrollTo(0, 0);
//     }
//   }
// }