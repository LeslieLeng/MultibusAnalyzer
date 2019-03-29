<template>
  <div style="display: flex;flex-direction: row">
    <div class="left">
      <div class="frameTree">
        <h2>1553B BC控制</h2>
        <el-tree class="treeStyle" default-expand-all ref="tree" :expand-on-click-node="false" :data="simaluteTree"
                 @node-click="handleNodeClick"></el-tree>
      </div>
    </div>
    <div class="right">
      <!-----------------------------------设置frame------------------------->
      <div class="Frame">
        <div class="row frameContral">
          <div>
            <el-button @click="addFrame" style="height: 50px;margin:10px 50px 20px 20px" type="primary">增添帧</el-button>
          </div>
          <div>
            <div>
              <el-radio v-model="frame.sendMode" label="cycle">周期</el-radio>
            </div>
            <div>
              <el-radio v-model="frame.sendMode" label="once">单次</el-radio>
            </div>
          </div>
          <div>
            <div>
              <label>帧周期(ms)</label>
              <el-input style="width: 200px" size="small" onkeyup="value=value.replace(/[^\d]/g,'')"
                        v-model="frame.frameTime" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <label>帧个数</label>
              <el-input :disabled="true" style="width: 200px;height: 50px" size="small" v-model="frameCount"
                        placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div v-if="frame.sendMode=='once'">
            <el-button @click="startOneSimulate" v-if="isSimulate"
                       style="height: 50px;width: 100px;margin:10px 0px 20px 40px" type="success">单次发送
            </el-button>
          </div>
          <div v-if="frame.sendMode=='cycle'">
            <el-button @click="startSimulate" v-if="isSimulate"
                       style="height: 50px;width: 100px;margin:10px 0px 20px 40px" type="success">启动BC
            </el-button>
            <el-button @click="stopSimulate" v-if="!isSimulate"
                       style="height: 50px;width: 100px;margin:10px 0px 20px 40px" type="danger">停止BC
            </el-button>
          </div>
        </div>
        <div style=" margin: 0 auto; text-align: left;width: 800px">
          <el-button @click="delAllFrame" style="height: 50px;margin:10px 0px 20px 20px" type="primary">清除删除所有帧/Mags
          </el-button>
        </div>
      </div>
      <!-----------------------------------设置Command------------------------->
      <div class="Command">
        <div style="width:800px;margin: 0 auto">
          <div class="row height">
            <label style="width: 70px;text-align:left;margin-left: 20px">类型:</label>
            <el-select @change="watchFlag=true" size="small" v-model="busType" placeholder="请选择">
              <el-option label="BC-RT" value="BC-RT"></el-option>
              <el-option label="RT-BC" value="RT-BC"></el-option>
              <el-option label="RT-RT" value="RT-RT"></el-option>
              <el-option label="MODE" value="MODE"></el-option>
            </el-select>
            <label style="width: 70px;margin-left: 20px">间隔(us):</label>
            <el-input size="small" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="gap"
                      style="width: 150px"></el-input>
            <div style="margin-left: 20px">
              <el-radio v-model="network" label="A">总线A</el-radio>
              <el-radio v-model="network" label="B">总线B</el-radio>
            </div>
          </div>
          <div class="row height">
            <span style="width: 70px;text-align:left;margin-left: 20px">CMD1:</span>
            <label style="margin-right: 20px">终端地址</label>
            <el-select :disabled=forbid_BCAddress1 @change="createSubAddress1" v-model="BCAddress1"
                       style="width: 140px;margin-right:10px" size="small" placeholder="请选择">
              <el-option v-for="item in option_BCAddress1" :label="item.value" :key="item.value"
                         :value="item.value"></el-option>
            </el-select>
            <label style="margin-right: 20px">T/R</label>
            <el-select :disabled=forbid_TR1 v-model="TR1" style="width: 140px;margin-right:10px" size="small"
                       placeholder="请选择">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
            <label style="margin-right: 20px">子地址</label>
            <el-select :disabled=forbid_SubAddress1 v-model="SubAddress1" style="width: 140px;margin-right:10px"
                       size="small" placeholder="请选择">
              <el-option v-for="item in option_SubAddress1" :label="item.value" :key="item.value"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="row height">
            <span style="width: 70px;text-align:left;margin-left: 20px">CMD2:</span>
            <label style="margin-right: 20px">终端地址</label>
            <el-select :disabled=forbid_BCAddress2 @change="createSubAddress2" v-model="BCAddress2"
                       style="width: 140px;margin-right:10px" size="small" placeholder="请选择">
              <el-option v-for="item in option_BCAddress2" :label="item.value" :key="item.value"
                         :value="item.value"></el-option>
            </el-select>
            <label style="margin-right: 20px">T/R</label>
            <el-select :disabled=forbid_TR2 v-model="TR2" style="width: 140px;margin-right:10px" size="small"
                       placeholder="请选择">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
            <label style="margin-right: 20px">子地址</label>
            <el-select :disabled=forbid_SubAddress2 v-model="SubAddress2" style="width: 140px;margin-right:10px"
                       size="small" placeholder="请选择">
              <el-option v-for="item in option_SubAddress2" :label="item.value" :key="item.value"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="row height">
            <label style="width: 70px;text-align:left;margin-left: 20px">Buffer:</label>
            <el-input v-model="Buffer" size="small" style="width: 200px;"></el-input>
            <label style="margin-left: 56px">1553B Mode Code:</label>
            <el-select :disabled=forbid_ModeCode v-model="ModeCode" style="margin-left:30px" size="small"
                       placeholder="请选择">
              <el-option v-for="item in option_ModeCode" :label="item.label" :key="item.value"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <div style="width: 800px;margin:20px auto;text-align: right">
            <el-button :disabled=allowAdd @click="addMsg" type="primary">添加</el-button>
            <el-button v-show="!allowDel" @click="saveMsg" type="warning">保存</el-button>
          </div>

        </div>
      </div>
      <!-----------------------------------编辑数据---------------------------->
      <div class="EditData">
        <el-button :disabled=allowEdit style="margin-left: 80px;height: 70px;width: 120px;" @click="EditData"
                   type="primary">编辑数据
        </el-button>
        <!-----------------设置数据Start---------------->
        <el-dialog title="编辑数据" :visible.sync="centerDialogVisible" width="900px" center>
          <div class="selfInput">
            <label>Buffer Name:</label>
            <el-input size="small" style="width: 150px" v-model="BufferName"></el-input>
            <label style="margin-left: 100px">Size:</label>
            <el-input-number size="small" @change="selfSizeChange" style="width: 200px" v-model="Size"
                             controls-position="right" :max="32" :min="0"></el-input-number>
          </div>
          <div class="selfBtn">
            <el-button style="margin-left: 0" @click="clearSelfData" type="primary" plain>清空</el-button>
            <el-button type="primary" @click="randomData" plain>随机</el-button>
            <el-popover placement="bottom-end" width="320" v-model="isInput">
              <h3 style="width: 80px;margin: 20px auto">指定数据</h3>
              <label style="margin-left:20px">Data:(0x)</label>
              <el-input style="width: 200px" maxlength="4"
                        onkeyup="value=value.replace(/[^0-9a-fA-F]/g,'').toUpperCase()" v-model="myselfInputData"
                        size="small" placeholder="请输入16进制"></el-input>
              <div style="text-align: right; margin-top: 20px">
                <el-button size="mini" type="text" @click="isInput = false">取消</el-button>
                <el-button type="primary" size="mini" @click="inputSelfData">确定</el-button>
              </div>
              <el-button slot="reference" type="primary" plain>指定数据</el-button>
            </el-popover>
            <el-popover placement="bottom-end" width="300" v-model="isChange">
              <h3 style="width: 80px;margin: 20px auto">递增递减数据</h3>
              <div>
                <label style="margin-left:20px">启始值：(0x)</label>
                <el-input style="width: 200px" size="small" v-model="userDefinedData" maxlength="4"
                          onkeyup="value=value.replace(/[^0-9a-fA-F]/g,'').toUpperCase()"
                          placeholder="请输入起值"></el-input>
              </div>
              <div style="margin-top: 10px">
                <label style="margin-left:20px">公差：</label>
                <el-input style="width: 200px" size="small" maxlength="4" v-model="userDefinedDifference"
                          placeholder="-255 to 255"></el-input>
              </div>
              <div style="text-align: right; margin-top: 20px">
                <el-button size="mini" type="text" @click="isChange = false">取消</el-button>
                <el-button type="primary" size="mini" @click="inputImparityData">确定</el-button>
              </div>
              <el-button slot="reference" type="primary" plain>递增递减</el-button>
            </el-popover>
            <el-button type="primary" plain>本地数据</el-button>
          </div>
          <div class="selfContainer">
            <ul>
              <li class="title" style="width: 80px">#</li>
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
              <li class="title" style="width: 80px">{{column.title}}</li>
              <li v-for=" row in (column.dataRow)">
                <input maxlength="4" onkeyup="value=value.replace(/[^0-9a-fA-F]/g,'').toUpperCase()" :value="row">
              </li>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveUserConfigData">确 定</el-button>
  </span>
        </el-dialog>
        <!--故障注入-->
        <el-button :disabled=allowEdit @click="dialogVisible = true"
                   style="margin-left: 420px;height: 70px;width: 120px;" type="primary">注入故障
        </el-button>
        <el-dialog
          title="故障注入"
          :visible.sync="dialogVisible"
          width="30%"
          center>
          <div style="display: flex;flex-direction: row;padding: 0 20px">
            <div style="flex: 2">
              <h3>命令字</h3>
              <div style="margin-top: 20px">
                <el-checkbox label="No Error"></el-checkbox>
              </div>
              <div style="margin-top: 20px">
                <el-checkbox label="Parity" size="medium"></el-checkbox>
              </div>
              <div style="margin-top: 20px">
                <el-checkbox label="Gap" size="medium"></el-checkbox>
                <el-input size="mini" style="width: 100px"></el-input>
              </div>
            </div>
            <div style="flex: 1;margin-right: 20px">
              <h3>数据字</h3>
              <div style="margin-top: 20px">
                <el-checkbox label="No Error"></el-checkbox>
              </div>
              <div style="margin-top: 20px">
                <el-checkbox label="Parity" size="medium"></el-checkbox>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {

    name: "BCMode",
    data() {
      return {
        isSimulate: true,
        watchFlag: true,
        simaluteTree: [],
        handleNode: '',
        msgNode: '',
        //Frame
        frameCount: '0',
        frame: {
          sendMode: 'cycle',
          frameTime: '',
        },
        //Command
        allowAdd: true,
        allowDel: true,
        busType: '',
        gap: '',
        network: 'A',
        BCAddress1: '',
        TR1: '',
        SubAddress1: '',
        BCAddress2: '',
        TR2: '',
        SubAddress2: '',
        ModeCode: '',
        Buffer: '',
        //forbid
        forbid_BCAddress1: true,
        forbid_TR1: true,
        forbid_SubAddress1: true,
        forbid_BCAddress2: true,
        forbid_TR2: true,
        forbid_SubAddress2: true,
        forbid_ModeCode: true,
        //options
        option_BCAddress1: [],
        option_SubAddress1: [],
        option_BCAddress2: [],
        option_SubAddress2: [],
        option_ModeCode: [],
        //Buffer
        allowEdit: true,
        centerDialogVisible: false,
        dialogVisible: false,
        BufferName: '',
        Size: 32,
        dataCoulmn: [],
        selfData: [],
        isInput: false,
        isChange: false,
        myselfInputData: '',
        userDefinedDifference: '',
        userDefinedData: '',

      }
    },
    mounted() {
      this.getSimaluteTree()
      this.createOptions()
    },
    watch: {
      busType(val) {
        if (this.watchFlag) {
          this.BCAddress1 = '';
          this.TR1 = '';
          this.SubAddress1 = '';
          this.BCAddress2 = '';
          this.TR2 = '';
          this.SubAddress2 = '';
          this.ModeCode = '';
          switch (val) {
            case 'BC-RT':
              this.BCRTType();
              break;
            case 'RT-BC':
              this.RTBCType();
              break;
            case 'RT-RT':
              this.RTRTType();
              break;
            case 'MODE':
              this.MODEType();
              break;
          }
        }

      },
      ModeCode(val) {
        switch (val) {
          case '00000':
          case '00001':
          case '00010':
          case '00011':
          case '00100':
          case '00101':
          case '00110':
          case '00111':
          case '01000':
          case '10010':
          case '10011':
          case '10000':
            this.TR1 = 1;
            break;
          case '10001':
          case '10100':
          case '10101':
            this.TR1 = 0;
            break;
        }
      }
    },
    methods: {
      addFrame() {
        this.frameCount = parseInt(this.frameCount) + 1
        var node = this.$refs.tree.children[0].children
        node.push({
          label: 'Frame',
          type: 'Frame',
          children: []
        })
        this.allowAdd = true;
      },
      delAllFrame() {
        this.frameCount = 0
        this.allowAdd = true;
        this.$refs.tree.children[0].children = [];
      },
      // 选中当前行
      handleNodeClick(node) {
        this.emptyAll()
        if (node.type == 'Frame') {
          this.handleNode = node
          this.allowAdd = false
        } else if (node.type == 'Msg') {
          this.msgNode = node
          this.watchFlag = false
          this.allowAdd = true
          this.allowDel = false
          this.allowEdit = false
          switch (node.data.busType) {
            case 'BC-RT':
              this.BCRTType();
              break;
            case 'RT-BC':
              this.RTBCType();
              break;
            case 'RT-RT':
              this.RTRTType();
              break;
            case 'MODE':
              this.MODEType();
              break;
          }
          this.busType = node.data.busType;
          this.gap = node.data.gap;
          this.network = node.data.network;
          this.BCAddress1 = node.data.BCAddress1;
          this.TR1 = node.data.TR1;
          this.SubAddress1 = node.data.SubAddress1;
          this.BCAddress2 = node.data.BCAddress2;
          this.TR2 = node.data.TR2;
          this.SubAddress2 = node.data.SubAddress2;
          this.ModeCode = node.data.ModeCode;
          this.Buffer = node.data.Buffer;
        } else if (node.type == 'Buffer') {
          // this.EditData()
        }
      },
      //清空函数
      emptyAll() {
        this.allowAdd = true
        this.allowDel = true
        this.allowEdit = true
        this.busType = '';
        this.gap = '';
        this.network = 'A';
        this.BCAddress1 = '';
        this.TR1 = '';
        this.SubAddress1 = '';
        this.BCAddress2 = '';
        this.TR2 = '';
        this.SubAddress2 = '';
        this.ModeCode = '';
        this.Buffer = '';
      },
      //Command
      addMsg() {
        if (this.busType == '' || this.gap == '' || this.Buffer == '') {
          alert('请填写完整信息！')
          return false
        }
        this.handleNode.children.push({
          label: 'Msg' + '--' + this.busType + '--' + this.Buffer,
          type: 'Msg',
          data: {
            busType: this.busType,
            gap: this.gap,
            network: this.network,
            BCAddress1: this.BCAddress1,
            TR1: this.TR1,
            SubAddress1: this.SubAddress1,
            BCAddress2: this.BCAddress2,
            TR2: this.TR2,
            SubAddress2: this.SubAddress2,
            ModeCode: this.ModeCode,
            Buffer: this.Buffer,
          },
          children: [],
        })
      },
      saveMsg() {
        this.msgNode.label = 'Msg' + '--' + this.busType + '--' + this.Buffer;
        this.msgNode.type = 'Msg'
        this.msgNode.data = {
          busType: this.busType,
          gap: this.gap,
          network: this.network,
          BCAddress1: this.BCAddress1,
          TR1: this.TR1,
          SubAddress1: this.SubAddress1,
          BCAddress2: this.BCAddress2,
          TR2: this.TR2,
          SubAddress2: this.SubAddress2,
          ModeCode: this.ModeCode,
          Buffer: this.Buffer,
        }

      },
      BCRTType() {
        this.forbid_BCAddress1 = false
        this.forbid_TR1 = true
        this.forbid_SubAddress1 = false
        this.forbid_BCAddress2 = true
        this.forbid_TR2 = true
        this.forbid_SubAddress2 = true
        this.forbid_ModeCode = true
        this.TR1 = '0'
      },
      RTBCType() {
        this.forbid_BCAddress1 = false
        this.forbid_TR1 = true
        this.forbid_SubAddress1 = false
        this.forbid_BCAddress2 = true
        this.forbid_TR2 = true
        this.forbid_SubAddress2 = true
        this.forbid_ModeCode = true
        this.TR1 = '1'
      },
      RTRTType() {
        this.forbid_BCAddress1 = false
        this.forbid_TR1 = true
        this.forbid_SubAddress1 = false
        this.forbid_BCAddress2 = false
        this.forbid_TR2 = true
        this.forbid_SubAddress2 = false
        this.forbid_ModeCode = true
        this.TR1 = '0'
        this.TR2 = '1'
      },
      MODEType() {
        this.forbid_BCAddress1 = false
        this.forbid_TR1 = true
        this.forbid_SubAddress1 = false
        this.forbid_BCAddress2 = true
        this.forbid_TR2 = true
        this.forbid_SubAddress2 = true
        this.forbid_ModeCode = false
      },
      getSimaluteTree() {
        this.simaluteTree = [{
          label: '1553B',
          id: '1',
          children: []
        }]
      },
      createOptions() {
        for (let i = 0; i < 32; i++) {
          this.option_BCAddress1.push({value: i})
          this.option_BCAddress2.push({value: i})
        }
        this.option_ModeCode = [{
          label: '动态总线控制（00000）',
          value: '00000'
        }, {
          label: '同步（00001）',
          value: '00001'
        }, {
          label: '发送上一状态字（00010）',
          value: '00010'
        }, {
          label: '启动自测试（00011）',
          value: '00011'
        }, {
          label: '发送器关闭（00100）',
          value: '00100'
        }, {
          label: '取消发送器关闭（00101）',
          value: '00101'
        }, {
          label: '禁止终端标志位（00110）',
          value: '00110'
        }, {
          label: '取消禁止远程标志位（00111）',
          value: '00111'
        }, {
          label: '复位远程终端（01000）',
          value: '01000'
        }, {
          label: '发送矢量字（10000）',
          value: '10000'
        }, {
          label: '不带数据字的同步（10001）',
          value: '10001'
        }, {
          label: '带数据字的同步（10010）',
          value: '10010'
        }, {
          label: '发送字检测字（10011）',
          value: '10011'
        }, {
          label: '选定的发送器关闭（10100）',
          value: '10100'
        }, {
          label: '取消选定的发送器关闭（10101）',
          value: '10101'
        }]
      },
      createSubAddress1() {
        this.option_SubAddress1 = []
        this.SubAddress1 = ''
        for (let i = 0; i < 32; i++) {
          if (this.BCAddress1 == i) {
          } else {
            this.option_SubAddress1.push({value: i})
          }
        }
      },
      createSubAddress2() {
        this.option_SubAddress2 = []
        this.SubAddress2 = ''
        for (let i = 0; i < 32; i++) {
          if (this.BCAddress2 == i) {
          } else {
            this.option_SubAddress2.push({value: i})
          }
        }
      },
      //Buffer
      EditData() {
        var node = this.msgNode.children
        if (node.length != 0) {
          this.selfData = node[0].data
          this.BufferName = node[0].label.split('-')[1]
          this.Size = node[0].size
        } else {
          this.selfData = []
          this.BufferName = ''
          this.Size = 32
        }
        this.centerDialogVisible = true
        this.getOriginalData()
      },
      /*---------------------自定义数据------------------------------*/
      getOriginalData() {
        var data = this.selfData
        var column = []
        for (let i = 0; i < data.length; i += 8) {
          var num = (i * 2).toString(16)
          var dlen = num.length
          while (dlen < 4) {
            num = "0" + num;
            dlen++;
          }
          var row = data.slice(i, i + 8)
          var obj = {title: '0x' + num, dataRow: row}
          column.push(obj)
        }
        this.dataCoulmn = column
      },
      // Size改变
      selfSizeChange(val) {
        var len = val
        var arr = []
        this.selfData = arr
        for (let i = 0; i < len; i++) {
          arr.push('0000')
        }
        this.selfData = arr
        this.getOriginalData()
      },
      // 清空数据
      clearSelfData() {
        var len = this.Size
        var arr = []
        this.selfData = arr
        for (let i = 0; i < len; i++) {
          arr.push('0000')
        }
        this.selfData = arr
        this.getOriginalData()
      },
      //随机数据
      randomData() {
        var len = this.Size
        var arr = []
        this.selfData = arr
        for (let i = 0; i < len; i++) {
          var num = Math.round(Math.random() * 65535).toString(16)
          var numlen = num.length
          while (numlen < 4) {
            num = "0" + num;
            numlen++;
          }
          arr.push(num.toUpperCase())
        }
        this.selfData = arr
        this.getOriginalData()
      },
      //指定数据
      inputSelfData() {
        this.isInput = false
        var len = this.Size
        var arr = []
        this.selfData = arr
        for (let i = 0; i < len; i++) {
          var num = this.myselfInputData
          var numlen = num.length
          while (numlen < 4) {
            num = "0" + num;
            numlen++;
          }
          arr.push(num.toUpperCase())
        }
        this.selfData = arr
        this.getOriginalData()
      },
      //递增数据
      inputImparityData() {
        this.isChange = false
        var len = this.Size
        var arr = []
        this.selfData = arr
        var temp2 = this.userDefinedData
        for (let i = 0; i < len; i++) {
          var num = ((parseInt(temp2, 16) + parseInt(this.userDefinedDifference) * i) & 65535)
          var temp = num.toString(16)
          var numlen = temp.length
          while (numlen < 4) {
            temp = "0" + temp;
            numlen++;
          }
          arr.push(temp.toUpperCase())
        }
        this.selfData = arr
        this.getOriginalData()
      },
      saveUserConfigData() {
        if (this.BufferName == '') {
          alert('请填写负载名称！')
          return false
        }
        this.centerDialogVisible = false
        if (this.msgNode.children.length == 0) {
          this.msgNode.children.push({
            label: 'Buffer-' + this.BufferName,
            type: 'Buffer',
            data: this.selfData,
            size: this.Size
          })
        } else {
          this.msgNode.children[0].label = 'Buffer-' + this.BufferName
          this.msgNode.children[0].data = this.selfData
          this.msgNode.children[0].size = this.Size
        }
      },
      //发送数据
      startSimulate() {
        this.isSimulate = false
        console.log(this.simaluteTree)
        // axios.post('', {
        //   BusType: '1553B'
        // }).then((result) => {
        //   console.log(result)
        // }).catch((err) => {
        //   console.log(err)
        // })
      },
      stopSimulate() {
        this.isSimulate = true
      },
      startOneSimulate() {
        console.log('单次发送')
      }
    }
  }
</script>

<style scoped>
  /*-------------------EditData-----------------------*/
  .title {
    font-weight: 700;
    color: rgba(14, 123, 204, 0.77);
  }

  .selfContainer ul {
    text-align: center;
    height: 50px;
    line-height: 40px;
    min-width: 640px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .selfContainer li {
    width: 80px;
    float: left;
  }

  .selfContainer li input {
    width: 60px;
    height: 26px;
    text-align: center;
  }

  .selfContainer {
    padding: 20px 40px;
    height: 260px;
    background: #fff;
    margin: 0 auto;
    width: 760px;
    overflow-y: auto;
    box-shadow: inset 3px 3px 5px 3px rgba(101, 118, 122, 0.7);
  }

  .el-popover label {
    display: inline-block;
    width: 65px;
  }

  .selfBtn {
    width: 800px;
    text-align: center;
    margin: 20px auto;
  }

  .selfBtn button {
    width: 100px;
    margin-left: 50px;
  }

  .selfInput {
    width: 740px;
    text-align: left;
    margin: 0 auto;
    padding: 30px;
    border-bottom: 2px dashed #666;
  }

  .EditData {
    width: 800px;
    margin: 30px auto;
    text-align: left;

  }

  /*-------------------command------------------------*/
  .height {
    margin-top: 25px;
    line-height: 32px;
  }

  .Command {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #666;
    border-radius: 20px;
    background: #fff;
    box-shadow: 5px 5px 3px #666;
  }

  /*---------------------Frame------------------------*/
  .Frame {
    padding: 10px;
    border: 1px solid #666;
    border-radius: 20px;
    background: #fff;
    box-shadow: 5px 5px 3px #666;
  }

  .frameContral label {
    display: inline-block;
    text-align: left;
    width: 120px;
  }

  .frameContral {
    width: 800px;
    height: 80px;
    line-height: 40px;
    margin: 0 auto;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .left {
    padding-top: 100px;
  }

  .treeStyle {
    height: 500px;
    overflow: auto;
  }

  .frameTree {
    padding: 10px 20px 0px;
    width: 260px;
    height: 590px;
    background: #fff;
    box-shadow: 5px 5px 3px #666;
  }

  .right {
    padding: 30px;
    margin-left: 30px;
    background: rgba(255, 255, 255, 0.5);
    width: 100%;
    height: 640px;
    box-shadow: 5px 5px 3px #666;
  }
</style>
