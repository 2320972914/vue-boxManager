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
        <el-form-item label="广告标题" prop="title">
          <el-input v-model="addInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="广告内容" prop="content">
          <el-input v-model="addInfo.content"></el-input>
        </el-form-item>
        <el-form-item label="奖励积分" prop="points">
          <el-input v-model.number="addInfo.points"></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="imgUrls">
          <el-upload
            ref="uploads"
            :action="upLoadUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :before-upload="beforeupload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogImg">
            <img width="100%" :src="addInfo.imgUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="广告排序" prop="sortNo">
          <el-input v-model.number="addInfo.sortNo"></el-input>
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
      dialogImg: false,
      upLoadUrl: this.$store.state.url + "common/upload",
      dialogImgUrl: "",
      fileList: [],
      addInfo: {
        title: "",
        content: "",
        points: "",
        imgUrl: "",
        sortNo: "",
      },
      rules: {
        title: [
          {
            // pattern: /^[\u0391-\uFFE5]{2,10}$/,
            required: true,
            message: "请输入广告标题",
            trigger: "blur",
          },
        ],
        content: [
          {
            // pattern: /^[\u0391-\uFFE5]{2,10}$/,
            required: true,
            message: "请输入广告内容",
            trigger: "blur",
          },
        ],
        imgUrl: [
          {
            // pattern: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
            required: true,
            message: "请选择图片地址",
            trigger: "blur",
          },
        ],
        points: [
          {
            // pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
            required: true,
            message: "请输入奖励积分",
            trigger: "blur",
          },
        ],
        sortNo: [
          {
            // pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
            required: true,
            message: "请输入广告排序",
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
            title: this.addInfo.title,
            content: this.addInfo.content,
            imgUrl: this.addInfo.imgUrl,
            points: this.addInfo.points,
            sortNo: this.addInfo.sortNo,
          };
          this.$axios
            .post("backend/advertisement/create", pamars)
            .then((res) => {
              if (200 == res.data.code) {
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
              this.dialogadd = false;
            });
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImgUrl = file.url;
      this.dialogVisible = true;
    },
    beforeupload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      console.log(testmsg);
      if (testmsg != "png" && testmsg != "jpg") {
        this.$message({
          message: "只能上传jpg、png格式",
          type: "error",
        });
        setTimeout(() => this.$refs.uploads.clearFiles(), 1000);
      } else {
        let fd = new FormData();
        fd.append("file", file);
        this.$axios.post(this.upLoadUrl, fd).then((res) => {
          if (res.data.code == 200) {
            this.addInfo.imgUrl = res.data.fileName;
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          }
        });
      }
    },
    // upLoadUrl(file) {
    //   let fd = new FormData();
    //   fd.append("file", file);
    //   this.$axios.post(upLoadUrl, fd).then((res) => {
    //     if (res.data.code == 200) {
    //       this.dialogImgUrl = res.data.fileName;
    //       this.$message({
    //         message: res.data.msg,
    //         type: "success",
    //       });
    //     }
    //   });
    // },
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