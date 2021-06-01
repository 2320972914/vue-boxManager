<template>
  <div>
    <el-dialog
      :visible.sync="dialogedit"
      width="400px"
      :close-on-click-modal="false"
      @close="resetform('editInfo')"
    >
      <el-form
        :model="editInfo"
        status-icon
        ref="editInfo"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="客户名" prop="userName">
          <el-input v-model="editInfo.userName" readonly></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickName">
          <el-input v-model="editInfo.nickName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="editInfo.sex" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phonenumber">
          <el-input v-model="editInfo.phonenumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editInfo.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogedit = false;
            resetform('editInfo');
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="editData('editInfo')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogedit: false,
      editInfo: {
        userId: "",
        userName: "",
        nickName: "",
        email: "",
        phonenumber: "",
        sex: "",
        version: "",
      },
      updateCustomerListUrl: this.$store.state.url + "backend/customer/update",
      rules: {
        nickName: [
          {
            pattern: /^[\u0391-\uFFE5]{2,10}$/,
            required: true,
            message: "请输入正确的姓名",
            trigger: "blur",
          },
        ],
        email: [
          {
            pattern: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
            required: true,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        phonenumber: [
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
            required: true,
            message: "请输入正确的电话号码",
            trigger: "blur",
          },
        ],
        sex: [
          {
            pattern: /^(0|1)$/,
            required: true,
            message: "请选择性别",
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
      this.dialogedit = flag;
      // console.log(val);
      this.$nextTick(() => {
        this.$refs.editInfo.resetFields();
        this.editInfo.userId = val[0].userId;
        this.editInfo.userName = val[0].userName;
        this.editInfo.nickName = val[0].nickName;
        this.editInfo.phonenumber = val[0].phonenumber;
        this.editInfo.email = val[0].email;
        this.editInfo.version = val[0].version;
        this.editInfo.sex = val[0].sex;
        // if (val[0].sex == "男") {
        //   this.editInfo.sex = "0";
        // } else if (val[0].sex == "女") {
        //   this.editInfo.sex = "1";
        // }
      });
      console.log(this.editInfo);
    },
    editData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let pamars = {
            userId: this.editInfo.userId,
            userName: this.editInfo.userName,
            nickName: this.editInfo.nickName,
            phonenumber: this.editInfo.phonenumber,
            email: this.editInfo.email,
            sex: this.editInfo.sex,
            version: this.editInfo.version,
          };
          console.log(pamars);
          this.$axios.put(this.updateCustomerListUrl, pamars).then((res) => {
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
          this.dialogedit = false;
        }
      });
    },
  },
};
</script>
<style scoped>
.editbox {
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