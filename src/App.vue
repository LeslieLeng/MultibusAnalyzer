<template>
  <div id="app">
    <app-header></app-header>
    <app-leftnav></app-leftnav>
    <app-foot></app-foot>
  </div>
</template>

<script>
import Header from './components/Home/Header'
import Nav from './components/Home/Nav'
import Foot from './components/Home/Foot'
export default {
  name: 'App',
  components:{
    'app-header':Header,
    'app-leftnav':Nav,
    'app-foot':Foot,
  },
  created(){

  }
}
</script>

<style>
  body,div,p,h1,h2,h3,h4,h5{padding: 0;margin: 0}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
