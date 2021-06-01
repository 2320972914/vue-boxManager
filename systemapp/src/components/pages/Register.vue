<template>
  <div class="register">
    <div class="header">
      <van-nav-bar
        title="注册"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="top">
      <label for="chu liu xiang" class="tit"
        >CHU&nbsp;&nbsp;&nbsp;&nbsp;LIU&nbsp;&nbsp;&nbsp;XIANG</label
      >
    </div>
    <div class="inp">
      <van-form class="onSubmit">
        <van-field
          v-model="userName"
          name="用户名"
          placeholder=" 用户名"
          left-icon="manager"
          :rules="rules.userName"
          @blur="usernameCheck"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          @blur="passwordCheck"
          placeholder=" 密码"
          left-icon="lock"
          :rules="rules.password"
        />
        <van-field
          v-model="repassword"
          type="password"
          name="确认密码"
          placeholder=" 确认密码"
          left-icon="lock"
          :rules="rules.repassword"
          @blur="surepassword"
        />
        <van-field
          v-model="phonenumber"
          name="手机"
          placeholder=" 手机"
          left-icon="phone-o"
          :rules="rules.phonenumber"
        />
        <van-field
          v-model="nickName"
          name="姓名"
          placeholder=" 姓名"
          left-icon="contact"
          :rules="rules.nickName"
        />
        <van-field
          v-model="email"
          name="邮箱"
          placeholder=" 邮箱"
          left-icon="free-postage"
          :rules="rules.email"
        />
        <van-field
          name="sex"
          label="性别"
          label-width="40px"
          style="padding-left: 40px"
        >
          <template #input>
            <van-radio-group v-model="sex" direction="horizontal">
              <van-radio name="0">男</van-radio>
              <van-radio name="1">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 10px 20px 0">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="register()"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
      nickName: "",
      password: "",
      repassword: "",
      phonenumber: "",
      email: "",
      sex: "0",
      userType: "02",
      rules: {
        userName: [
          {
            pattern: /^[a-zA-Z0-9]{1,16}$/,
            required: true,
            message: "请输入正确的用户名：只能包含英文和数字",
          },
        ],
        password: [
          {
            pattern: /^[a-zA-Z0-9]{3,15}$/,
            required: true,
            message: "请输入正确的密码",
          },
        ],
        repassword: [
          {
            pattern: /^[a-zA-Z0-9]{3,15}$/,
            required: true,
            message: "请重复密码",
          },
        ],
        nickName: [
          {
            pattern: /^[\u0391-\uFFE5]{2,10}$/,
            required: true,
            message: "请输入正确的名字",
          },
        ],
        email: [
          {
            pattern: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
            required: true,
            message: "请输入正确的邮箱",
          },
        ],

        phonenumber: [
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
            required: true,
            message: "请输入正确的电话号码",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            // trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
    usernameCheck() {
      var userName = /^[A-Za-z0-9]{2,16}$/;
      if (!this.userName) {
        this.$toast.fail("用户名不能为空！");
      } else if (!userName.test(this.userName)) {
        this.$toast.fail("用户名最大长度16，只能包含英文和数字！");
        this.userName = "";
      }
      if (this.userName == this.email || this.userName == this.phonenumber) {
        this.$toast.fail("用户名、邮箱、手机号不能相同 ");
        this.userName = "";
      }
    },
    passwordCheck() {
      var password = /^[A-Za-z0-9]{3,16}$/;
      if (!this.password) {
        this.$toast.fail("密码不能为空！");
      } else if (!password.test(this.password)) {
        this.$toast.fail("密码最大长度16，只能包含英文和数字 ");
        this.password = "";
      } else {
        this.isShow = false;
      }
    },
    surepassword() {
      if (this.password != this.surePassword) {
        this.$toast.fail("两次密码输入不一致！");
        this.surePassword = "";
      }
    },
    // nameCheck() {
    //   var nickName = /^([\u4e00-\u9fa5]){2,10}$/;
    //   if (!nickName.test(this.nickName)) {
    //     this.$toast.fail("请输入正确的姓名！");
    //     this.nickName = "";
    //   }
    // },
    // emailCheck() {
    //   var email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    //   if (!this.email) {
    //     this.$toast.fail("邮箱不能为空！");
    //   } else if (!email.test(this.email)) {
    //     this.$toast.fail("请输入正确的邮箱！");
    //     this.email = "";
    //   }
    // },
    // phoneCheck() {
    //   var phonenumber = /^1[3456789]\d{9}$/;
    //   if (!this.phonenumber) {
    //     this.$toast.fail("手机号不能为空！");
    //   } else if (!phonenumber.test(this.phonenumber)) {
    //     this.$toast.fail("请输入正确的手机号！");
    //     this.phonenumber = "";
    //   }
    //   if (this.userName == this.email || this.userName == this.phonenumber) {
    //     this.$toast.fail("用户名、邮箱、手机号不能相同 ");
    //     this.userName = "";
    //   }
  },
  register() {
    let paramForm = {
      userName: this.userName,
      password: this.password,
      nickName: this.nickName,
      phonenumber: this.phonenumber,
      email: this.email,
      sex: this.sex,
      userType: this.userType,
    };
    this.$axios.post("app/regist", paramForm).then((res) => {
      if (200 == res.data.code) {
        this.$toast.success(res.data.msg);
        this.$router.push("/");
      } else if (500 == res.data.code) {
        this.$toast.fail(res.data.msg);
      }
    });
  },
};
</script>
<style scoped >
.register {
  width: 100%;
  background: #fff;
}
.header {
  /* position: fixed; */
  width: 100%;
  /* top: 0; */
}
.top {
  width: 100%;
  height: 200px;
  background-size: 80% 80%;
  background-image: url(../../assets/logo1.png);
  background-repeat: no-repeat;
  background-position: center -15px;
  text-align: center;
  line-height: 270px;
}
.tit {
  font-size: 26px;
  color: #046ac6;
}
.inp {
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
}
.van-cell {
  color: #046ac6;
}
</style>