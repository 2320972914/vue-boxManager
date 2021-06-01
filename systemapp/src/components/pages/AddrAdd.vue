<template>
  <div class="addradd">
    <div class="header">
      <van-nav-bar
        class=""
        title="地址新增"
        left-text=""
        left-arrow
        :border="false"
        style="color: #fff"
      >
        <template #left>
          <van-icon name="arrow-left" color="#fff" @click="goBack()" />
          <label for="">返回</label>
        </template>
      </van-nav-bar>
    </div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      show-delete-button="fales"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      :address-info="AddressInfo"
    >
    </van-address-edit>
  </div>
</template>
<script>
import areaList from "../../assets/js/area";
export default {
  data() {
    return {
      areaList,
      show: false,
      searchResult: [],
      contacts: "",
      contactsPhone: "",
      address: "",
      isDefault: 0,
      AddressInfo: {},
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    showPopup() {
      this.show = true;
    },
    onSave(content) {
      console.log(content);
      this.AddressInfo = content;
      let paramForm = {
        contacts: content.name,
        contactsPhone: content.tel,
        areaCode: content.areaCode,
        postalCode: content.postalCode,
        provinceName: content.province,
        cityName: content.city,
        areaName: content.county,
        address:
          content.province == content.city
            ? content.city + content.county + content.addressDetail
            : content.province +
              content.city +
              content.county +
              content.addressDetail,
        isDefault: content.isDefault ? 0 : 1,
      };
      this.$axios.post("app/address/create", paramForm).then((res) => {
        if (res.data.code == 200) {
          this.$toast.success(res.data.msg);
          this.goBack();
        } else if (res.data.code == 500) {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    onDelete() {
      this.$toast("delete");
    },
    onChangeDetail(val) {},
  },
};
</script>
<style scoped>
.addradd {
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
.bott {
  width: 80%;
  margin: 20px auto 20px;
  bottom: 0;
}
.btn {
  background: url(../../assets/bg2.png);
  color: #fff;
  border-radius: 10px;
}
/* .van-address-edit /deep/ .van-address-edit__buttons {
  display: none;
} */
.van-address-edit /deep/ .van-button--default {
  display: none;
}
.van-address-edit /deep/ .van-button--danger {
  background: #008bfa;
  border: #008bfa;
}
</style>