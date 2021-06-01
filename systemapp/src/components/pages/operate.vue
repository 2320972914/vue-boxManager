<template>
  <div class="operate">
    <div class="header">
      <van-nav-bar
        class=""
        title="操作"
        left-text=""
        left-arrow
        :border="false"
        style="color: #fff"
      >
        <template #left>
          <van-icon name="arrow-left" color="#fff" @click="goBack()" />
          <label for="返回" style="color: #fff" @click="goBack()">返回</label>
        </template>
      </van-nav-bar>
    </div>
    <van-cell-group class="addressinfo">
      <label for="收货信息" class="tit">收货信息</label>
      <van-cell
        :title="addressdata.contacts + '  ' + addressdata.contactsPhone"
        :border="false"
      >
        <label for=""></label>
        <van-tag v-if="addressdata.isDefault == 0" type="primary">默认</van-tag>
      </van-cell>
      <van-cell icon="location-o" is-link @click="toaddrmanage()">
        <label for="address">{{ addressdata.address }}</label>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="boxinfo">
      <label for="箱子信息" class="tit">箱子信息</label>
      <van-cell @click="showCallTime = true">
        重箱提取时间：{{ this.heavyBoxCallTime }}</van-cell
      >
      <van-popup
        v-model="showCallTime"
        position="bottom"
        :style="{ height: '60%' }"
      >
        <van-datetime-picker
          v-model="newDate"
          type="date"
          title="选择上门时间"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirmCallTime()"
          @cancel="Tocancel()"
        />
      </van-popup>
      <van-cell :border="false" @click="showCallInterval = true">
        重箱提取时段：{{ this.heavyBoxCallInterval }}
      </van-cell>
      <van-popup
        v-model="showCallInterval"
        position="bottom"
        :style="{ height: '60%' }"
      >
        <van-datetime-picker
          v-model="starttime"
          type="time"
          title="选择开始时间"
          :min-hour="10"
          :max-hour="20"
          :min-minute="0"
          :max-minute="0"
          @cancel="showCallInterval = false"
        />
        <van-datetime-picker
          v-model="endtime"
          type="time"
          title="选择结束时间"
          :min-hour="10"
          :max-hour="20"
          :min-minute="0"
          :max-minute="0"
          @cancel="showCallInterval = false"
          @confirm="confirmCallInterval()"
        />
      </van-popup>
    </van-cell-group>
    <div class="bott">
      <van-button round block type="info" @click="Btnstatus()">提交</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      starttime: "",
      endtime: "",
      heavyBoxCallTime: "",
      heavyBoxCallInterval: "",
      heavydata: {},
      addressdata: {},
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      newDate: new Date(),
      showCallTime: false,
      showCallInterval: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toaddrmanage() {
      this.$router.push("/addrmanage");
    },
    Tocancel() {
      this.showCallTime = false;
      console.log(this.heavyBoxCallTime);
    },
    confirmCallInterval() {
      if (
        this.starttime < this.endtime &&
        this.endtime != "" &&
        this.starttime != ""
      ) {
        this.showCallInterval = false;
        console.log(this.heavyBoxCallInterval);
      } else {
        this.$toast.fail("请选择正确的上门时段");
      }
      this.heavyBoxCallInterval = this.starttime + "-" + this.endtime;
    },
    confirmCallTime() {
      var y = this.newDate.getFullYear();
      var m = this.newDate.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = this.newDate.getDate();
      d = d < 10 ? "0" + d : d;
      this.heavyBoxCallTime = y + "-" + m + "-" + d;
      this.showCallTime = false;
    },
    getdefaultAddress() {
      this.$axios.get("app/box/defaultAddress").then((res) => {
        if (res.data.code == 200) {
          this.$toast.success(res.data.msg);
          this.addressdata = res.data.data;
          console.log(this.addressdata);
        } else if (res.data.code == 500) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    Btnstatus() {
      let params = {
        heavyBoxOrderTime: "",
        heavyBoxCallName: this.addressdata.contacts,
        heavyBoxCallPhone: this.addressdata.contactsPhone,
        heavyBoxCallAddress: this.addressdata.address,
        heavyBoxCallTime: this.heavyBoxCallTime,
        heavyBoxCallInterval: this.heavyBoxCallInterval,
      };
      this.$axios
        .put(
          "app/order/operate/" +
            this.heavydata.id +
            "/" +
            this.heavydata.operate +
            "/" +
            this.heavydata.version,
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
    },
  },
  mounted() {
    this.heavydata = this.$route.params;
    this.getdefaultAddress();
    console.log(this.heavydata);
  },
};
</script>
<style scoped>
.van-nav-bar {
  background: url(../../assets/bg2.png);
}
.header /deep/ .van-nav-bar__title {
  color: #fff;
}
.header /deep/ .van-nav-bar__text {
  color: #fff;
}
.operate {
  width: 100%;
  min-height: 100%;
  background: #e6e6e6;
  overflow: hidden;
}
.addressinfo {
  width: 95%;
  height: 180px;
  border-radius: 10px;
  margin: 10px auto 0;
  overflow: hidden;
}
.tit {
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0 40px 10px;
}
.boxinfo {
  width: 95%;
  margin: 10px auto 0;
  border-radius: 10px;
  height: 180px;
  overflow: hidden;
}
.bott {
  width: 80%;
  margin: 40px auto 0;
}
</style>