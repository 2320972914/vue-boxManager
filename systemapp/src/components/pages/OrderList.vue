<template>
  <div class="listdetail">
    <div class="header">
      <van-nav-bar
        class=""
        title="订单列表"
        left-text=""
        left-arrow
        :border="false"
        style="color: #fff"
      >
        <template #left>
          <van-icon name="arrow-left" color="#fff" @click="toIndex()" />
          <label for="" @click="toIndex()">返回</label>
        </template>
      </van-nav-bar>
    </div>
    <div class="orderlist">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :offset="50"
          :immediate-check="false"
        >
          <div
            class="allList"
            v-for="item in orderlist"
            :key="item.id"
            @click="toListDetail(item.id)"
          >
            <ul class="list">
              <li>订单编号：{{ item.orderCode }}</li>
              <li>{{ statuslist[item.status] }}</li>
            </ul>
            <ul class="list">
              <li>订单名称：{{ item.orderName }}</li>
              <li>箱子id：{{ item.boxId }}</li>
            </ul>
            <ul class="list">
              <li>箱子编号：{{ item.boxCode }}</li>
              <li>箱子规格：{{ item.boxStandard }}</li>
            </ul>
            <ul class="list">
              <li>箱子单价积分：{{ item.boxUnitPrice }}</li>
              <li>租赁时长：{{ item.leaseDuration }}</li>
            </ul>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      loading: true,
      finished: false,
      refreshing: false,
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

      orderlist: [],
      temporary: [],
      pageNum: 1,
      pageSize: 4,
      total: 0,
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.temporary = this.getdata().data;
        this.total = this.getdata().total;
        // console.log(this.temporary);
        // console.log(this.total);
        for (let i = 0; i < this.temporary.length; i++) {
          this.orderlist.push(this.temporary[i]);
        }
        // console.log(this.orderlist);
        if (this.orderlist.length == this.total) {
          this.finished = true;
        }
        this.loading = false;
        this.refreshing = false;
        this.pageNum++;
        // console.log(this.pageNum);
      }, 1000);
    },
    getdata() {
      var arr = {};
      $.ajax({
        url:
          "http://localhost:8081/app/order/list" +
          "?pageNum=" +
          this.pageNum +
          "&pageSize=" +
          this.pageSize,
        type: "GET",
        async: false, //是否异步
        headers: {
          Authorization: " Bearer " + localStorage.getItem("token"),
        },
        timeout: 5000, //超时时间
        dataType: "json",
        beforeSend: function (xhr) {},
        success: function (data, textStatus, jqXHR) {
          if (200 == data.code) {
            arr.data = data.rows;
            arr.total = data.total;
          }
        },
        error: function (xhr, textStatus) {
          console.log("获取失败");
        },
        complete: function () {},
      });
      return arr;
    },
    toIndex() {
      this.$router.push("/index");
    },
    onRefresh() {
      this.orderlist = [];
      this.pageNum = 1;
      this.refreshing = false;
      this.finished = false;
      this.refreshing = true;
      this.loading = true;
      this.onLoad();
    },
    toListDetail(id) {
      this.$router.push({
        name: "listdetail",
        query: { data: id },
      });
      // console.log(JSON.stringify(item));
    },
  },
  mounted() {
    this.onLoad();
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
.orderlist {
  overflow: scroll;
  width: 100%;
}
.allList {
  font-size: 13px;
  height: 100%;
  margin-bottom: 10px;
  position: relative;
}
.list {
  width: 95%;
  padding: 10px;
  background: white;
  display: flex;
  justify-content: space-between;
  height: 20px;
  line-height: 20px;
  border-bottom: 1px solid rgb(223, 221, 221);
}
</style>