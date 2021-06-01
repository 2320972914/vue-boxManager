<template>
  <div>
    <el-dialog
      :visible.sync="dialogdetail"
      width="400px"
      :close-on-click-modal="false"
      @close="resetform('detailInfo')"
    >
      <el-form
        :model="detailInfo"
        status-icon
        ref="detailInfo"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item label="订单编号" prop="orderCode">
          <el-input v-model="detailInfo.orderCode" readonly></el-input>
        </el-form-item>
        <el-form-item label="订单名称" prop="orderName">
          <el-input v-model="detailInfo.orderName" readonly></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-input v-model="detailInfo.status" readonly></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="nickName">
          <el-input v-model="detailInfo.nickName" readonly></el-input>
        </el-form-item>
        <el-form-item label="箱子id" prop="boxId">
          <el-input v-model="detailInfo.boxId" readonly></el-input>
        </el-form-item>
        <el-form-item label="箱子编号" prop="boxCode">
          <el-input v-model="detailInfo.boxCode" readonly></el-input>
        </el-form-item>
        <el-form-item label="箱子规格" prop="boxStandard">
          <el-input v-model="detailInfo.boxStandard" readonly></el-input>
        </el-form-item>
        <el-form-item label="所需积分" prop="boxUnitPrice">
          <el-input v-model="detailInfo.boxUnitPrice" readonly></el-input>
        </el-form-item>
        <el-form-item label="租赁时长" prop="leaseDuration">
          <el-input v-model="detailInfo.leaseDuration" readonly></el-input>
        </el-form-item>
        <el-form-item label="实付积分" prop="totalPrice">
          <el-input v-model="detailInfo.totalPrice" readonly></el-input>
        </el-form-item>
        <div v-if="this.detailInfo.status >= 1 && this.detailInfo.status <= 5">
          <el-form-item
            label="空箱上门下单时间"
            prop="emptyBoxOrderTime"
            readonly
          >
            <el-input
              v-model="detailInfo.emptyBoxOrderTime"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="空箱提取姓名" prop="emptyBoxCallName">
            <el-input v-model="detailInfo.emptyBoxCallName" readonly></el-input>
          </el-form-item>
          <el-form-item label="空箱提取电话" prop="emptyBoxCallPhone">
            <el-input
              v-model="detailInfo.emptyBoxCallPhone"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item
            label="空箱提取地址"
            prop="emptyBoxCallAddress"
            readonly
          >
            <el-input
              v-model="detailInfo.emptyBoxCallAddress"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="空箱提取时间" prop="emptyBoxCallTime">
            <el-input v-model="detailInfo.emptyBoxCallTime" readonly></el-input>
          </el-form-item>
          <el-form-item
            label="空箱提取时段"
            prop="emptyBoxCallInterval"
            readonly
          >
            <el-input v-model="detailInfo.emptyBoxCallInterval"></el-input>
          </el-form-item>
        </div>
        <div v-if="this.detailInfo.status >= 5 && this.detailInfo.status <= 10">
          <el-form-item
            label="重箱上门下单时间"
            prop="heavyBoxOrderTime"
            readonly
          >
            <el-input
              v-model="detailInfo.heavyBoxOrderTime"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="重箱提取姓名" prop="heavyBoxCallName">
            <el-input v-model="detailInfo.heavyBoxCallName" readonly></el-input>
          </el-form-item>
          <el-form-item label="重箱提取电话" prop="heavyBoxCallPhone">
            <el-input
              v-model="detailInfo.heavyBoxCallPhone"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item
            label="重箱提取地址"
            prop="heavyBoxCallAddress"
            readonly
          >
            <el-input
              v-model="detailInfo.heavyBoxCallAddress"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="重箱提取时间" prop="heavyBoxCallTime">
            <el-input v-model="detailInfo.heavyBoxCallTime" readonly></el-input>
          </el-form-item>
          <el-form-item
            label="重箱提取时段"
            prop="heavyBoxCallInterval"
            readonly
          >
            <el-input v-model="detailInfo.heavyBoxCallInterval"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogdetail = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogdetail: false,
      detailInfo: {
        orderCode: "",
        orderName: "",
        status: "",
        nickName: "",
        boxId: "",
        boxCode: "",
        boxStandard: "",
        boxUnitPrice: "",
        leaseDuration: "",
        totalPrice: "",
        emptyBoxOrderTime: "",
        heavyBoxOrderTime: "",
        emptyBoxCallName: "",
        emptyBoxCallPhone: "",
        emptyBoxCallAddress: "",
        emptyBoxCallTime: "",
        emptyBoxCallInterval: "",
        heavyBoxCallName: "",
        heavyBoxCallPhone: "",
        heavyBoxCallAddress: "",
        heavyBoxCallTime: "",
        heavyBoxCallInterval: "",
      },
    };
  },
  methods: {
    resetform(formName) {
      this.$refs[formName].resetFields();
    },
    openDialog(flag, val) {
      this.dialogdetail = flag;
      // console.log(val);
      this.$nextTick(() => {
        this.$refs.detailInfo.resetFields();

        this.detailInfo.orderCode = val[0].orderCode;
        this.detailInfo.orderName = val[0].orderName;
        this.detailInfo.status = val[0].status;
        this.detailInfo.nickName = val[0].nickName;
        this.detailInfo.boxId = val[0].boxId;
        this.detailInfo.boxCode = val[0].boxCode;
        this.detailInfo.boxStandard = val[0].boxStandard;
        this.detailInfo.boxUnitPrice = val[0].boxUnitPrice;
        this.detailInfo.leaseDuration = val[0].leaseDuration;
        this.detailInfo.totalPrice = val[0].totalPrice;
        this.detailInfo.emptyBoxOrderTime = val[0].emptyBoxOrderTime;
        this.detailInfo.heavyBoxOrderTime = val[0].heavyBoxOrderTime;
        this.detailInfo.emptyBoxCallName = val[0].emptyBoxCallName;
        this.detailInfo.emptyBoxCallPhone = val[0].emptyBoxCallPhone;
        this.detailInfo.emptyBoxCallAddress = val[0].emptyBoxCallAddress;
        this.detailInfo.emptyBoxCallTime = val[0].emptyBoxCallTime;
        this.detailInfo.emptyBoxCallInterval = val[0].emptyBoxCallInterval;
        this.detailInfo.heavyBoxCallName = val[0].heavyBoxCallName;
        this.detailInfo.heavyBoxCallPhone = val[0].heavyBoxCallPhone;
        this.detailInfo.heavyBoxCallAddress = val[0].heavyBoxCallAddress;
        this.detailInfo.heavyBoxCallTime = val[0].heavyBoxCallTime;
        this.detailInfo.heavyBoxCallInterval = val[0].heavyBoxCallInterval;
      });
    },
  },
};
</script>
<style scoped>
.detailbox {
  width: 400px;
  height: 500px;
  background: #fff;
}
.el-input {
  width: 160px;
}
.el-select {
  width: 160px;
}
</style>