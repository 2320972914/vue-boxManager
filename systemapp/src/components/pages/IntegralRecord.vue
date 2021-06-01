<template>
  <div class="integralrecord">
    <div class="header">
      <van-nav-bar
        class=""
        title="积分记录"
        left-text="返回"
        left-arrow
        :border="false"
        style="color: #fff"
      >
        <template #left>
          <van-icon name="arrow-left" color="#fff" />
          <label for="返回" style="color: #fff" @click="toPer()">返回</label>
        </template>
      </van-nav-bar>
    </div>
    <div class="pointbox">
      <label for="积分" class="point">{{ data }}</label>
      <label for="当前积分">当前积分</label>
    </div>
    <div>
      <van-cell class="pointlist">
        <label for="积分明细" style="font-weight: 900">积分明细</label>
        <div class="list">
          <van-list :finished="finished" finished-text="没有更多了">
            <van-cell v-for="item in pointslist" :key="item.id">
              <div class="item">
                <label for="way" class="way">{{ waylist[item.way] }}</label>
                <label for="createTime" class="createTime">{{
                  item.createTime
                }}</label>
                <label for="points" class="points">{{ item.points }}</label>
              </div>
            </van-cell>
          </van-list>
        </div>
      </van-cell>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: "",
      finished: true,
      waylist: ["", "注册赠送", "活动获得", "积分使用"],
      pointslist: [],
    };
  },
  methods: {
    toPer() {
      this.$router.push("/personcenter");
    },
    getUesrPoint() {
      this.$axios.get("app/point/select").then((res) => {
        if (res.data.code == 200) {
          this.$toast.success(res.data.msg);
          this.data = res.data.data;
        } else if (500 == res.data.code) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    getPointList() {
      this.$axios.get("app/point/list").then((res) => {
        if (res.data.code == 200) {
          this.$toast.success(res.data.msg);
          this.pointslist = res.data.rows;
        } else if (500 == res.data.code) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.getUesrPoint();
    this.getPointList();
  },
};
</script>
<style scoped>
html {
  margin: 0;
  padding: 0;
}
.integralrecord {
  width: 100%;
  min-height: 640px;
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
.pointbox {
  width: 100%;
  height: 150px;
  text-align: center;
  overflow: hidden;
  color: #fff;
  font-size: 12px;
}
.point {
  display: block;
  color: #fff;
  font-size: 50px;
  margin-top: 40px;
}
.pointlist {
  width: 95%;
  height: 400px;
  margin: 10px auto 0;
  border-radius: 10px;
  margin-bottom: 20px;
}
.list {
  overflow: scroll;
  height: 400px;
}
.way {
  display: block;
}
.createTime {
  display: block;
}
.points {
  height: 40px;
  line-height: 40px;
  color: #046ac6;
  font-size: 20px;
  position: absolute;
  right: 0;
  top: 0;
}
</style>