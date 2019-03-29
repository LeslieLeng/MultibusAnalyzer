<template>
  <div style="padding: 20px;position: relative">
    <div class="time">
      <label>开始时间：</label>
      <div>{{startTime}}</div>
      <label>结束时间：</label>
      <div>{{stopTime}}</div>
    </div>
    <el-tabs style="height: 300px" type="border-card" tab-position="left">
      <el-tab-pane label="NETwork">
        <div class="NETwork">
          <div class="count">
            <div>
              <label>Data Rate(KB/S) :</label>
              <span>{{dataRate}}</span>
            </div>
            <div style="margin-top: 10px;">
              <label>Frame Rate(Hz) :</label>
              <span>{{frameRate}}</span>
            </div>
            <div style="margin-top: 10px;">
              <label>Frame Count</label>
              <div class="frame">
                <ul>
                  <li style="margin-top: 10px">
                    <label>64-byte:</label>
                    <span>{{frameCount.stage1}}</span>
                  </li>
                  <li>
                    <label>65 to 127:</label>
                    <span>{{frameCount.stage2}}</span>
                  </li>
                  <li>
                    <label>128 to 255:</label>
                    <span>{{frameCount.stage3}}</span>
                  </li>
                  <li>
                    <label>256 to 551:</label>
                    <span>{{frameCount.stage4}}</span>
                  </li>
                  <li>
                    <label>512 to 1023:</label>
                    <span>{{frameCount.stage5}}</span>
                  </li>
                  <li>
                    <label>1024:</label>
                    <span>{{frameCount.stage6}}</span>
                  </li>
                  <li style="margin-top: 15px">
                    <label style="font-weight: 700;">Total:</label>
                    <span style="font-weight: 700;">{{Total}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="graph">
            <div id="signal">
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="VL Activity">
        <div class="filter">
          <label>Filter VL ID:</label>
          <el-input style="width: 200px" v-model="search" placeholder="请输入VLID或Name!" size="small" clearable></el-input>
        </div>
        <div style="padding:5px 20px">
          <el-table :data="VLtableData"
                    height="230"
                    border
                    :header-cell-style="{background:'#74bbd5',color:'#fff'}"
                    :highlight-current-row=true style="width: 100%">
            <el-table-column prop="VLID" align="center" label="VLID" min-width="80">
              <template slot-scope="scope">
                <label>{{scope.row.VLID}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="VLName" align="center" label="Name" min-width="180">
              <template slot-scope="scope">
                <label>{{scope.row.VLName}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="MessageCount" label="Message Count(消息数量)" align="center" min-width="180">
              <template slot-scope="scope">
                <label>{{scope.row.MessageCount}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="AveragePeriod" label="Average Period" align="center" min-width="180">
              <template slot-scope="scope">
                <label>{{scope.row.AveragePeriod}}</label>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "DataStatistics",
    data() {
      return {
        startTime: '2019-01-18 14:42:48 453.432.200',
        stopTime: '2019-01-18 14:43:34 453.482.100',
        dataRate: '28.80',
        frameRate: '450.00',
        frameCount: {
          stage1: 234,
          stage2: 456,
          stage3: 128,
          stage4: 665,
          stage5: 125,
          stage6: 334,
        },
        VLtableData: [],
        search:''
      }
    },
    watch:{
      search(val,oldVal){
        this.searchVL(val)
      }
    },
    computed: {
      Total() {
        return this.frameCount.stage1 + this.frameCount.stage2 + this.frameCount.stage3 + this.frameCount.stage4 + this.frameCount.stage5 + this.frameCount.stage6
      }
    },

    mounted() {
      this.getVLtableData()
      this.drawSignal()
    },
    methods: {
      searchVL(val){
        this.getVLtableData()
        this.VLtableData=this.VLtableData.filter(item=>(~item.VLID.indexOf(val))||(~item.VLName.indexOf(val)))
      },
      getVLtableData(){
        this.VLtableData=[{
          VLID:'51520',
          VLName:'GPM L1 toGPM L2 Ch0',
          MessageCount:'4400',
          AveragePeriod:'20.00ms'
        },{
          VLID:'51524',
          VLName:'GPM L1 toGPM L2 Ch4',
          MessageCount:'2200',
          AveragePeriod:'39.00ms'
        },{
          VLID:'51534',
          VLName:'GPM L1 toGPM L3 Ch0',
          MessageCount:'4400',
          AveragePeriod:'20.00ms'
        },{
          VLID:'51540',
          VLName:'GPM L2 toGPM L3 Ch0',
          MessageCount:'2200',
          AveragePeriod:'39.00ms'
        },{
          VLID:'51544',
          VLName:'GPM L3 toGPM L2 Ch4',
          MessageCount:'4400',
          AveragePeriod:'20.00ms'
        }]
      },
      drawSignal() {
        var echarts = require('echarts/lib/echarts.js')
        var signal = echarts.init(document.getElementById('signal'));
        var option = {
          title: {
            text: 'Frame Count',
            subtext: '总数：' + this.Total,
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['64-Byte', '65-127', '128-255', '256-511', '512-1023', '1024']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                  funnel: {
                    x: '25%',
                    width: '50%',
                    funnelAlign: 'left',
                    max: 1548
                  }
                }
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: this.frameCount.stage1, name: '64-Byte'},
                {value: this.frameCount.stage2, name: '65-127'},
                {value: this.frameCount.stage3, name: '128-255'},
                {value: this.frameCount.stage4, name: '256-511'},
                {value: this.frameCount.stage5, name: '512-1023'},
                {value: this.frameCount.stage6, name: '1024'},
              ]
            }
          ]
        };

        signal.setOption(option)
      },
    }
  }
</script>

<style scoped>
  .NETwork {
    display: flex;
    flex-direction: row;
  }

  .count {
    flex: 1;
    padding: 0 30px;
  }

  .count div label {
    font-weight: 700;
  }

  .count div span {
    color: rgba(14, 123, 204, 0.77);
    font-weight: 700;
  }

  .graph {
    flex: 1;
  }

  .time {
    position: absolute;
    top: -35px;
    left: 280px;
  }

  .time div {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    background: #ccc;
    padding: 0 10px;
    box-shadow: 2px 2px 1px #666666 inset;
  }

  .time label {
    margin-left: 60px;
    font-weight: 700;
  }

  .frame {
    margin-top: 20px;
    padding-left: 10px;
    margin-left: 30px;
    height: 180px;
    width: 250px;
    border-radius: 10px;
    border: 1px solid #666;
  }

  .frame ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .frame li + li {
    margin-top: 5px;
  }

  .frame li label {
    display: inline-block;
    width: 180px;
    text-align: left;
    font-weight: 100;
    color: rgba(14, 123, 204, 0.77);
  }

  .frame li span {
    font-weight: 100;
    color: #67c23a;
  }

  #signal {
    width: 500px;
    height: 280px;
    margin: 0 auto;
  }

  .filter {
    margin-left: 50px;
  }

  .filter label {
    font-weight: 700;
    color: rgba(14, 123, 204, 0.77);
    margin-right: 30px;
  }
</style>
