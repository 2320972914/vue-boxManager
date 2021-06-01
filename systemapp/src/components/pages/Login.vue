<template>
  <div id="Login">
    <div class="top">
      <label for="储留箱" class="tit">储留箱</label>
    </div>
    <div class="inp">
      <van-form class="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          placeholder=" 用户名"
          left-icon="manager"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          placeholder=" 密码"
          left-icon="eye"
        />
        <div style="margin: 40px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="toLogin()"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
    <div class="bott">
      <div>忘记密码</div>
      <div @click="register()">注册</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      userType: "02",
      role: "",
    };
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    //获取登录人信息
    loginPerson() {
      let PersonParms = {};
      this.$axios.get("common/getLoginInfo", PersonParms).then((res) => {
        if (200 == res.data.code) {
          this.role = res.data.roles[0];
          console.log(this.role);
          if (this.role == "backend") {
            this.$toast.fail("用户为后台端用户无法登录");
            this.$router.push("/");
          }
          // this.$toast.success(res.data.msg);
        } else if (500 == res.data.code) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    toLogin() {
      var username = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
      var idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      var phonenumber = /^1[34578]\d{9}$/;
      var password = /^[a-zA-Z0-9]{3,15}$/;
      if (!this.username) {
        this.$toast.fail("用户名不能为空");
      } else if (
        !username.test(this.username) &&
        !idCard.test(this.username) &&
        !phonenumber.test(this.username) &&
        !password.test(this.password)
      ) {
        this.$toast.fail("用户名或密码错误");
        this.password = "";
        this.username = "";
      } else if (!this.password) {
        this.$toast.fail("密码不能为空");
      } else {
        let paramForm = {
          username: this.username,
          password: this.password,
          userType: this.userType,
        };
        this.$axios.post("common/login", paramForm).then((res) => {
          if (res.data.code == 200) {
            this.loginPerson();
            console.log(res.data);
            console.log("登录成功");
            localStorage.setItem("username", paramForm.username);
            localStorage.setItem("token", res.data.token);
            this.$toast.success(res.data.msg);
            this.$router.push("/index");
          } else if (res.data.code == 500) {
            this.$toast.fail(res.data.msg);
          }
        });
      }
    },
  },
  mounted() {
    //清楚登录人信息
    localStorage.clear();
  },
};
</script>
<style scoped>
html {
  margin: 0;
  padding: 0;
}
#Login {
  width: 100%;
  background: #fff;
  margin: auto;
  padding-bottom: 55px;
}
.top {
  overflow: hidden;
  background: url(../../assets/bg1.png);
  width: 100%;
  height: 200px;
  line-height: 200px;
}
.tit {
  display: block;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #fff;
}
.inp {
  width: 80%;
  margin: 50px auto;
}
.van-cell {
  color: #046ac6;
  height: 70px;
  padding-top: 30px;
}
.bott {
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  justify-content: space-around;
  color: #000;
}
</style>