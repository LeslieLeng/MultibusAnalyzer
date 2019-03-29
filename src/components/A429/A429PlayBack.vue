<template>
  <div style="height: 800px">
    <div class="row">
      <div style="padding: 30px 30px 0 30px">
        <div class="left">
          <h2 style=" margin: 15px 10px 10px 30px;">文件</h2>
          <div style="width:300px;margin: 10px auto">
            选择：
            <el-input style="width: 200px"
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
      </div>
      <div style=" padding: 30px 30px 30px 0; flex: 1;min-width: 771px">
        <div class="right">
          <h2 style="line-height: 60px">数据</h2>
          <div style="text-align:left;padding: 20px">
            <label style="margin-left: 20px">文件名：</label>
            <span style="margin-left: 20px">{{Name}}</span>
            <label style="margin-left: 55%">操作：</label>
            <el-button style="margin-left: 20px" size="small" type="danger">删除</el-button>
          </div>
          <div style="margin: 0 30px">
            <el-table :data="tabledata"
                      height="409"
                      border
                      :header-cell-style="{background:'#74bbd5',color:'#fff'}"
                      :highlight-current-row=true style="width: 100%">

              <el-table-column align="center" prop="Channel" label="接收通道" width="80">
                <template slot-scope="scope">
                  <label>{{scope.row.Channel}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="Time" label="时间" width="150">
                <template slot-scope="scope">
                  <label>{{scope.row.Time}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="Label" label="标签" width="80">
                <template slot-scope="scope">
                  <label>{{scope.row.Label}}</label>
                </template>
              </el-table-column>
              <el-table-column prop="Data2" align="center" label="数据（16进制）" min-width="200">
                <template slot-scope="scope">
                  <label>{{scope.row.Data2}}</label>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="Data1"  label="数据（2进制）" min-width="200">
                <template slot-scope="scope">
                  <label>{{scope.row.Data1}}</label>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import $ from "jquery";
  export default {
    name: "A429PlayBack",
    data() {
      return {
        Name:'',
        filterText: '',
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
        tabledata: [{
          Channel: '1',
          Time: '09:50:29.703 000',
          Label: '201',
          Data2: '00000080',
          Data1: '0000000000001000',
        }],
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      getFileName(data){
        // console.log(data.label)
        this.Name=data.label
      },
      // 获取回放数据树状目录
      getFileTree(){
        axios.post('/', {

        }).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      },
      // 获取回放数据数据
      getPlayBackData(){
        axios.post('/', {

        }).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      },
      // 删除回放数据数据
      deletePlayBackData(){
        axios.post('/', {

        }).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      }
    },
  }
</script>

<style scoped>
  .row {
    display: flex;
    flex-direction: row;
  }

  .left {
    background: #fff;
    height: 650px;
    min-width: 400px;
    box-shadow: 5px 5px 3px #666;
    text-align: left;
    overflow: hidden;
  }
  .right {
    background: #fff;
    height: 650px;
    box-shadow: 5px 5px 3px #666;
  }
  .tree{
    width: 300px;
    margin: 10px auto;
    height: 450px;
    overflow-y: scroll;
    border: 1px solid #666;
    padding: 10px;
  }

</style>
