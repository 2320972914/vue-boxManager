<template>
  <div class="boxinfo">
    <el-card class="searchbox">
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="80px"
        class="searchform"
      >
        <el-form-item label="箱子规格" prop="boxStandard">
          <el-select v-model="searchForm.boxStandard" placeholder="请选择">
            <el-option
              v-for="item in searchForm.standard"
              :key="item.boxStandard"
              :label="item.boxStandard"
              :value="item.boxStandard"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="isUsed">
          <el-select v-model="searchForm.isUsed" placeholder="请选择">
            <el-option label="未使用" value="0"></el-option>
            <el-option label="已使用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用人" prop="usedByName">
          <el-input
            v-model="searchForm.usedByName"
            placeholder="请输入使用人"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="search" @click="search()"
        >查询</el-button
      >
      <el-button class="reset" @click="resetform('searchForm')">重置</el-button>
    </el-card>
    <el-card>
      <el-button type="primary" @click="addData()">新增</el-button>
      <el-button type="primary" @click="deleteBoxInfo">删除</el-button>
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
        >
        </el-table-column>
      </sirui-table>
    </el-card>
    <Info-add ref="addData"></Info-add>
  </div>
</template>
<script>
import SiruiTable from "../../../components/SiruiTable/index";
import InfoAdd from "../boxInfo/InfoAdd";
export default {
  name: "boxFormat",
  components: {
    SiruiTable,
    InfoAdd,
  },
  data() {
    return {
      searchForm: {
        standard: [],
        boxStandard: "",
        isUsed: "",
        usedByName: "",
      },
      columnList: [
        {
          prop: "boxStandard",
          label: "箱子规格",
          width: 150,
          num: 1,
        },
        {
          prop: "boxCode",
          label: "订单编号",
          width: 250,
          num: 2,
        },
        {
          prop: "boxUnitPrice",
          label: "所需积分",
          width: 150,
          num: 3,
        },
        {
          prop: "isUsed",
          label: "使用状态",
          width: 150,
          num: 4,
        },
        {
          prop: "usedByName",
          label: "使用人",
          width: 150,
          num: 5,
        },
        {
          prop: "remark",
          label: "备注",
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
      getBoxStandardSelectUrl: "backend/box/standard/select",
      getBoxInfolistUrl: "backend/box/info/list",
      deleteBoxInfodUrl: "backend/box/info/delete",
      page: {
        pages: 4,
        total: 20,
        pageSize: 10,
        pageNum: 1,
      },
      load: false,
      tableHeight: 500,
      multipleSelection: [],
    };
  },
  methods: {
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
      this.search();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.search();
    },
    addData() {
      this.$refs.addData.openDialog(
        true,
        JSON.parse(JSON.stringify(this.searchForm.standard))
      );
    },
    getSelectList() {
      //获取下拉列表
      this.$axios.get(this.getBoxStandardSelectUrl).then((res) => {
        if (200 == res.data.code) {
          this.searchForm.standard = res.data.data;
          this.$message({
            showClose: true,
            message: "查询成功",
            type: "success",
          });
          // console.log(this.searchForm.standard);
        } else if (500 == res.data.code) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    search() {
      this.$axios
        .get(
          this.getBoxInfolistUrl +
            "?pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&isUsed=" +
            this.searchForm.isUsed +
            "&usedByName=" +
            this.searchForm.usedByName +
            "&boxStandard=" +
            this.searchForm.boxStandard
        )
        .then((res) => {
          if (200 == res.data.code) {
            this.page.total = res.data.total;
            this.tabledata = res.data.rows;
            this.word();
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
    deleteBoxInfo() {
      if (0 == this.multipleSelection.length) {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      } else {
        this.$confirm("此操作将删除选中规格, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            var selectData = JSON.parse(JSON.stringify(this.multipleSelection));
            console.log(selectData);
            let params = {
              idsList: [],
              ids: "",
            };
            for (let i = 0; i < selectData.length; i++) {
              params.idsList.push(selectData[i].id);
            }
            params.ids = "/" + params.idsList.join(",");
            console.log(this.deleteBoxInfodUrl + params.ids);
            this.$axios
              .delete(this.deleteBoxInfodUrl + params.ids)
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
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    word() {
      for (let i = 0; i < this.tabledata.length; i++) {
        if (this.tabledata[i].isUsed == 1) {
          this.tabledata[i].isUsed = "已使用";
        } else if (this.tabledata[i].isUsed == 0) {
          this.tabledata[i].isUsed = "未使用";
        }
        if (this.tabledata[i].delFlag == 0) {
          this.tabledata[i].delFlag = "未删除";
        }
        if (this.tabledata[i].delFlag == 2) {
          this.tabledata[i].delFlag = "已删除";
        }
      }
    },
  },
  mounted() {
    this.getSelectList();
    this.search();
  },
};
</script>
<style  scoped>
html {
  margin: 0;
  padding: 0;
}
.boxstandard {
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
.el-form-item {
  float: left;
}
</style>