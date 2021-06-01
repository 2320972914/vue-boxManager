<template>
  <div class="customerManages">
    <el-card class="searchbox">
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="80px"
        class="searchform"
      >
        <el-form-item label="" prop="searchValue">
          <el-input
            v-model="searchForm.searchValue"
            placeholder="广告标题/广告内容/奖励积分"
          ></el-input>
          <el-button type="primary" class="search" @click="search()"
            >查询</el-button
          >
          <el-button class="reset" @click="resetform('searchForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" @click="addData()">新增</el-button>
      <el-button type="primary" @click="editData()">编辑</el-button>
      <el-button type="primary" @click="enableAd()">启用</el-button>
      <el-button type="primary" @click="disable()">停用</el-button>
      <el-button type="primary" @click="deleteAd()">删除</el-button>
      <sirui-table
        :data="tabledata"
        :page="page"
        :tableHeight="tableHeight"
        :loading="load"
        @handleSelectionChange="handleSelectionChange"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          v-for="item in columnList"
          :key="item.num"
          :label="item.label"
          :width="item.width"
          :prop="item.prop"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <img
              v-if="item.prop === 'imgUrl'"
              :src="'http://localhost:8081' + scope.row.imgUrl"
              style="width: 100px; height: 100px"
            /><template v-else>
              {{ scope.row[item.prop] }}
            </template>
          </template>
        </el-table-column>
      </sirui-table>
    </el-card>
    <advert-add ref="addData"></advert-add>
    <advert-edit ref="editData"></advert-edit>
  </div>
</template>
<script>
import SiruiTable from "../../components/SiruiTable/index";
import AdvertEdit from "../advertManages/AdvertEdit";
import AdvertAdd from "../advertManages/AdvertAdd";
export default {
  name: "customerManages",
  components: {
    SiruiTable,
    AdvertAdd,
    AdvertEdit,
  },
  data() {
    return {
      searchForm: {
        searchValue: "",
      },
      columnList: [
        {
          prop: "id",
          label: "广告编号",
          width: 100,
          num: 1,
        },
        {
          prop: "title",
          label: "广告标题",
          width: 100,
          num: 2,
        },
        {
          prop: "content",
          label: "广告内容",
          width: 300,
          num: 3,
        },
        {
          prop: "imgUrl",
          label: "图片地址",
          width: 150,
          num: 4,
        },
        {
          prop: "points",
          label: "奖励积分",
          width: 150,
          num: 5,
        },
        {
          prop: "isEnable",
          label: "广告状态",
          width: 150,
          num: 6,
        },
        {
          prop: "delFlag",
          label: "删除状态",
          width: 150,
          num: 7,
        },
      ],
      tabledata: [],
      getAdListUrl: "backend/advertisement/list",
      deleteAdListUrl: "backend/advertisement/delete",
      page: {
        pages: 1,
        total: 20,
        pageSize: 10,
        pageNum: 1,
      },
      load: false,
      tableHeight: 600,
      multipleSelection: [],
    };
  },
  methods: {
    //重置
    resetform(formName) {
      this.$refs[formName].resetFields();
      this.page.pageNum = 1;
      this.search();
    },
    handleSelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      // this.getdata();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      // this.getdata();
    },
    addData() {
      this.$refs.addData.openDialog(
        true,
        JSON.parse(JSON.stringify(this.multipleSelection))
      );
    },
    //编辑
    editData() {
      if (1 == this.multipleSelection.length) {
        this.$refs.editData.openDialog(
          true,
          JSON.parse(JSON.stringify(this.multipleSelection))
        );
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          type: "info",
          message: "请选择一条数据进行操作",
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      }
    },
    //获取数据
    search() {
      this.$axios
        .get(
          this.getAdListUrl +
            "?pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&searchValue=" +
            this.searchForm.searchValue
        )
        .then((res) => {
          if (200 == res.data.code) {
            this.page.total = res.data.total;
            this.tabledata = res.data.rows;
            this.Word();
            this.$message({
              showClose: true,
              message: "查询成功",
              type: "success",
            });
          } else if (500 == res.data.code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },
    //删除
    deleteAd() {
      if (0 == this.multipleSelection.length) {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      } else {
        this.$confirm("此操作将删除选中客户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            var selectData = JSON.parse(JSON.stringify(this.multipleSelection));
            console.log(selectData);
            let params = {
              idsList: [],
              id: "",
            };
            for (let i = 0; i < selectData.length; i++) {
              params.idsList.push(selectData[i].id);
            }
            params.id = "/" + params.idsList.join(",");
            this.$axios.delete(this.deleteAdListUrl + params.id).then((res) => {
              if (200 == res.data.code) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "success",
                });
                this.search();
              } else if (500 == res.data.code) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "error",
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    //启用
    enableAd() {
      if (0 == this.multipleSelection.length) {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      } else {
        this.$confirm("是否启用?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            var selectData = JSON.parse(JSON.stringify(this.multipleSelection));
            console.log(selectData);
            let params = {
              idsList: [],
              id: "",
            };
            let oEnable = true;
            for (let i = 0; i < selectData.length; i++) {
              params.idsList.push(selectData[i].id);
              if (selectData[i].isEnable == "启用") {
                oEnable = false;
              }
            }
            if (oEnable) {
              params.id = "/" + params.idsList.join(",");
              this.$axios
                .put("backend/advertisement/enable" + params.id)
                .then((res) => {
                  if (200 == res.data.code) {
                    this.$message({
                      showClose: true,
                      message: res.data.msg,
                      type: "success",
                    });
                    this.search();
                  } else if (500 == res.data.code) {
                    this.$message({
                      showClose: true,
                      message: res.data.msg,
                      type: "error",
                    });
                  }
                });
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: "选择的数据中含有已启用",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      }
    },
    //停用
    disable() {
      if (0 == this.multipleSelection.length) {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      } else {
        this.$confirm("是否停用?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            var selectData = JSON.parse(JSON.stringify(this.multipleSelection));
            console.log(selectData);
            let params = {
              idsList: [],
              id: "",
            };
            let oEnable = true;
            for (let i = 0; i < selectData.length; i++) {
              params.idsList.push(selectData[i].id);
              if (selectData[i].isEnable == "停用") {
                oEnable = false;
              }
            }
            console.log(oEnable);
            if (oEnable) {
              params.id = "/" + params.idsList.join(",");
              this.$axios
                .put("backend/advertisement/disable" + params.id)
                .then((res) => {
                  if (200 == res.data.code) {
                    this.$message({
                      showClose: true,
                      message: res.data.msg,
                      type: "success",
                    });
                    this.search();
                  } else if (500 == res.data.code) {
                    this.$message({
                      showClose: true,
                      message: res.data.msg,
                      type: "error",
                    });
                  }
                });
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: "选择的数据中含有已停用",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      }
    },
    Word() {
      for (let i = 0; i < this.tabledata.length; i++) {
        if (this.tabledata[i].isEnable == 1) {
          this.tabledata[i].isEnable = "停用";
        } else if (this.tabledata[i].isEnable == 0) {
          this.tabledata[i].isEnable = "启用";
        }
        if (this.tabledata[i].delFlag == 0) {
          this.tabledata[i].delFlag = "未删除";
        } else if (this.tabledata[i].delFlag == 2) {
          this.tabledata[i].delFlag = "已删除";
        }
      }
    },
  },

  mounted() {
    this.search();
  },
};
</script>
<style  scoped>
html {
  margin: 0;
  padding: 0;
}
.customerManages {
  width: 1280px;
  height: 700px;
  background: #fff;
}
.searchbox {
  height: 120px;
}
.el-card {
  background: #fff;
  margin: 10px;
  border-radius: 4px;
}
.el-input {
  width: 220px;
}
.search {
  margin-left: 80px;
}
.reset {
  margin-left: 80px;
}
.searchform {
  margin-top: 20px;
}
</style>