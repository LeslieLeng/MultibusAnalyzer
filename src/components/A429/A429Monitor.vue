<template>
  <div id="format">
    <div class="row">
      <!--<div style="padding: 30px 30px 0 30px ">-->
        <!--<div class="left">-->
          <!--<span>ICD信息</span>-->
          <!--<label style="margin: 10px 50px 40px 25px">上传文件：</label>-->
          <!--<form id="upload1" enctype="multipart/form-data" style="display:none">-->
            <!--<input multiple="multiple" type="file" name="fileName" id="fileName" @change="changeFile($event)"-->
                   <!--style="display:none"/>-->
          <!--</form>-->
          <!--<el-button style="width: 120px" size="small" @click="uploadICDFile()" type="primary">上传</el-button>-->
          <!--<div class="ICDtree">-->
            <!--<el-tree :data="ICDTree" :default-expand-all="true"></el-tree>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div style="padding: 30px ;position: relative;flex: 1;min-width: 771px">
        <div class="right">
          <div class="right-nav">
            <button @click="handleTab(0)">数据</button>
            <button @click="handleTab(1)">控制</button>
            <button @click="handleTab(2)">过滤</button>
            <button @click="handleTab(3)">统计</button>
          </div>
          <div v-show="isShow === 0">
            <data-datatable></data-datatable>
          </div>
          <div v-show="isShow === 1">
            <data-control></data-control>
          </div>
          <div v-show="isShow === 2">
            <data-filtration></data-filtration>
          </div>
          <div v-show="isShow === 3">
            <data-statistics></data-statistics>
          </div>
        </div>
        <div class="peizhi">
          <!--通道配置-->
          <el-button type="primary" @click="openChannelConfig">通道配置</el-button>
          <el-dialog width="65%" title="通道配置" :visible.sync="dialogTableVisible">
            <el-row style=" text-align: left;">
              <label style="margin-left: 40px">选择配置文件：</label>
              <el-select v-model="customconfig" filterable placeholder="请选择">
                <el-option v-for="item in customconfiglist" :key="item.label" :label="item.label"
                           :value="item.label"></el-option>
              </el-select>
              <label style="margin-left:20px;margin-right: 80px"> (可搜索)</label>
              <el-button size="small" @click="getPrivateChannelConfig" type="primary"> 应用</el-button>
            </el-row>
            <h3 style="text-align: left;margin: 20px">配置</h3>
            <div style="padding: 0 30px">
              <el-table :data="tabel_channel"
                        height="309"
                        border
                        :header-cell-style="{background:'#74bbd5',color:'#fff'}"
                        :highlight-current-row=true style="width: 100%"
                        @row-click="clickRow">
                <el-table-column align="center" prop="ChannelNum" label="通道">
                  <template slot-scope="scope">
                    <label>{{scope.row.ChannelNum}}</label>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="Speed" label="速率（Kbps）">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.Speed"></el-input>
                  </template>
                </el-table-column>
                <!--<el-table-column prop="BaudRate" label="波特率（Baud）" width="200">-->
                <!--<template slot-scope="scope">-->
                <!--<el-input v-model="scope.row.BaudRate"></el-input>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column align="center" prop="Checked" label="奇偶校验">
                  <template slot-scope="scope">
                    <el-radio-group v-model="scope.row.Checked">
                      <el-radio label="奇校验">奇校验</el-radio>
                      <el-radio label="偶校验">偶校验</el-radio>
                    </el-radio-group>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="Status" label="状态" width="200">
                  <template slot-scope="scope">
                    <label>{{scope.row.Status}}</label>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="byteLength" label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button size="mini" v-if="!scope.row.monitorState" @click="getMonitorChannel(scope.row)"
                               type="success">开启
                    </el-button>
                    <el-button size="mini" v-if="scope.row.monitorState" @click="closeMonitorChannel(scope.row)"
                               type="danger">关闭
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <h3 v-if="updataConfig" style="text-align: left;margin: 20px">是否保存配置到云</h3>
            <el-row v-if="updataConfig" style="text-align: left;margin-left: 40px">
              <el-col style="width: 300px">
                <label>保存设置：</label>
                <el-radio-group v-model="isSave">
                  <el-radio label="0">不保存</el-radio>
                  <el-radio label="1">保存</el-radio>
                </el-radio-group>

              </el-col>
              <el-col style="width: 400px" v-if="isSave=='1'">
                <label style="float: left">存档名称：</label>
                <div style="float: left;margin-top: -10px">
                  <el-input v-model="saveName"></el-input>
                </div>
              </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogTableVisible = false">取 消</el-button>
              <el-button v-if="updataConfig" type="primary" @click="savePrivateChannelConfig">确 定</el-button>
              <el-button v-if="!updataConfig" type="primary" @click="updataPrivateChannelConfig">保 存</el-button>
            </div>
          </el-dialog>
          <!--监控异常配置-->
          <el-button type="primary" @click="dialogFormVisible = true">监控异常配置</el-button>
          <el-dialog width="70%" title="监控异常配置" :visible.sync="dialogFormVisible">
            <div class="row" style="padding: 30px">
              <div class="left_tree">
                <el-tree
                  :data="channelTree"
                  :default-expand-all="true"
                  @node-click="abnormalNodeClick"
                  :highlight-current="true"
                >
                </el-tree>
              </div>
              <div class="right_table">
                <div class="row">
                  <div style="flex: 1"></div>
                  <div style="flex: 1">数据</div>
                  <div style="flex: 1">条件</div>
                  <div style="flex: 1">单位</div>
                  <div style="flex: 1"></div>
                </div>
                <div class="row" style="margin-top: 50px">
                  <div style="flex: 1;margin-top: 10px">{{labelName}}</div>
                  <div style="flex: 1">
                    <el-input v-model="abnormalData" placeholder="请输入数据"></el-input>
                  </div>
                  <div style="flex: 1">
                    <el-select v-model="abnormalSelect" placeholder="请选择" style="width: 100px">
                      <el-option label="==" value="=="></el-option>
                      <el-option label="!=" value="!="></el-option>
                      <el-option label=">=" value=">="></el-option>
                      <el-option label="<=" value="<="></el-option>
                      <el-option label=">" value=">"></el-option>
                      <el-option label="<" value="<"></el-option>
                    </el-select>
                  </div>
                  <div style="flex: 1">
                    <label
                      style="display: inline-block;width: 120px;height: 40px;line-height: 40px">{{abnormalUnit}}</label>
                  </div>
                  <div style="flex: 1;line-height: 40px">
                    <el-button size="mini" @click="addAbnormal" type="primary">添加</el-button>
                  </div>
                </div>
                <div style="padding:30px 0 30px 30px">
                  <el-table :data="tabel_condition"
                            height="309"
                            border
                            :header-cell-style="{background:'#74bbd5',color:'#fff'}"
                            :highlight-current-row=true style="width: 100%">
                    <el-table-column type="index" label="序号" width="50">
                    </el-table-column>
                    <el-table-column prop="conditionName" label="名称" width="150">
                      <template slot-scope="scope">
                        <label>{{scope.row.conditionName}}</label>
                      </template>
                    </el-table-column>
                    <el-table-column prop="condition" label="条件" width="80">
                      <template slot-scope="scope">
                        <label>{{scope.row.condition}}</label>
                      </template>
                    </el-table-column>
                    <el-table-column prop="conditionData" label="值" min-width="150">
                      <template slot-scope="scope">
                        <label>{{scope.row.conditionData}}</label>
                      </template>
                    </el-table-column>
                    <el-table-column prop="conditionUnit" label="单位" width="100">
                      <template slot-scope="scope">
                        <label>{{scope.row.conditionUnit}}</label>
                      </template>
                    </el-table-column>
                    <el-table-column prop="byteLength" label="操作" width="100">
                      <template slot-scope="scope">
                        <el-button size="mini" @click.native.prevent="deleteAbnormal(scope.$index, tabel_condition)"
                                   type="danger">删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div style="text-align: left;margin:10px ">
                    <label style="margin-right: 30px">条件关系:</label>
                    <el-radio-group v-model="relationship">
                      <el-radio style="margin-right: 30px" label="&&"></el-radio>
                      <el-radio style="margin-right: 30px" label="||"></el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirmAbnormal">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <div style="padding: 0 30px 10px;min-width: 1150px">
      <el-tabs type="border-card" @tab-click="tabsclick">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-news"></i>源码</span>
          <details-details></details-details>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-bell"></i>快照</span>
          <details-snapshoot></details-snapshoot>
        </el-tab-pane>
        <!--<el-tab-pane>-->
          <!--<span slot="label"><i class="el-icon-share"></i>信号观察器</span>-->
          <!--<details-signal></details-signal>-->
        <!--</el-tab-pane>-->
      </el-tabs>

    </div>
  </div>
</template>

<script>
  // 数据列表tab
  import DataTable from './A429DataTab/dataTable'
  import Control from './A429DataTab/control'
  import Filtration from './A429DataTab/filtration'
  import Statistics from './A429DataTab/statistics'
  // 数据详情tab
  import Details from './A429DetailsTab/soundCode'
  import Signal from './A429DetailsTab/signal'
  import Snapshoot from './A429DetailsTab/snapshoot'
  import axios from 'axios'
  import $ from "jquery";
  import store from '../store'

  export default {
    name: "A429Monitor",
    data() {
      return {
        isShow: 0,
        // 解析过的ICDTree
        channelTree: [
          {
            label: 'A429',
            children: [
              {
                label: 'Label001 海拔高度',
                labelNum: '001',
                name: '海拔高度',
                unit: '米'
              },
              {
                label: 'Label002 速度',
                labelNum: '002',
                name: '速度',
                unit: 'm/s'
              },
              {
                label: 'Label003 气压',
                labelNum: '003',
                name: '气压',
                unit: 'pa'
              },
              {
                label: 'Label004 油量',
                labelNum: '004',
                name: '油量',
                unit: 'L'
              },
              {
                label: 'Label005 氧气含量',
                labelNum: '005',
                name: '氧气含量',
                unit: '%'
              },
              {
                label: 'Label006 发动机温度',
                labelNum: '006',
                name: '发动机温度',
                unit: '°'
              },
              {
                label: 'Label007 油温',
                labelNum: '007',
                name: '油温',
                unit: '°'
              },
            ]
          }],
        //未解析的ICDTree
        ICDTree: [
          {
            label: 'A429',
            children: [
              {
                label: 'Label001 海拔高度',
              },
              {
                label: 'Label002 速度',
              },
              {
                label: 'Label003 气压',
              },
              {
                label: 'Label004 油量',
              },
              {
                label: 'Label005 氧气含量',
              },
              {
                label: 'Label006 发动机温度',
              },
              {
                label: 'Label007 油温',
              },
            ]
          }],
        ChnannelStatus: {},
        updataConfig: true,
        /*--------------通道配置---------------*/
        //通道配置
        dialogTableVisible: false,
        // 自定义配置列表
        customconfig: '默认配置',
        customconfiglist: [],
        //配置信息
        tabel_channel: [],
        isSave: "0",
        // 存档名称
        saveName: '',
        // 获取监听通道
        monitorChannel: [],
        /*---------------监控异常---------------*/
        // 监控异常配置
        dialogFormVisible: false,
        // 异常条件
        warningLabe: '',
        labelName: '名称:',
        abnormalName: '',
        abnormalData: '',
        abnormalSelect: '',
        abnormalUnit: '单位',
        tabel_condition: [],
        // 异常条件关系
        relationship: '&&',
      }
    },
    components: {
      // 数据列表tab
      'data-datatable': DataTable,
      'data-control': Control,
      'data-filtration': Filtration,
      'data-statistics': Statistics,
      // 数据详情tab
      'details-details': Details,
      'details-signal': Signal,
      'details-snapshoot': Snapshoot,
    },
    computed: {},
    methods: {

      handleTab(v) {
        var tabs = $('.right-nav').children()
        for (let i = 0; i < tabs.length; i++) {
          tabs[i].style.background = "#9ae9ff"
        }
        tabs[v].style.background = "#eedfd0"
        this.isShow = v
        if (v == 3) {
          store.commit('Statistics')
        }
      },
      clickRow(row) {

      },
      tabsclick(tab, event) {
        if (tab.index == '1') {
          store.commit('SnapShoot')
        }
      },

      // 选择监控异常ICD信息
      abnormalNodeClick(data) {
        this.tabel_condition = []
        this.abnormalName = ''
        this.abnormalData = ''
        this.warningLabe = data.labelNum
        this.labelName = data.name
        this.abnormalName = data.name
        this.abnormalUnit = data.unit
      },
      // 添加监控异常
      addAbnormal() {
        if (this.abnormalName == '') {
          alert('请选择监控条件名称')
          return false
        }
        this.tabel_condition.push({
          conditionName: this.abnormalName,
          condition: this.abnormalSelect,
          conditionData: this.abnormalData,
          conditionUnit: this.abnormalUnit
        })
      },
      // 删除监控异常
      deleteAbnormal(index, rows) {
        rows.splice(index, 1);
      },
      // 应用监控异常
      confirmAbnormal() {
        if (this.tabel_condition.length == 0) {
          alert('请输入条件')
          return false
        }
        this.dialogFormVisible = false

        store.commit('WarningLabel', this.warningLabe)
        store.commit('WarningRelationship', this.relationship)
        store.commit('WarningData', this.tabel_condition)

      },
      /*----------------------------------通道配置 开始---------------------------------*/
      //获取接收通道
      getChannelNum() {
        var arr = []
        var rxChannel = []
        axios.post('/getChannelConfig', {
          clientId: sessionStorage.getItem('ClientId'),
          BusType: 'A429'
        }).then((result) => {
          var data = result.data.RxChannel
          for (let i = 0; i < data.length; i++) {
            var val = data[i]
            rxChannel.push({
              Channel: val[0],
              ChannelNum: val[0].match(/([^_]+)$/)[1],
              Status: val[1],
            })
            arr.push({
              Channel: val[0],
              ChannelNum: val[0].match(/([^_]+)$/)[1],
              Status: val[1],
              monitorState: false
            })
            var k = val[0]
            this.ChnannelStatus.k = val[1]
          }
          sessionStorage.setItem("RxChannel", JSON.stringify(rxChannel))
          this.tabel_channel = arr
        }).catch((err) => {
          console.log(err)
        })
      },
      checkChannelOption() {
        var data = JSON.parse(sessionStorage.getItem("MonitorChannel"))
        if (data == null || data.length == 0) {
          for (let j = 0; j < this.tabel_channel.length; j++) {
            this.tabel_channel[j].monitorState = false
          }
          return false
        } else {
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < this.tabel_channel.length; j++) {
              if (data[i] == this.tabel_channel[j].Channel) {
                this.tabel_channel[j].monitorState = true
              }
            }
          }
        }
      },
      // 打开通道配置
      openChannelConfig() {
        this.customconfiglist = []
        this.dialogTableVisible = true
        if (this.customconfig == '默认配置') {
          this.updataConfig = true
          this.getDefaultConfig()
        } else {
          this.updataConfig = false
          axios.post('/getConfig', {
            clientId: sessionStorage.getItem('ClientId'),
            BusType: 'A429',
            FileName: this.customconfig
          }).then((result) => {
            var data = result.data
            var arr = []
            for (let i = 0; i < data.length; i++) {
              var k = data[i].Channel
              arr.push({})
              arr[i].id = data[i].id
              arr[i].Channel = data[i].Channel
              arr[i].ChannelNum = data[i].Channel.match(/([^_]+)$/)[1]
              // arr[i].BaudRate = data[i].BaudRate
              arr[i].Speed = data[i].Speed
              arr[i].Checked = data[i].Checked
              arr[i].Status = this.ChnannelStatus.k
              arr[i].monitorState = this.tabel_channel[i].monitorState
            }
            this.tabel_channel = arr
            this.checkChannelOption()
          }).catch((err) => {
            console.log(err)
          })
        }
        axios.post('/getConfigFile', {
          clientId: sessionStorage.getItem('ClientId'),
          BusType: 'A429'
        }).then((result) => {
          var file = result.data.ConfigFile
          for (let i = 0; i < file.length; i++) {
            this.customconfiglist.push({
              label: file[i]
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //获取公有配置
      getDefaultConfig() {
        axios.post('/getDefaultConfig', {
          clientId: sessionStorage.getItem('ClientId'),
          BusType: 'A429'
        }).then((result) => {
          if (result.data.length == 0) {
            return false
          }
          var data = result.data
          var arr = []
          //检测默认通道配置是否含有板卡通道
          var defaulChannel = JSON.parse(sessionStorage.getItem("RxChannel"))
          var arrChannel = []
          for (let j = 0; j < defaulChannel.length; j++) {
            arrChannel.push(defaulChannel[j].Channel)
            var k = defaulChannel[j].Channel
            arr.push({
              Channel : defaulChannel[j].Channel,
              ChannelNum : defaulChannel[j].Channel.match(/([^_]+)$/)[1],
              Status : this.ChnannelStatus.k,
              monitorState : false,
            })
          }
          for (let i = 0; i < data.length; i++) {
            if (arrChannel.indexOf(data[i].Channel)!=-1) {
              var differentChannel = arrChannel[arrChannel.indexOf(data[i].Channel)]
              for(let x=0;x<arr.length;x++){
                if(arr[x].Channel==differentChannel){
                  var itemIndex = x
                }
              }
              var k = data[i].Channel
              arr[itemIndex].id = data[i].id
              arr[itemIndex].Channel = differentChannel
              arr[itemIndex].ChannelNum = differentChannel.match(/([^_]+)$/)[1]
              // arr[i].BaudRate = data[i].BaudRate
              arr[itemIndex].Speed = data[i].Speed
              arr[itemIndex].Checked = data[i].Checked
              arr[itemIndex].Status = this.ChnannelStatus.k
              arr[itemIndex].monitorState = this.tabel_channel[i].monitorState
            }
          }
          this.tabel_channel = arr
        }).catch((err) => {
          console.log(err)
        })
      },
      //引用配置文件
      getPrivateChannelConfig() {
        let that = this
        if (this.customconfig == '') {
          alert('请选择配置文件')
          return false
        } else if (this.customconfig == '默认配置') {
          this.updataConfig = true
        } else {
          this.updataConfig = false
        }
        axios.post('/getConfig', {
          clientId: sessionStorage.getItem('ClientId'),
          BusType: 'A429',
          FileName: this.customconfig
        }).then((result) => {
          var data = result.data
          var arr = []
          //检测通道是否存在
          var defaulChannel = JSON.parse(sessionStorage.getItem("RxChannel"))
          var arrChannel = []
          for (let j = 0; j < defaulChannel.length; j++) {
            arrChannel.push(defaulChannel[j].Channel)
          }
          for (let i = 0; i < data.length; i++) {
            if (arrChannel.indexOf(data[i].Channel)==-1) {
              alert('该板卡通道与您的配置不符，已为你转到默认配置！')
              that.customconfig = '默认配置'
              that.openChannelConfig()
              console.log('该板卡通道与您的配置不符，已为你转到默认配置！')
              return false
            }
            var k = data[i].Channel
            arr.push({})
            arr[i].id = data[i].id
            arr[i].Channel = data[i].Channel
            arr[i].ChannelNum = data[i].Channel.match(/([^_]+)$/)[1]
            // arr[i].BaudRate = data[i].BaudRate
            arr[i].Speed = data[i].Speed
            arr[i].Checked = data[i].Checked
            arr[i].Status = this.ChnannelStatus.k
            arr[i].monitorState = false
          }
          this.tabel_channel = arr
          sessionStorage.removeItem("MonitorChannel")

        }).catch((err) => {
          console.log(err)
        })
      },
      //保存个人配置文件
      savePrivateChannelConfig() {
        try {
          sessionStorage.removeItem("MonitorChannel")
        } catch (e) {

        }
        if (this.customconfig != '默认配置') {
          this.customconfig = this.saveName
        }
        axios.post('/saveChannelConfig', {
          clientId: sessionStorage.getItem('ClientId'),
          BusType: 'A429',
          ConfigData: this.tabel_channel,
          FileName: this.saveName
        }).then((result) => {
          if (result.data.Status == 'Error') {
            alert(result.data.Msg)
            return false
          }
          this.dialogTableVisible = false
          this.isSave = '0'
          sessionStorage.setItem("MonitorChannel", JSON.stringify(this.monitorChannel))
        }).catch((err) => {
          console.log(err)
        })
      },
      //修改个人配置
      updataPrivateChannelConfig() {
        let that = this
        try {
          sessionStorage.removeItem("MonitorChannel")
        } catch (e) {
        }
        // console.log(that.tabel_channel)
        // console.log(that.customconfig)
        axios.post('/updateConfig', {
          clientId: sessionStorage.getItem('ClientId'),
          BusType: 'A429',
          ConfigData: that.tabel_channel,
          FileName: that.customconfig
        }).then((result) => {
          // console.log(result.data)
          if (result.data.Status == 'Error') {
            alert(result.data.Msg)
            return false
          }
          this.dialogTableVisible = false
          sessionStorage.setItem("MonitorChannel", JSON.stringify(this.monitorChannel))
        }).catch((err) => {
          console.log(err)
        })
      },
      // 获取监听通道
      getMonitorChannel(row) {
        row.monitorState = true
        if (this.monitorChannel.indexOf(row.Channel) == -1) {
          this.monitorChannel.push(row.Channel)
        }
      },
      closeMonitorChannel(row) {
        row.monitorState = false
        var index = this.monitorChannel.indexOf(row.Channel)
        this.monitorChannel.splice(index, 1)
      },
      /*----------------------------------通道配置 结束---------------------------------*/
      //选择并上传ICD文件
      changeFile(e) {
        console.log(e.target.files)
        axios.post('/', {}).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      },
      uploadICDFile() {
        $("#fileName").trigger("click");
      },
      //获取解析的ICD信息的树形结构
      getICDInfoTree() {
        axios.post('/', {}).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      },
      // 自定义异常配置
      customWarning() {
        axios.post('/', {}).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      },

    },
    watch: {
      isSave(curVal, oldVal) {
        if (curVal == '0') {
          this.saveName = ''
        }
      }
    },
    mounted() {
      this.getChannelNum()

    }
  }
</script>

<style scoped>
  .ICDtree {
    width: 300px;
    margin: 10px auto;
    height: 350px;
    overflow-y: scroll;
    border: 1px solid #666;
  }

  .left_tree {
    width: 300px;
    height: 530px;
    overflow-y: scroll;
    border: 1px solid #666;
  }

  .right_table {
    flex: 1;
    padding: 50px 0 50px 50px;
    min-width: 500px;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .el-tabs {
    min-width: 900px;
    box-shadow: 5px 5px 3px #666;
  }

  .right-nav {
    width: 500px;
    background: #29c2ff;
    height: 60px;
    border-bottom-right-radius: 60px;
    text-align: left;
    padding-left: 10px;
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
  }


  .left {
    background: #fff;
    height: 500px;
    min-width: 350px;
    box-shadow: 5px 5px 3px #666;
    text-align: left;
    overflow: hidden;
  }

  .left span {
    display: block;
    font-size: 24px;
    font-weight: 700;
    margin: 10px 0 20px 10px
  }

  .right {
    background: #fff;
    height: 500px;
    box-shadow: 5px 5px 3px #666;
  }

  .peizhi {
    position: absolute;
    right: 40px;
    top: -50px;
  }
</style>
