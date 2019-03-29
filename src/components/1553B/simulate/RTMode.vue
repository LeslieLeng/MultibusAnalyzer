<template>
  <div style="display: flex;flex-direction: row">
    <div class="left">
      <div class="frameTree">
        <h2>1553B RT控制</h2>
        <el-tree class="treeStyle" default-expand-all ref="tree" :expand-on-click-node="false" :data="simaluteTree"
                 @node-click="handleNodeClick"></el-tree>
      </div>
    </div>
    <div class="right">
      <!----------------------RTconfig------------------------------>
      <div class="RTconfig">
        <div class="contral" style="margin-top: 10px">
          <el-popover placement="bottom-end" width="320" v-model="single">
            <h3 style="width: 80px;margin: 20px auto">指定RT</h3>
            <label style="margin-left:20px">RT:(0-31)</label>
            <el-input-number size="small" @change="selfSizeChange" style="width: 200px" v-model="RTID"
                             controls-position="right" :max="31" :min="0"></el-input-number>
            <div style="text-align: right; margin-top: 20px">
              <el-button size="mini" type="text" @click="single = false">取消</el-button>
              <el-button type="primary" size="mini" @click="addOneRT">确定</el-button>
            </div>
            <el-button slot="reference" type="primary">增加一个RT</el-button>
          </el-popover>
          <el-button type="primary" @click="addAllRT">增加所有RT</el-button>
          <el-button @click="startSimulate" v-if="isSimulate" type="success">启动RTs</el-button>
          <el-button @click="stopSimulate" v-if="!isSimulate" type="danger">停止RTs</el-button>
        </div>
        <div class="contral">
          <el-button style="margin-left: 40px;height: 50px;width: 200px" @click="delAllRT" size="primary">清除/删除所有RT
          </el-button>
        </div>
      </div>
      <!---------------------设置State-------------------------------->
      <div class="state">
        <div class="stateSetting">
          <label style="margin-left: 10px">RT Response Time:</label>
          <el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="ResTime" maxlength="5" size="mini"
                    style=" width: 70px"></el-input>
          <span>us</span>
        </div>
        <div class="stateTable">
          <table>
            <tr>
              <td>RT Address</td>
              <td>ME</td>
              <td>IN</td>
              <td>SR</td>
              <td>Reserver</td>
              <td>BC</td>
              <td>BU</td>
              <td>SF</td>
              <td>DB</td>
              <td>TF</td>
            </tr>
            <tr>
              <td>
                <el-input v-model="RTAddress" :disabled="true" size="mini" style="width: 100px"></el-input>
              </td>
              <td>
                <el-input v-model="ME" :disabled="true" size="mini" style="width: 50px"></el-input>
              </td>
              <td>
                <el-input v-model="IN" size="mini" style="width: 50px" maxlength="1"
                          onkeyup="value=value.replace(/[^0-1]/g,'')"></el-input>
              </td>
              <td>
                <el-input v-model="SR" size="mini" style="width: 50px" maxlength="1"
                          onkeyup="value=value.replace(/[^0-1]/g,'')"></el-input>
              </td>
              <td>
                <el-input v-model="Reserver" :disabled="true" size="mini" style="width: 100px"></el-input>
              </td>
              <td>
                <el-input v-model="BC" :disabled="true" size="mini" style="width: 50px"></el-input>
              </td>
              <td>
                <el-input v-model="BU" size="mini" style="width: 50px" maxlength="1"
                          onkeyup="value=value.replace(/[^0-1]/g,'')"></el-input>
              </td>
              <td>
                <el-input v-model="SF" size="mini" style="width: 50px" maxlength="1"
                          onkeyup="value=value.replace(/[^0-1]/g,'')"></el-input>
              </td>
              <td>
                <el-input v-model="DB" :disabled="true" size="mini" style="width: 50px"></el-input>
              </td>
              <td>
                <el-input v-model="TF" size="mini" style="width: 50px" maxlength="1"
                          onkeyup="value=value.replace(/[^0-1]/g,'')"></el-input>
              </td>
            </tr>
          </table>
        </div>
        <div style="width: 800px;margin:20px auto;text-align: right">
          <el-button :disabled="allowAdd" @click="addMsg" type="primary">添加</el-button>
          <el-button :disabled="allowDel" @click="delMsg" type="danger">删除</el-button>
        </div>
      </div>
      <!-----------------------------------编辑数据---------------------------->
      <div class="EditData">
        <el-button :disabled="allowEdit" style="margin-left: 80px;height: 70px;width: 120px;" @click="EditData"
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
        <el-button :disabled="allowEdit" @click="dialogVisible = true"
                   style="margin-left: 420px;height: 70px;width: 120px;" type="primary">注入故障
        </el-button>
        <el-dialog
          title="故障注入"
          :visible.sync="dialogVisible"
          width="30%"
          center>
          <div style="display: flex;flex-direction: row;padding: 0 20px">
            <div style="flex: 2">
              <h3>状态字</h3>
              <div style="margin-top: 20px">
                <el-checkbox label="No Error"></el-checkbox>
              </div>
              <div style="margin-top: 20px">
                <el-checkbox label="Parity" size="medium"></el-checkbox>
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
    name: "RTMode",
    data() {
      return {
        isSimulate: true,
        simaluteTree: [],
        handleNode: '',
        // State
        single: false,
        RTID: '',
        ResTime: '',
        RTAddress: '',
        ME: '0',
        IN: '1',
        SR: '0',
        Reserver: '000',
        BC: '0',
        BU: '0',
        SF: '0',
        DB: '0',
        TF: '0',
        allowAdd: true,
        allowDel: true,
        allowEdit: true,
        //Buffer
        dialogVisible: false,
        centerDialogVisible: false,
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
    },
    methods: {
      getSimaluteTree() {
        this.simaluteTree = [{
          label: '1553B',
          id: '1',
          children: []
        }]
      },
      // 选中当前行
      handleNodeClick(node) {
        if (node.type == 'State') {
          this.handleNode = node
          this.emptyState()
          var temp = parseInt(node.id.split('-')[1]).toString(2);
          var dlen = temp.length;
          while (dlen < 5) {
            temp = "0" + temp;
            dlen++;
          }
          try {
            this.ResTime = node.children[0].data.ResTime;
            this.IN = node.children[0].data.IN;
            this.SR = node.children[0].data.SR;
            this.BU = node.children[0].data.BU;
            this.SF = node.children[0].data.SF;
            this.TF = node.children[0].data.TF;
          } catch (e) {

          }
          this.RTAddress = temp;
          this.allowAdd = false
          if (node.children.length != 0) {
            this.allowDel = false
            this.allowEdit = false
          }
        }

      },
      addOneRT() {
        this.single = false
        var node = this.$refs.tree.children[0].children
        var arr = []
        for (let i = 0; i < node.length; i++) {
          arr.push(node[i].id.split('-')[1])
        }
        if (arr.indexOf(this.RTID.toString()) != -1) {
          alert('该RT已存在！')
          return false
        }
        var temp = this.RTID
        if (temp < 10) {
          temp = '0' + temp
        }
        node.push({
          id: '1-' + this.RTID,
          label: 'RT ' + temp,
          type: 'State',
          children: []
        })
        this.emptyState()
      },
      addAllRT() {
        var node = this.$refs.tree.children[0].children
        var arr = {}
        for (let i = 0; i < node.length; i++) {
          arr[node[i].id.split('-')[1]] = node[i]
        }
        for (let i = 0; i < 32; i++) {
          var temp = i
          if (temp < 10) {
            temp = '0' + temp
          }
          if (!arr.hasOwnProperty(i.toString())) {
            node.push({
              id: '1-' + i,
              label: 'RT ' + temp,
              type: 'State',
              children: []
            })
          } else {
            var pos = node.indexOf(arr[i.toString()])
            node.splice(pos, 1)
            node.push(arr[i.toString()])
          }
        }
      this.emptyState()
    },
    delAllRT() {
      this.$refs.tree.children[0].children = [];
      this.emptyState()
    },
    emptyState() {
      this.allowAdd = true;
      this.allowEdit = true
      this.allowDel = true;
      this.ResTime = '';
      this.RTAddress = '';
      this.ME = '0';
      this.IN = '1';
      this.SR = '0';
      this.Reserver = '000';
      this.BC = '0';
      this.BU = '0';
      this.SF = '0';
      this.DB = '0';
      this.TF = '0';
    },
    /*----------------------编辑状态字-------------------------*/
    addMsg() {
      if (this.ResTime == '' || this.IN == '' || this.SR == '' || this.BU == '' || this.SF == '') {
        alert('请填写完整信息！')
        return false
      }
      this.allowDel = false
      this.allowEdit = false
      if (this.handleNode.children.length == 0) {
        this.handleNode.children.push({
          label: 'Msg',
          type: 'Msg',
          data: {
            ResTime: this.ResTime,
            IN: this.IN,
            SR: this.SR,
            BU: this.BU,
            SF: this.SF,
            TF: this.TF,
          },
          children: [],
        })
      }
    },
    delMsg() {
      this.handleNode.children = []
      this.allowDel = true
      this.allowEdit = true
    },
    //Buffer
    EditData() {
      var node = this.handleNode.children[0].children
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
      if (this.handleNode.children[0].children.length == 0) {
        this.handleNode.children[0].children.push({
          label: 'Buffer-' + this.BufferName,
          type: 'Buffer',
          data: this.selfData,
          size: this.Size
        })
      } else {
        this.handleNode.children[0].children[0].label = 'Buffer-' + this.BufferName
        this.handleNode.children[0].children[0].data = this.selfData
        this.handleNode.children[0].children[0].size = this.Size
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
  }
  }
</script>
<style>
  .stateTable .el-input__inner {
    text-align: center;
  }
</style>
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
    margin: 60px auto;
    text-align: left;

  }

  /*--------------------------------State----------------------------*/
  .state {
    margin-top: 40px;
    padding: 10px;
    border: 1px solid #666;
    border-radius: 20px;
    background: #fff;
    box-shadow: 5px 5px 3px #666;
  }

  .state .stateTable, .state .stateSetting {
    width: 800px;
    margin: 10px auto;

  }

  .state .stateSetting {
    text-align: left;
  }

  .state .stateTable {
    margin-top: 50px;
  }

  .state .stateTable input {
    text-align: center;
  }

  /*--------------------RTconfig--------------------------------------*/
  .RTconfig .contral {
    width: 800px;
    height: 70px;
    line-height: 40px;
    margin: 10px auto;
    text-align: left;
  }

  .RTconfig .contral button {
    width: 140px;
    height: 50px;
    margin-left: 40px;
  }

  .RTconfig .contral button + button {
    margin-left: 130px;
  }

  .RTconfig {
    padding: 10px;
    border: 1px solid #666;
    border-radius: 20px;
    background: #fff;
    box-shadow: 5px 5px 3px #666;
  }

  .left {
    padding-top: 100px;
  }

  .frameTree {
    padding: 10px 20px 0px;
    width: 260px;
    height: 590px;
    background: #fff;
    box-shadow: 5px 5px 3px #666;
  }

  .treeStyle {
    height: 500px;
    overflow: auto;
  }

  .right {
    padding: 30px;
    margin-left: 30px;
    background: #fff;
    width: 100%;
    height: 640px;
    box-shadow: 5px 5px 3px #666;
    background: rgba(255, 255, 255, 0.5);
  }
</style>
