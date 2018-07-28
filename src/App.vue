<template>
  <div id="app">
    <section class="hero is-success is-fullheight">
      <headerHero></headerHero>
      <router-view></router-view>
      <footerHero></footerHero>
    </section>
  </div>
</template>

<script>
import HeaderHero from './components/HeaderHero'
import FooterHero from './components/FooterHero'

export default {
  name: 'app',
  components: {
    HeaderHero,
    FooterHero
  }
}
</script>

<style scoped lang="scss">
@import '../node_modules/bulma/css/bulma.css';

html, body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFF;
  height: 100%;
}

/*.is-success {
  background: #333;
  background: -webkit-linear-gradient(left top, #024, #402);
  background: -moz-linear-gradient(bottom right, #024, #402);
  background: linear-gradient(to bottom right, #024, #402);
}*/
/*
.is-success {
background: #333;
background: -webkit-linear-gradient(left top, #ef8e38, #108dc7);
background: -moz-linear-gradient(bottom right, #ef8e38, #108dc7);
background: linear-gradient(to bottom right, #ef8e38, #108dc7);
}*/


.is-success {
background: #333;
background: -webkit-linear-gradient(left top, #ef8e38, #108dc7);
background: -moz-linear-gradient(bottom right, #ef8e38, #108dc7);
background: linear-gradient(to bottom right, #ffffcc 0%, #99ccff 116%);
}

/*.is-success {
  background-image: url("stars.jpg");
  background-size: cover;
  background-repeat:   no-repeat;
  background-position: center;
}*/
</style>
