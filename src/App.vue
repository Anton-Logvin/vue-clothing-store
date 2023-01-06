<template>
  <div id="app">
    <nav-bar />
    <main class="content">
      <h1 class="title">Branded Clothing Store VUE JS</h1>
      <router-view />
    </main>
    <FooterBar />
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import FooterBar from './components/FooterBar.vue'

export default {
  name: 'App',
  components: { NavBar, FooterBar },
}
</script>

<style lang="scss">
$header-height: 60px;
$footer-height: 45px;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
  /* position: relative; */
}

.title {
  padding: 20px 0px;
  background-image: linear-gradient(90deg, #00158f3f,#00c9117e, #073f0067);
  opacity: 0.9;
  background-color: #2aa5a18c;
  color: rgb(255, 255, 255);
  text-shadow: 2px 2px 2px rgb(0, 109, 0);
}

.content {
  min-height: calc(100vh - #{$header-height} - #{$footer-height});
  padding-bottom: 40px;
}
</style>
