<template>
  <div class="wrapper">
    <v-sidebar></v-sidebar>
    <div class="content-box">
      <v-head></v-head>
      <div class="app-warp">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vHead from "./Header";
import vSidebar from "./SideBar";
export default {
  name: "Home",
  components: { vHead, vSidebar },
};
</script>
<style  scoped>
.content {
  position: absolute;
  width: 1280px;
  height: 700px;
  left: 250px;
  top: 60px;
}
</style>