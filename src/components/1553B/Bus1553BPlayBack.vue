<template>
  <div style="padding:30px">
    <div style="display: flex;flex-direction: row">
      <div class="file">
        <h2 style=" margin: 10px 0 10px 10px;">文件</h2>
        <div style="width:260px;margin: 10px auto">
          选择：
          <el-input style="width: 180px"
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
          </el-input>
        </div>
        <div class="tree">
          <el-tree
            class="filter-tree"
            :highlight-current="true"
            :data="fileData"
            default-expand-all
            @node-click="getFileName"
            :filter-node-method="filterNode"
            ref="tree2">
          </el-tree>
        </div>
      </div>
      <div class="monitor_top">
        <div>
          <!---------------------------------监听数据列表----------------------------------->
          <div style="padding:25px">
            <div style="text-align:left;padding: 20px">
              <label style="margin-left: 20px">文件名：</label>
              <span style="margin-left: 20px">{{fileName}}</span>
              <label style="margin-left: 55%">操作：</label>
              <el-button style="margin-left: 20px" size="small" type="danger">删除</el-button>
            </div>
            <el-table :data="tableData"
                      id="table"
                      height="275"
                      border
                      @row-click="clickRow"
                      :header-cell-style="{background:'#74bbd5',color:'#fff'}"
                      :highlight-current-row=true style="width: 100%">
              <el-table-column align="center" type="index" label="Id" width="60">
              </el-table-column>
              <el-table-column align="center" prop="Type" label="Type" width="120">
                <template slot-scope="scope">
                  <label>{{scope.row.Type}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="RxRt" label="Rx Rt" width="120">
                <template slot-scope="scope">
                  <label>{{scope.row.RxRt}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="TxRt" label="Tx Rt" width="120">
                <template slot-scope="scope">
                  <label>{{scope.row.TxRt}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="RxSubRt" label="Rx SubRt" width="120">
                <template slot-scope="scope">
                  <label>{{scope.row.RxSubRt}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="TxSubRt" label="Tx SubRt" width="120">
                <template slot-scope="scope">
                  <label>{{scope.row.TxSubRt}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="CmdWord1" label="Cmd Word 1" width="120">
                <template slot-scope="scope">
                  <label>{{scope.row.CmdWord1}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="CmdWord2" label="Cmd Word 2" width="120">
                <template slot-scope="scope">
                  <label>{{scope.row.CmdWord2}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="RxStatus" label="Rx Status" width="120">
                <template slot-scope="scope">
                  <label>{{scope.row.RxStatus}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="TxStatus" label="Tx Status" width="120">
                <template slot-scope="scope">
                  <label>{{scope.row.TxStatus}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="RxResponseTime" label="Rx Response Time" width="150">
                <template slot-scope="scope">
                  <label>{{scope.row.RxResponseTime}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="TxResponseTime" label="Tx Response Time" width="150">
                <template slot-scope="scope">
                  <label>{{scope.row.TxResponseTime}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="WordCount" label="Word Count" width="120">
                <template slot-scope="scope">
                  <label>{{scope.row.WordCount}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="Error" label="Error" width="120">
                <template slot-scope="scope">
                  <label>{{scope.row.Error}}</label>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </div>
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
                  <h4 style="color: #337ad8;">Time: &nbsp; &nbsp;11:15:20 950.000.000</h4>
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
                  <h4 style="color: #ff6a5b">No Rsponse</h4>
                  <h4 style="color: #ff6a5b">Parity Error</h4>
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
      </el-tabs>
    </div>
  </div>
</template>

<script>

  import $ from "jquery";
  import axios from 'axios'
  import store from '../store'

  export default {
    name: "Bus1553BPlayBack",
    data() {
      return {
        filterText:'',
        fileName: '',
        // 数据列表
        tableData: [],
        // word
        wordTable: [],
        attribute: [],
        //data
        dataCoulmn: [],
        fileData: [
          {
            label: '数据回放文件',
            children: [{
              label: '文件1',
            }, {
              label: '文件2',
            }, {
              label: '文件3',
            }, {
              label: '文件4',
            }]
          }
        ],
      }
    },
    mounted() {
      this.getData()
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      getFileName(data){
        // console.log(data.label)
        this.fileName=data.label
      },
      tabsclick() {
      },
      getData() {
        this.tableData = [{
          Type: 'RT-RT',
          RxRt: '3',
          TxRt: '1',
          RxSubRt: '1',
          TxSubRt: '1',
          CmdWord1: '1826',
          CmdWord2: '0C26',
          RxStatus: '1800',
          TxStatus: '0800',
          WordCount: '7',
          RxResponseTime: '4.75us',
          TxResponseTime: '5.25us',
        }]
      },
      getDataList() {
        var data = ['0000', '0000', '0000', '0000', '0000', '0000', '0000',]
        var column = []
        for (let i = 0; i < data.length; i += 8) {
          var row = data.slice(i, i + 8)
          var obj = {title: i + 1, dataRow: row}
          column.push(obj)
        }
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
  .file{
    padding: 20px 40px;
    width: 260px;
    margin-right: 20px;
    background: #fff;
    box-shadow: 5px 5px 3px #666;
  }
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

  .bufferData li + li {
    margin-right: 5px;
  }

  .bufferData li span {
    text-align: center;
    color: #5acc6b;
  }

  .buffer h4 {
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
    min-width: 1640px;
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
    min-width: 1280px;
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


</style>
