<template>
  <div id="app">
    <nav-bar />
    <h1 class="title">Branded Clothing Store VUE JS</h1>
    <main class="content">
      
      <router-view class="router-view"/>
    </main>
    <FooterBar class="footer-bar"/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import FooterBar from './components/FooterBar'

export default {
  name: 'App',
  components: { NavBar, FooterBar },

  created() {
    // TODO: type of text, JSON.parse
    this.$store.dispatch('user/setToken', localStorage.getItem('token'))
  },
  mounted() {
    this.$store.dispatch('cartModule/setCartFromStorage');
    this.$store.getters['cartModule/cartLength']
  }
}
</script>

<style lang="scss">
$header-height: 60px;
$footer-height: 300px;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  padding-top: 58px;
  // position: relative;
}

.title {
  // display: block;
  padding: 10px 0px 30px 0px;
  background-image: linear-gradient(90deg, #00158f3f,#00c9117e, #073f0067);
  opacity: 0.9;
  background-color: #2aa5a18c;
  color: rgb(255, 255, 255);
  text-shadow: 2px 2px 2px rgb(0, 109, 0);
  width: 100%;
  z-index: 1;
}

.router-view {
  border-radius: 20px;
  background: #fff;
  padding: 30px 0px 20px 0px;
}

.content {
  position: relative;
  margin-top: -24px;
  min-height: calc(100vh - #{$header-height} - #{$footer-height});
  border-radius: 20px;
  z-index: 10;
}

.footer-bar {
  // position: relative;
  margin-top: -20px;
  // z-index: 1;
}
</style>
