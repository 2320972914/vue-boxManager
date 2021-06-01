<template>
  <div class="accountmanagement">
    <div class="header">
      <van-nav-bar
        class=""
        title="个人信息"
        left-text=""
        left-arrow
        :border="false"
        style="color: #fff"
      >
        <template #left>
          <van-icon name="arrow-left" color="#fff" @click="toPersonCenter()" />
        </template>
      </van-nav-bar>
    </div>
    <van-cell-group class="inp">
      <van-field
        v-model="userInfo.nickName"
        label="姓名"
        readonly
        :border="false"
      />
      <van-field
        v-model="userInfo.phonenumber"
        label="手机号"
        readonly
        :border="false"
      />
      <van-field
        v-model="sexlist[userInfo.sex]"
        label="性别"
        readonly
        :border="false"
      />
      <van-field
        v-model="userInfo.email"
        label="邮箱"
        readonly
        :border="false"
      />
      <van-cell
        title="修改密码"
        is-link
        @click="toAlterPassword"
        :border="false"
      />
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {},
      sexlist: ["男", "女"],
    };
  },
  methods: {
    toPersonCenter() {
      this.$router.push("/personcenter");
    },
    toAlterPassword() {
      this.$router.push("/alterpassword");
    },
    getUserinfo() {
      this.$axios.get("common/getLoginInfo").then((res) => {
        if (200 == res.data.code) {
          // this.$toast.success("查询成功");
          this.userInfo = res.data.user;
        } else if (500 == res.data.code) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.getUserinfo();
  },
};
</script>
<style scoped>
.accountmanagement {
  width: 100%;
  min-height: 100%;
  background: #e6e6e6;
  overflow: hidden;
}
.van-nav-bar {
  background: url(../../assets/bg2.png);
}
.header /deep/ .van-nav-bar__title {
  color: #fff;
}
.header /deep/ .van-nav-bar__text {
  color: #fff;
}
.inp {
  width: 95%;
  min-height: 200px;
  border-radius: 10px;
  margin: 10px auto 0;
  overflow: hidden;
}
</style>