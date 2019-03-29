<template>
  <div>
    <div class="left">
      <div class="inner-left">
        <el-row :span="24" class="left-row">
          <el-col :span="10" :offset="2"><span class="blackFont">Bus Loading:</span></el-col>
          <el-col :span="4" :offset="2"><span class="blackFont">3.7</span></el-col>
        </el-row>
        <el-row :span="24" style="margin-top:5px">
          <el-col :span="10" :offset="2"><span class="blackFont">Msgs/Second:</span></el-col>
          <el-col :span="4" :offset="2"><span class="blackFont">0</span></el-col>
        </el-row>
        <el-row :span="24" style="margin-top:20px">
          <el-col :span="8" :offset="2"><span class="greenFont">Messages</span></el-col>
          <el-col :span="4" :offset="2"><span class="greenFont">461</span></el-col>
        </el-row>
        <el-row :span="12" class="left-row">
          <el-col :span="4" :offset="4"><span class="smallGreen">BC-RT</span></el-col>
          <el-col :span="2" :offset="2"><span class="smallGreen">430</span></el-col>
          <el-col :span="4" :offset="4"><span class="smallGreen">RT-BC</span></el-col>
          <el-col :span="2" :offset="2"><span class="smallGreen">13</span></el-col>
        </el-row>
        <el-row :span="24" style="margin-top:5px">
          <el-col :span="4" :offset="4"><span class="smallGreen">RT-RT</span></el-col>
          <el-col :span="2" :offset="2"><span class="smallGreen">18</span></el-col>
          <el-col :span="4" :offset="4"><span class="smallGreen">MODE</span></el-col>
          <el-col :span="2" :offset="2"><span class="smallGreen">18</span></el-col>
        </el-row>
        <el-row :span="24" style="margin-top:20px">
          <el-col :span="8" :offset="2"><span class="redFont">Error</span></el-col>
          <el-col :span="4" :offset="2"><span class="redFont">10</span></el-col>
        </el-row>
        <el-row :span="24" style="margin-top:5px">
          <el-col :span="8" :offset="4"><span class="smallRed">NO Response</span></el-col>
          <el-col :span="4" :offset="2"><span class="smallRed">5</span></el-col>
        </el-row>
        <el-row :span="24" style="margin-top:5px">
          <el-col :span="6" :offset="4"><span class="smallRed">Parity</span></el-col>
          <el-col :span="4" :offset="4"><span class="smallRed">5</span></el-col>
        </el-row>
        <el-row :span="24" style="margin-top:5px">
          <el-col :span="8" :offset="4"><span class="smallRed">Spurious data</span></el-col>
          <el-col :span="4" :offset="2"><span class="smallRed">0</span></el-col>
        </el-row>
      </div>
    </div>
    <div class="middle">
      <div id="MessageChart">

      </div>
    </div>
    <div class="middle">
      <div id="ErrorChart">

      </div>
    </div>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    name: "Bus1553BStatistic",
    data() {
      return {
        value1: 3.57,
        value2: 0
      }
    },
    computed:{
      startStatistics(){
        return store.state.startStatisticsCount
      }
    },
    watch:{
      startStatistics(curVal,oldVal){
        this.getData()
      }
    },
    methods: {
      getData(){
          this.drawMessageLine()
          this.drawErrorLine()
      },
      drawMessageLine() {
        var that = this;
        var echarts = require('echarts/lib/echarts.js')
        var temp = echarts.init(document.getElementById('MessageChart'));
        var PieOption = {
          title: {
            text: '数据类型统计',
            subtext: '总数：461',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 430, name: 'BC-RT'},
                {value: 18, name: 'RT-BC'},
                {value: 13, name: 'RT-RT'},
                {value: 18, name: 'MODE'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        temp.setOption(PieOption)
      },
      drawErrorLine() {
        var that = this;
        var echarts = require('echarts/lib/echarts.js')
        var temp1 = echarts.init(document.getElementById('ErrorChart'));
        var PieOption = {
          title: {
            text: '错误统计',
            subtext: '错误总数：10',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 5, name: 'NO Response'},
                {value: 5, name: 'Parity'},
                {value: 0, name: 'Spurious data'},

              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        temp1.setOption(PieOption)
      },
    },


  }
</script>

<style scoped>
  .left {
    width: 25%;
    height: 340px;
    /* background-color: lightblue; */
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .middle {
    float: left;
    width: 30%;
    height: 340px;
    margin-left: 5%;
    /* background-color: aquamarine; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right {
    float: left;
    width: 30%;
    height: 340px;
    margin-left: 5%;
    background-color: orangered
  }

  .inner-left {
    width: 80%;
    height: 300px;
    /* background-color: salmon */
  }

  .left-row {
    margin-top: 20px
  }

  .blackFont {
    font-size: 18px;
    font-weight: 500;
    color: black;
  }

  .greenFont {
    font-size: 18px;
    font-weight: 500;
    color: rgb(22, 190, 22);
  }

  .smallGreen {
    font-size: 14px;
    color: rgb(22, 190, 22);
  }

  .redFont {
    font-size: 18px;
    font-weight: 500;
    color: red;
  }

  .smallRed {
    font-size: 14px;
    color: red;
  }

  #MessageChart {
    width: 86%;
    height: 300px;
    background-color: white;
  }

  #ErrorChart {
    width: 86%;
    height: 300px;
  }
</style>
