<template>
  <div class="addrmanage">
    <div class="header">
      <van-nav-bar
        class=""
        title="地址管理"
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
    <div class="addr">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="-没有更多了-"
          @load="onLoad"
          :offset="50"
          :immediate-check="false"
        >
          <div class="inp" v-for="item in addrlist" :key="item.id">
            <van-radio-group v-model="addressradioId">
              <van-cell
                center
                :label="item.address"
                @click="
                  addressradioId = item.id;
                  onSelect(item);
                "
              >
                <template #right-icon>
                  <van-tag type="danger" round v-if="item.isDefault == 0"
                    >默认</van-tag
                  >&nbsp;&nbsp;&nbsp;&nbsp;
                  <!-- <van-icon name="edit" @click="toEdit()" /> -->
                </template>
                <template #title>
                  {{ item.contacts }}
                  {{ item.contactsPhone }}
                </template>
                <template #icon>
                  <van-radio :name="item.id" class="unitprice"
                    >&nbsp;</van-radio
                  >
                </template>
              </van-cell>
              <div>
                <van-icon name="edit" @click="toEdit(item)" class="editoicon" />
              </div>
            </van-radio-group>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="bott">
      <van-button
        block
        round
        type="info"
        style="margin-bottom: 10px"
        @click="toAdd()"
        >新增地址</van-button
      >
      <van-button
        block
        round
        type="danger"
        v-if="this.addrlist.length > 0"
        @click="deleteAdd()"
        >删除</van-button
      >
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      id: 0,
      finished: false,
      addressradioId: 0,
      refreshing: false,
      loading: true,
      addrlist: [],
      temporary: [],
      data: {},
      pageNum: 0,
      pageSize: 4,
      total: 0,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toPersonCenter() {
      this.$router.push("/personcenter");
    },
    //下拉刷新
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    toEdit(item) {
      // console.log(item);
      this.$router.push({
        name: "addredit",
        query: { data: JSON.stringify(item) },
      });
    },
    toAdd() {
      this.$router.push("/addradd");
    },
    onSelect(item) {
      this.id = item.id;
      let params = {
        id: item.id,
      };
      //设置默认地址
      this.$axios.put("app/address/default/" + params.id).then((res) => {
        if (res.data.code == 200) {
          this.$toast.success(res.data.msg);
          console.log(this.addrlist);
          this.onRefresh();
        } else if (res.data.code == 500) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    //获取默认地址
    getdefaultAddress() {
      this.$axios.get("app/box/defaultAddress").then((res) => {
        if (res.data.code == 200) {
          // this.$toast.success(res.data.msg);
          this.addressradioId = res.data.data.id;
        } else if (res.data.code == 500) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    deleteAdd() {
      this.$axios
        .delete("app/address/delete/" + this.addressradioId)
        .then((res) => {
          if (res.data.code == 200) {
            this.$toast.success(res.data.msg);
            // this.getData();
          } else if (res.data.code == 500) {
            this.$toast.fail(res.data.msg);
          }
        });
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.addrlist = [];
          this.pageNum = 0;
          this.refreshing = false;
        }
        this.pageNum++;
        this.getData();
        this.getdefaultAddress();

        // this.temporary = this.getData().rows;
        // this.total = this.getData().total;
        // console.log(this.pageNum);

        this.temporary = this.getData().data;
        this.total = this.getData().total;
        this.data = this.getData();
        console.log(this.data);
        console.log(this.temporary);
        for (var i = 0; i < this.temporary.length; i++) {
          this.addrlist.push(this.temporary[i]);
        }
        this.loading = false;

        if (this.addrlist.length >= this.total) {
          this.finished = true;
        }
      }, 1000);
    },
    //获取数据
    getData() {
      var arr = {};
      $.ajax({
        url:
          "http://localhost:8081/app/address/list?" +
          "pageNum=" +
          this.pageNum +
          "&pageSize=" +
          this.pageSize, //url路径
        type: "GET", //GET
        // url:'',//url路径
        // type:'POST', //GET
        async: false, //或false,是否异步
        // data:{//参数

        // },
        headers: {
          Authorization: " Bearer " + localStorage.getItem("token"),
        },
        timeout: 5000, //超时时间
        dataType: "json",
        beforeSend: function (xhr) {},
        success: function (data, textStatus, jqXHR) {
          if (200 == data.code) {
            // console.log(data);
            arr.data = data.rows;
            arr.total = data.total;
            // this.total = data.total;
            // console.log(arr.data);
          }
        },
        error: function (xhr, textStatus) {
          console.log("获取失败");
        },
        complete: function () {},
      });

      return arr;
      // this.$axios
      //   .get(
      //     "app/address/list" +
      //       "?pageNum=" +
      //       this.pageNum +
      //       "&pageSize=" +
      //       this.pageSize
      //   )
      //   .then((res) => {
      //     if (res.data.code == 200) {
      //       this.$toast.success(res.data.msg);
      //       // this.addrlist = res.data.rows;
      //       this.data = res.data;
      //       this.temporary = res.data.rows;
      //       this.total = res.data.total;
      //       // console.log(this.data);
      //       // console.log(this.temporary);
      //       // listdata.data = res.data.rows;
      //       // listdata.total = res.data.total;
      //       // listdata = res.data;
      //       // console.log(listdata);
      //       this.getdefaultAddress();
      //     } else if (res.data.code == 500) {
      //       this.$toast.fail(res.data.msg);
      //     }
      //   });
      // // console.log(listdata);
      // // return listdata;
    },
  },
  mounted() {
    this.onLoad();
  },
};
</script>
<style scoped>
.addrmanage {
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
.addr {
  width: 100%;
  height: 400px;
  overflow: scroll;
}
.inp {
  position: relative;
  width: 95%;
  border-radius: 10px;
  margin: 10px auto 0;
  overflow: hidden;
}
.editoicon {
  position: absolute;
  right: 15px;
  top: 25px;
}
.van-list {
  min-height: 400px;
}
.bott {
  width: 80%;
  margin: 20px auto 20px;
}
.btn {
  background: url(../../assets/bg2.png);
  color: #fff;
}
</style>