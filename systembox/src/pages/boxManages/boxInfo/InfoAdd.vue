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
          <el-select
            v-model="addInfo.boxStandard"
            placeholder="请选择"
            @change="jifen()"
          >
            <el-option
              v-for="item in addInfo.standard"
              :key="item.boxStandard"
              :label="item.boxStandard"
              :value="item.boxStandard"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所需积分" prop="boxUnitPrice">
          <el-input v-model.number="addInfo.boxUnitPrice" readonly></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addInfo.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogadd = false;
            resetform('addInfo');
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="addData('addInfo')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogadd: false,
      addInfo: {
        standard: [],
        boxStandard: "",
        remark: "",
        boxUnitPrice: "",
      },
      createBoxInfoUrl: "backend/box/info/create",
      rules: {
        boxStandard: [
          {
            required: true,
            message: "请选择箱子规格",
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
      // console.log(val);
      this.$nextTick(() => {
        this.$refs.addInfo.resetFields();
        this.addInfo.standard = val;
        // console.log(this.addInfo.standard);
      });
    },
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let pamars = {
            boxStandard: this.addInfo.boxStandard,
            boxUnitPrice: this.addInfo.boxUnitPrice,
            remark: this.addInfo.remark,
          };
          this.$axios.post(this.createBoxInfoUrl, pamars).then((res) => {
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
    jifen() {
      for (var i in this.addInfo.standard) {
        if (this.addInfo.boxStandard == this.addInfo.standard[i].boxStandard) {
          this.addInfo.boxUnitPrice = this.addInfo.standard[i].boxUnitPrice;
        }
      }
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