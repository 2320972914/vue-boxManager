<template>
  <div class="adinfo">
    <div class="header">
      <van-nav-bar
        class=""
        title="广告详情"
        left-text=""
        left-arrow
        :border="false"
        style="color: #fff"
      >
        <template #left>
          <van-icon name="arrow-left" color="#fff" @click="toIndex()" />
        </template>
      </van-nav-bar>
    </div>
    <div class="top">
      <img
        :src="'http://localhost:8081' + this.adData.imgUrl"
        alt=""
        width="100%"
      />
    </div>
    <van-cell-group class="inp">
      <van-field v-model="adData.title" label="标题" readonly :border="false" />
      <van-field
        v-model="adData.content"
        label="内容"
        rows="1"
        autosize
        type="textarea"
        readonly
      />
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      adData: {},
    };
  },
  methods: {
    toIndex() {
      this.$router.push("/index");
    },
  },
  mounted() {
    this.adData = JSON.parse(this.$route.params.data);
  },
};
</script>                                                                                                                                                                                                          
<style  scoped>
.adinfo {
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
.top {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.inp {
  width: 95%;
  min-height: 200px;
  border-radius: 10px;
  margin: 10px auto 0;
  overflow: hidden;
}
</style>

