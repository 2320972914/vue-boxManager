<template>
  <div id="login" class="bg">
    <div class="haed">
      <span class="logo">LOGO</span>
    </div>
    <div class="box_all">
      <div class="box_left">
        <h2 class="title_left">储留箱后台管理系统</h2>
        <p class="text_left">STORAGE BOX BACKGROUND MANAGEMENT SYSYTEM</p>
      </div>
      <div class="box_right">
        <h2 class="title_right">欢迎登录</h2>
        <p class="text_right">储留箱后台管理系统</p>
        <el-form :model="form" label-width="80px" :rules="rules" ref="form">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="form.username">
              <template slot="prepend"
                ><img src="../assets/yonghu-2.png" alt
              /></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="form.password"
              show-password
            >
              <template slot="prepend"
                ><img src="../assets/mima-2.png" alt
              /></template>
            </el-input>
          </el-form-item>
          <el-button
            type="primary"
            @click="submitForm('form')"
            class="login-btn"
            >登录</el-button
          >
        </el-form>
        <p style="text-align: center">
          <a href="#" class="forget" @click="help">忘记密码？</a>
          <a href="#" class="help" @click="help">寻求帮助</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    function checkName(rule, value, callback) {
      var username = /^[a-zA-Z][a-zA-Z0-9]{2,15}$/;
      var idCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      var phone = /^1[3456789]\d{9}$/;
      if (!value) {
        callback(new Error("请输入用户名/手机号/身份证号"));
      }
      setTimeout(() => {
        if (
          !idCard.test(value) &&
          !username.test(value) &&
          !phone.test(value)
        ) {
          callback(new Error("请输入用户名/手机号/身份证号"));
        } else {
          callback();
        }
      }, 100);
    }
    return {
      userType: "01",
      form: {
        username: "",
        password: "",
      },
      loginUrl: this.$store.state.url + "common/login",
      getLoginInfo: this.$store.state.url + "common/getLoginInfo",
      role: "",
      rules: {
        username: [
          {
            validator: checkName,
            required: true,
            trigger: "blur",
          },
        ],
        password: [
          {
            pattern: /^[a-zA-Z0-9]{1,16}$/,
            required: true,
            message: "请输入正确的密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    //清楚登录人信息
    localStorage.clear();
  },
  methods: {
    // 获取登录人信息接口
    loginPerson() {
      let PersonParms = {};
      this.$axios.get(this.getLoginInfo, PersonParms).then((res) => {
        console.log(1111);
        if (200 == res.data.code) {
          this.role = res.data.roles[0];
          // if (this.role == "app") {
          //   this.$router.push("/");
          //   this.$message({
          //     showClose: true,
          //     message: "用户为手机端用户，无法登陆",
          //     type: "error",
          //   });
          // }
          //  else if (this.role == "admin") {
          //   this.$router.push("/");
          //   this.$message({
          //     showClose: true,
          //     message: "用户为测试用户，无法登陆",
          //     type: "error",
          //   });
          // }
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
      });
    },
    // 忘记密码
    help() {
      this.$alert("请联系管理员13234567821", "忘记密码", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },

    // 登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let paramForm = {
            username: this.form.username,
            password: this.form.password,
            userType: this.userType,
          };
          this.$axios.post(this.loginUrl, paramForm).then((res) => {
            if (200 == res.data.code) {
              this.loginPerson();
              console.log(res.data);
              console.log("登录成功");
              localStorage.setItem("username", paramForm.username);
              localStorage.setItem("token", res.data.token); //存返回的token值
              this.$router.push("/ordermanages");
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
              this.form.username = "";
              this.form.password = "";
            }
          });
        }
      });
    },
  },
};
</script>
<style  scoped>
html {
  margin: 0;
  padding: 0;
}
#login {
  overflow: hidden;
  width: 100%;
  height: 1078px;
}
.bg {
  background-image: url(../assets/bg2.png);
}
.head {
  height: 100px;
  width: auto;
}
.logo {
  font-size: 36px;
  height: 100px;
  line-height: 100px;
  margin-left: 50px;
  font-weight: bold;
  color: #fff;
}
.box_all {
  width: 900px;
  height: 400px;
  margin: 0 auto;
  margin-top: 150px;
  overflow: hidden;
}
.box_left {
  float: left;
  width: 450px;
  height: 400px;
  background: rgba(221, 221, 221, 0.1);
  border-radius: 10px;
  overflow: hidden;
}
.box_right {
  float: right;
  width: 450px;
  height: 400px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}
.title_left {
  text-align: center;
  margin-top: 100px;
  color: #fff;
  font-weight: normal;
  font-size: 28px;
}
.text_left {
  text-align: center;
  margin-top: 60px;
  color: #fff;
  font-size: 14px;
}
.title_right {
  text-align: left;
  margin: 40px 0 0 40px;
  color: #000;
  font-size: 28px;
  font-weight: normal;
}
.text_right {
  text-align: left;
  margin: 30px 0 30px 40px;
  color: gray;
  font-size: 16px;
}
.el-input {
  width: 300px;
}
.box_right .el-button {
  text-align: center;
  width: 200px;
  margin-left: 125px;
}
.forget {
  text-align: center;
  text-decoration: none;
}
.help {
  text-align: center;
  text-decoration: none;
}
</style>
