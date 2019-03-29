<template>
  <div class="content">
    <div class="list">
      <div style="width: 400px;margin-top: 20px">
        <el-button type="primary" @click="getSnapShoot">刷新快照</el-button>
        <div style="margin-top: 20px">
          <el-button size="small" type="primary" @click="getSnapShoot" plain>&lt;&lt;发现上一个</el-button>
          <el-button size="small" type="primary" @click="findMsg" plain>查找</el-button>
          <el-button size="small" type="primary" @click="getSnapShoot" plain>查找下一个&gt;&gt;</el-button>
        </div>
        <div class="select">
          <label>RT</label>
          <el-select style="width: 85px" size="mini" v-model="RTvalue" placeholder="请选择">
            <el-option v-for="item in RT" :key="item.value" :label="item.value" :value="item.value"></el-option>
          </el-select>
          <label>T/R</label>
          <el-select style="width: 85px" size="mini" v-model="TRvalue" placeholder="请选择">
            <el-option v-for="item in TR" :key="item.value" :label="item.value" :value="item.value"></el-option>
          </el-select>
          <label>SA</label>
          <el-select style="width: 85px" size="mini" v-model="SAvalue" placeholder="请选择">
            <el-option v-for="item in SA" :key="item.value" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="select">
          <label>WC</label>
          <el-select style="width: 85px" size="mini" v-model="WCvalue" placeholder="请选择">
            <el-option v-for="item in WC" :key="item.value" :label="item.value" :value="item.value"></el-option>
          </el-select>
          <label>Bus</label>
          <el-select style="width: 85px" size="mini" v-model="Busvalue" placeholder="请选择">
            <el-option v-for="item in Bus" :key="item.value" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="tab" style="flex: 1">
        <div class="snapshootCont" v-for="item in snapshoot">
          <p class="title">#MESSAGE
            #{{item.MsgCount}}-------------------------------------------------------------------------------------------------------------</p>
          <div class="blueSize">
            <span>Time:{{item.Timestamp}}</span>
            <span style="margin-left: 20px">IM Gap:{{item.IMGap}}us</span>
            <span style="margin-left: 20px">{{item.Network}}</span>
            <span style="margin-left: 15px">{{item.BusType}}</span>
            <span style="margin-left: 20px">Rsp Time:{{item.RspTime}}us</span>
            <span style="margin-left: 20px">Message Time={{item.MsgTime}}us</span>
          </div>
          <ul class="greenSize">
            <li v-for="list in (item.Buffer)">{{list}}</li>
          </ul>
          <div class="redSize">
            <span>{{item.Error}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../../store'

  export default {
    name: "Bus1553BSnapshoot",
    data() {
      return {
        RTvalue: 'Any',
        TRvalue: 'Any',
        SAvalue: 'Any',
        WCvalue: 'Any',
        Busvalue: 'Any',
        RT: [],
        TR: [],
        SA: [],
        WC: [],
        Bus: [],
        snapshoot: [],
        msgSnapshoot:[],
      }
    },
    mounted() {
      this.defaultSelect()
    },
    computed: {
      startSnapshoot() {
        return store.state.Bus1553BSnapShootCount
      }
    },
    watch: {
      startSnapshoot(curVal, oldVal) {
        this.getSnapShoot()
      }
    },
    methods: {
      defaultSelect() {
        var arr = [{value: 'Any'}]
        for (let i = 0; i < 32; i++) {
          arr.push({value: i})
        }
        this.RT = arr
        this.SA = arr
        this.TR = [{value: 'Any'}, {value: '0'}, {value: '1'}]
        this.Bus = [{value: 'Any'}, {value: 'A'}, {value: 'B'}]
        arr.push({value: '32'})
        this.WC = arr
      },
      getSnapShoot() {
        this.snapshoot = []
        for (let i = 1; i < 100 + 1; i++) {
          var numlen = i.toString().length
          while (numlen < 3) {
            i = "0" + i;
            numlen++;
          }
          this.snapshoot.push({
            MsgCount: i,
            Timestamp: new Date().toLocaleTimeString() + ' ' + new Date().getMilliseconds(),
            IMGap: '10.7',
            Network: 'BUS A',
            BusType: 'RT-RT',
            RspTime: '8.8',
            MsgTime: '706.8',
            Buffer: ['5980', '4B71', '2312', '5681', '345F', 'FB23', 'AC89', 'EF23', '3E11', '2AB4', '3EF1', 'FFEF', 'EE12', 'E212', '8421', 'B0E6'],
            Error: 'Error:NO RESPONSE'
          })
        }

      },
      findMsg() {
        this.msgSnapshoot = this.snapshoot
        if (this.Busvalue == 'Any') {
        } else {
          var arrA=[]
          var arrB=[]
          for(let i =0;i<this.msgSnapshoot.length;i++){
            if(this.msgSnapshoot[i].Network=='BUS A'){
              arrA.push(this.msgSnapshoot[i])
            }else if(this.msgSnapshoot[i].Network=='BUS B'){
              arrB.push(this.msgSnapshoot[i])
            }
          }
          if(this.Busvalue == 'A'){
            this.msgSnapshoot=arrA
          }else if(this.Busvalue == 'B'){
            this.msgSnapshoot=arrB
          }
        }
        this.snapshoot = this.msgSnapshoot
      }
    }
  }
</script>

<style scoped>
  .snapshootCont {
    width: 800px;
    margin: 0 auto;
    text-align: left;
  }

  .snapshootCont + .snapshootCont {
    margin-top: 10px;
  }

  .snapshootCont ul {
    padding: 0;
    list-style: none;
    overflow: hidden;
  }

  .snapshootCont ul li {
    float: left;
    width: 100px;
    margin-top: 5px;
    text-align: center;
  }

  .snapshootCont .title {
    margin-top: 10px;
    font-size: 18px;
    font-weight: 600;
  }

  .snapshootCont .blueSize {
    margin-top: 5px;
    color: #169BD5;
  }

  .snapshootCont .greenSize {
    color: #67c23A;
  }

  .snapshootCont .redSize span {
    color: #F56C6C;
    font-size: 18px;
    font-weight: 700;
    background: #fffa39;
  }

  .select {
    margin-top: 30px;
    text-align: left;
    margin-left: 30px;
  }

  .select label {
    display: inline-block;
    width: 25px;
  }

  .content {
    background: #bdd7ee;
    border-radius: 5px;
  }

  .list {
    height: 328px;
    display: flex;
    flex-direction: row;
  }

  .tab {
    box-shadow: 5px 5px 5px #999 inset;
    background: #fff;
    margin: 20px;
    width: 84%;
    overflow: auto;
  }
</style>
