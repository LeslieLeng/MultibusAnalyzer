<template>
  <div>
    <div style="text-align: right;margin:10px 10% 10px 0">
      <el-button :disabled="isOpen" type="success" size="small" @click="startMonitorOperation()"
                 style="font-size: 12px;margin-right: 20px" icon="iconfont icon-bofang ">
        开始
      </el-button>
      <el-button :disabled="!isOpen" @click="stopMonitorOperation()" type="danger" size="small"
                 style="font-size: 12px;margin-right: 20px"
                 icon="iconfont icon-bofangzanting">结束
      </el-button>
      <el-button type="warning" @click="clearData" size="small" icon="el-icon-delete">清空</el-button>
    </div>
    <div style="padding: 0 20px;">
      <el-table :data="tabledata"
                height="309"
                border
                @row-click="clickRow"
                :header-cell-style="{background:'#74bbd5',color:'#fff'}"
                :highlight-current-row=true style="width: 100%">
        <el-table-column align="center" prop="Channel" label="接收通道" width="80">
          <template slot-scope="scope">
            <label>{{scope.row.Channel}}</label>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Time" label="时间" width="220">
          <template slot-scope="scope">
            <label>{{scope.row.Time}}</label>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Label" label="标签" width="60">
          <template slot-scope="scope">
            <label>{{scope.row.Label}}</label>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Data2" label="数据（16进制）" width="130">
          <template slot-scope="scope">
            <label>{{scope.row.Data2}}</label>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Data1" label="数据（2进制）" min-width="150">
          <template slot-scope="scope">
            <label>{{scope.row.Data1}}</label>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Count" label="标签计数" width="150">
          <template slot-scope="scope">
            <label>{{scope.row.Count}}</label>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="ErrorCount" label="错误计数" width="150">
          <template slot-scope="scope">
            <label>{{scope.row.ErrorCount}}</label>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Cycle" label="周期" width="150">
          <template slot-scope="scope">
            <label>{{scope.row.Cycle}}</label>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="row">
      <label>总数：</label>
      <span style="margin-right: 20%">{{TotalCount}}</span>
      <label>错误：</label>
      <span style="margin-right: 20%">{{AllErrorCount}}</span>
      <label>错误率：</label>
      <span>{{ErrRate}}</span>
    </div>
  </div>
</template>

<script>
  import store from '../../store'
  import axios from 'axios'

  export default {
    name: "dataTable",
    data() {
      return {
        isOpen: false,
        AllErrorCount: 11104,
        TotalCount: 1,
        tabledata: [],
        socketFlag: '',
        countObj: {},
        errCountObj: {},
      }
    },
    mounted() {
      this.statistics()
      this.getText()
    },
    methods: {
      getText(){
        this.tabledata=[
          {
            Channel: '1',
            Time: '09:50:29.703 000',
            Label: '201',
            Data2: '00000080',
            Data1: '10000001000000000000000000001000',
            Count:'2776',
            ErrorCount:'0',
            Cycle:'100',
          },{
            Channel: '2',
            Time: '09:50:31.306 000',
            Label: '160',
            Data2: '00000F40',
            Data1: '01110000000000000000111101000000',
            Count:'2776',
            ErrorCount:'2776',
            Cycle:'100',
          },{
            Channel: '3',
            Time: '09:50:32.541 000',
            Label: '235',
            Data2: '0000BA72',
            Data1: '10011101000000001011101001110010',
            Count:'2776',
            ErrorCount:'5',
            Cycle:'100',
          },
          {
            Channel: '4',
            Time: '09:50:34.380 000',
            Label: '205',
            Data2: '00002B0C',
            Data1: '10000101000000000001010100001100',
            Count:'2776',
            ErrorCount:'0',
            Cycle:'100',
          }

        ]
      },
      statistics() {
        this.TotalCount = 0
        this.AllErrorCount = 0
        var len = this.tabledata.length;
        for (let i = 0; i < len; i++) {
          this.TotalCount += parseInt(this.tabledata[i].Count)
          this.AllErrorCount += parseInt(this.tabledata[i].ErrorCount)
        }
      },
      clickRow(row) {
        store.commit('SoundCode8', row.Data2)
        store.commit('SoundCode2', row.Data1)
        store.commit('MessageData', row.Data3)
        store.commit('scLabel', row.Label)
        store.commit('scChannel', row.Channel)
        store.commit('WarningState', row.Warning)
        store.commit('ErrorState', row.Error)
      },

      // 开启接收通道
      startMonitorOperation() {
        var channel = JSON.parse(sessionStorage.getItem("MonitorChannel"))
        if (channel == null || channel == '') {
          alert('请选择接收通道！')
          return false
        }
        var item = {
          Option: 'start',
          Channel: channel,
          BusType: 'A429',
          ClientId:sessionStorage.getItem('ClientId')
        }
        var obj = JSON.stringify(item)
        this.startWebsocket()
        this.sendWebsocket(obj)
        this.echoWebsocket()
        store.commit('Command', 'open')
        this.isOpen = true
      },
      // 关闭接收通道
      stopMonitorOperation() {
        var item = {
          Option: 'stop',
          BusType: 'A429'
        }
        var obj = JSON.stringify(item)
        var len = JSON.parse(sessionStorage.getItem("MonitorChannel"))
        var lens = len.length
        try {
          for (let i = 0; i < lens; i++) {
            this.socketFlag.send(obj)
          }
        } catch (e) {

        }
        this.socketFlag = ''
        store.commit('Command', 'close')
        this.isOpen = false
      },
      // 开启websocket
      startWebsocket: function () {
        this.tabledata = []
        let channel = JSON.parse(sessionStorage.getItem('MonitorChannel'))
        for (let i = 0; i < channel.length; i++) {
          var k = channel[i].split('_')[1]
          this.countObj[k] = 0
          this.errCountObj[k] = 0
        }
        let that = this
        if (that.socketFlag) {
          that.socketFlag.close()
        }
        /*创建socket连接*/
        var socket = new WebSocket("ws://" + '172.16.3.158:8000' + "/busMonitor");
        if (socket.readyState == WebSocket.OPEN) socket.onopen();
        that.socketFlag = socket;
      },
      sendWebsocket: function (Obj) {
        let that = this
        that.socketFlag.onopen = function () {
          console.log('WebSocket open');//成功连接上Websocket
          that.socketFlag.send(Obj);
        };
      },
      echoWebsocket: function () {
        var _this = this;
        _this.socketFlag.onmessage = function (e) {
          // console.log(e.data)
          var jsondata = JSON.parse(e.data)
          _this.warningDetection(jsondata)
        };
      },
      // 异常检测
      warningDetection(jsondata) {
        var condition = store.state.warningData
        var relationship = store.state.warningRelationship
        var label = store.state.warningLabel
        if (jsondata[0].Label == label) {
          var data = parseInt(jsondata[0].Data3)
          // console.log(data)
          var warning = [];
          for (let i = 0; i < condition.length; i++) {
            var val = condition[i].conditionData
            switch(condition[i].condition){
              case ">":
                if (data > val) {warning.push(1)} else {warning.push(0)}
                break;
              case "<":
                if (data < val) {warning.push(1)} else {warning.push(0)}
                break;
              case ">=":
                if (data >= val) {warning.push(1)} else {warning.push(0)}
                break;
              case "<=":
                if (data <= val) {warning.push(1)} else {warning.push(0)}
                break;
              case "==":
                if (data == val) {warning.push(1)} else {warning.push(0)}
                break;
              case "!=":
                if (data != val) {warning.push(1)} else {warning.push(0)}
                break;
            }
          }
          // console.log(warning)
          if (relationship == "&&") {
            if (warning.indexOf(0) == -1) {
              jsondata[0].Warning = 1
            }
          } else if (relationship == "||") {
            if (warning.indexOf(1) == -1) {
              jsondata[0].Warning = 1
            }
          }
        }
        // console.log(jsondata)
        this.fifterData(jsondata)
      },
      // 过滤数据
      fifterData(jsondata) {
        var _this = this;
        // console.log(jsondata)
        var channelNode = store.state.channelNode
        var labelNode = store.state.labelNode
        var sdiNode = store.state.sdiNode
        if (channelNode.indexOf(jsondata[0].Channel) != -1) {

        } else if (labelNode.indexOf(jsondata[0].Channel + '$' + jsondata[0].Label) != -1) {

        } else if (sdiNode.indexOf(jsondata[0].Channel + '$' + jsondata[0].Label + '$' + jsondata[0].SDI) != -1) {

        } else {
          var flag = ''
          for (let i = 0; i < jsondata.length; i++) {
            flag = false
            for (let j = 0; j < _this.tabledata.length; j++) {
              if (_this.tabledata[j].Channel == jsondata[i].Channel) {
                var c = _this.tabledata[j].Channel
                _this.tabledata[j].Time = jsondata[i].Time
                _this.tabledata[j].Label = jsondata[i].Label
                _this.tabledata[j].Data2 = jsondata[i].Data2
                _this.tabledata[j].Data1 = jsondata[i].Data1
                _this.tabledata[j].Data3 = jsondata[i].Data3
                _this.countObj[c] += 1
                _this.tabledata[j].Count = _this.countObj[c]
                if (jsondata[i].Error == 1) {
                  _this.errCountObj[c] += 1
                  _this.tabledata[j].ErrorCount = _this.errCountObj[c]
                }
                _this.tabledata[j].ErrorCount = 0
                _this.tabledata[j].Cycle = jsondata[i].Cycle
                _this.tabledata[j].Warning = jsondata[i].Warning
                _this.tabledata[j].Error = jsondata[i].Error
                flag = true
              }
            }
            if (!flag) {
              _this.tabledata.push(jsondata[i])
            }
          }
          _this.statistics()
        }
      },
      // 清空数据
      clearData() {
        this.tabledata = []
        store.commit('Command', 'clear')
      },
      // 获取数据
      getData(ajaxData) {
        let that = this
        var flag = '';
      }
    },
    watch: {
      Statistics(curVal, oldVal) {
        store.commit('getErrCount', this.errCountObj)
        store.commit('getDataCount', this.countObj)
      },
      // 操作页面的控制
      Command(curVal, oldVal) {
        if (curVal == 'open') {
          this.startMonitorOperation()
        } else if (curVal == 'close') {
          this.stopMonitorOperation()
        } else if (curVal == 'clear') {
          this.clearData()
        }
      }
    },
    computed: {
      Statistics() {
        return store.state.StatisticsCount
      },
      Command() {
        return store.state.controlCommand;
      },
      ErrRate() {
        let rate = 0.0;
        if(this.TotalCount!=0){
          rate = (this.AllErrorCount / this.TotalCount) * 100;
        }

        return rate.toFixed(2) + '%';
      },
    }
  }
</script>

<style scoped>
  .row {
    margin-top: 35px;
    margin-left: 100px;
    font-size: 18px;
    text-align: left;
  }
</style>
