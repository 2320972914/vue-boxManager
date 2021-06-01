<template>
  <div class="aboutme">
    <div class="header">
      <van-nav-bar
        class=""
        title="关于我们"
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
    <van-cell class="inp">
      <label for="text"
        >为满足个人用户对临时寄放物品等仓储业务的需求，
        储留箱业务有限公司出了以上海市微服务范围的个人物品箱式寄存，
        上门送箱/物品周转服务。
        储留箱个人仓储业务也是基于搞业务开发、实施的软件项目。
      </label>
    </van-cell>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toPersonCenter() {
      this.$router.push("/personcenter");
    },
  },
};
</script>
<style scoped>
.aboutme {
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
  height: 200px;
  border-radius: 10px;
  margin: 10px auto 0;
  overflow: hidden;
  text-indent: 2em;
  line-height: 25px;
  font-size: 18px;
}
</style>