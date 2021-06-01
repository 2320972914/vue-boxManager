<template>
  <div class="appointment">
    <div class="header">
      <van-nav-bar
        class=""
        title="预约确认"
        left-text=""
        left-arrow
        :border="false"
        style="color: #fff"
      >
        <template #left>
          <van-icon name="arrow-left" color="#fff" @click="goBack()" />
          <label for="" @click="goBack()">返回</label>
        </template>
      </van-nav-bar>
    </div>
    <van-cell-group class="addressinfo">
      <label for="收货信息" class="tit">收货信息</label>
      <van-cell
        :title="orderData.emptyBoxCallName + '  ' + orderData.emptyBoxCallPhone"
      >
        <template #label>
          <van-icon name="location" color="#e6e6e6" />
          <span class="custom-title">{{ orderData.emptyBoxCallAddress }}</span>
        </template>
      </van-cell>
      <van-cell :value="'上门时间：' + orderData.emptyBoxCallTime" />
    </van-cell-group>
    <van-cell-group class="boxinfo">
      <label for="箱子信息" class="tit">箱子信息</label>
      <van-cell class="info" :title="orderData.boxStandard">
        <template #default>
          <label for=""
            ><font color="#2828d8">{{ orderData.boxUnitPrice }} </font>X{{
              orderData.leaseDuration
            }}</label
          >
        </template>
      </van-cell>
      <van-cell
        class="info"
        title="预约周期"
        :value="orderData.leaseDuration + '个月'"
      />
      <van-cell class="info" title="总计积分" :value="orderData.totalPrice" />
    </van-cell-group>
    <div class="bott">
      <div style="float: right">
        <label for="" class="info"
          >实付积分：
          <font color="#2828d8">{{ orderData.totalPrice }} </font></label
        >
        <button class="btn" @click="confirm">提交</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderData: {
        orderName: "",
        emptyBoxOrderTime: "",
        emptyBoxCallName: "",
        emptyBoxCallPhone: "",
        emptyBoxCallAddress: "",
        emptyBoxCallTime: "",
        emptyBoxCallInterval: "",
        boxStandard: "",
        boxUnitPrice: 0,
        leaseDuration: 0,
        totalPrice: 0,
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    confirm() {
      let params = {
        orderName: this.orderData.orderName,
        emptyBoxOrderTime: this.orderData.emptyBoxOrderTime,
        emptyBoxCallName: this.orderData.emptyBoxCallName,
        emptyBoxCallPhone: this.orderData.emptyBoxCallPhone,
        emptyBoxCallAddress: this.orderData.emptyBoxCallAddress,
        emptyBoxCallTime: this.orderData.emptyBoxCallTime,
        emptyBoxCallInterval: this.orderData.emptyBoxCallInterval,
        boxStandard: this.orderData.boxStandard,
        boxUnitPrice: this.orderData.boxUnitPrice,
        leaseDuration: this.orderData.leaseDuration,
        totalPrice: this.orderData.totalPrice,
      };
      console.log(params);
      this.$axios.post("app/box/order", params).then((res) => {
        if (res.data.code == 200) {
          this.$toast.success(res.data.msg);
          this.$router.push("/orderlist");
        } else if (res.data.code == 500) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.orderData = JSON.parse(this.$route.params.data);
  },
};
</script>
<style scoped>
.appointment {
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
.addressinfo {
  width: 95%;
  height: 150px;
  border-radius: 10px;
  margin: 10px auto 0;
  overflow: hidden;
}
.tit {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 0px 10px;
}
.boxinfo {
  width: 95%;
  height: 180px;
  border-radius: 10px;
  margin: 10px auto 0;
  overflow: hidden;
  color: #000;
  font-size: 16px;
}
.info {
  color: #000;
  font-size: 16px;
}
.info /deep/ .van-cell__value {
  color: #000;
}
.bott {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 50px;
  line-height: 50px;
  background: #fff;
  overflow: hidden;
}
.btn {
  display: inline-block;
  height: 30px;
  width: 70px;
  line-height: 30px;
  margin: 10px 10px 0 0;
  border: none;
  background: #2828d8;
  color: #fff;
  border-radius: 5px;
}
</style>