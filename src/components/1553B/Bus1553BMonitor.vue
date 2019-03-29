<template>
  <div style="padding:30px">
    <div class="monitor_top">
      <div class="right-nav">
        <button @click="handleTab(0)">数据</button>
        <button @click="handleTab(1)">过滤</button>
        <button @click="handleTab(2)">统计</button>
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
              <el-table-column align="center" type="index" label="Id" width="60">
              </el-table-column>
              <el-table-column align="center" prop="Network" label="Network" min-width="220">
              <template slot-scope="scope">
              <label>{{scope.row.Network}}</label>
              </template>
              </el-table-column>
              <el-table-column align="center" prop="RxOrTx" label="Rx/Tx" min-width="220">
              <template slot-scope="scope">
                <label>{{scope.row.RxOrTx}}</label>
              </template>
            </el-table-column>
              <el-table-column align="center" prop="Remote" label="终端" min-width="220">
                <template slot-scope="scope">
                  <label>{{scope.row.Remote}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="SubAddr" label="子地址" min-width="220">
                <template slot-scope="scope">
                  <label>{{scope.row.SubAddr}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="Cycle" label="周期" min-width="220">
                <template slot-scope="scope">
                  <label>{{scope.row.Cycle}}</label>
                </template>
              </el-table-column>
              <!--<el-table-column align="center" prop="Type" label="Type" width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<label>{{scope.row.Type}}</label>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column align="center" prop="RxRt" label="Rx Rt" width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<label>{{scope.row.RxRt}}</label>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column align="center" prop="TxRt" label="Tx Rt" width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<label>{{scope.row.TxRt}}</label>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column align="center" prop="RxSubRt" label="Rx SubRt" width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<label>{{scope.row.RxSubRt}}</label>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column align="center" prop="TxSubRt" label="Tx SubRt" width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<label>{{scope.row.TxSubRt}}</label>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column align="center" prop="CmdWord1" label="Cmd Word 1" width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<label>{{scope.row.CmdWord1}}</label>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column align="center" prop="CmdWord2" label="Cmd Word 2" width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<label>{{scope.row.CmdWord2}}</label>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column align="center" prop="RxStatus" label="Rx Status" width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<label>{{scope.row.RxStatus}}</label>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column align="center" prop="TxStatus" label="Tx Status" width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<label>{{scope.row.TxStatus}}</label>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column align="center" prop="RxResponseTime" label="Rx Response Time" width="150">-->
                <!--<template slot-scope="scope">-->
                  <!--<label>{{scope.row.RxResponseTime}}</label>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column align="center" prop="TxResponseTime" label="Tx Response Time" width="150">-->
                <!--<template slot-scope="scope">-->
                  <!--<label>{{scope.row.TxResponseTime}}</label>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column align="center" prop="WordCount" label="Word Count" width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<label>{{scope.row.WordCount}}</label>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column align="center" prop="Error" label="Error" width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<label>{{scope.row.Error}}</label>-->
                <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
          </div>

        </div>
      </div>
      <div v-show="tabs === 1">
        <data-filtration></data-filtration>
      </div>
      <div v-show="tabs === 2">
        <data-statistics></data-statistics>
      </div>
    </div>
    <div class="monitor_bottom">
      <el-tabs type="border-card" @tab-click="tabsclick">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-news"></i>消息</span>
          <div style="display: flex;flex-direction: row">
            <div class="right">
              <h2>Data</h2>
              <div style="display: flex;flex-direction: row">
                <div class="cmdWord">
                  <table class=" attribute">
                    <tr v-for="arr in attribute">
                      <td class="key">{{arr.key}}</td>
                      <td class="val">{{arr.val}}</td>
                    </tr>
                  </table>
                </div>
                <div class="buffer">
                  <h4 style="color: #337ad8;">Time: &nbsp; &nbsp;11:15:20  950.000.000</h4>
                  <div class="bufferData">
                    <ul>
                      <li class="title" style="width: 50px">#</li>
                      <li class="title">1</li>
                      <li class="title">2</li>
                      <li class="title">3</li>
                      <li class="title">4</li>
                      <li class="title">5</li>
                      <li class="title">6</li>
                      <li class="title">7</li>
                      <li class="title">8</li>
                    </ul>
                    <ul v-for="column in dataCoulmn">
                      <li class="title" style="width: 50px">{{column.title}}</li>
                      <li v-for=" row in (column.dataRow)">
                        <span>{{row}}</span>
                      </li>
                    </ul>
                  </div>
                  <h4 style="color: #ff6a5b">{{dataError1}}</h4>
                  <h4 style="color: #ff6a5b">{{dataError2}}</h4>
                </div>
              </div>
            </div>
            <div class="left">
              <h2>word list</h2>
              <div class="wordTable">
                <el-table :data="wordTable"
                          height="259"
                          border
                          :header-cell-style="{background:'#74bbd5',color:'#fff',height:'30px'}"
                          :highlight-current-row=true
                          style="width: 100%">
                  <el-table-column align="center" type="index" label="Id" width="50">
                  </el-table-column>
                  <el-table-column align="center" prop="TimeTag" label="Time Tag" min-width="150">
                    <template slot-scope="scope">
                      <label>{{scope.row.TimeTag}}</label>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="Type" label="Type" min-width="80">
                    <template slot-scope="scope">
                      <label>{{scope.row.Type}}</label>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="WordData" label="Data" min-width="80">
                    <template slot-scope="scope">
                      <label>{{scope.row.WordData}}</label>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="WordError" label="Error" min-width="100">
                    <template slot-scope="scope">
                      <label>{{scope.row.WordError}}</label>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-bell"></i>快照</span>
          <details-snapshoot></details-snapshoot>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import DataStatistics from './monitor/Bus1553BStatistic'
  import DataFiltration from './monitor/Bus1553BFiftration'
  import Snapshoot from './monitor/Bus1553BSnapshoot'
  import $ from "jquery";
  import axios from 'axios'
  import store from '../store'

  export default {
    name: "Bus1553BMonitor",
    data() {
      return {
        // 数据列表
        tabs: 0,
        fileName: '',
        isSave: true,
        isStart: false,
        saveData: false,
        tableData: [],
        // word
        wordTable: [],
        attribute: [],
        //data
        dataCoulmn: [],
        socketFlag: '',
        dataError1:'',
        dataError2:'',
      }
    },
    components: {
      'data-statistics': DataStatistics,
      'data-filtration': DataFiltration,
      'details-snapshoot': Snapshoot,
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.tableData = [{
          Network: 'BusA',
          RxOrTx:'发送',
          Remote:'RT 03',
          SubAddr:'Sub 07',
          Cycle:'65Hz'
        }]
      },
      getDataList() {
        var data = ['0000','0000','0000','0000','0000','0000','0000',]
        var column = []
        for (let i = 0; i < data.length; i += 8) {
          var row = data.slice(i, i + 8)
          var obj = {title:i+1, dataRow: row}
          column.push(obj)
        }
        this.dataError1='No Rsponse'
        this.dataError2='Parity Error'
        this.dataCoulmn = column
      },
      getWordTable() {
        this.wordTable = [{TimeTag: '6s 769us'},
          {Type: '命令字', WordData: '6820'},
          {Type: '数据字', WordData: '0000'},
          {Type: '数据字', WordData: '0000'},
          {Type: '数据字', WordData: '0000'},
          {Type: '数据字', WordData: '0000'},
          {Type: '数据字', WordData: '0000'},
          {Type: '数据字', WordData: '0000'},
          {Type: '数据字', WordData: '0000'},
          {Type: '状态字', WordData: '6800'},
          {TimeTag: '6s 769us'},
        ]
      },
      getAttributes() {
        this.attribute = [{
          key: 'Message Type',
          val: 'RT-RT',
        }, {
          key: 'Command Word 1',
          val: '1826',
        }, {
          key: 'Command Word 2',
          val: '0C26',
        }, {
          key: 'Rx Status Word',
          val: '1800',
        }, {
          key: 'Tx Status Word',
          val: '0800',
        }]
      },
      // 数据列表
      handleTab(v) {
        var tabs = $('.right-nav').children()
        for (let i = 0; i < tabs.length; i++) {
          tabs[i].style.background = "#9ae9ff"
        }
        tabs[v].style.background = "#eedfd0"
        this.tabs = v
        if(v==2){
          store.commit('StartStatistics')
        }
      },
      tabsclick(tab, event) {
        if (tab.index == '1') {
          store.commit('Bus1553BSnapShoot')
        }
      },

      /*--------------------------开启websocket--------------------------------*/
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
          console.log(jsondata)

        };
      },
      // 开始监听
      startMonitor() {
        this.isStart = true
        this.isSave = true
        // var item = {
        //   Option: 'start',
        //   BusType: '1553B',
        // }
        // var obj = JSON.stringify(item)
        // this.startWebsocket()
        // this.sendWebsocket(obj)
        // this.echoWebsocket()
      },
      //停止监听
      stopMonitor() {
        console.log('停止监听')
        this.isStart = false
        this.isSave = false
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
      },
      clearMonitor() {
        console.log('清空数据')
        this.isSave = true
      },
      clickRow(row) {
        this.getAttributes()
        this.getWordTable()
        this.getDataList()
        console.log(row)
      }
    }
  }
</script>
<style>
  .left .el-table th {
    padding: 5px 0;
  }

  .left .el-table td {
    padding: 5px 0;
  }
</style>
<style scoped>
  /*BUFFER*/
  .bufferData ul {
    text-align: center;
    height: 40px;
    line-height: 40px;
    list-style: none;
    min-width: 400px;
    padding: 0;
    margin: 0;
  }
  .title {
    color: #666;
    font-weight: 700;
  }
  .bufferData li {
    width: 36px;
    float: left;
  }
  .bufferData li+li{
    margin-right: 5px;
  }
  .bufferData li span {
    text-align: center;
    color: #5acc6b;
  }
  .buffer h4{
    margin-top: 10px;
  }
  /*属性*/
  .attribute tr {
    height: 30px;
  }

  .attribute .key {
    width: 180px;
    text-align: left;
    font-weight: 700;
  }

  .attribute .val {
    width: 50px;
    text-align: left;
  }

  /*底板数据详情*/
  .monitor_bottom {
    min-width: 1350px;
    margin-top: 30px;
    box-shadow: 5px 5px 3px #666;
  }

  .monitor_bottom h2 {
    text-align: left;
    color: #337ad8;
  }

  .left .wordTable {
    margin-top: 10px;
    padding: 10px;
    background: #fff;
    height: 250px;

    box-shadow: inset 3px 3px 5px 3px rgba(101, 118, 122, 0.7);
  }

  .right .buffer {
    text-align: left;
    flex: 1;
    margin-top: 10px;
    padding: 20px;
    background: #fff;
    height: 230px;
    box-shadow: inset 3px 3px 5px 3px rgba(101, 118, 122, 0.7);
  }

  .right .cmdWord {
    width: 280px;
    margin-top: 10px;
    padding: 10px;
    margin-right: 10px;
    height: 250px;
  }

  .right {
    padding: 10px 20px;
    flex: 3;
    background: #bdd7ee;
    border-radius: 5px;
    margin-right: 20px;
  }

  .left {
    padding: 10px 20px;
    flex: 2;
    min-height: 300px;
    background: #bdd7ee;
    border-radius: 5px;

  }

  /*头部数据监控*/
  .monitor_top {
    background: #fff;
    height: 400px;
    box-shadow: 5px 5px 3px #666;
    text-align: left;
    position: relative;
    min-width: 1350px;
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

  /*数据类别*/
  .right-nav {
    width: 380px;
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
</style>
