<template>
  <div style="padding:30px">
    <!-----------------------------------数据列表----------------------------------->
    <div class="monitor_top">
      <div class="right-nav">
        <button @click="handleTab(0)">数据</button>
        <button @click="handleTab(1)">统计</button>
      </div>
      <div v-show="tabs === 0">
        <div>
          <div class="RxData">
            <el-button :disabled="isStart" @click="startMonitor()" type="success" size="small"
                       style="font-size: 12px;margin-right: 20px" icon="iconfont icon-bofang ">开始
            </el-button>
            <el-button :disabled="!isStart" @click="stopMonitor()" type="danger" size="small"
                       style="font-size: 12px;margin-right: 20px" icon="iconfont icon-bofangzanting">结束
            </el-button>
            <el-button type="warning" @click="clearMonitor()" style="margin-right: 30px" size="small"
                       icon="el-icon-delete">清空
            </el-button>
            <el-popover placement="bottom-end" width="300" v-model="saveData">
              <h3 style="margin-bottom: 20px">请输入文件名</h3>
              <label>文件名：</label>
              <el-input style="width: 200px" v-model="fileName" size="small" placeholder="请输入文件名" clearable></el-input>
              <div style="text-align: right; margin: 20px">
                <el-button size="mini" type="text" @click="saveData = false">取消</el-button>
                <el-button type="primary" size="mini" @click="saveData = false">保存</el-button>
              </div>
              <el-button type="primary" :disabled="isSave" size="small" icon="el-icon-upload" slot="reference">储存
              </el-button>
            </el-popover>
          </div>
          <!---------------------------------监听数据列表----------------------------------->
          <div style="padding:25px">
            <el-table :data="tableData"
                      id="table"
                      height="275"
                      border
                      @row-click="clickRow"
                      :header-cell-style="{background:'#74bbd5',color:'#fff'}"
                      :highlight-current-row=true style="width: 100%">
              <el-table-column align="center" prop="Index" label="序号" width="80">
                <template slot-scope="scope">
                  <label>{{scope.row.Index}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="Timestamp" label="时间" width="180">
                <template slot-scope="scope">
                  <label>{{scope.row.Timestamp}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="SrcMAC" label="源MAC" min-width="180">
                <template slot-scope="scope">
                  <label>{{scope.row.SrcMAC}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="SrcPort" label="源地址端口" min-width="180">
                <template slot-scope="scope">
                  <label>{{scope.row.SrcPort}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="DstMAC" label="目的MAC" min-width="180">
                <template slot-scope="scope">
                  <label>{{scope.row.DstMAC}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="DstPort" label="目的地址端口" min-width="180">
                <template slot-scope="scope">
                  <label>{{scope.row.DstPort}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="ViltualLink" label="虚拟链路">
                <template slot-scope="scope">
                  <label>{{scope.row.ViltualLink}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="TeleLength" label="报文长度">
                <template slot-scope="scope">
                  <label>{{scope.row.TeleLength}}</label>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </div>
      </div>
      <div v-show="tabs === 1">
        <data-statistics></data-statistics>
      </div>
      <router-link class="config" tag="div" to="/a664config">
        <el-button style="width: 100px" type="primary">设置</el-button>
      </router-link>
    </div>
    <!-----------------------------------数据详情----------------------------------->
    <div class="monitor_bottom">
      <div class="left">
        <h2>原始数据</h2>
        <div class="leftContainer">
          <ul>
            <li class="title" style="width: 60px">#</li>
            <li class="title">0</li>
            <li class="title">1</li>
            <li class="title">2</li>
            <li class="title">3</li>
            <li class="title">4</li>
            <li class="title">5</li>
            <li class="title">6</li>
            <li class="title">7</li>
            <li class="title">8</li>
            <li class="title">9</li>
            <li class="title">A</li>
            <li class="title">B</li>
            <li class="title">C</li>
            <li class="title">D</li>
            <li class="title">E</li>
            <li class="title">F</li>
          </ul>
          <ul v-for="column in dataCoulmn">
            <li class="title" style="width: 60px">{{column.title}}</li>
            <li v-for=" row in (column.dataRow)">
              <span>
                {{row}}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <h2>AFDX帧</h2>
        <div class="rightContainer">
          <el-tree class="treeStyle" :expand-on-click-node="false" :data="AFDXTreeData"
                   @node-click="handleNodeClick"></el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DataStatistics from "./DataStatistics";
  import $ from "jquery";
  import store from '../store'
  import axios from 'axios'

  export default {
    name: "A664Monitor",
    components: {
      'data-statistics': DataStatistics,
    },
    data() {
      return {
        tabs: 0,
        saveData: false,
        fileName: '',
        isSave: true,
        isStart: false,
        tableData: [],
        dataCoulmn: [],
        AFDXTreeData: [],
        socketFlag: '',
        cont: 0,
        time: '',
        rowIndex: ''
      }
    },
    mounted() {
      // this.getTableData()
      this.getScroll()
    },
    watch: {
      tableData(cul) {
        if (this.isSave == true && cul.length < 200) {
          this.goToBottom()
        }
        if (cul.length > 200) {
          this.tableData.shift()
        }
      }
    },
    methods: {
      // 滚动条去到底部
      goToBottom() {
        this.$nextTick(() => {
          var container = $('table:eq(1)').parent()
          var height = $('table:eq(1)').height()
          container.scrollTop(height - 50)
        })
      },
      goToCenter() {
        this.$nextTick(() => {
          var container = $('table:eq(1)').parent()
          var height = $('table:eq(1)').height()
          container.scrollTop((height / 2) + 50)
        })
      },
      getScroll() {
        let that = this
        var div = $('table:eq(1)').parent()
        var tab = $('table:eq(1)')
        div.scroll(function () {
          if (that.isSave == true) {
            return false
          } else {
            if (that.tableData.length < 200) {
              return false
            } else {
              var scroT = div.scrollTop()
              var scroH = tab.height()
              if (scroT == 0) {
                that.addTop()
              }
              if ((scroT + div.height()) == scroH) {
                that.addDown()
              }
            }
          }
        })
      },
      addTop() {
        var that = this
        var index = that.tableData[0].Index
        for (let i = 0; i < 100; i++) {
          that.tableData.unshift({Index: parseInt(index) - parseInt(i + 1)})
          that.tableData.pop()
        }
        this.goToCenter()
      },
      addDown() {
        var that = this
        var index = this.tableData[199].Index
        for (let i = 0; i < 100; i++) {
          that.tableData.push({Index: parseInt(i + 1) + parseInt(index)})
          that.tableData.shift()
        }
        this.goToCenter()
      },

      getTableData() {
        this.tableData.push({
          Index: this.cont,
          Timestamp: new Date().toLocaleTimeString() + ' ' + new Date().getMilliseconds(),
          SrcMAC: '00-50-BA-CE-07-0C',
          SrcPort: '123.4.38.94:27795',
          DstMAC: '00-50-BA-B7-21-43',
          DstPort: '33.215.77.177:48881',
          ViltualLink: Math.floor(Math.random() * 10000),
          TeleLength: Math.floor(Math.random() * 10000),
        })
        this.cont++
      },

      handleTab(v) {
        var tabs = $('.right-nav').children()
        for (let i = 0; i < tabs.length; i++) {
          tabs[i].style.background = "#9ae9ff"
        }
        tabs[v].style.background = "#eedfd0"
        this.tabs = v
      },
      //获取接收通道
      // getChannelNum() {
      //   axios.post('/getChannelConfig', {
      //     clientId: sessionStorage.getItem('ClientId'),
      //     BusType: 'A664'
      //   }).then((result) => {
      //     console.log(result)
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      // },
      /*------------------------数据列表------------------------*/
      // 开启websocket
      startWebsocket: function () {
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
          console.log(e.data)
          var jsondata = JSON.parse(e.data)

        };
      },
      startMonitor() {
        console.log('开始监听')
        this.time = setInterval(this.getTableData, 1);
        this.isStart = true
        this.isSave = true
        // var item = {
        //   Option: 'start',
        //   BusType: 'A664',
        // }
        // var obj = JSON.stringify(item)
        // this.startWebsocket()
        // this.sendWebsocket(obj)
        // this.echoWebsocket()
      },
      stopMonitor() {
        console.log('停止监听')
        clearInterval(this.time)
        // var item = {
        //   Option: 'stop',
        //   BusType: 'A664'
        // }
        // var obj = JSON.stringify(item)
        // try {
        //   for (let i = 0; i < 2; i++) {
        //     this.socketFlag.send(obj)
        //   }
        // } catch (e) {
        // }
        // this.socketFlag = ''
        this.isStart = false
        this.isSave = false
      },
      clearMonitor() {
        console.log('清空数据')
        this.isSave = true
        this.tableData = []
      },
      clickRow(row) {
        this.rowIndex = row.Index
        this.getOriginalData()
        this.getTreeData()

        var OriginalData= '12-f3-1c-54-5f-c6-ba-c6-44-85-42-49-ff-00-13-12-f1-' +
        '32-13-12-31-23-21-31-2a-bc-84-8a-54-c6-5d-6e-31-c5-45-fc-6b-ac-64-48-54-24-9f-f0-01-03-ba-c6-44-85-42' +
        '-49-ff-00-13'
        this.originalData = OriginalData.split('-')
        this.getTextOriginalData()
      },
      /*------------------------数据详情------------------------*/
      // 请求原始数据
      getOriginalData() {
        console.log(this.rowIndex)
        axios.post('/parseAFDX', {
          BusType: 'A664',
          Types: 'Monitor',
          Index: this.rowIndex

        }).then((res) => {
          var data = res.data.OriginalData
          this.AFDXTreeData = res.data.AFDXFrame
          var column = []
          for (let i = 0; i < data.length; i += 16) {
            var num = i.toString(16)
            var dlen = num.length
            while (dlen < 4) {
              num = "0" + num;
              dlen++;
            }
            var row = data.slice(i, i + 16)
            var obj = {title: '0x' + num, dataRow: row}
            column.push(obj)
          }
          this.dataCoulmn = column
        }).catch((err) => {
          console.log(err)
        })


      },
      // 请求帧结构
      handleNodeClick(data) {
        console.log(data);
      },
      getTreeData(){
        this.AFDXTreeData=[{
          label:'Frame 3685,103bytes',
          children:[{
            label:'Timestamp:880.035.55.940',
          },{
            label:'Time delta from previous frame: 0.001.489.880',
          },{
            label:'Time delta from the first frame: 26.195.400.480',
          },{
            label:'Frame Index :3685',
          }]
        },{
          label:' II,SEQ:61',
          children:[{
            label:'Timestamp:880.035.55.940',
          },{
            label:'Time delta from previous frame: 0.001.489.880',
          },{
            label:'Time delta from the first frame: 26.195.400.480',
          },{
            label:'Frame Index :3685',
          }]
        },{
          label:'MAC,Virtual Link ID: 1001',
          children:[{
            label:'Timestamp:880.035.55.940',
          },{
            label:'Time delta from previous frame: 0.001.489.880',
          },{
            label:'Time delta from the first frame: 26.195.400.480',
          },{
            label:'Frame Index :3685',
          }]
        }]
      },
      getTextOriginalData() {
        var data = this.originalData
        var column = []
        for(let i =0;i<data.length;i+=16){
          var num = i.toString(16)
          var dlen = num.length
          while (dlen < 4) {num = "0" + num;dlen++;}
          var row = data.slice(i,i+16)
          var obj = {title:'0x'+num, dataRow:row}
          column.push(obj)
        }
        this.dataCoulmn  = column
      },

    }
  }
</script>

<style scoped>
  /*树*/
  .treeStyle {
    background: transparent;
  }

  /*数据详情*/
  .title {
    color: #666;
    font-weight: 700;
  }

  .leftContainer ul {
    text-align: center;
    height: 40px;
    line-height: 40px;
    min-width: 640px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .leftContainer li {
    width: 36px;
    float: left;
  }

  .leftContainer li span {
    text-align: center;
    color: rgba(14, 123, 204, 0.77);
  }

  .rightContainer, .leftContainer {
    padding: 20px;
    margin-top: 10px;
    height: 260px;
    background: #fff;
    overflow-y: auto;
    box-shadow: inset 3px 3px 5px 3px rgba(101, 118, 122, 0.7);
  }

  .monitor_bottom h2 {
    color: rgba(14, 123, 204, 0.77);
  }

  .left, .right {
    padding: 10px 20px;
    flex: 1;
    background: #bdd7ee;
    border-radius: 5px;
  }

  .left {
    margin-right: 20px;
  }

  /*数据类别*/
  .right-nav {
    width: 280px;
    background: #29c2ff;
    height: 60px;
    border-bottom-right-radius: 60px;
    text-align: left;
    padding-left: 10px;
  }

  .RxData {
    text-align: right;
    margin: 10px 10% 10px 0;
    position: absolute;
    top: 15px;
    right: 0;
  }

  .config {
    position: absolute;
    right: 40px;
    top: -80px
  }

  .right-nav button {
    width: 100px;
    height: 40px;
    margin-top: 10px;
    border-radius: 5px;
  }

  .right-nav button:first-child {
    background-color: #eedfd0;
  }

  .right-nav button + button {
    background: #9ae9ff;
    margin-left: 10px;
  }

  .monitor_top {
    background: #fff;
    height: 400px;
    box-shadow: 5px 5px 3px #666;
    text-align: left;
    position: relative;
  }

  .monitor_bottom {
    margin-top: 30px;
    background: #fff;
    height: 370px;
    box-shadow: 5px 5px 3px #666;
    text-align: left;
    display: flex;
    padding: 20px;
  }
</style>
