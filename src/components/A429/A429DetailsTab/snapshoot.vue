<template>
  <div>
    <div class="content">
      <div class="list">
        <div style="flex: 1;margin-top: 50px">
          <el-button type="primary" @click="getSnapShoot">刷新快照</el-button>
        </div>
        <div class="tab" style="flex: 5">
          <ul>
            <li v-for="(item,index) in snapData">
              <el-row>
                <div style="float: left">
                  <span class="blue"><i style="width: 80px">接收通道：</i>{{item.Channel}}</span><span
                  class="blue"><i>消息序列：</i>{{index}}</span>
                </div>
                <div style="float: right;">
                  <span class="warning" v-if="item.Warning==1"><i>异常状态：</i><i style="width: 170px">自定义异常警告</i></span>
                </div>
              </el-row>
              <el-row style="margin-top: 10px">
                <div style="float: left">
                  <span><i
                    style="width: 80px">时间：</i><i>{{item.Time}}</i></span><span><i>Label：</i><i>{{item.Label}}</i></span><i>{{item.Data1}}</i>
                </div>
                <div style="float: right;">
                  <span class="danger" v-if="item.Error==1"><i>错误状态：</i><i style="width: 170px">奇偶校验错误/编码错误</i></span>
                </div>
              </el-row>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import store from '../../store'
  export default {
    name: "snapshoot",
    data() {
      return {
        snapData: []
      }
    },
    computed:{
      SnapShoot(){
        return store.state.SnapShootCount
      }
    },
    methods:{
      getSnapShoot(){
        this.snapData=[]
        var condition = store.state.warningData
        var relationship = store.state.warningRelationship
        var label = store.state.warningLabel
        axios.post('/getSnap', {
          clientId:sessionStorage.getItem('ClientId'),
          BusType: 'A429'
        }).then((res) => {
          console.log(res)
          var jsondata = res.data
          var len = jsondata.length
          for(var j =0;j<len;j++){
            if (jsondata[j].Label == label) {
              var data = parseInt(jsondata[j].Data3)
              var warning = [];
              for (let i = 0; i < condition.length; i++) {
                var val = condition[i].conditionData
                switch(condition[i].condition){
                  case ">":
                    if (data > val) {warning.push(1)} else {warning.push(0)}
                    break;
                  case "<":
                    if (data < val) {warning.push(1)} else {warning.push(0)}
                    break;
                  case ">=":
                    if (data >= val) {warning.push(1)} else {warning.push(0)}
                    break;
                  case "<=":
                    if (data <= val) {warning.push(1)} else {warning.push(0)}
                    break;
                  case "==":
                    if (data == val) {warning.push(1)} else {warning.push(0)}
                    break;
                  case "!=":
                    if (data != val) {warning.push(1)} else {warning.push(0)}
                    break;
                }
              }
              if (relationship == "&&") {
                if (warning.indexOf(0) == -1) {
                  jsondata[j].Warning = 1
                }
              } else if (relationship == "||") {
                if (warning.indexOf(1) == -1) {
                  jsondata[j].Warning = 1
                }
              }
            }
            this.snapData.push({
              Channel: jsondata[j].Channel,
              Time: jsondata[j].Time,
              Label: jsondata[j].Label,
              Data1: jsondata[j].Data2,
              Error: jsondata[j].Error,
              Warning:jsondata[j].Warning
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    watch:{
      'SnapShoot':'getSnapShoot'
    }
  }
</script>

<style scoped>
  .content {
    background: #bdd7ee;
    border-radius: 5px;
  }

  .list {
    height: 338px;
    display: flex;
    flex-direction: row;
  }

  .list ul {
    list-style: none;
    padding: 0 20px;
  }

  .tab {
    box-shadow: 5px 5px 5px #999 inset;
    background: #fff;
    margin: 40px;
    width: 84%;
    overflow: auto;
  }

  .tab li {
    border-bottom: 1px solid #666;
    padding: 5px;
  }

  .blue {
    color: #409EFF;
  }

  .warning {
    color: #E6A23C;
  }

  .danger {
    color: #F56C6C;
  }

  .tab span {
    margin-right: 20px;
  }

  .tab i {
    margin-right: 20px;
    display: inline-block;
  }
</style>
