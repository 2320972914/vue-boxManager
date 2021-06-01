<template>
  <div class="listdetail">
    <div class="header">
      <van-nav-bar
        class=""
        title="订单详情"
        left-text=""
        left-arrow
        :border="false"
        style="color: #fff"
      >
        <template #left>
          <van-icon name="arrow-left" color="#fff" @click="onClickLeft()" />
          <label for="" @click="onClickLeft()">返回</label>
        </template>
      </van-nav-bar>
    </div>
    <div class="listinfo">
      <ul class="list1">
        <li>订单编号：{{ listdetail.orderCode }}</li>
        <li v-if="emptyShow == true">
          空箱上门下单时间: {{ listdetail.emptyBoxOrderTime }}
        </li>
        <li v-if="heavyShow == true">
          重箱提取下单时间{{ listdetail.heavyBoxOrderTime }}
        </li>
      </ul>
      <ul class="list2">
        <li>订单名称：{{ listdetail.orderName }}</li>
        <li>箱子id：{{ listdetail.boxId }}</li>
      </ul>
      <ul class="list1">
        箱子信息
      </ul>
      <ul class="list2">
        <li>箱子编号：{{ listdetail.boxCode }}</li>
        <li>箱子规格：{{ listdetail.boxStandard }}</li>
      </ul>
      <ul class="list2">
        <li>箱子单价积分：{{ listdetail.boxUnitPrice }}</li>
        <li>租赁时长：{{ listdetail.leaseDuration }}</li>
      </ul>
      <ul class="list1">
        配送信息
      </ul>
      <div v-if="emptyShow == true">
        <ul class="list2">
          <li>空箱上门姓名：{{ listdetail.emptyBoxCallName }}</li>
        </ul>
        <ul class="list2">
          <li>空箱上门电话：{{ listdetail.emptyBoxCallPhone }}</li>
        </ul>
        <ul class="list2">
          <li>空箱上门地址：{{ listdetail.emptyBoxCallAddress }}</li>
        </ul>
        <ul class="list2">
          <li>空箱上门时间：{{ listdetail.emptyBoxCallTime }}</li>
        </ul>
        <ul class="list2">
          <li>空箱上门时段：{{ listdetail.emptyBoxCallInterval }}</li>
        </ul>
      </div>
      <div v-if="heavyShow == true">
        <ul class="list2">
          <li>重箱提取姓名：{{ listdetail.heavyBoxCallName }}</li>
        </ul>
        <ul class="list2">
          <li>重箱提取电话：{{ listdetail.heavyBoxCallPhone }}</li>
        </ul>
        <ul class="list2">
          <li>重箱提取地址：{{ listdetail.heavyBoxCallAddress }}</li>
        </ul>
        <ul class="list2">
          <li>重箱提取时间：{{ listdetail.heavyBoxCallTime }}</li>
        </ul>
        <ul class="list2">
          <li>重箱提取时段：{{ listdetail.heavyBoxCallInterval }}</li>
        </ul>
      </div>
      <div class="bott">
        <div>
          <ul class="listbott">
            <li>订单状态：{{ statuslist[listdetail.status] }}</li>
            <li v-if="listdetail.status == 2">
              <van-button
                type="info"
                size="small"
                class="btn"
                @click="Btnstatus()"
                >收取空箱</van-button
              >
            </li>
            <li v-if="listdetail.status == 3">
              <van-button
                type="info"
                size="small"
                class="btn"
                @click="Btnstatus()"
                >发送重箱</van-button
              >
            </li>
            <li v-if="listdetail.status == 5">
              <van-button
                type="info"
                size="small"
                class="btn"
                @click="Btnstatus()"
                >预约提取</van-button
              >
            </li>
            <li v-if="listdetail.status == 7">
              <van-button
                type="info"
                size="small"
                class="btn"
                @click="Btnstatus()"
                >收取重箱</van-button
              >
            </li>
            <li v-if="listdetail.status == 8">
              <van-button
                type="info"
                size="small"
                class="btn"
                @click="Btnstatus()"
                >发送空箱</van-button
              >
            </li>
            <li v-if="listdetail.status == 10">
              <van-button
                type="info"
                size="small"
                class="btn"
                @click="Btnstatus()"
                >删除订单</van-button
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listdetail: {},
      emptyShow: false,
      heavyShow: false,
      operate: new Number(),
      id: 0,
      statuslist: [
        "",
        "已上下门单",
        "待收空箱",
        "已收空箱",
        "已发重箱",
        "已存储",
        "已下提取单",
        "待收重箱",
        "已收重箱",
        "已发空箱",
        "已完成",
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/orderlist");
    },
    Btnstatus() {
      let params = {};
      if (this.listdetail.status == 5) {
        this.operate = 6;
        this.$router.push({
          name: "operate",
          params: {
            id: this.listdetail.id,
            operate: this.operate,
            version: this.listdetail.version,
          },
        });
      } else {
        if (this.listdetail.status == 2) {
          this.operate = 3;
        } else if (this.listdetail.status == 3) {
          this.operate = 4;
        } else if (this.listdetail.status == 7) {
          this.operate = 8;
        } else if (this.listdetail.status == 8) {
          this.operate = 9;
        } else if (this.listdetail.status == 10) {
          this.operate = 10;
        }
        this.$axios
          .put(
            "app/order/operate/" +
              this.listdetail.id +
              "/" +
              this.operate +
              "/" +
              this.listdetail.version,
            params
          )
          .then((res) => {
            if (200 == res.data.code) {
              this.$toast.success(res.data.msg);
              this.$router.push("/orderlist");
            } else if (500 == res.data.code) {
              this.$toast.fail(res.data.msg);
            }
          });
      }
    },
    getInfo() {
      this.$axios.get("app/order/info/" + this.id).then((res) => {
        if (200 == res.data.code) {
          this.listdetail = res.data.data;
          console.log(this.listdetail);
          if (this.listdetail.status >= 1 && this.listdetail.status <= 5) {
            this.emptyShow = true;
          } else if (
            this.listdetail.status >= 6 &&
            this.listdetail.status <= 10
          ) {
            this.heavyShow = true;
          }
        } else if (500 == res.data.code) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.id = this.$route.query.data;
    console.log(this.id);
    this.getInfo();
  },
};
</script>
<style scoped>
.listdetail {
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
.listinfo {
  width: 100%;
  font-size: 13px;
}
.list1 {
  width: 95%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  color: gray;
}
.list2 {
  width: 95%;
  padding: 10px;
  background: white;
  display: flex;
  justify-content: space-between;
  height: 20px;
  line-height: 20px;
  border-bottom: 1px solid rgb(223, 221, 221);
}
.bott {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.listbott {
  width: 95%;
  padding: 10px;
  background: white;
  display: flex;
  justify-content: space-between;
  height: 20px;
  line-height: 20px;
}
.btn {
  font-size: 13px;
  width: 100px;
  height: 28px;
  position: relative;
  right: 10px;
  bottom: 5px;
}
</style>