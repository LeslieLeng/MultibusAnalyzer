<template>
  <div>
    <div id="index">
      <el-aside width="202px" class="asideNav">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical"
          router
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
          background-color="#2c3b41"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose">
          <div id="logo" index="1">
            <span class="tohide">
              <i class="iconfont icon-feiji"></i>
              <span v-if="toTitle">QB-1105</span>
            </span>

          </div>
          <el-menu-item index="/">
            <i class="iconfont icon-PIR"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1-2">
            <template slot="title">
              <i class="iconfont icon-shenjing"></i>
              <span>A429总线</span>
            </template>
            <el-menu-item index="/a429">
              <i class="iconfont icon-guize"></i>
              <span>数据监控</span>
            </el-menu-item>
            <el-menu-item index="/a429simulate">
            <i class="iconfont icon-guizeyinqing"></i>
            <span>数据仿真</span>
          </el-menu-item>
            <el-menu-item index="/a429playback">
              <i class="iconfont icon-wangguan"></i>
              <span>数据回放</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="1-3">
            <template slot="title">
              <i class="el-icon-share"></i>
              <span>A664总线</span>
            </template>
            <el-menu-item index="/a664">
              <i class="iconfont icon-shujuwajue"></i>
              <span>数据监控</span>
            </el-menu-item>
            <el-menu-item index="/a664simulate">
              <i class="iconfont icon-lianjieliu"></i>
              <span>数据仿真</span>
            </el-menu-item>
            <el-menu-item index="/a664playback">
              <i class="iconfont icon-liujisuan"></i>
              <span>数据回放</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="1-4">
            <template slot="title">
              <i class="iconfont icon-zuzhiqunzu"></i>
              <span>1553B总线</span>
            </template>
            <el-menu-item index="/bus1553b">
              <i class="iconfont icon-guize"></i>
              <span>数据监控</span>
            </el-menu-item>
            <el-menu-item index="/bus1553bsimulate">
              <i class="iconfont icon-lianjieliu"></i>
              <span>数据仿真</span>
            </el-menu-item>
            <el-menu-item index="/bus1553bplayback">
              <i class="iconfont icon-liujisuan"></i>
              <span>数据回放</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="iscollapse" @click="setcollapse">
          <i class="el-icon-arrow-right" v-if="iscollapse"></i>
          <i class="el-icon-arrow-left" v-else></i>
        </div>
      </el-aside>
      <div class="rightContainer">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";
  export default {
    name: "Nav",
    data() {
      return {
        toTitle:true,
        defaultActive: "1-1",
        iscollapse: false,
        username: null,
        show: false
      };
    },
    methods: {
      handleOpen(){

      },
      handleClose(){

      },
      setcollapse() {
        this.iscollapse = !this.iscollapse;
        if (this.iscollapse) {
          $("#logo").css("width", "64px");
          $(".el-aside").css("width", "auto");
          $(".tohide").css("display", "none");
          this.toTitle = false
        } else {
          $("#logo").css("width", "auto");
          $(".el-aside").css("width", "202px");
          $(".tohide").css("display", "inline");
          this.toTitle = true
        }
      }
    },
    mounted() {},

  };
</script>

<style scoped>
  /* 侧边栏 */
  #index {
    display: flex;
    min-height: 100vh;
  }
  .el-aside {
    background: #2c3b41;

    /* position: relative; */
  }
  .el-menu-vertical {
    border-right: 0;
  }
  .el-submenu .el-menu-item {
     min-width: 150px;
   }
  /*.el-menu-vertical i {*/
    /*color: #fff !important;*/
    /*font-size: 14px !important;*/
  /*}*/
  .is-active {
    background: #1e282c !important;
    color: #fff !important;
    position: relative;
  }
  .is-active:before
  {
    content:" ";
    position: absolute;
    left: 0;
    background-color:#4f8ead;
    display: inline-block;
    height: 100%;
    width: 5px;
  }
  #logo {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    background: #2c3b41;
    color: #fff;
    overflow: hidden;
  }
  .tohide{
    width: 100%;
    height: 70px;
    line-height: 70px;
    font-size: 24px;
    margin: 0 auto;
  }
  .tohide i{
    font-size: 24px;
  }

  .iscollapse {
    background: #2c3b41;
    color: #fff;
    width: 100%;
    height: 50px;
    padding-top: 8px;
    text-align: center;
  }
  .el-aside .iscollapse i {
    font-size: 40px !important;
  }
  #index .rightContainer {
    overflow: auto;
    flex: 1;
    background: linear-gradient(to bottom, #2c3b41 7%,#2989d8 40%,#7db9e8 61%,#2c3b41 100%);
    /* display: flex;
    flex-direction: column; */
  }
</style>
