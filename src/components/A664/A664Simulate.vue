<template>
  <div style="padding: 30px;display: flex">
    <div class="left">
      <h2>ARINC-664 Setting</h2>
      <el-tree class="treeStyle" default-expand-all ref="tree" :data="seettingTree" :expand-on-click-node="false"
               @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="right">
      <div v-show="setting===0">
      </div>
      <!----------------------------------------终端配置------------------------------------->
      <div v-show="setting===1">
        <div class="EScontent">
          <h2>Es Configuration(终端配置)</h2>
          <div class="ESid">
            <label>Es Id </label>
            <el-input-number size="mini" v-model="num" controls-position="right" :min="0"></el-input-number>
          </div>
          <div style="margin-left: 50px">
            <el-checkbox @change="enabledES" v-model="enabled">Enabled(激活)</el-checkbox>
            <div class="ESLabel">
              <label>Name</label>
              <el-input :disabled="!enabled" placeholder="请输入终端名称！" style="width: 386px" v-model="EsName"
                        clearable></el-input>
            </div>
            <div class="ESLabel">
              <label>MAC Adress</label>
              <el-input name="MAC" :disabled="!enabled" maxlength="2"
                        style="width: 45px; margin-right: 10px;" v-model="MAC1"></el-input>
              :
              <el-input name="MAC" :disabled="!enabled" maxlength="2"
                        style="width: 45px; margin-right: 10px;" v-model="MAC2"></el-input>
              :
              <el-input name="MAC" :disabled="!enabled" maxlength="2"
                        style="width: 45px; margin-right: 10px;" v-model="MAC3"></el-input>
              :
              <el-input name="MAC" :disabled="!enabled" maxlength="2"
                        style="width: 45px; margin-right: 10px;" v-model="MAC4"></el-input>
              :
              <el-input name="MAC" :disabled="!enabled" maxlength="2"
                        style="width: 45px; margin-right: 10px;" v-model="MAC5"></el-input>
              :
              <el-input name="MAC" :disabled="!enabled" maxlength="2"
                        style="width: 45px; margin-right: 10px;" v-model="MAC6"></el-input>
            </div>
          </div>
          <div style="text-align: right;margin-top: 300px">
            <el-button :disabled="!enabled" style="margin-right: 10%" @click="saveConfig" type="primary">下一步</el-button>
          </div>
        </div>
      </div>
      <!----------------------------------------VL配置----------------------------------------->
      <div v-show="setting===2">
        <!--VLconfig-->
        <div class="VLcontent">
          <h3>Output VL Configurations</h3>
          <label> 操作：</label>
          <el-button type="success" size="small" @click="addVL" icon="el-icon-plus" circle></el-button>
          <el-button :disabled="isVLRow" size="small" @click="delVL" type="danger" icon="el-icon-minus"
                     circle></el-button>
          <div style="padding:10px 20px">
            <el-table :data="VLtableData"
                      height="275"
                      border
                      @row-click="clickVLrow"
                      :header-cell-style="{background:'#74bbd5',color:'#fff'}"
                      :highlight-current-row=true style="width: 100%">
              <el-table-column align="center" prop="VLID" label="ID" min-width="80">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.VLID"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="VLName" label="Name" min-width="180">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.VLName"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="Network" label="Network" min-width="130">
                <template slot-scope="scope">
                  <el-select size="small" v-model="scope.row.Network" placeholder="请选择">
                    <el-option label="网络A" value="A"></el-option>
                    <el-option label="网络B" value="B"></el-option>
                    <el-option label="Both" value="Both"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column  prop="isSN" label="Sequence Numbering" align="center" min-width="180">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.isSN"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column  prop="BAG" label="BAG" align="center" min-width="180">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.BAG"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="MaxFrameLength" label="最大帧长度" align="center" min-width="180">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.MaxFrameLength"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="InitSN" label="Initial Sequence Id" align="center" min-width="180">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.InitSN"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!--TXconfig-->
        <div class="TXcontent">
          <h3>Tx Port Configuration</h3>
          <label> 操作：</label>
          <el-button :disabled="isVLRow" type="success" size="small" @click="addTX" icon="el-icon-plus"
                     circle></el-button>
          <el-button :disabled="isTXRow" size="small" @click="delTX" type="danger" icon="el-icon-minus"
                     circle></el-button>
          <div style="padding:10px 20px">
            <el-table :data="TXtableData"
                      height="275"
                      border
                      @row-click="clickTXrow"
                      :header-cell-style="{background:'#74bbd5',color:'#fff'}"
                      :highlight-current-row=true style="width: 100%">
              <el-table-column align="center" prop="TXID" label="ID" min-width="80">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.TXID"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="TXName" label="Name" min-width="130">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.TXName"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="PortType" label="端口类型" min-width="130">
                <template slot-scope="scope">
                  <el-select size="small" v-model="scope.row.PortType" placeholder="请选择">
                    <el-option label="Samping" value="Samping"></el-option>
                    <el-option label="Queuing" value="Queuing"></el-option>
                    <el-option label="SPA" value="SPA"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="原始数据" min-width="100">
                <template slot-scope="scope">
                  <el-button @click="openSetting(scope.row)" size="mini" type="primary" plain>Setting
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="MaxMessageSize" label="Max Message Size" min-width="150">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.MaxMessageSize"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="SrcAddr" label="源IP地址" min-width="130">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.SrcAddr"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="SrcPort" label="源UDP端口" min-width="130">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.SaPort"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="DstAddr" label="目的IP地址" min-width="130">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.DstAddr"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="DstPort" label="目的UDP端口" min-width="130">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.DstPort"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="SubVL" label="SubVL" min-width="130">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.SubVL"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-----------------设置数据Start---------------->
        <el-dialog title="自定义数据" :visible.sync="centerDialogVisible" width="900px" center>
          <div class="selfInput">
            <div>
              <label>Rate:</label>
              <el-select size="small" v-model="selfRate" placeholder="请选择">
                <el-option label="50Hz" value="50"></el-option>
                <el-option label="25Hz" value="25"></el-option>
                <el-option label="12.5Hz" value="12.5"></el-option>
                <el-option label="6.25Hz" value="6.25"></el-option>
                <el-option label="3.125Hz" value="3.125"></el-option>
                <el-option label="1.5625Hz" value="1.5625"></el-option>
              </el-select>
              <label style="margin-left: 100px">Messages Per Frame:</label>
              <el-input size="small" onkeyup="value=value.replace(/[^/d]/g,'')" style="width: 200px"
                        v-model="selfPerFrame"></el-input>
            </div>
            <div style="margin-top: 20px">
              <label>Size:</label>
              <el-input-number size="small" style="width: 200px" @change="selfSizeChange" v-model="selfSize"
                               controls-position="right"
                               :min="0"></el-input-number>
            </div>
          </div>
          <div class="selfBtn">
            <el-button style="margin-left: 0" @click="clearSelfData" type="primary" plain>清空</el-button>
            <el-button type="primary" @click="randomData" plain>随机</el-button>
            <el-popover placement="bottom-end" width="320" v-model="isInput">
              <h3 style="width: 80px;margin: 20px auto">指定数据</h3>
              <label style="margin-left:20px">Data:(0x)</label>
              <el-input style="width: 200px" maxlength="2"
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
                <el-input style="width: 200px" size="small" v-model="userDefinedData" maxlength="2"
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
                <input maxlength="2" onkeyup="value=value.replace(/[^0-9a-fA-F]/g,'').toUpperCase()" :value="row">
              </li>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveUserConfigData">确 定</el-button>
  </span>
        </el-dialog>
        <!---------------------设置数据End------------->
        <div style="display: flex;margin-top: 10px;margin-right: 80px">
          <div style="flex: 1">
            <el-button style="margin-left: 20px" type="primary" @click="lastStep" size="medium">上一步</el-button>
          </div>
          <div style="flex: 1;text-align: right">
            <el-button size="medium" @click="sendData" type="primary">发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import store from '../store'
  import axios from 'axios'
  export default {
    name: "A664Simulate",
    data() {
      return {
        seettingTree: [],
        setting: 1,
        EsId: '',
        //终端
        EsName: "",
        num: 0,
        enabled: true,
        MAC1: '',
        MAC2: '',
        MAC3: '',
        MAC4: '',
        MAC5: '',
        MAC6: '',
        // VL
        VLrow: '',
        isVLRow: true,
        VLtableData: [],
        VLIDCount: 0,
        //TX
        TXrow: '',
        isTXRow: true,
        TXtableData: [],
        TXIDCount: 0,
        // 自定义数据
        centerDialogVisible: false,
        selfRate: '50',
        selfPerFrame: 1,
        selfSize: 0,
        dataCoulmn: [],
        selfData: [],
        isInput: false,
        isChange: false,
        myselfInputData: '',
        userDefinedDifference: '',
        userDefinedData: '',
      }
    },
    watch: {
      MAC1(cur){
        this.MAC1 = cur.toUpperCase()
      },
      MAC2(cur){
        this.MAC2 = cur.toUpperCase()
      },
      MAC3(cur){
        this.MAC3 = cur.toUpperCase()
      },
      MAC4(cur){
        this.MAC4 = cur.toUpperCase()
      },
      MAC5(cur){
        this.MAC5 = cur.toUpperCase()
      },
      MAC6(cur){
        this.MAC6 = cur.toUpperCase()
      },
      num(curVal) {
        var ids = []
        var node = this.$refs.tree.children[0].children[0].children[0].children
        for (let i = 0; i < node.length; i++) {
          ids.push(node[i].id)
        }
        if (ids.indexOf(curVal) != -1) {
          this.EsId = this.num
        }
        if (curVal == this.EsId) {
          this.enabled = true
        } else {
          this.enabled = false
        }
      }
    },
    mounted() {
      this.getTree()
      this.goNextInput()
    },
    methods: {
      goNextInput() {
        let txts = $("input[name='MAC']")

        for(let i = 0; i<txts.length;i++){
          let t = txts[i];
          t.index = i;

          t.onkeyup=function(){
            this.value=this.value.replace(/[^0-9a-fA-F]/g,'')
            if(this.value.length==2){

              let next = this.index + 1;
              if(next > txts.length - 1) return;
              setTimeout(function () {

                txts[next].focus();
              },0)
            }
            if(this.value.length==0){
              let next = this.index - 1 ;
              if(next < 0) return;

              txts[next].focus();
            }
          }
        }


      },
      getTree() {
        this.seettingTree = [{
          label: 'LocalHost',
          children: [{
            label: 'A664',
            children: [{
              label: 'End Systems',
              children: [{
                label: 'ES_0',
                type: 'ES',
                id: 0,
                children: [{
                  label: 'OutputVls',
                  type: 'VL',
                  parentId:0,
                  tabData:[],
                }]
              }]
            }]
          }]
        }]
      },
      handleNodeClick(data) {
        if (data.type == 'ES') {
          this.setting = 1
          this.EsId = data.id
          this.num = data.id
        } else if (data.type == 'VL') {
          var txts = $("input[name='MAC']")
          for(let i =0;i<txts.length;i++){
            if (txts[i].value.length == 0) {
              alert('请填写完整MAC地址')
              return false
            }
          }
          this.VLtableData = data.tabData
          this.isVLRow = true
          this.TXtableData = []
          this.setting = 2
          this.num = data.parentId
        } else {
          this.setting = 1
        }
      },
      // 激活终端
      enabledES() {
        var node = this.$refs.tree.children[0].children[0].children[0].children
        if (this.EsId != this.num && this.enabled == true) {
          node.push({
            label: 'ES_' + this.num,
            type: 'ES',
            id: this.num,
            children: [{
              label: 'OutputVls',
              type: 'VL',
              parentId:this.num,
              tabData:[],
            }]
          })
          this.EsId = this.num
        } else if (this.EsId == this.num && this.enabled == false) {
          var child = this.$refs.tree.children[0].children[0].children[0].children
          if (child.length == 1) {
            return false
          }
          for (let i = 0; i < child.length; i++) {
            if (child[i].id == this.EsId) {
              var index = i
            }
          }
          this.EsId = null
          child.splice(index, 1);
        }
      },
      // 下一步
      saveConfig() {
        var txts = $("input[name='MAC']")
        for(let i =0;i<txts.length;i++){
          if (txts[i].value.length == 0) {
            alert('请填写完整MAC地址')
            return false
          }
        }
        this.setting = 2
        try {
          var node = this.$refs.tree.getCurrentNode()
          this.VLtableData = node.children[0].tabData
        }catch (e) {
        }
      },
      /*----------------------------------------vl设置-----------------------------------------*/
      // 选中当前行
      clickVLrow(row) {
        this.VLrow = row
        this.isVLRow = false
        this.TXtableData = row.Child
      },
      //增添
      addVL() {
        var temp = [{
          TXID: this.TXIDCount,
          MaxMessageSize: 17,
          sourceData: ['FF', 'FF', '00', '00', 'FF', 'FF','FF', 'FF', '00', '00', 'FF', 'FF','FF', 'FF', '00', '00', 'FF']
        }]
        this.VLtableData.push({
          VLID: this.VLIDCount,
          Child: temp
        })
        this.TXtableData = temp
        this.VLIDCount = this.VLIDCount + 1
        this.TXIDCount = this.TXIDCount + 1
        this.isVLRow = true
      },
      // 删除
      delVL() {
        this.isVLRow = true
        for (let i = 0; i < this.VLtableData.length; i++) {
          if (this.VLtableData[i].VLID == this.VLrow.VLID) {
            this.VLtableData.splice(i,1)
            break
          }
        }
        this.TXtableData=[]
      },
      /*---------------------------Tx设置-----------------------*/
      clickTXrow(row) {
        this.TXrow = row
        this.isTXRow = false
      },
      //增添
      addTX() {
        var arr = this.VLrow.Child
        arr.push({
          TXID: this.TXIDCount,
          MaxMessageSize: 17,
          sourceData: ['FF', 'FF', '00', '00', 'FF', 'FF','FF', 'FF', '00', '00', 'FF', 'FF','FF', 'FF', '00', '00', 'FF']
        })
        this.TXtableData = arr
        this.TXIDCount=this.TXIDCount+1
      },
      // 删除
      delTX() {
        if(this.TXtableData.length==1){
          return false
        }
        for (let i = 0; i < this.TXtableData.length; i++) {
          if (this.TXtableData[i].TXID == this.TXrow.TXID) {
            this.TXtableData.splice(i,1)
            break
          }
        }
        this.isTXRow = true
      },
      /*---------------------自定义数据------------------------------*/
      getOriginalData() {
        var data = this.selfData
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
      },
      /*-----------------------打开设置------------------------------*/

      openSetting(val) {
        this.selfSize = val.MaxMessageSize
        this.centerDialogVisible = true
        this.selfData = val.sourceData
        this.getOriginalData()
      },
      // Size改变
      selfSizeChange(val) {
        var len = val
        var arr = []
        this.selfData = arr
        for (let i = 0; i < len; i++) {
          arr.push('00')
        }
        this.selfData = arr
        this.getOriginalData()
      },
      // 清空数据
      clearSelfData() {
        var len = this.selfSize
        var arr = []
        this.selfData = arr
        for (let i = 0; i < len; i++) {
          arr.push('00')
        }
        this.selfData = arr
        this.getOriginalData()
      },
      //随机数据
      randomData() {
        var len = this.selfSize
        var arr = []
        this.selfData = arr
        for (let i = 0; i < len; i++) {
          var num = Math.round(Math.random() * 255).toString(16)
          var numlen = num.length
          while (numlen < 2) {
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
        var len = this.selfSize
        var arr = []
        this.selfData = arr
        // console.log(this.myselfInputData);
        for (let i = 0; i < len; i++) {
          var num = this.myselfInputData
          var numlen = num.length
          while (numlen < 2) {
            num = "0" + num;
            numlen++;
          }
          arr.push(num.toUpperCase())
        }
        this.selfData = arr
        this.getOriginalData()
      },
      // 递增数据
      inputImparityData() {
        this.isChange = false
        var len = this.selfSize
        var arr = []
        this.selfData = arr
        var temp2 = this.userDefinedData
        for (let i = 0; i < len; i++) {
          var num = ((parseInt(temp2, 16) + parseInt(this.userDefinedDifference) * i) & 255)
          var temp = num.toString(16)
          var numlen = temp.length
          while (numlen < 2) {
            temp = "0" + temp;
            numlen++;
          }
          arr.push(temp.toUpperCase())
        }
        this.selfData = arr
        this.getOriginalData()
      },
      //保存Setting数据
      saveUserConfigData() {
        this.centerDialogVisible=false
        var arr = []
        for(let i=0;i<this.dataCoulmn.length;i++){
          arr=arr.concat(this.dataCoulmn[i].dataRow)
        }
        for(let i =0;i<this.TXtableData.length;i++){
          if(this.TXtableData[i].TXID==this.TXrow.TXID){
            this.TXtableData[i].sourceData = arr
            this.TXtableData[i].MaxMessageSize = this.selfSize
            break
          }
        }

      },
      // 上一步
      lastStep() {
        this.setting = 1
      },
      //发送数据
      sendData(){
        var node = this.$refs.tree.children[0].children[0].children[0].children
        for(let i=0 ;i<node.length;i++){
          if(node[i].children[0].parentId==this.num){
            this.$refs.tree.children[0].children[0].children[0].children[i].children[0].tabData=this.VLtableData
          }
        }
        var EndSystem = {
          Esid: this.num,
          Name: this.EsName,
          MACAddress:[this.MAC1,this.MAC2,this.MAC3,this.MAC4,this.MAC5,this.MAC6].join(':'),
        }
        axios.post('/setAFDX',{
          BusType: 'A664',
          Types:'Simulate',
          EndSystem: EndSystem,
          VLSetting: this.VLtableData
        }).then((result) => {

        }).catch((err) => {
          console.log(err)
        })

      }
    },
  }
</script>
<style>
  .ESLabel .el-input__inner {
    text-align: center;
    padding: 0 10px
  }
</style>
<style scoped>
  /*Setting*/
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

    width: 40px;
    float: left;
  }

  .selfContainer li input {
    width: 26px;
    height: 26px;
    text-align: center;
  }

  .selfContainer {
    padding: 20px;
    height: 260px;
    background: #fff;
    margin: 0 auto;
    width: 800px;
    overflow-y: auto;
    box-shadow: inset 3px 3px 5px 3px rgba(101, 118, 122, 0.7);
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

  .el-popover label {
    display: inline-block;
    width: 65px;
  }

  .selfInput {
    width: 740px;
    text-align: left;
    margin: 0 auto;
    padding: 30px;
    border-bottom: 2px dashed #666;
  }

  /*TX*/
  .TXcontent {
    margin-top: 25px;
    background: #fff;
    border-radius: 50px;
    height: 320px;
    padding: 20px;
    box-shadow: inset 3px 3px 5px 3px rgba(101, 118, 122, 0.7);
  }

  .TXcontent h3 {
    margin-left: 50px;
    display: inline-block;
    width: 300px;
    margin-right: 20px;
    color: rgba(14, 123, 204, 0.77);
  }

  /*VL*/
  .VLcontent h3 {
    margin-left: 50px;
    display: inline-block;
    width: 300px;
    margin-right: 20px;
    color: rgba(14, 123, 204, 0.77);
  }

  .VLcontent {
    background: #fff;
    border-radius: 50px;
    height: 320px;
    padding: 20px;
    box-shadow: inset 3px 3px 5px 3px rgba(101, 118, 122, 0.7);
  }

  /*终端*/
  .ESLabel {
    margin-left: 50px;
    margin-top: 20px;
  }

  .ESLabel label {
    display: inline-block;
    width: 100px;
  }

  .ESid {
    width: 200px;
    margin: 30px 0 50px 50px;
  }

  .EScontent {
    background: #fff;
    border-radius: 50px;
    height: 700px;
    padding: 40px;
    box-shadow: inset 3px 3px 5px 3px rgba(101, 118, 122, 0.7);
  }

  /*树*/
  .treeStyle {
    background: transparent;
  }

  .left {
    background: #fff;
    height: 820px;
    min-width: 280px;
    box-shadow: 5px 5px 3px #666;
    text-align: left;
    overflow: hidden;
    margin-right: 30px;
    padding: 20px;
  }

  .right {
    flex: 1;
    background: rgba(255, 255, 255, 0.6);
    height: 800px;
    box-shadow: 5px 5px 3px #666;
    text-align: left;
    overflow: hidden;
    padding: 30px 40px;
    min-width: 500px;
  }
</style>
