<template>
  <div class="nullbox">
    <div class="header">
      <van-nav-bar
        class=""
        title="空箱预约"
        left-text=""
        left-arrow
        :border="false"
        style="color: #fff"
      >
        <template #left>
          <van-icon name="arrow-left" color="#fff" @click="toindex()" />
        </template>
      </van-nav-bar>
    </div>
    <van-cell-group class="addressinfo">
      <label for="收货信息" class="tit">收货信息</label>
      <van-cell
        :title="addressdata.contacts + '  ' + addressdata.contactsPhone"
        :border="false"
        v-if="addressdata != null"
      >
        <label for=""></label>
        <van-tag type="primary">默认</van-tag>
      </van-cell>
      <van-cell icon="location-o" is-link @click="toaddrmanage()">
        <label for="address">{{ addressdata.address }}</label>
      </van-cell>
      <van-field
        v-model="orderName"
        label="订单名称："
        placeholder="请输入订单名称"
        :border="false"
      />
      <van-cell
        title="上门时间："
        is-link
        :border="false"
        @click="showCallTime = true"
      >
        {{ this.emptyBoxCallTime }}</van-cell
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
      <van-cell title="上门时段：" is-link @click="showCallInterval = true">
        {{ this.emptyBoxCallInterval }}
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
    <van-cell-group class="boxinfo">
      <label for="箱子信息" class="tit">箱子信息</label>
      <label for="所需积分" class="cum">所需积分</label>
      <label for="规格" class="cum">规格</label>
      <van-radio-group v-model="boxStandardId">
        <van-cell v-for="item in boxdata" :key="item.id">
          <van-radio :name="item.id" class="unitprice" @click="onSelect(item)"
            >{{ item.boxUnitPrice }}
            <label for="规格" class="standard">{{ item.boxStandard }}</label>
          </van-radio>
        </van-cell>
      </van-radio-group>
      <van-cell title="预约周期">
        <template #default>
          <van-stepper v-model="leaseDuration" step="1" min="1" />
        </template>
      </van-cell>
    </van-cell-group>
    <div class="bott">
      <van-button round block class="btn" @click="toAppointmeng()"
        >提交</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      starttime: "",
      endtime: "",
      orderName: "",
      boxStandardId: "",
      emptyBoxCallTime: "",
      emptyBoxCallInterval: "",
      addressdata: {},
      boxdata: [],
      leaseDuration: 1,
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      newDate: new Date(),
      showCallTime: false,
      showCallInterval: false,
      boxStandard: "",
      boxUnitPrice: "",
    };
  },
  methods: {
    toindex() {
      this.$router.push("/index");
    },
    toaddrmanage() {
      this.$router.push("/addrmanage");
    },
    Tocancel() {
      this.showCallTime = false;
      console.log(this.emptyBoxCallTime);
    },
    confirmCallInterval() {
      this.emptyBoxCallInterval = this.starttime + "-" + this.endtime;

      if (
        this.starttime < this.endtime &&
        this.endtime != "" &&
        this.starttime != ""
      ) {
        this.showCallInterval = false;
        console.log(this.emptyBoxCallInterval);
      } else {
        this.$toast.fail("请选择正确的上门时段");
      }
    },
    confirmCallTime() {
      var y = this.newDate.getFullYear();
      console.log(y);
      var m = this.newDate.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = this.newDate.getDate();
      d = d < 10 ? "0" + d : d;
      this.emptyBoxCallTime = y + "-" + m + "-" + d;
      this.showCallTime = false;
    },
    toAppointmeng() {
      let params = {
        orderName: this.orderName,
        emptyBoxCallName: this.addressdata.contacts,
        emptyBoxCallPhone: this.addressdata.contactsPhone,
        emptyBoxCallAddress: this.addressdata.address,
        emptyBoxCallTime: this.emptyBoxCallTime,
        emptyBoxCallInterval: this.emptyBoxCallInterval,
        boxStandard: this.boxStandard,
        boxUnitPrice: this.boxUnitPrice,
        leaseDuration: this.leaseDuration,
        totalPrice: this.boxUnitPrice * this.leaseDuration,
      };
      if (params.orderName == "") {
        this.$toast.fail("订单名称不能为空");
      } else if (params.emptyBoxCallName == "") {
        this.$toast.fail("空箱上门姓名不能为空");
      } else if (params.emptyBoxCallPhone == "") {
        this.$toast.fail("空箱上门电话不能为空");
      } else if (params.emptyBoxCallAddress == "") {
        this.$toast.fail("空箱上门地址不能为空");
      } else if (params.emptyBoxCallTime == "") {
        this.$toast.fail("空箱上门时间不能为空");
      } else if (params.emptyBoxCallInterval == "") {
        this.$toast.fail("空箱上门时段不能为空");
      } else if (params.boxStandard == "") {
        this.$toast.fail("箱子规格不能为空");
      } else if (params.boxUnitPrice == "") {
        this.$toast.fail("箱子积分单价不能为空");
      } else if (params.leaseDuration == 0) {
        this.$toast.fail("租赁时长不能为0");
      } else {
        this.$router.push({
          name: "appointment",
          params: { data: JSON.stringify(params) },
        });
      }
    },
    getdefaultAddress() {
      this.$axios.get("app/box/defaultAddress").then((res) => {
        if (res.data.code == 200) {
          // this.$toast.success(res.data.msg);
          this.addressdata = res.data.data;
          if (this.addressdata == null) {
            this.$toast.fail("无默认地址");
          }
        } else if (res.data.code == 500) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    getBoxStandardList() {
      this.$axios.get("app/box/standard/select").then((res) => {
        if (res.data.code == 200) {
          // this.$toast.success(res.data.msg);
          this.boxdata = res.data.data;
        } else if (res.data.code == 500) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    onSelect(item) {
      this.boxStandardId = item.id;
      this.boxStandard = item.boxStandard;
      this.boxUnitPrice = item.boxUnitPrice;
      console.log(this.boxStandard);
      console.log(this.boxUnitPrice);
    },
  },
  mounted() {
    this.getdefaultAddress();
    this.getBoxStandardList();
  },
};
</script>
<style scoped>
.nullbox {
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
  height: 250px;
  border-radius: 10px;
  margin: 10px auto 0;
  overflow: hidden;
}
.tit {
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0 0 10px;
}
.boxinfo {
  width: 95%;
  margin: 10px auto 0;
  border-radius: 10px;
  min-height: 230px;
  overflow: hidden;
}
.cum {
  float: left;
  width: 40%;
  font-size: 14px;
  color: #0069cd;
  font-weight: bold;
  margin: 10px 0 0 10px;
}
.standard {
  position: absolute;
  top: 0;
  left: 30%;
  height: 20px;
  line-height: 20px;
  width: 40%;
  margin: 0 auto;
  text-align: center;
  color: #000;
  display: block;
}
.bott {
  width: 80%;
  margin: 20px auto 10px;
}
.btn {
  background: url(../../assets/bg2.png);
  color: #fff;
}
</style>