<template>
  <div>
    <div class="row">
      <div class="left">
        <div class="Tree">
          <el-tree
            node-key="id"
            highlight-current
            :data="treedata"
            ref="tree"
            show-checkbox
          >
          </el-tree>
        </div>
      </div>
      <div class="right">
        <div class="column">
          <div class="btn">
            <label>Filter:</label>
            <el-button @click="setCheckedNodes" type="success" plain>允许捕获<br>所有消息</el-button>
            <el-button @click="resetChecked" type="danger" plain>阻止捕获<br>所有消息</el-button>
          </div>
          <div class="btn">
            <label>Filter Network:</label>
            <el-button @click="setCheckBusA" type="primary" plain>仅网络A</el-button>
            <el-button @click="setCheckBusB" type="primary" plain>仅网络B</el-button>
          </div>
          <div class="btn">
            <label>Filter Network:</label>
            <el-button @click="setCheckRX" type="primary" plain>仅接收</el-button>
            <el-button @click="setCheckTX" type="primary" plain>仅发送</el-button>
          </div>
          <div class="btn" style="flex: 1">
            <el-button style="margin-left: 274px" type="primary" @click="useFiltration">引用过滤器</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from'axios'
  export default {

    name: "Bus1553BFiftration",
    data() {
      return {
        treedata: [],
      }
    },
    mounted() {
      this.CreateTree()
    },
    methods: {
      CreateTree() {
        let that = this
        setTimeout(function () {

          that.treedata = [{
            id: 0,
            label: '板卡-1553B',
            children: [{id: 'BusA', label: 'BusA', children: that.creatRTNode('BusA')}, {
              id: 'BusB',
              label: 'BusB',
              children: that.creatRTNode('BusB')
            }]
          }]
        }, 1000);
      },
      creatRTNode(Bus) {
        var res = []
        for (var i = 0; i < 32; i++) {
          if (i < 10) {
            i = '0' + i
          }
          var temp = {
            label: 'RT' + i,
            id: Bus + '-' + i,
            children: [{label: '接收', id: Bus + '-' + i + '-RX'}, {label: '发送', id: Bus + '-' + i + '-TX'}]
          }
          res.push(temp)
        }
        return res
      },
      // 全选
      setCheckedNodes() {
        this.$refs.tree.setCheckedKeys([0]);
      },
      // 清空
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      setCheckBusA() {
        this.$refs.tree.setCheckedKeys(['BusA']);
      },
      setCheckBusB() {
        this.$refs.tree.setCheckedKeys(['BusB']);
      },
      // 接收
      setCheckRX() {
        var arr=[]
        for(let i=0;i<32;i++){
          if (i < 10) {
            i = '0' + i
          }
          arr.push('BusA-'+i+'-RX')
          arr.push('BusB-'+i+'-RX')
        }
        this.$refs.tree.setCheckedKeys(arr);
      },
      //发送
      setCheckTX() {
        var arr=[]
        for(let i=0;i<32;i++){
          if (i < 10) {
            i = '0' + i
          }
          arr.push('BusA-'+i+'-TX')
          arr.push('BusB-'+i+'-TX')
        }
        this.$refs.tree.setCheckedKeys(arr);
      },
      useFiltration() {
        var filter=this.$refs.tree.getCheckedKeys()
        var busNode=[],rtNode=[],channelNode=[]
        if(filter[0]===0){
          busNode=['BusA','BusB'];
        }else {
          for(let i=0;i<filter.length;i++){
            var temp = filter[i].split('-')
            if(temp.length==1){
              busNode.push(filter[i])
            }else if(temp.length==2){
              if(busNode.indexOf(filter[i].split('-')[0])==-1){
                rtNode.push(filter[i])
              }
            }else if(temp.length==3){
              if(busNode.indexOf(filter[i].split('-')[0])==-1 && rtNode.indexOf(filter[i].split('-')[0] + '-' +　filter[i].split('-')[1])==-1){
                channelNode.push(filter[i])
              }
            }
          }
        }

        var allNode=busNode.concat(rtNode).concat(channelNode)
        console.log(allNode)
        axios.post('/bus1553BFilter', {
          BusType: '1553B',
          FilterParam:allNode
        }).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .btn label {
    display: inline-block;
    width: 200px;
    font-weight: 600;
    font-size: 22px;
    color: #666;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .column {
    display: flex;
    flex-direction: column;
    height: 300px;
    margin-top: 20px;
  }

  .column button {
    width: 120px;
  }

  .btn {
    flex: 3;
  }

  .Tree {
    width: 300px;
    margin: 10px auto;
    height: 300px;
    overflow-y: scroll;
    border: 1px solid #666;
  }

  .left {
    flex: 2;
  }

  .right {
    flex: 3;
  }
</style>
