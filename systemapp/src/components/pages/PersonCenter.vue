<template>
  <div class="personcenter">
    <div>
      <div class="header">
        <van-nav-bar
          class=""
          title="个人中心"
          left-text="返回"
          left-arrow
          :border="false"
          style="color: #fff"
        >
          <template #left>
            <van-icon name="arrow-left" color="#fff" @click="toindex()" />
            <label for="返回" style="color: #fff" @click="toindex()"
              >返回</label
            >
          </template>
        </van-nav-bar>
      </div>
      <div class="inp">
        <van-cell class="box1" @click="toAccManage">
          <div class="tag">
            <label for="账户管理" class="manager">账户管理</label>
            <span><van-icon name="arrow" color="#fff" /></span>
          </div>
          <div class="person">
            <img
              src="../../assets/head.png"
              alt=""
              width="80px"
              style="border-radius: 40px"
            />
            <label for="userName" class="username">{{ userName }}</label>

            <label for="账户管理" class="usertype"
              ><van-icon name="card" color="red" /> 个人会员</label
            >
          </div>
        </van-cell>
        <van-cell class="box2">
          <van-cell is-link @click="toPoint()">积分记录</van-cell>
          <van-cell is-link @click="toAddrManage()">地址管理</van-cell>
          <van-cell is-link @click="toAlterPassword()">修改密码</van-cell>
          <van-cell is-link @click="toView()">意见管理</van-cell>
          <van-cell is-link @click="toaboutMe()">关于我们</van-cell>
        </van-cell>
      </div>

      <div class="bott">
        <van-button type="danger" round block @click="Logout()"
          >退出登录</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
    };
  },
  methods: {
    toindex() {
      this.$router.push("/index");
    },
    Logout() {
      this.$axios.post("common/logout").then((res) => {
        if (res.data.code == 200) {
          this.$toast.success(res.data.msg);
        } else if (500 == res.data.code) {
          this.$toast.fail(res.data.msg);
        }
      });
      this.$router.push("/");
    },
    toPoint() {
      this.$router.push("/integralrecord");
    },
    toaboutMe() {
      this.$router.push("/aboutme");
    },
    toView() {
      this.$router.push("/view");
    },
    toAlterPassword() {
      this.$router.push("/alterpassword");
    },
    toAddrManage() {
      this.$router.push("/addrmanage");
    },
    toAccManage() {
      this.$router.push("/accountmanagement");
    },
  },
  mounted() {
    this.userName = localStorage.getItem("username");
  },
};
</script>
<style scoped>
html {
  margin: 0;
  padding: 0;
}
.personcenter {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(../../assets/bg2.png) no-repeat;
  background-color: #e6e6e6;
}
.header {
  background: none;
}
.van-nav-bar {
  background-color: rgba(0, 0, 0, 0);
}
.header /deep/ .van-nav-bar__title {
  color: #fff;
}
.header /deep/ .van-nav-bar__text {
  color: #fff;
}
.box1 {
  width: 95%;
  height: 150px;
  margin: 70px auto 0px;
  border-radius: 10px;
  overflow: hidden;
}
.tag {
  float: right;
  width: 100px;
  height: 20px;
  background: #0069cd;
  border-radius: 10px 0 0 10px;
}
.box1.van-cell {
  padding: 15px 0;
}
.manager {
  width: 60px;
  height: 16px;
  line-height: 20px;
  margin-left: 10px;
  color: #fff;
}
.person {
  width: 170px;
  height: 100px;
  margin-left: 40px;
  margin-top: 10px;
}
.username {
  position: absolute;
  top: 30px;
  margin-left: 20px;
  font-size: 16px;
}
.usertype {
  position: absolute;
  top: 60px;
  margin-left: 20px;
  font-size: 12px;
  color: #9e9e9e;
}
.box2 {
  width: 95%;
  height: 240px;
  margin: 10px auto 0px;
  border-radius: 10px;
  overflow: hidden;
}
.bott {
  width: 80%;
  margin: 30px auto 0px;
}
</style>