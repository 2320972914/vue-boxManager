<template>
  <div id="SideBar">
    <el-row>
      <el-col>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#04294b"
          text-color="rgba(182,167,167,0.596)"
          active-text-color="#fff"
          router
        >
          <el-menu-item index="/usermanages">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/customerManages">
            <i class="el-icon-s-home"></i>
            <span slot="title">客户管理</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-box"></i>
              <span>箱子管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/boxstandard">箱子规格</el-menu-item>
              <el-menu-item index="/boxinfo">箱子信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/ordermanages">
            <i class="el-icon-shopping-cart-1"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="/advertmanages">
            <i class="el-icon-s-data"></i>
            <span slot="title">广告管理</span>
          </el-menu-item>
          <el-menu-item index="/viewmanages">
            <i class="el-icon-s-marketing"></i>
            <span slot="title">意见管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "SideBar",
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keypath) {
      console.log(key, keypath);
    },
    handleClose(key, keypath) {
      console.log(key, keypath);
    },
  },
};
</script>
<style scoped>
html {
  padding: 0;
  margin: 0;
  overflow: hidden;
  background: #80ace6;
}
#SideBar {
  top: 60px;
  position: absolute;
  left: 0;
}
.el-menu {
  width: 250px;
  height: 900px;
}
.el-menu-item {
  background: #04294b;
  color: white;
}
/* .el-submenu /deep/ .el-submenu__title:hover {
  background-color: rgba(14, 221, 240, 0.32) !important;
}
.el-menu-item:hover {
  background-color: rgba(14, 221, 240, 0.32) !important;
} */
/* .el-submenu:hover {
  background-color: rgb(13, 65, 110) !important;
}
.el-menu-item-group .el-menu-item.demo:hover {
  background: #34466a !important;
  color: rgb(255, 255, 255) !important;
} */
/* .el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0 !important;
  color: #050b11 !important;
  background: none !important;
} */
</style>