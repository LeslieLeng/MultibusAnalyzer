<template>
    <div style="padding: 30px;position: relative">
      <div class="nav-btn">
        <button @click="choiceModel(0)">BC模式</button>
        <button @click="choiceModel(1)">RT模式</button>
      </div>
      <div>
        <div v-show="tabs === 0">
          <bc-mode></bc-mode>
        </div>
        <div v-show="tabs === 1">
          <rt-mode></rt-mode>
        </div>
      </div>
    </div>
</template>

<script>
  import $ from "jquery";
  import BCMODE from './simulate/BCMode'
  import RTMODE from './simulate/RTMode'
    export default {
        name: "Bus1553BSimulate",
      data(){
          return{
            tabs:0
          }
      },
      components: {
        'bc-mode':BCMODE,
        'rt-mode':RTMODE,
      },
      methods:{
        choiceModel(v) {
          var tabs = $('.nav-btn').children()
          for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.background = "#ccc"
          }
          tabs[v].style.background = "#9ae9ff"
          this.tabs = v
        },
      }
    }
</script>

<style scoped>
.nav-btn{
  position: absolute;
  height: 60px;
  width: 300px;
  background: #fff;
  box-shadow: 5px 5px 3px #666;
}
  .nav-btn button{
    width: 100px;
    height: 40px;
    margin-top: 10px;
    border-radius: 5px;
  }
.nav-btn button:first-child {
  background-color: #9ae9ff;
}

.nav-btn button + button {
  background: #ccc;
  margin-left: 20px;

}
</style>
