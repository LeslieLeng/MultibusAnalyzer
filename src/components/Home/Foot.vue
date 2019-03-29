<template>
    <div id="foot">
      <ul>
        <li><a href="http://qben-info.com/about.html">关于我们</a></li>
        <li>|</li>
        <li><a href="http://qben-info.com/job.html">加入我们</a></li>
        <li>|</li>
        <li><a href="http://qben-info.com/product.html">产品服务</a></li>
        <li>|</li>
        <li><a href="http://qben-info.com/contact.html">联系我们</a></li>
      </ul>
      <p>&copy; CopyRight 2018 求本信息</p>
    </div>
</template>

<script>
    export default {
        name: "Foot"
    }
</script>

<style scoped>
  #foot{
    padding-top: 40px;
    height: 100px;
    line-height: 40px;
    width: 100%;
    text-align: center;
    color: #fff;
    background: #2c3b41;
  }
  ul{
    list-style: none;
    width: 340px;
    overflow: hidden;
    margin: 0 auto;
  }
  li{
   float: left;
  margin-left: 5px;
  }
  li a{
    cursor: pointer;
    color: #fff;
    text-decoration: none;
  }
  li a:hover{
    text-decoration:underline;
  }
</style>
