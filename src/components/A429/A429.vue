<template>
  <div id="A429">
    <div class="header">
      <ul class="data_nav_ul">
        <router-link active-class="act" to="/a429monitor" tag="li" exact>
          <span class="">监控</span>
        </router-link>
        <router-link active-class="act" to="/a429simulate" tag="li">
          <span class="">仿真</span>
        </router-link>
        <router-link active-class="act" to="/a429playback" tag="li">
          <span class="">回放</span>
        </router-link>
      </ul>
    </div>
    <div id="content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import store from '../store'
  import axios from 'axios'
    export default {
        name: "A429",
      methods:{
        getClientId(){
          // console.log('获取客户端ID')
          if(sessionStorage.getItem('ClientId')){
            return false
          }else {
            axios.post('/getClientId', {
              BusType:'A429'
            }).then((res) => {
              sessionStorage.setItem('ClientId',res.data)
            }).catch((err) => {
              console.log(err)
            })
          }
        }
      },
      mounted(){
        this.getClientId()
      }
    }
</script>

<style scoped>
  .header {
    height: 60px;
    background: #2c3b41;
    border-bottom: 2px solid #47b0c3;
    min-width: 900px;
  }
  .header ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .header li{
    float: left;
    margin-top: 6px;
    margin-right: 2px;
    height: 50px;
    line-height: 50px;
    color: #fff;
    border-radius: 5px 5px 0 0;
    background: #1F5e6f;
    width: 120px;
    cursor:pointer;
    border: 2px solid transparent;
  }
  .act{
    border: 2px solid #47b0c3 !important;
    background:#47b0c3 !important;
  }
  #content{
    height: 100%;
  }
</style>
