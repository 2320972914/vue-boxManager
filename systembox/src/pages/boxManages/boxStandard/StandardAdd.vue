<template>
  <div>
    <el-dialog
      :visible.sync="dialogadd"
      width="400px"
      :close-on-click-modal="false"
      @close="resetform('addInfo')"
    >
      <el-form
        :model="addInfo"
        status-icon
        ref="addInfo"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="箱子规格" prop="boxStandard">
          <el-input v-model="addInfo.boxStandard"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="inventoryNumber">
          <el-input v-model.number="addInfo.inventoryNumber"></el-input>
        </el-form-item>
        <el-form-item label="所需积分" prop="boxUnitPrice">
          <el-input v-model.number="addInfo.boxUnitPrice"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addInfo.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="
              dialogadd = false;
              resetform('addInfo');
            "
            >取 消</el-button
          >
          <el-button type="primary" @click="addData('addInfo')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogadd: false,
      addInfo: {
        boxStandard: "",
        boxUnitPrice: "",
        inventoryNumber: "",
        remark: "",
      },
      createBoxStandardUrl: "backend/box/standard/create",
      rules: {
        boxStandard: [
          {
            pattern: /\d+\*\d+\*\d+/,
            required: true,
            message: "请输入箱子规格",
            trigger: "blur",
          },
        ],
        boxUnitPrice: [
          {
            required: true,
            message: "请输入所需积分",
            trigger: "blur",
          },
        ],
        inventoryNumber: [
          {
            pattern: /^([0-9]\d*(\.\d+)?)$/g,
            required: true,
            message: "请输入数量",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetform(formName) {
      this.$refs[formName].resetFields();
    },
    openDialog(flag, val) {
      this.dialogadd = flag;
      //   console.log(flag);
      this.$nextTick(() => {
        this.$refs.addInfo.resetFields();
      });
    },
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let pamars = {
            boxStandard: this.addInfo.boxStandard,
            inventoryNumber: this.addInfo.inventoryNumber,
            boxUnitPrice: this.addInfo.boxUnitPrice,
            remark: this.addInfo.remark,
          };
          this.$axios.post(this.createBoxStandardUrl, pamars).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "success",
              });
              this.$parent.search();
            } else if (500 == res.data.code) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "error",
              });
            }
          });
          this.dialogadd = false;
        }
      });
    },
  },
};
</script>
<style scoped>
.addbox {
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