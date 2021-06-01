<template>
  <div id="Header">
    <div class="head">
      <span class="title">储留箱后台管理系统</span>
      <div class="downlist">
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link"
            >{{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="updatePw"> 修改密码</el-dropdown-item>
            <el-dropdown-item command="quiteLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="400px"
      :close-on-click-modal="false"
      @close="resetform('ruleForm')"
    >
      <el-form
        :model="ruleForm"
        label-width="150px"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="ruleForm.oldPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="ruleForm.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetform('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="updatePassword('ruleForm')"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Header",

  data() {
    function checkpassword(rule, value, callback) {
      var password = /^[a-zA-Z0-9]{1,16}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (!password.test(value)) {
          callback(new Error("请输入正确的密码"));
        }
        callback();
      }
    }
    return {
      dialogVisible: false,
      userName: "",
      name: "",
      ruleForm: {
        oldPassword: "",
        newPassword: "",
      },
      rules: {
        oldPassword: [
          {
            validator: checkpassword,
            required: true,
            message: "请输入旧密码",
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            validator: checkpassword,
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.name = localStorage.getItem("username");
  },
  methods: {
    handleCommand(command) {
      if (command == "updatePw") {
        this.dialogVisible = true;
      }
      if (command == "quiteLogin") {
        this.logout();
      }
    },
    resetform(formName) {
      // this.ruleForm.newPassword = "";
      // this.ruleForm.oldPassword = "";
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    logout() {
      this.$axios.post("common/logout").then((res) => {
        console.log(res.data.code);
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success",
          });
        } else if (500 == res.data.code) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
        this.$router.push("/");
      });
    },
    updatePassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let paramForm = {
            oldPassword: this.ruleForm.oldPassword,
            newPassword: this.ruleForm.newPassword,
          };
          this.$axios
            .put(
              "backend/home/updatePassword" +
                "/" +
                paramForm.oldPassword +
                "/" +
                paramForm.newPassword
            )
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "success",
                });
                this.logout();
              } else if (500 == res.data.code) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "error",
                });
              }
            });
        }
      });
    },
  },
};
</script>
<style scoped>
html {
  margin: 0;
  padding: 0;
}
#Header {
  overflow: hidden;
}
.head {
  width: 100%;
  height: 59px;
  border-bottom: 1px rgb(221, 221, 221) solid;
  overflow: hidden;
}
.title {
  height: 59px;
  line-height: 59px;
  font-size: 32px;
  font-weight: bold;
  color: rgb(2, 83, 204);
  margin-left: 10px;
}
.downlist {
  float: right;
  height: 59px;
  width: auto;
}
.el-dropdown {
  background: url("../assets/头像.png") no-repeat 0px 8px;
  height: 59px;
  margin-right: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  margin-left: 59px;
  line-height: 59px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
