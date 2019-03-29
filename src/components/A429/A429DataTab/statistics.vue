<template>
    <div>
      <div class="bottom-content">
        <div style="flex: 1" id="myChart">
        </div>
        <div style="flex: 1" id="err">
        </div>
      </div>
    </div>
</template>

<script>
  import store from '../../store'
    export default {
        name: "statistics",
        data(){
          return{
            count:{},
            errCount:{}
          }
        },
      computed:{
        startStatistics(){
          return store.state.StatisticsCount
        }
      },
      watch:{
        startStatistics(curVal,oldVal){
          var countObj = store.state.dataCountObj
          var errCountObj = store.state.errCountObj
          this.count = countObj
          this.errCount = errCountObj
          this.drawMychart()
          this.drawErr()

          console.log(countObj)
          console.log(errCountObj)
        }
      },
      methods:{
        drawErr(){
          var str = this.errCount
          var keys = []
          var key_values = []
        for(var k in str){
          keys.push(k)
          var t = {value:str[k], name:k}
          key_values.push(t)
        }
          var echarts=require('echarts/lib/echarts.js')
          var err=echarts.init(document.getElementById('err'));
          var option={
            title : {
              text: '错误统计',
              subtext: 'A429',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: keys
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:key_values,
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
          err.setOption(option)
        },
        drawMychart(){
          var str = this.count
          var keys = []
          var key_values = []
          for(var k in str){
            keys.push(k)
            var t = {value:str[k], name:k}
            key_values.push(t)
          }
          var echarts=require('echarts/lib/echarts.js')
          var myChart=echarts.init(document.getElementById('myChart'));
          // 指定图表的配置项和数据
          var option={
            title : {
              text: '接收数据统计',
              subtext: 'A429',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: keys
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:key_values,
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
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option)
        }
      }
    }
</script>

<style scoped>
  .bottom-content{
    display: flex;
    flex-direction: row;
    padding: 0 20px;

    /* background-color: lightgray; */
  }
  #myChart,#err{
    min-width: 300px;
    height: 400px;
    margin: 0 auto;
  }
</style>
