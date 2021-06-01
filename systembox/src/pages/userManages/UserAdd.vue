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
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickName">
          <el-input v-model="addInfo.nickName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phonenumber">
          <el-input v-model="addInfo.phonenumber"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="addInfo.sex" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
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
        userName: "",
        nickName: "",
        email: "",
        phonenumber: "",
        sex: "",
      },
      createUserListUrl: this.$store.state.url + "backend/user/create",
      rules: {
        userName: [
          {
            pattern: /^[a-zA-Z0-9]{1,16}$/,
            required: true,
            message: "请输入正确的用户名：只能包含英文和数字",
            trigger: "blur",
          },
        ],
        nickName: [
          {
            pattern: /^[\u0391-\uFFE5]{2,10}$/,
            required: true,
            message: "请输入正确的名字",
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
            required: true,
            message: "请选择性别",
            // trigger: "blur",
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
            userName: this.addInfo.userName,
            nickName: this.addInfo.nickName,
            phonenumber: this.addInfo.phonenumber,
            email: this.addInfo.email,
            sex: this.addInfo.sex,
          };
          this.$axios.post(this.createUserListUrl, pamars).then((res) => {
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