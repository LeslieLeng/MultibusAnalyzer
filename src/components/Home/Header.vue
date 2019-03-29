<template>
    <div id="header">
      <div class="logo">
        <img src="../../assets/home/logo-横板-简.png" alt=""  height="74">
      </div>
      <div class="title">
        <p><i>便携式多总线分析仪</i></p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
#header{
  width: 100%;
  height: 80px;
  overflow: hidden;
  background: linear-gradient(45deg, rgba(44,59,65,1) 0%, rgb(79, 142, 173) 31%, rgb(154, 233, 255) 100%);
  position: relative;
}
  .logo{
    width: 200px;
    position: absolute;
  }
  .title{
    height: 80px;
    line-height: 80px;
  }
  .title p{
      font-size: 46px;
      font-family:cursive;text-shadow:6px 3px 3px #333;
      color: #ffffff;
    }
</style>
