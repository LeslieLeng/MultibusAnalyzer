import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    /*---------------------------------------------------A429 Start----------------------------------------------------*/
    // 监听列表数据
    soundcode8:'0',
    soundcode2:'0',
    sclabel:'0',
    scchannel:'0',
    stateWarning:0,
    stateError:0,
    messageData:'',
    //监听控制命令
    controlCommand:'',
    // 快照
    SnapShootCount:0,
    //统计
    StatisticsCount:0,
    dataCountObj:{},
    errCountObj:{},
    // 过滤
    channelNode:[],
    labelNode:[],
    sdiNode:[],
    //异常
    warningData:[],
    warningLabel:'',
    warningRelationship:'',
    /*---------------------------------------------------A429 End----------------------------------------------------*/
    /*---------------------------------------------------1553B----------------------------------------------------*/
    startStatisticsCount:0,
    Bus1553BSnapShootCount:0,
  },
  mutations: {
    // 过滤
    GetchannelNode(state,data){
      state.channelNode=data
    },
    GetlabelNode(state,data){
      state.labelNode=data
    },
    GetsdiNode(state,data){
      state.sdiNode=data
    },
    //添加异常
    WarningData(state,data){
      state.warningData = data
    },
    WarningLabel(state,data){
      state.warningLabel = data
    },
    WarningRelationship(state,data){
      state.warningRelationship = data
    },
    WarningState(state,data){
      state.stateWarning=data
    },
    ErrorState(state,data){
      state.stateError=data
    },
    // 快照
    SnapShoot(state){
      state.SnapShootCount++
    },
    //统计
    Statistics(state){
      state.StatisticsCount++
    },
    getErrCount(state,data){
      state.errCountObj = data
    },
    getDataCount(state,data){
      state.dataCountObj = data
    },
    //监听控制命令
    Command(state,data){
      state.controlCommand=data
    },
    SoundCode8(state,data) {
      state.soundcode8=data
    },
    SoundCode2(state,data) {
      state.soundcode2=data
    },
    scLabel(state,data) {
      state.sclabel=data
    },
    scChannel(state,data) {
      state.scchannel=data
    },
    MessageData(state,data){
      state.messageData=data
    },
    //1553B
    StartStatistics(state){
      state.startStatisticsCount++
    },
    Bus1553BSnapShoot(state){
      state.Bus1553BSnapShootCount++
    }
  },

})

export default store
