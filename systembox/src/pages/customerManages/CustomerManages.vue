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
            placeholder="姓名/客户名/手机号/邮箱"
          ></el-input>
          <el-button type="primary" class="search" @click="search()">
            查询</el-button
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
      <el-button type="primary" @click="enable">启用</el-button>
      <el-button type="primary" @click="disable">停用</el-button>
      <el-button type="primary" @click="deleteCustomer">删除</el-button>
      <el-button type="primary" @click="resetPassword">重置密码</el-button>
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
    <customer-add ref="addData"></customer-add>
    <customer-edit ref="editData"></customer-edit>
  </div>
</template>
<script>
import SiruiTable from "../../components/SiruiTable/index";
import CustomerAdd from "../customerManages/CustomerAdd";
import CustomerEdit from "../customerManages/CustomerEdit";
export default {
  name: "customerManages",
  components: {
    SiruiTable,
    CustomerAdd,
    CustomerEdit,
  },
  data() {
    return {
      searchForm: {
        searchValue: "",
      },
      columnList: [
        {
          prop: "userName",
          label: "客户名",
          width: 150,
          num: 1,
        },
        {
          prop: "nickName",
          label: "客户姓名",
          width: 150,
          num: 2,
        },
        {
          prop: "phonenumber",
          label: "手机号",
          width: 200,
          num: 3,
        },
        {
          prop: "email",
          label: "邮箱",
          width: 200,
          num: 4,
        },
        {
          prop: "status",
          label: "状态",
          width: 100,
          num: 5,
        },
        {
          prop: "currentPoints",
          label: "积分",
          width: 100,
          num: 6,
        },
      ],
      tabledata: [],
      getCustomerListUrl: "backend/customer/list",
      deleteCustomerListUrl: "backend/customer/delete",
      resetCustomerListUrl: "backend/customer/reset",
      page: {
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
    search() {
      this.$axios
        .get(
          this.getCustomerListUrl +
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
            this.Word();
          } else if (500 == res.data.code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },
    Word() {
      for (let i = 0; i < this.tabledata.length; i++) {
        if (this.tabledata[i].status == 1) {
          this.tabledata[i].status = "停用";
        } else if (this.tabledata[i].status == 0) {
          this.tabledata[i].status = "启用";
        }
        // if (this.tabledata[i].sex == 1) {
        //   this.tabledata[i].sex = "女";
        // } else if (this.tabledata[i].sex == 0) {
        //   this.tabledata[i].sex = "男";
        // }
      }
    },
    //删除
    deleteCustomer() {
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
              userIdsList: [],
              userIds: "",
            };
            for (let i = 0; i < selectData.length; i++) {
              params.userIdsList.push(selectData[i].userId);
            }
            params.userIds = "/" + params.userIdsList.join(",");
            // console.log(this.DeleteUserListUrl + params.userIds);
            this.$axios
              .delete(this.deleteCustomerListUrl + params.userIds)
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
    //启用
    enable() {
      if (0 == this.multipleSelection.length) {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      } else {
        this.$confirm("是否启用", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            var selectData = JSON.parse(JSON.stringify(this.multipleSelection));
            console.log(selectData);
            let params = {
              userIdsList: [],
              userIds: "",
            };
            for (let i = 0; i < selectData.length; i++) {
              params.userIdsList.push(selectData[i].userId);
            }
            params.userIds = "/" + params.userIdsList.join(",");
            // console.log(this.DeleteUserListUrl + params.userIds);
            this.$axios
              .put("backend/customer/enable" + params.userIds)
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
        this.$confirm("是否停用", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            var selectData = JSON.parse(JSON.stringify(this.multipleSelection));
            console.log(selectData);
            let params = {
              userIdsList: [],
              userIds: "",
            };
            for (let i = 0; i < selectData.length; i++) {
              params.userIdsList.push(selectData[i].userId);
            }
            params.userIds = "/" + params.userIdsList.join(",");
            this.$axios
              .put("backend/customer/disable" + params.userIds)
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
              message: "已取消操作",
            });
          });
      }
    },
    //重置密码
    resetPassword() {
      if (0 == this.multipleSelection.length) {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      } else {
        this.$confirm("此操作将客户密码, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            var selectData = JSON.parse(JSON.stringify(this.multipleSelection));
            console.log(selectData);
            let params = {
              userIdsList: [],
              userIds: "",
            };
            for (let i = 0; i < selectData.length; i++) {
              params.userIdsList.push(selectData[i].userId);
            }
            params.userIds = "/" + params.userIdsList.join(",");
            this.$axios
              .put(this.resetCustomerListUrl + params.userIds)
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
              message: "已取消重置密码",
            });
          });
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