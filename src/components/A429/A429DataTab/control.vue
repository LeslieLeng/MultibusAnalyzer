<template>
  <div class="row">
    <div class="left">
      <h3>通道状态</h3>
      <div class="Tree">
        <el-tree
          :data="treeData"
          class="tree"
          :default-expand-all="true"
        >
        </el-tree>
      </div>
    </div>
    <div class="right">
      <h3>控制</h3>
      <div class="control">
        <div class="btn">
          <el-button :disabled="isOpen" @click="channelOperation('open')" type="success">开始接收</el-button>
        </div>
        <div class="btn">
          <el-button :disabled="!isOpen" @click="channelOperation('close')" type="danger">停止接收</el-button>
        </div>
        <div class="btn">
          <el-button @click="channelOperation('clear')" type="warning">清空数据</el-button>
        </div>
      </div>
      <div style="width: 400px;margin: 40px auto 0">
        <div class="save">
          <div class="title">保存设置</div>
          <div class="radio" style="margin-top: 40px">
            <el-radio :disabled="isStop" v-model="radio" label="1">禁止保存</el-radio>
          </div>
          <div class="radio">
            <el-radio :disabled="isStop" v-model="radio" label="2">允许保存</el-radio>
          </div>
          <div v-if="radio=='2'" class="file">
            <label>文件名：</label>
            <el-input style="width: 200px" v-model="fileName" size="small" placeholder="请输入文件名" clearable></el-input>
          </div>
          <el-button v-if="radio=='2'" class="savebtn" @click="saveData" size="middle" type="primary">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    name: "control",
    data() {
      return {
        radio: '1',
        treeData: [],
        isStop:true,
        isOpen:false,
        fileName:''
      }
    },
    computed:{
      Cperation(){
        return store.state.controlCommand
      }
    },
    watch:{
      Cperation(curVal){
        if(curVal=='close'){
          this.isStop =false
          this.isOpen = false
        }else if(curVal=='open'){
          this.isStop =true
          this.isOpen = true
        }
      }
    },
    methods: {
      // 操作
      channelOperation(operation) {
        if(operation=='open'){
          var channel = JSON.parse(sessionStorage.getItem("MonitorChannel"))
          if(channel==null||channel==''){
            alert('请选择接收通道！')
            return false
          }
          this.isStop =false
          this.isOpen = false
        }else if(operation=='close'){
          this.isStop =true
          this.isOpen = true
        }
        store.commit('Command',operation)
      },

      // 保存数据
      saveData(){
        axios.post('/', {}).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      },
      creatTree(){
        let that = this
        setTimeout(function(){
          var channelCount = JSON.parse(sessionStorage.getItem("RxChannel"))
          var len = channelCount.length
          var temp = that.genChannelNode(len)
          that.treeData = [{id: 0, label: '板卡-A429', children: temp}]
        },1000);

      },
      genChannelNode(n) {
        var res = []
        for (var i = 1; i < n + 1; i++) {
          var temp = {label: 'Rx' + i, id: 'Rx' + i}
          res.push(temp)
        }
        return res
      },
    },
    created(){
      this.creatTree()
    }
  }
</script>

<style scoped>
  .radio {
    margin-top: 10px;
    width: 200px;
  }

  .file {
    margin-top: 20px;
  }

  .save {
    border: 1px solid #666666;
    border-radius: 10px;
    height: 150px;
    position: relative;
  }

  .savebtn {
    position: absolute;
    right: 65px;
    top: 40px;
  }

  .title {
    width: 100px;
    border: 1px solid #666666;
    border-radius: 5px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    left: 150px;
    top: -20px;
    z-index: 3;
    background: #fff;
  }

  .row {
    display: flex;
    flex-direction: row;
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

  .control {
    padding-top: 10px;
    text-align: center;
  }

  .btn {
    width: 100%;
    margin: 20px auto;
  }

  .btn button {
    height: 40px;
    width: 120px;
  }
</style>
