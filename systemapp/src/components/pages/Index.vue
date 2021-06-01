<template>
  <div class="home">
    <div class="header">
      <van-nav-bar
        title="首页"
        left-text="返回"
        left-arrow
        @click-left="toLogin()"
      />
    </div>
    <div>
      <van-swipe :autoplay="3000" class="top">
        <van-swipe-item v-for="(item, index) in imagesList" :key="index">
          <img
            :src="'http://localhost:8081' + item.imgUrl"
            alt=""
            width="100%"
            @click="adPoints(item)"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="inp">
      <div class="btn" @click="toPercen()">
        <img src="../../assets/person.png" alt="" />
        <label for="个人中心" class="text">个人中心</label>
      </div>
      <div class="btn" @click="toAppointment()">
        <img src="../../assets/boxnull.png" alt="" />
        <label for="个人中心" class="text">空箱预约</label>
      </div>
      <div class="btn" @click="toOrderList()">
        <img src="../../assets/list.png" alt="" />
        <label for="个人中心" class="text">我的订单</label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imagesList: [],
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/");
    },
    toPercen() {
      this.$router.push("/personcenter");
    },
    toAppointment() {
      this.$router.push("/nullBox");
    },
    toOrderList() {
      this.$router.push("/orderlist");
    },
    getImgesList() {
      this.$axios.get("app/advertisement/list").then((res) => {
        if (res.data.code == 200) {
          this.imagesList = res.data.data;
          // this.$toast.success(res.data.msg);
        } else if (res.data.code == 500) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    adPoints(item) {
      let Param = {
        points: item.points,
        id: item.id,
      };
      this.$axios.put("app/advertisement/points", Param).then((res) => {
        if (res.data.code == 200) {
          this.$toast.success(res.data.msg);
        } else if (res.data.code == 500) {
          this.$toast.fail(res.data.msg);
        }
      });
      this.$router.push({
        name: "adinfo",
        params: {
          data: JSON.stringify(item),
        },
      });
    },
  },

  mounted() {
    this.getImgesList();
  },
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #e6e6e6;
}
.header {
  width: 100%;
  overflow: hidden;
}
.top {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.bor {
  width: 100%;
  height: 180px;
  border-bottom: #24c2ff 5px dotted;
}
.inp {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.btn {
  width: 70px;
  margin: 70px 20px 0;
  text-align: center;
}
.text {
  display: block;
  margin-top: 15px;
}
</style>