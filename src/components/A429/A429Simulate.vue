<template>
  <div id="Emulator">
    <div class="setting">
      <h2>基本配置</h2>
      <el-row>
        <el-col :offset="2" :span="10">
          <div class="option">
            <label class="label">通道：</label>
            <el-select collapse-tags :multiple="true" v-model="Channel" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.Channel"
                :label="item.label"
                :value="item.Channel">
              </el-option>
            </el-select>
          </div>
          <div class="option">
            <label class="label">速率：</label>
            <el-input @change="checkRateSpeed" style="width: 217px" v-model="Speed" placeholder="请输入内容"></el-input>
            <span>kbps</span>
          </div>
          <div class="option">
            <label class="label">空闲位：</label>
            <el-input @change="checkRateIdleBit" style="width: 217px" v-model="IdleBit" placeholder="请输入内容"></el-input>
            <span>位</span>
          </div>
        </el-col>
        <el-col :offset="1" :span="10">
          <div class="option">
            <label class="label">发送方式：</label>
            <el-radio-group v-model="SendMethod">
              <el-radio label="非周期"></el-radio>
              <el-radio label="周期"></el-radio>
            </el-radio-group>
          </div>
          <div v-if="SendMethod=='非周期'" class="option">
            <label class="label">发送次数：</label>
            <el-input @change="checkRateRunsNum" v-model="RunsNum" style="width: 217px" placeholder="请输入内容"></el-input>
            <span>次</span>
          </div>
          <div v-if="SendMethod=='非周期'" class="option">
            <label class="label">延时：</label>
            <el-input @change="checkRateTimeDelay" v-model="TimeDelay" style="width: 217px" placeholder="请输入内容"></el-input>
            <span>ms</span>
          </div>
          <div v-if="SendMethod=='周期'" class="option">
            <label class="label">周期：</label>
            <el-input @change="checkRateCycle" v-model="Cycle" style="width: 217px" placeholder="请输入内容"></el-input>
            <span>ms</span>
          </div>
          <div v-if="SendMethod=='周期'" class="option">
            <label class="label">操作：</label>
            <el-button style="width: 217px" size="mini" @click="stopSimulate" type="danger">停止发送</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="row">
      <div class="left">
        <h2>数据</h2>
        <div class="content">
          <div class="data">
            <label class="label">Label:</label>
            <el-input v-model="addLabel" maxlength="3" @blur="checkLabel" style="width: 180px"
                      placeholder="请输入内容"></el-input>
            <span>(8进制)</span>
          </div>
          <div class="massage"><span v-if="LabelCheck">{{LabelMessage}}</span></div>
          <div class="data">
            <label class="label">SDI:</label>
            <el-select v-model="addSDI" style="width: 180px" placeholder="请选择">
              <el-option value="00" label="00"></el-option>
              <el-option value="01" label="01"></el-option>
              <el-option value="10" label="10"></el-option>
              <el-option value="11" label="11"></el-option>
            </el-select>
          </div>
          <div class="massage"></div>
          <div class="data">
            <label class="label">DATA:</label>
            <el-input v-model="addData" maxlength="5" @blur="checkData" style="width: 180px"
                      placeholder="请输入内容"></el-input>
            <span>(16进制)</span>
          </div>
          <div class="massage"><span v-if="DataCheck">{{DataMessage}}</span></div>
          <div class="data">
            <label class="label">SSM:</label>
            <el-select @change="checkParity()" v-model="addSSM" style="width: 180px" placeholder="请选择">
              <el-option value="00" label="00"></el-option>
              <el-option value="01" label="01"></el-option>
              <el-option value="10" label="10"></el-option>
              <el-option value="11" label="11"></el-option>
            </el-select>
          </div>
          <div class="massage"></div>
          <div class="data">
            <label class="label">Parity:</label>
            <el-radio-group @change="odevity" v-model="verify">
              <el-radio label="奇校验"></el-radio>
              <el-radio label="偶校验"></el-radio>
            </el-radio-group>
          </div>
          <div style="margin-bottom: 20px">
            <label class="label"></label>
            <i class="parimy">{{addParity}}</i>
            <label class="fault">
              <el-checkbox v-model="fault">注入故障</el-checkbox>
            </label>
          </div>
        </div>
        <el-button style="margin: 10px 0 0 37%;width: 100px" @click="addInfo" type="primary">添加</el-button>
      </div>
      <div class="right">
        <div style="padding: 20px 20px">
          <el-table :data="tableDatas"
                    height="357"
                    border
                    :header-cell-style="{background:'#74bbd5',color:'#fff'}"
                    :highlight-current-row=true style="width: 100%"
                    @row-click="clickRow">
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column align="center" prop="LABEL" label="标号位（LABEL）" width="140">
              <template slot-scope="scope">
                <label>{{scope.row.LABEL}}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="SDI" label="源/目的识别位（SDI）" width="165">
              <template slot-scope="scope">
                <label>{{scope.row.SDI}}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="DATA" label="数据位（DATA）" min-width="180">
              <template slot-scope="scope">
                <label>{{scope.row.DATA}}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="SSM" label="符号状态位（SSM）" width="150">
              <template slot-scope="scope">
                <label>{{scope.row.SSM}}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="PARITY" label="奇偶校验位(PARITY)" width="160">
              <template slot-scope="scope">
                <label>{{scope.row.PARITY}}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="byteLength" width="80" label="操作">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index, tableDatas)" size="mini" type="danger">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="text-align: right;padding-right: 100px">
          <el-button v-if="SendMethod=='非周期'" style="margin-right: 20px" @click="singleSend()" size="small"
                     type="warning">
            单次发送
          </el-button>
          <el-button type="success" @click="send()">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import $ from "jquery";

  export default {
    name: "A429Simulate",
    data() {
      return {
        fault: false,
        verify: '奇校验',
        options: [],
        // 配置选项
        Channel: '',
        Speed: '',
        IdleBit: '',
        SendMethod: '非周期',
        TimeDelay: '',
        RunsNum: '',
        Cycle: 'NO',
        // 添加数据
        addLabel: '',
        addSDI: '',
        addData: '',
        addSSM: '',
        addParity: '',
        // 表单验证
        LabelCheck: false,
        LabelMessage: '',
        DataCheck: false,
        DataMessage: '',
        // 源码
        oddEven: '',//奇数还是偶数
        str: '',//31位
        // 数据列表
        tableDatas: [],
      }
    },
    watch: {
      fault(curVal, oldVal) {
        this.malfunction(curVal)
      },
      SendMethod(curVal) {
        if (curVal == '非周期') {
          this.Cycle = 'NO'
        } else if (curVal == '周期') {
          this.Cycle = ''
          this.TimeDelay = ''
          this.RunsNum = ''
        }
      }
    },
    methods: {
      // 表单验证
      checkLabel() {
        let that = this;
        var len = this.addLabel.length
        while (len < 3) {
          this.addLabel = "0" + this.addLabel;
          len++;
        }
        var regEx = /^[0-3]?([0-7]{2})$/;
        if (regEx.test(this.addLabel)) {
          that.LabelCheck = false
        } else {
          that.LabelMessage = 'Label号的取值范围为001-277!'
          that.LabelCheck = true
        }
      },
      checkData() {
        let that = this
        var len = this.addData.length
        while (len < 5) {
          this.addData = "0" + this.addData;
          len++;
        }
        var regEx = /^[0-7]?([0-9a-fA-F]{4})$/;

        if (regEx.test(this.addData)) {
          that.DataCheck = false
        } else {
          that.DataMessage = 'Label号的取值为00001-7FFFF!'
          that.DataCheck = true
        }
      },
      // 奇偶校验
      odd() {
        if (this.oddEven == 0) {
          this.addParity = 1
        } else if (this.oddEven == 1) {
          this.addParity = 0
        }
      },
      even() {
        this.addParity = this.oddEven
      },
      checkParity() {
        var label = parseInt(this.addLabel, 8).toString(2)
        var data = parseInt(this.addData, 16).toString(2)
        var llen = label.length
        while (llen < 8) {
          label = "0" + label;
          llen++;
        }
        var dlen = data.length
        while (dlen < 19) {
          data = "0" + data;
          dlen++;
        }
        this.str = label + this.addSDI + data + this.addSSM
        this.oddEven = (this.str.match(/[1]/g).length) % 2
        // console.log(this.oddEven)
        this.odevity()
      },

      odevity() {
        if (this.verify == '奇校验') {
          this.odd()
        } else if (this.verify == '偶校验') {
          this.even()
        }
      },
      // 注入故障
      malfunction(val) {
        if (val && this.verify == '奇校验') {
          this.even()
        } else if (val && this.verify == '偶校验') {
          this.odd()
        } else if (!val && this.verify == '偶校验') {
          this.even()
        } else if (!val && this.verify == '奇校验') {
          this.odd()
        }
      },
      addInfo() {
        if (this.addLabel.length == 0 || this.addData.length == 0) {
          alert("请填写自定义数据！")
          return false;
        } else if (this.DataCheck || this.LabelCheck) {
          alert('请填写正确数据!')
          return false
        } else {
          this.tableDatas.push({
            LABEL: this.addLabel,
            SDI: this.addSDI,
            DATA: this.addData,
            SSM: this.addSSM,
            PARITY: this.addParity,
            SourceCode: this.str + this.addParity
          })
          this.addLabel = ''
          this.addSDI = ''
          this.addData = ''
          this.addSSM = ''
          this.addParity = ''
          this.str = ''
        }
      },

      clickRow(row) {
      },
      /*------------------------------------- 添加数据-------------------------------------------*/
      // 删除
      deleteRow(index, rows) {
        rows.splice(index, 1);
        // console.log(this.tableDatas)
      },
      // 输入数字检测
      checkRateSpeed() {
        var nubmer = this.Speed
        var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
        if (!re.test(nubmer)) {
          alert('请输入数字!')
          this.Speed=''
        }
      },
      checkRateIdleBit(){
        var nubmer = this.IdleBit
        var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
        if (!re.test(nubmer)) {
          alert('请输入数字!')
          this.IdleBit=''
        }
      },
      checkRateTimeDelay(){
        var nubmer = this.TimeDelay
        var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
        if (!re.test(nubmer)) {
          alert('请输入数字!')
          this.TimeDelay=''
        }
      },
      checkRateRunsNum(){
        var nubmer = this.RunsNum
        var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
        if (!re.test(nubmer)) {
          alert('请输入数字!')
          this.RunsNum=''
        }
      },
      checkRateCycle(){
        var nubmer = this.Cycle
        if(nubmer=='NO'){
          return false
        }
        var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
        if (!re.test(nubmer)) {
          alert('请输入数字!')
          this.Cycle=''
        }
      },
      //表单验证
      formValidation() {
        if (this.Channel == '' || this.Speed == '' || this.IdleBit == '') {
          alert('请完善基本配置！')
          return false
        }
        if (this.tableDatas.length == 0) {
          alert('请添加发送数据！')
          return false
        }
        if (this.SendMethod == '非周期') {
          if (this.TimeDelay == '' || this.RunsNum == '') {
            alert('请填写发送次数和延时！')
            return false
          }
        } else if (this.SendMethod == '周期') {
          if (this.Cycle == '') {
            alert('请填写发送周期！')
            return false
          }
        }
        return true
      },
      // 发送
      send() {
        if (this.formValidation()) {
          var config = {}
          config.Channel = this.Channel
          config.Speed = this.Speed
          config.IdleBit = this.IdleBit
          config.TimeDelay = this.TimeDelay
          config.RunsNum = this.RunsNum
          config.Cycle = this.Cycle
          // console.log(config)
          // console.log(this.tableDatas)
        }
        axios.post('/simulateConfig', {
          BusType: 'A429',
          Config: config,
          Data: this.tableDatas
        }).then((result) => {

        }).catch((err) => {
          console.log(err)
        })
      },

      // 单次发送
      singleSend() {
        if (this.formValidation()) {
          var config = {}
          config.Channel = this.Channel
          config.Speed = this.Speed
          config.IdleBit = this.IdleBit
          config.TimeDelay = this.TimeDelay
          config.RunsNum = 1
          config.Cycle = this.Cycle
        }
        axios.post('/simulateConfig', {
          BusType: 'A429',
          Config: config,
          Data: this.tableDatas
        }).then((result) => {

        }).catch((err) => {
          console.log(err)
        })
      },
      // 获取发送通道
      getTxChannel() {
        axios.post('/getChannelConfig', {
          BusType: 'A429'
        }).then((result) => {
          var data = result.data.TxChannel
          for (let i = 0; i < data.length; i++) {
            this.options.push({
              label: data[i].match(/([^_]+)$/)[1],
              Channel: data[i]
            })
          }
          // console.log(this.options)
        })
      },
      //停止周期发送
      stopSimulate(){
        axios.post('/stopSimulate', {
          BusType: 'A429',
          state: 'stop',
          Channel:this.Channel
        }).then((result) => {

        }).catch((err) => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.getTxChannel()
    }
  }
</script>

<style scoped>
  .massage {
    color: #F56C6C;
    width: 250px;
    text-align: center;
    height: 20px;
    margin: 0 auto;
  }

  .fault {
    display: inline-block;
    height: 32px;
    line-height: 32px;
  }

  .parimy {
    display: inline-block;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    line-height: 30px;
    width: 60px;
    text-align: center;
    margin: 0 30px -12px 10px;
  }

  .data {
    margin: 5px 10px;
  }

  .content {
    margin-top: 10px;
    padding-top: 10px;
    border: 1px solid #000;
    border-radius: 15px;
    box-shadow: inset 3px 3px 5px 3px rgba(101, 118, 122, 0.7);
  }

  .right {
    flex: 1;
    margin-left: 40px;
    box-shadow: 5px 5px 3px #666;
    background: #fff;
    height: 490px;
    min-width: 510px;
  }

  .left {
    background: #fff;
    height: 490px;
    min-width: 360px;
    box-shadow: 5px 5px 3px #666;
    text-align: left;
    overflow: hidden;
    margin-bottom: 20px;
    padding: 0 20px;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  #Emulator {
    padding: 0 50px;
  }

  #Emulator h1 {
    text-align: left;
    color: #fff;
    margin: 10px 0 10px 80px;
  }

  .label {
    display: inline-block;
    text-align: left;
    width: 80px;
    margin-left: 20px;
  }

  .setting {
    margin-top: 30px;
    text-align: left;
    height: 230px;
    box-shadow: 5px 5px 3px #666;
    background: rgb(255, 255, 255);
    min-width: 900px;
    overflow: hidden;
    margin-bottom: 30px;
  }

  #Emulator h2 {
    color: #337ad8;
    margin: 10px 0 0 40px;
  }

  .option {
    height: 32px;
  }

  .option + .option {
    margin-top: 25px;
  }
</style>
