<template>
  <div class="boxstandard">
    <el-card class="searchbox">
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="80px"
        class="searchform"
      >
        <el-form-item label="箱子规格" prop="searchValue">
          <el-select v-model="searchForm.searchValue" placeholder="请选择">
            <el-option
              v-for="item in searchForm.standard"
              :key="item.boxStandard"
              :label="item.boxStandard"
              :value="item.boxStandard"
            >
            </el-option>
          </el-select>
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
      <el-button type="primary" @click="deleteBoxStandard">删除</el-button>
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
    <standard-add ref="addData"></standard-add>
  </div>
</template>
<script>
import SiruiTable from "../../../components/SiruiTable/index";
import StandardAdd from "../boxStandard/StandardAdd";
export default {
  name: "boxFormat",
  components: {
    SiruiTable,
    StandardAdd,
  },
  data() {
    return {
      searchForm: {
        standard: [],
        searchValue: "",
      },
      columnList: [
        {
          prop: "boxStandard",
          label: "箱子规格",
          width: 150,
          num: 1,
        },
        {
          prop: "totalNumber",
          label: "总数量",
          width: 150,
          num: 2,
        },
        {
          prop: "usedNumber",
          label: "已使用数量",
          width: 150,
          num: 3,
        },
        {
          prop: "inventoryNumber",
          label: "库存",
          width: 150,
          num: 4,
        },
        {
          prop: "useRatio",
          label: "使用比例",
          width: 150,
          num: 5,
        },
        {
          prop: "boxUnitPrice",
          label: "所需积分",
          width: 150,
          num: 6,
        },
      ],
      getBoxStandardSelectUrl: "backend/box/standard/select",
      getBoxStandardlistUrl: "backend/box/standard/list",
      deleteboxStandardUrl: "backend/box/standard/delete",
      tabledata: [],
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
        JSON.parse(JSON.stringify(this.multipleSelection))
      );
    },
    //获取数据
    search() {
      this.$axios
        .get(
          this.getBoxStandardlistUrl +
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
        } else if (500 == res.data.code) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    deleteBoxStandard() {
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
            console.log(this.deleteboxStandardUrl + params.ids);
            this.$axios
              .delete(this.deleteboxStandardUrl + params.ids)
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
  },

  mounted() {
    this.search();
    this.getSelectList();
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
</style>