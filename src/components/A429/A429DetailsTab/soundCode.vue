<template>
  <div>
    <el-row class="content">
      <el-col :span="12" style="min-width: 550px" class="c_left">
        <h3>Test Value</h3>
        <div class="c_left_head">
          <ul style="margin-left: 40px">
            <li> 通道:<span class="soundCode">{{Channel}}</span></li>
            <li> Label: <span class="soundCode">{{Label}}</span></li>
            <li> Value: <span class="soundCode" style="width: 100px">{{Value}}</span></li>
          </ul>

        </div>
        <div class="left_table">
          <h4>当前位置——源码</h4>
          <table>
            <tr>
              <td>LL</td>
              <td>LLL</td>
              <td>LLL</td>
              <td>SDI</td>
              <td>DDD</td>
              <td>DDDD</td>
              <td>DDDD</td>
              <td>DDDD</td>
              <td>DDDD</td>
              <td>SSM</td>
              <td>P</td>
            </tr>
            <tr id="highlight">
              <td>{{sCode.L1}}</td>
              <td>{{sCode.L2}}</td>
              <td>{{sCode.L3}}</td>
              <td>{{sCode.SDI}}</td>
              <td>{{sCode.D1}}</td>
              <td>{{sCode.D2}}</td>
              <td>{{sCode.D3}}</td>
              <td>{{sCode.D4}}</td>
              <td>{{sCode.D5}}</td>
              <td>{{sCode.SSM}}</td>
              <td>{{sCode.P}}</td>
            </tr>
          </table>
          <div style="margin-top: 30px"><span v-if="Warning==1" style="color:#E6A23C">异常状态：       自定义异常告警</span></div>
          <div><span v-if="Error==1" style="color: #F56C6C">错误状态：       奇偶校验错误/编码错误</span></div>
        </div>

      </el-col>
      <el-col :span="12" class="c_right">
        <h3>Message</h3>
        <div class="message">
          <label style="margin:0 20px">{{codeKey}}</label><span>{{codeValue}}</span><span>{{codeUnit}}</span>
        </div>
        <div class="tabs" style="padding: 0 20px 20px 20px">
          <el-tabs @tab-click="highlight" type="border-card" tab-position="left" style="height: 230px;">
            <el-tab-pane label="Label">
              <div class="row">
                <label>标识：</label>
                <span></span>
              </div>
              <div class="row">
                <label>偏移量：</label>
                <span>0位</span>
              </div>
              <div class="row">
              <label>长度：</label>
              <span>8位</span>
            </div>
              <div class="row">
                <label>进制：</label>
                <el-radio style="width: 45px" v-model="radio" label="1">8进制</el-radio>
                <el-radio style="width: 45px" v-model="radio" label="2">10进制</el-radio>
                <el-radio style="width: 45px" v-model="radio" label="3">12进制</el-radio>
              </div>
              <div class="row">
                <label>值：</label>
                <span v-if="radio==1">{{label8}}</span>
                <span v-if="radio==2">{{label10}}</span>
                <span v-if="radio==3">{{label16}}</span>

              </div>
            </el-tab-pane>
            <el-tab-pane label="SDI">
              <div class="row">
                <label>偏移量：</label>
                <span>8位</span>
              </div>
              <div class="row">
                <label>长度：</label>
                <span>2位</span>
              </div>
              <div class="row">
                <label>值：</label>
                <span>{{SDI}}</span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="DATA">
              <div class="row">
                <label>偏移量：</label>
                <span>10位</span>
              </div>
              <div class="row">
                <label>长度：</label>
                <span>19位</span>
              </div>
              <div class="row">
                <label>值：</label>
                <span>{{codeValue}}</span>
              </div>
              <div class="row">
                <label>单位：</label>
                <span></span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="SSM">
              <div class="row">
                <label>偏移量：</label>
                <span>29位</span>
              </div>
              <div class="row">
                <label>长度：</label>
                <span>2位</span>
              </div>
              <div class="row">
                <label>值：</label>
                <span>{{SSM}}</span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Parity">
              <div class="row">
                <label>偏移量：</label>
                <span>31位</span>
              </div>
              <div class="row">
                <label>长度：</label>
                <span>1位</span>
              </div>
              <div class="row">
                <label>值：</label>
                <span>{{Parity}}</span>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    name: "soundCode",
    data() {
      return {
        radio: '1',
        sCode: {
          L1: '',
          L2: '',
          L3: '',
          SDI: '',
          D1: '',
          D2: '',
          D3: '',
          D4: '',
          D5: '',
          SSM: '',
          P: '',
        },
        //message
        codeKey: '',
        codeValue: '15000',
        codeUnit: '',
        label8: '',
        label16: '',
        label10: '',
      }
    },
    computed: {
      codeValue(){
        return store.state.messageData
      },
      // 获取监听列表
      Value() {
        return store.state.soundcode8;
      },
      Channel() {
        return store.state.scchannel
      },
      Label() {
        return store.state.sclabel
      },
      Soundcode2() {
        return store.state.soundcode2;
      },
      SSM() {
        var code = this.Soundcode2;
        return code.slice(29, 31)
      },
      SDI() {
        var code = this.Soundcode2;
        return code.slice(8, 10)
      },
      Parity() {
        var code = this.Soundcode2;
        return code.slice(31, 32)
      },
      Warning(){
        return store.state.stateWarning;
      },
      Error(){
        return store.state.stateError;
      }
    },
    watch: {
      'Soundcode2': 'getSoundCode'
    },
    methods: {
      highlight(event) {
        var td = document.getElementById('highlight').children;
        for (let i = 0; i < td.length; i++) {
          td[i].style.color = "#000";
        }
        if (event.label == 'Label') {
          td[0].style.color = "red";
          td[1].style.color = "red";
          td[2].style.color = "red";
        } else if (event.label == 'SDI') {
          td[3].style.color = "red";
        } else if (event.label == 'DATA') {
          td[4].style.color = "red";
          td[5].style.color = "red";
          td[6].style.color = "red";
          td[7].style.color = "red";
          td[8].style.color = "red";
        } else if (event.label == 'SSM') {
          td[9].style.color = "red";
        } else if (event.label == 'Parity') {
          td[10].style.color = "red";
        }
      },
      getSoundCode() {
        var code = this.Soundcode2;
        this.sCode.L1 = code.slice(0, 2);
        this.sCode.L2 = code.slice(2, 5);
        this.sCode.L3 = code.slice(5, 8);
        this.sCode.SDI = code.slice(8, 10);
        this.sCode.D1 = code.slice(10, 14);
        this.sCode.D2 = code.slice(14, 18);
        this.sCode.D3 = code.slice(18, 22);
        this.sCode.D4 = code.slice(22, 26);
        this.sCode.D5 = code.slice(26, 29);
        this.sCode.SSM = code.slice(29, 31);
        this.sCode.P = code.slice(31, 32)
        this.label8 = parseInt(code.slice(0, 8), 2).toString(8)
        this.label10 = parseInt(code.slice(0, 8), 2).toString(10)
        this.label16 = parseInt(code.slice(0, 8), 2).toString(16)
      }
    }
  }
</script>

<style>
  .el-tabs--left.el-tabs--border-card .el-tabs__item.is-left {
    text-align: left!important;
  }
</style>
<style scoped>

  .tabs label, .tabs span {
    text-align: left;
    margin-top: 10px;
    width: 150px;
  }

  .tabs table {
    margin-top: 30px;

  }

  .tabs span {
    height: 18px;

  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .c_left h3 {
    text-align: left;
    margin-left: 20px;
    color: rgba(14, 123, 204, 0.77);
    margin-top: 10px;
  }

  .c_right h3 {
    text-align: left;
    margin-left: 20px;
    color: rgba(14, 123, 204, 0.77);
    margin-top: 10px;
  }

  .c_left_head {
    margin-top: 20px;
    height: 36px;
    line-height: 36px;
  }

  .c_left_head li {
    margin-left: 30px;
  }

  .soundCode {
    display: inline-block;
    width: 50px;
    background: #fff;
    border: 1px solid #666;
  }

  .left_table {
    margin: 20px 50px;
    height: 210px;
    background: #fff;
    overflow-y: auto;
    box-shadow: inset 3px 3px 5px 3px rgba(101, 118, 122, 0.7);
  }

  .left_table h4 {
    margin: 20px 30px;
    font-weight: 400;
    text-align: left;
    color: #2169f5;
  }

  .left_table div {
    text-align: left;
    margin-top: 5px;
    margin-left: 20px;
    font-weight: 400;
  }

  .content {
    background: #bdd7ee;
    border-radius: 5px;
  }

  .c_left table {
    width: 500px;

  }

  .c_left td {
    width: 40px;
    margin-left: 10px;
  }

  .c_left_head ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .c_left_head li {
    float: left;
  }

  .message {
    height: 38px;
    font-size: 18px;
    line-height: 38px;
    text-align: left;
    width: 200px;
    background: #fff;
    border: 1px solid #000;
    margin: 5px 0 5px 20%;
  }

  .message span, .message label {
    display: inline-block;
    line-height: 44px;
  }

  .row table td {
    height: 25px;
    line-height: 25px;
  }
</style>
