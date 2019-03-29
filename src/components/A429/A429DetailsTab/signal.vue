<template>
    <div>
      <div style="margin-bottom: 10px">
        <label>通道：</label>
        <el-select v-model="Channel" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.Channel"
            :label="item.label"
            :value="item.Channel">
          </el-option>
        </el-select>
        <el-button size="small" type="success">开启</el-button>
        <el-button size="small" type="danger">关闭</el-button>
      </div>
      <div id="signal">
      </div>
    </div>
</template>

<script>
    export default {
        name: "signal",
      data(){
        return{
          options: [{
            Channel: 'channel_1',
            label: '通道一'
          }, {
            Channel: 'channel_2',
            label: '通道二'
          }, {
            Channel: 'channel_3',
            label: '通道三'
          }, {
            Channel: 'channel_4',
            label: '通道四'
          }],
          // 配置选项
          Channel:'',
        }
      },
      mounted(){
        this.drawSignal()
      },
      methods:{
        drawSignal(){
          var echarts=require('echarts/lib/echarts.js')
          var signal=echarts.init(document.getElementById('signal'));
          var option={
            backgroundColor: '#FBFBFB',
            tooltip : {
              trigger: 'axis'
            },
            legend: {
              data:['数据',]
            },
            calculable : true,
            xAxis : [
              {
                axisLabel:{
                  rotate: 30,
                  interval:0
                },
                axisLine:{
                  lineStyle :{
                    color: '#CECECE'
                  }
                },
                type : 'category',
                boundaryGap : false,
                data : function (){
                  var list = [];
                  for (var i = 1; i <= 50; i++) {
                      list.push(1 + 'ms');
                  }
                  return list;
                }()
              }
            ],
            yAxis : [
              {
                type : 'value',
                axisLine:{
                  lineStyle :{
                    color: '#CECECE'
                  }
                }
              }
            ],
            series : [
              {
                name:'数据',
                type:'line',
                symbol:'none',
                smooth: 0.2,
                color:['#66AEDE'],
                data:[0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,1,]
              },
            ]
          }
          signal.setOption(option)
        },
      }
    }
</script>

<style scoped>
  #signal{
    height: 300px;
    width: 1200px;
    min-width: 900px;
    margin: 0 auto;
  }
</style>
