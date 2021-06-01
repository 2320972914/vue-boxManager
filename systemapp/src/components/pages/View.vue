<template>
  <div class="view">
    <div class="header">
      <van-nav-bar
        class=""
        title="意见建议"
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
    <van-form>
      <van-cell-group class="inp">
        <van-field
          v-model="title"
          label="标题"
          placeholder="请输入标题"
          :rules="rules.title"
        />
        <van-field
          v-model="content"
          rows="1"
          autosize
          type="textarea"
          placeholder="请在此输入建议内容"
          :rules="rules.content"
        />
      </van-cell-group>
      <div class="bott">
        <van-button block class="btn" @click="addAdvice()">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入内容",
          },
        ],
      },
    };
  },
  methods: {
    toPersonCenter() {
      this.$router.push("/personcenter");
    },
    addAdvice() {
      let Param = {
        title: this.title,
        content: this.content,
      };
      this.$axios.post("app/personal/advice", Param).then((res) => {
        if (res.data.code == 200) {
          this.$toast.success(res.data.msg);
          this.$router.push("/personcenter");
        } else if (res.data.code == 500) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped>
.view {
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
.bott {
  width: 80%;
  margin: 20px auto 20px;
  bottom: 0;
}
.btn {
  background: url(../../assets/bg2.png);
  color: #fff;
  border-radius: 10px;
}
</style>