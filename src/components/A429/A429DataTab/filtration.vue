<template>
  <div>
    <div class="row">
      <div class="left">
        <h3>选择</h3>
        <div class="Tree">
          <el-tree
            node-key="id"
            highlight-current
            :data="treedata"
            ref="tree"
            show-checkbox
            :props="defaultProps"
          >
          </el-tree>
        </div>
      </div>
      <div class="right">
        <h3>过滤</h3>
        <div class="column">
          <div class="btn">
            <el-button type="success" @click="resetChecked" plain>允许捕获<br>所有消息</el-button>
          </div>
          <div class="btn">
            <el-button type="danger" @click="setCheckedNodes" plain>阻止捕获<br>所有消息</el-button>
          </div>
          <div class="btn" style="flex: 1">
            <el-button type="primary" @click="useFiltration">引用过滤器</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../../store'
  import axios from 'axios'
  export default {
    name: "filtration",
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label',
          id: 'id'
        },
        treedata: [],
      }
    },
    mounted() {
      this.CreateTree()
    },
    methods: {
      CreateTree() {
        let that = this
        setTimeout(function(){
          var channelCount = JSON.parse(sessionStorage.getItem("RxChannel"))
          var len = channelCount.length
          var temp = that.genChannelNode(len)
          that.treedata = [{id: 0, label: '板卡-A429', children: temp}]
        },1000);
      },
      // 全选
      setCheckedNodes() {
        this.$refs.tree.setCheckedKeys([0]);
       },
      // 清空
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      genSdiNode(n) {
        var res = [{label: 'SDI:00', id: n + '$00'}, {label: 'SDI:01', id: n + '$01'},
          {label: 'SDI:10', id: n + '$10'}, {label: 'SDI:11', id: n + '$11'}]
        return res
      },
      genLabelNode(n) {
        var res = [];
        for (var i = 1; i < 256; i++) {
          var lab = i.toString(8)
          var len = lab.length;
          while (len < 3) {
            lab = "0" + lab;
            len++;
          }
          var temp = {label: 'label ' + lab, id: n + '$' + lab, children: this.genSdiNode(n + '$' + lab)}
          res.push(temp)
        }
        return res
      },
      genChannelNode(n) {
        var res = []
        for (var i = 1; i < n + 1; i++) {
          var temp = {label: 'Rx' + i, id: 'Rx' + i, children: this.genLabelNode('Rx' + i)}
          res.push(temp)
        }
        return res
      },
      // 应用过滤器
      useFiltration(){
        var filter=this.$refs.tree.getCheckedKeys()
        console.log(filter)
        var channelNode=[],labelNode=[],sdiNode=[]
          if(filter[0]===0){
            channelNode=sessionStorage.getItem('MonitorChannel')
            store.commit('GetchannelNode',channelNode)
            store.commit('GetlabelNode',labelNode)
            store.commit('GetsdiNode',sdiNode)
            return false
          }
          for(let i=0;i<filter.length;i++){
            var temp = filter[i].split('$')
            if(temp.length==1){
              channelNode.push(filter[i])
            }else if(temp.length==2){
              if(channelNode.indexOf(filter[i].split('$')[0])==-1){
                labelNode.push(filter[i])
              }
            }else if(temp.length==3){
              if(channelNode.indexOf(filter[i].split('$')[0])==-1 && labelNode.indexOf(filter[i].split('$')[0] + '$' +　filter[i].split('$')[1])==-1){
                sdiNode.push(filter[i])
              }
            }
          }
        store.commit('GetchannelNode',channelNode)
        store.commit('GetlabelNode',labelNode)
        store.commit('GetsdiNode',sdiNode)

      }
    }

  }
</script>

<style scoped>
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

  .btn {
    flex: 3;
  }

  .Tree {
    width: 300px;
    margin: 10px auto;
    height: 350px;
    overflow-y: scroll;
    border: 1px solid #666;
  }

  .left {
    flex: 1;
  }

  .right {
    flex: 2;
  }
</style>
