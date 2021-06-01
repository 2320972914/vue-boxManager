<template>
  <div class="userManage">
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
            placeholder="姓名/用户名/手机号/邮箱"
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
      <el-button type="primary" @click="enable">启用</el-button>
      <el-button type="primary" @click="disable">停用</el-button>
      <el-button type="primary" @click="deletelist">删除</el-button>
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
    <user-add ref="addData"></user-add>
    <user-edit ref="editData"></user-edit>
  </div>
</template>
<script>
import SiruiTable from "../../components/SiruiTable/index";
import UserAdd from "../userManages/UserAdd";
import UserEdit from "../userManages/UserEdit";
export default {
  name: "UserManages",
  components: {
    SiruiTable,
    UserAdd,
    UserEdit,
  },
  data() {
    return {
      searchForm: {
        searchValue: "",
      },
      columnList: [
        {
          prop: "userName",
          label: "用户名",
          width: 100,
          num: 1,
        },
        {
          prop: "nickName",
          label: "姓名",
          width: 150,
          num: 2,
        },
        {
          prop: "sex",
          label: "性别",
          width: 100,
          num: 7,
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
          width: 150,
          num: 5,
        },
      ],
      tabledata: [],
      getUserListUrl: "backend/user/list",
      deleteUserListUrl: this.$store.state.url + "backend/user/delete",
      resetUserListUrl: this.$store.state.url + "backend/user/reset",
      page: {
        total: 0,
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
      // this.page.pages=1,
      // this.page.pageSize=10,
      // this.page
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
    //删除用户
    deletelist() {
      this.$confirm("此操作将删除选择用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除客户
    deleteData() {
      if (0 == this.multipleSelection.length) {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      } else {
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
          .delete(this.deleteUserListUrl + params.userIds)
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
      }
    },
    //重置密码
    resetPassword() {
      this.$confirm("此操作将重置用户密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (0 == this.multipleSelection.length) {
            this.$message({
              type: "info",
              message: "请选择数据进行操作",
            });
          } else {
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
              .put(this.resetUserListUrl + params.userIds)
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
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    enable() {
      if (0 == this.multipleSelection.length) {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      } else {
        var selectData = JSON.parse(JSON.stringify(this.multipleSelection));
        // console.log(selectData);
        let params = {
          userIdsList: [],
          userIds: "",
        };
        for (let i = 0; i < selectData.length; i++) {
          params.userIdsList.push(selectData[i].userId);
        }
        params.userIds = params.userIdsList.join(",");
        this.$axios
          .put(this.$store.state.url + "backend/user/enable/" + params.userIds)
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
      }
    },
    disable() {
      if (0 == this.multipleSelection.length) {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      } else {
        var selectData = JSON.parse(JSON.stringify(this.multipleSelection));
        // console.log(selectData);
        let params = {
          userIdsList: [],
          userIds: "",
        };
        for (let i = 0; i < selectData.length; i++) {
          params.userIdsList.push(selectData[i].userId);
        }
        params.userIds = params.userIdsList.join(",");
        this.$axios
          .put(this.$store.state.url + "backend/user/disable/" + params.userIds)
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
      }
    },
    // getdata() {

    //   this.page.total = this.tabledata.length;
    //   var i = (this.page.pageNum - 1) * this.page.pageSize;
    //   this.orderdata = this.tabledata.slice(i, i + this.page.pageSize);
    // },
    // search() {
    //   this.orderdata = this.tabledata
    //     .filter((item) => {
    //       return (
    //         item.nickName.includes(this.searchForm.searchValue) ||
    //         item.userName.includes(this.searchForm.searchValue) ||
    //         item.phonenumber.includes(this.searchForm.searchValue) ||
    //         item.email.includes(this.searchForm.searchValue)
    //       );
    //     })
    //     .slice(
    //       (this.page.pageNum - 1) * this.page.pageSize,
    //       this.page.pageNum * this.page.pageSize
    //     );
    //   // console.log(this.orderdata);
    //   this.page.total = this.orderdata.length;
    // },
    search() {
      // console.log(
      //   this.getUserListUrl +
      //     "?pageNum=" +
      //     this.page.pageNum +
      //     "&pageSize=" +
      //     this.page.pageSize +
      //     "&searchValue=" +
      //     this.searchForm.searchValue
      // );
      this.$axios
        .get(
          this.getUserListUrl +
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
        if (this.tabledata[i].sex == 1) {
          this.tabledata[i].sex = "女";
        } else if (this.tabledata[i].sex == 0) {
          this.tabledata[i].sex = "男";
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
.userManage {
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