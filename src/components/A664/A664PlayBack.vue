<template>
  <div style="padding:30px">
    <div style="display: flex;flex-direction: row">
      <div class="file">
          <h2 style=" margin: 10px 0 10px 10px;">文件</h2>
          <div style="width:260px;margin: 10px auto">
            选择：
            <el-input style="width: 180px"
                      placeholder="输入关键字进行过滤"
                      v-model="filterText">
            </el-input>
          </div>
          <div class="tree">
            <el-tree
              class="filter-tree"
              :highlight-current="true"
              :data="fileData"
              default-expand-all
              @node-click="getFileName"
              :filter-node-method="filterNode"
              ref="tree2">
            </el-tree>
          </div>
      </div>
      <div class="monitor_top">
        <div style="padding:25px">
          <div style="text-align:left;padding: 20px">
            <label style="margin-left: 20px">文件名：</label>
            <span style="margin-left: 20px">{{fileName}}</span>
            <label style="margin-left: 55%">操作：</label>
            <el-button style="margin-left: 20px" size="small" type="danger">删除</el-button>
          </div>
          <el-table :data="tableData"
                    height="275"
                    border
                    @row-click="clickRow"
                    :header-cell-style="{background:'#74bbd5',color:'#fff'}"
                    :highlight-current-row=true style="width: 100%">
            <el-table-column align="center" prop="SN" label="序号" width="80">
              <template slot-scope="scope">
                <label>{{scope.row.SN}}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="Time" label="时间" width="180">
              <template slot-scope="scope">
                <label>{{scope.row.Time}}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="SaMAC" label="源MAC" min-width="180">
              <template slot-scope="scope">
                <label>{{scope.row.SaMAC}}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="SaPort" label="源地址端口" min-width="180">
              <template slot-scope="scope">
                <label>{{scope.row.SaPort}}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="DaMAC" label="目的MAC" min-width="180">
              <template slot-scope="scope">
                <label>{{scope.row.DaMAC}}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="DaPort" label="目的地址端口" min-width="180">
              <template slot-scope="scope">
                <label>{{scope.row.DaPort}}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="ViltualLink" label="虚拟链路">
              <template slot-scope="scope">
                <label>{{scope.row.ViltualLink}}</label>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="MagLength" label="报文长度">
              <template slot-scope="scope">
                <label>{{scope.row.MagLength}}</label>
              </template>
            </el-table-column>
          </el-table>
        </div>


      </div>
    </div>

    <!-----------------------------------数据详情----------------------------------->
    <div class="monitor_bottom">
      <div class="left">
        <h2>原始数据</h2>
        <div class="leftContainer">
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
              <span>
                {{row}}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <h2>AFDX帧</h2>
        <div class="rightContainer">
          <el-tree class="treeStyle" :data="AFDXTreeData" @node-click="handleNodeClick"></el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "A664Monitor",
    data() {
      return {
        filterText:'',
        fileName: '',
        tableData: [],
        originalData: [],
        dataCoulmn: [],
        AFDXTreeData: [],
        fileData: [
          {
            label: '数据回放文件',
            children: [{
              label: '文件1',
            }, {
              label: '文件2',
            }, {
              label: '文件3',
            }, {
              label: '文件4',
            }]
          }
        ],
      }
    },
    mounted() {
      this.getTableData()
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods: {
      getTableData() {
        this.tableData = [{
          SN: 0,
          Time: '09:50:29.703 000',
          SaMAC: '00-50-BA-CE-07-0C',
          SaPort: '123.4.38.94:27795',
          DaMAC: '00-50-BA-B7-21-43',
          DaPort: '33.215.77.177:48881',
          ViltualLink: '46460',
          MagLength: '64191',
          OriginalData: '87f878a78c878d985c64c874'
        }, {
          SN: 1,
          Time: '09:50:29.703 000',
          SaMAC: '00-50-BA-CE-07-0C',
          SaPort: '123.4.38.94:27795',
          DaMAC: '00-50-BA-B7-21-43',
          DaPort: '33.215.77.177:48881',
          ViltualLink: '46460',
          MagLength: '64191',
          OriginalData: '12f31c545fc6bac644854249ff001312f1321312312321312abc848a54c65d6e31c545fc6bac644854249ff0013'
        }, {
          SN: 2,
          Time: '09:50:29.703 000',
          SaMAC: '00-50-BA-CE-07-0C',
          SaPort: '123.4.38.94:27795',
          DaMAC: '00-50-BA-B7-21-43',
          DaPort: '33.215.77.177:48881',
          ViltualLink: '46460',
          MagLength: '64191',
          OriginalData: '87f878a78c878d985c64c874351'
        }, {
          SN: 3,
          Time: '09:50:29.703 000',
          SaMAC: '00-50-BA-CE-07-0C',
          SaPort: '123.4.38.94:27795',
          DaMAC: '00-50-BA-B7-21-43',
          DaPort: '33.215.77.177:48881',
          ViltualLink: '46460',
          MagLength: '64191',
          OriginalData: '87f878a78c878d98512312313c64c874'
        }, {
          SN: 4,
          Time: '09:50:29.703 000',
          SaMAC: '00-50-BA-CE-07-0C',
          SaPort: '123.4.38.94:27795',
          DaMAC: '00-50-BA-B7-21-43',
          DaPort: '33.215.77.177:48881',
          ViltualLink: '46460',
          MagLength: '64191',
          OriginalData: '87f87313138a78c878d98512312313c64c874'
        }]
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      getFileName(data){
        // console.log(data.label)
        this.fileName=data.label
      },
      /*------------------------数据详情------------------------*/
      clickRow(row) {
        this.originalData = row.OriginalData.split('')
        this.getOriginalData()
        this.getTreeData()
      },
      getOriginalData() {
        var data = this.originalData
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
      handleNodeClick(data) {
        console.log(data);
      },
      getTreeData() {
        this.AFDXTreeData = [{
          label: 'Frame 3685,103bytes',
          children: [{
            label: 'Timestamp:880.035.55.940',
          }, {
            label: 'Time delta from previous frame: 0.001.489.880',
          }, {
            label: 'Time delta from the first frame: 26.195.400.480',
          }, {
            label: 'Frame Index :3685',
          }]
        }, {
          label: ' II,SEQ:61',
          children: [{
            label: 'Timestamp:880.035.55.940',
          }, {
            label: 'Time delta from previous frame: 0.001.489.880',
          }, {
            label: 'Time delta from the first frame: 26.195.400.480',
          }, {
            label: 'Frame Index :3685',
          }]
        }, {
          label: 'MAC,Virtual Link ID: 1001',
          children: [{
            label: 'Timestamp:880.035.55.940',
          }, {
            label: 'Time delta from previous frame: 0.001.489.880',
          }, {
            label: 'Time delta from the first frame: 26.195.400.480',
          }, {
            label: 'Frame Index :3685',
          }]
        }]
      }
    }
  }
</script>

<style scoped>
  .file{
    padding: 20px 40px;
    width: 260px;
    margin-right: 20px;
    background: #fff;
    box-shadow: 5px 5px 3px #666;
  }
  /*树*/
  .treeStyle {
    background: transparent;
  }

  /*数据详情*/
  .title {
    color: #666;
    font-weight: 700;
  }

  .leftContainer ul {
    text-align: center;
    height: 40px;
    line-height: 40px;
    min-width: 640px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .leftContainer li {
    width: 36px;
    float: left;
  }

  .leftContainer li span {
    text-align: center;
    color: rgba(14, 123, 204, 0.77);
    /*background: sandybrown;*/
  }

  .rightContainer, .leftContainer {
    padding: 20px;
    margin-top: 10px;
    height: 260px;
    background: #fff;
    overflow-y: auto;
    box-shadow: inset 3px 3px 5px 3px rgba(101, 118, 122, 0.7);
  }

  .monitor_bottom h2 {
    color: rgba(14, 123, 204, 0.77);
  }

  .left, .right {
    padding: 10px 20px;
    flex: 1;
    background: #bdd7ee;
    border-radius: 5px;
  }

  .left {
    margin-right: 20px;
  }
  .monitor_top {
    flex: 1;
    background: #fff;
    height: 400px;
    box-shadow: 5px 5px 3px #666;
    text-align: left;
    overflow: hidden;
  }

  .monitor_bottom {
    margin-top: 30px;
    background: #fff;
    height: 370px;
    box-shadow: 5px 5px 3px #666;
    text-align: left;
    display: flex;
    padding: 20px;
  }
  .tree{
    margin: 10px auto;
    height: 220px;
    overflow-y: scroll;
    border: 1px solid #666;
    padding: 10px;
  }
</style>
