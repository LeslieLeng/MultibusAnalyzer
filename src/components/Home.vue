<template>
  <div id="home">
    <div class="map">
      <div class="slogan">
        <p class="slogan1">WHAT CAN WE DO</p>
        <p class="slogan2">我们能做什么</p>
      </div>
      <div class="img">
        <template>
          <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item style="border: 5px solid #fff;" v-for="(item,index) in dataPage" :key="index">
              <img class="bg" :src="item.bgImg" alt="">
              <h1 class="bgTitle">{{item.title}}</h1>
              <h2 class="bgTitle2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.title2}}</h2>
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
    </div>
    <div style="margin: 150px auto 100px">
      <p class="slogan1">MODULE</p>
      <p class="slogan2">模块</p>
    </div>
    <div class="cont">
      <router-link tag="div" to="/a429" class="lump" style="border: 5px solid #fff">
        <div class="describe" style="background: #fff">
          <h2 style="color: #0e7bcc">A429总线</h2>
        </div>
        <div style="background: #fff;height: 220px">
          <img src="../assets/home/429.jpg" alt="" style="height: 100%">
        </div>

      </router-link>
      <router-link tag="div" to="/a664" class="lump" style="border: 5px solid #fff">
        <div class="describe" style=" background: #fff">
          <h2 style="color: #0e7bcc">A664总线</h2>
        </div>
        <div style="background: #fff;height: 220px">
          <img src="../assets/home/664.jpg" alt="" style="height: 100%">
        </div>
      </router-link>
      <router-link tag="div" to="/bus1553b" class="lump" style="border: 5px solid #fff">
        <div class="describe" style=" background: #fff">
          <h2 style="color: #0e7bcc">1553B总线</h2>
        </div>
        <div style="background: #fff;height: 220px">
          <img src="../assets/home/1553b.jpg" alt="" style="height: 100%">
        </div>
      </router-link>
    </div>
    <div class="about">
      <div class="aboutCont">
        <div class="slogan">
          <p class="slogan1">ABOUT</p>
          <p class="slogan2">关于多总线分析仪</p>
        </div>
        <div class="aboutDetal">
          <div class="aboutRight">
            <div class="aboutText">
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;便携式多总线分析仪是由求本信息自主研发的基于WEB的多总线仿真监控软件和小型化硬件平台组成。小型化硬件平台主要是以便携式一体化测控机箱为基础，结合模块化总线仿真板卡构成。测控机箱主要提供控制器、电源模块以及散热装置。其中，控制器上运行多总线仿真监控软件，并提供对外通信接口。模块化总线仿真板卡实现FC、A429、1553B、A664接口协议，提供相应的总线收发通道，完成总线数据采集和仿真数据发送。多总线仿真监控软件依据相关总线协议实现总线数据仿真和数据监控功能。</p>
            </div>
          </div>
          <div class="aboutLeft">
            <div class="aboutImg"></div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        dataPage: [{
          bgImg: require('../assets/home/2.jpg'),
          title: '技术培训&咨询',
          title2: '公司的软件产品是为智能化测控应用服务，包括基础平台软件和应用软件。基础平台软件融合数据通信、信息网络等先进军民两用技术与传统自动化测控技术，为应用软件开发提供高性能服务，提升应用的通用性、开放性和智能化水平。'
        }, {
          bgImg: require('../assets/home/1.jpg'),
          title: "产品研发&销售",
          title2: '公司除了专注自有品牌的标准软硬件产品研发外，还承接电子通信与信息系统测试验证相关的集成业务，包括各类自动化测试系统集成、数字仿真系统集成以及综合射频激励系统集成等。'
        }, {
          bgImg: require('../assets/home/3.jpg'),
          title: '系统集成',
          title2: '公司本着“以客户需求为导向”的服务理念，将公司在智能测控领域里的优势技术和项目经验以技术培训和咨询服务的形式输出给客户，帮助客户解决在项目研制过程中遇到的相关技术问题。'

        }]
      }
    },
    name: 'Home',
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .aboutDetal{
    display: flex;
    flex-direction: row;
    margin: 40px auto 0;
    width: 80%;
    border-top: 2px solid #ccc;

  }
  .aboutLeft{
    margin-top: 23px;
    flex: 2;
  }
  .aboutLeft .aboutImg{
    margin: 0 auto;
    background: url("../assets/home/product.png");
    height: 250px;
    width: 250px;
    border: 5px solid #ccc;
    background-size: 100% 100%;

  }
  .aboutRight .aboutText{
    margin: 0 auto;
    padding: 30px;
    height: 220px;
    width: 500px;
    text-align: left;
    font-size:18px;
    font-weight: 500;
    color: #666;
    background: rgba(255, 255, 255, 0.5);
  }
  .aboutRight{
    margin-top: 20px;
    flex: 3;
  }
  .about{
    position: relative;
    background: url("../assets/home/about.png");
    background-size: 100% 100%;
    height: 500px;
    width: 80%;
    margin: 400px auto 0px;
  }
  .aboutCont{
    top:-300px;
    height: 400px;
    width: 100%;
    position: absolute;
  }
  .slogan1{
    font-weight: 500;
    font-size: 42px;
    line-height: 50px;
    color: #41a0f4;
  }
  .slogan2{
    margin-top: 15px;
    font-weight: 400;
    font-size: 26px;
    color: #666;
  }
  div, img {
    padding: 0;
    margin: 0;
  }
  .map{
    background: url("../assets/home/map.png");
    width: 80%;
    margin: -100px auto;
    height: 700px;
    padding-top:15% ;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
  }
  .bg {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .bgTitle {
    color: #fff;
    text-shadow: 3px 3px 2px #010101;
    position: absolute;
    top: 50px;
    left: 20px;
  }

  .bgTitle2 {
    color: #fff;
    width: 90%;
    text-align: left;
    line-height: 30px;
    font-size: 18px;
    text-shadow: 3px 3px 2px #010101;
    position: absolute;
    top: 120px;
    left: 20px;
  }

  .cont {
    display: flex;
    flex-direction: row;
    width: 1100px;
    margin: 40px auto;
  }

  .lump {
    flex: 1;
    width: 250px;
    overflow: hidden;
    cursor: pointer;
  }

  .lump + .lump {
    margin-left: 50px;

  }

  #home {
    min-width: 1100px;
    overflow: hidden;
    background: #F6F6F6;
  }

  .img {
    width:100% ;
    height: 350px;
    position: absolute;
    bottom: 100px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .describe {
    height: 50px;
    padding-top: 10px;
  }
  .cont .lump:hover{
    position: relative;
    left: 5px;
    top: 5px;
    box-shadow: 5px 5px 3px #ccc;
  }

</style>
