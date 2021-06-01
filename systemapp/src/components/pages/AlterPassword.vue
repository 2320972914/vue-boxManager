<template>
  <div class="alterpassword">
    <div class="header">
      <van-nav-bar
        class=""
        title="修改密码"
        left-text=""
        left-arrow
        :border="false"
        style="color: #fff"
      >
        <template #left>
          <van-icon name="arrow-left" color="#fff" @click="toBack()" />
        </template>
      </van-nav-bar>
    </div>
    <van-form>
      <van-cell-group class="inp">
        <van-field
          v-model="oldPassword"
          label="原密码"
          placeholder="请输入原密码"
          :rules="rules"
        />
        <van-field
          v-model="newPassword"
          label="新密码"
          placeholder="请输入新密码"
          :rules="rules"
        />
        <van-field
          v-model="confirmPassword"
          label="确认密码"
          placeholder="请输入确认密码"
          :rules="rules"
        />
      </van-cell-group>
      <div class="bott">
        <van-button block round class="btn" @click="rePassword"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      rules: [
        {
          pattern: /^[a-zA-Z0-9]{3,15}$/,
          required: true,
          message: "请输入正确的密码",
        },
      ],
    };
  },
  methods: {
    toBack() {
      this.$router.go(-1);
    },
    rePassword() {
      this.$axios
        .put(
          "app/personal/updatePassword" +
            "/" +
            this.oldPassword +
            "/" +
            this.newPassword
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.$toast.success(res.data.msg);
            this.Logout();
          } else if (res.data.code == 500) {
            this.$toast.fail(res.data.msg);
          }
        });
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
  },
};
</script>
<style scoped>
.alterpassword {
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
  border-radius: 10px;
  margin: 10px auto 0;
  overflow: hidden;
}
.bott {
  width: 80%;
  margin: 20px auto 20px;
  bottom: 0;
}
.btn {
  background: url(../../assets/bg2.png);
  color: #fff;
}
</style>