<template>
  <div style="padding: 30px;display: flex">
    <div class="left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/A664' }">数据监控</el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
      </el-breadcrumb>
      <h2 style="margin-top: 10px">ARINC-664 Setting</h2>
      <el-tree class="treeStyle" default-expand-all ref="tree" :expand-on-click-node="false" :data="seettingTree"
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
            <el-input-number size="mini" v-model="num" controls-position="right" :min="0" :max="31"></el-input-number>
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
          <h3>Input VL Configurations</h3>
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
                      :highlight-current-row=true style="width: 99%">
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
              <el-table-column prop="VLIntegrityCheck" label="Inteqrite Checking(完整性检测)" align="center" min-width="180">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.VLIntegrityCheck"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="VLRedundancyManage" label="Redundancy Management（冗余管理）" align="center" min-width="180">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.VLRedundancyManage"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!--RXconfig-->
        <div class="RXcontent">
          <h3>Rx Port Configuration</h3>
          <label> 操作：</label>
          <el-button :disabled="isVLRow" type="success" size="small" @click="addRX" icon="el-icon-plus"
                     circle></el-button>
          <el-button :disabled="isRXRow" size="small" @click="delRX" type="danger" icon="el-icon-minus"
                     circle></el-button>
          <div style="padding:10px 20px">
            <el-table :data="RXtableData"
                      height="275"
                      border
                      @row-click="clickRXrow"
                      :header-cell-style="{background:'#74bbd5',color:'#fff'}"
                      :highlight-current-row=true style="width: 100%">
              <el-table-column align="center" prop="RXID" label="ID" min-width="80">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.RXID"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="RXName" label="Name" min-width="130">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.RXName"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="PortType" align="center" label="端口类型" min-width="130">
                <template slot-scope="scope">
                  <el-select size="small" v-model="scope.row.PortType" placeholder="请选择">
                    <el-option label="Samping" value="Samping"></el-option>
                    <el-option label="Queuing" value="Queuing"></el-option>
                    <el-option label="SPA" value="SPA"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="Network" align="center" label="Network" min-width="130">
                <template slot-scope="scope">
                  <el-select size="small" v-model="scope.row.Network" placeholder="请选择">
                    <el-option label="网络A" value="A"></el-option>
                    <el-option label="网络B" value="B"></el-option>
                    <el-option label="Both" value="Both"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="MaxMessageSize" align="center" label="Max Message Size" min-width="150">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.MaxMessageSize"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="ValidateSource" label="Validate Source" min-width="130">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.ValidateSource"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="SrcAddr" align="center" label="源IP地址" min-width="130">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.SrcAddr"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="SrcPort" align="center" label="源UDP端口" min-width="130">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.SrcPort"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="DstAddr" align="center" label="目的IP地址" min-width="130">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.DstAddr"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="DstPort" align="center" label="目的UDP端口" min-width="130">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.DstPort"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div style="display: flex;margin-top: 10px;margin-right: 80px">
          <div style="flex: 1">
            <el-button style="margin-left: 20px" type="primary" @click="lastStep" size="medium">上一步</el-button>
          </div>
          <div style="flex: 1;text-align: right">
            <el-button type="primary" @click="saveInputConfig" size="medium">保存</el-button>
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
    name: "A664Config",
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
        //RX
        RXrow: '',
        isRXRow: true,
        RXtableData: [],
        RXIDCount: 0,
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
      },
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
                  label: 'InputVls',
                  type: 'VL',
                  parentId:0,
                  tabData: [],
                }],
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
          this.RXtableData = []
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
              label: 'InputVls',
              type: 'VL',
              parentId:this.num,
              tabData: [],
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
      clickVLrow(row, event, col) {
        this.VLrow = row
        this.isVLRow = false
        this.RXtableData = row.Child
      },
      //增添
      addVL() {
        var temp = [{
          RXID: this.RXIDCount
        }]
        this.VLtableData.push({
          VLID: this.VLIDCount,
          Child: temp
        })
        this.RXtableData = temp
        this.VLIDCount = this.VLIDCount + 1
        this.RXIDCount = this.RXIDCount + 1
        this.isVLRow = true
      },
      // 删除
      delVL() {
        this.isVLRow = true
        for (let i = 0; i < this.VLtableData.length; i++) {
          if (this.VLtableData[i].VLID == this.VLrow.VLID) {
            this.VLtableData.splice(i, 1)
            break
          }
        }
        this.RXtableData = []
      },
      /*---------------------------Rx设置-----------------------*/
      clickRXrow(row) {
        this.RXrow = row
        this.isRXRow = false
      },
      //增添
      addRX() {
        var arr = this.VLrow.Child
        arr.push({
          RXID: this.RXIDCount
        })
        this.RXtableData = arr
        this.RXIDCount = this.RXIDCount + 1
      },
      // 删除
      delRX() {
        if (this.RXtableData.length == 1) {
          return false
        }
        for (let i = 0; i < this.RXtableData.length; i++) {
          if (this.RXtableData[i].RXID == this.RXrow.RXID) {
            this.RXtableData.splice(i, 1)
            break
          }
        }
        this.isRXRow = true
      },
      // 上一步
      lastStep() {
        this.setting = 1
      },
      //保存VL配置
      saveInputConfig() {
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
          Types:'Monitor',
          EndSystem: EndSystem,
          VLSetting: this.VLtableData
        }).then((result) => {

        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>
<style>
  .ESLabel .el-input__inner {
    text-align: center;
    padding: 0 10px
  }
</style>
<style scoped>
  /*RX*/
  .RXcontent {
    margin-top: 25px;
    background: #fff;
    border-radius: 50px;
    height: 320px;
    padding: 20px;
    box-shadow: inset 3px 3px 5px 3px rgba(101, 118, 122, 0.7);
  }

  .RXcontent h3 {
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
    min-width: 700px;
  }
</style>
