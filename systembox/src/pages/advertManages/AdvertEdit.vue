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
        <el-form-item label="广告标题" prop="title">
          <el-input v-model="editInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="广告内容" prop="content">
          <el-input v-model="editInfo.content"></el-input>
        </el-form-item>
        <el-form-item label="奖励积分" prop="points">
          <el-input v-model.number="editInfo.points"></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="imgUrl">
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
            <img width="100%" :src="editInfo.imgUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="广告排序" prop="sortNo">
          <el-input v-model.number="editInfo.sortNo"></el-input>
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
      dialogImg: false,
      fileList: [],
      upLoadUrl: this.$store.state.url + "common/upload",
      editInfo: {
        id: "",
        title: "",
        content: "",
        points: "",
        imgUrl: "",
        sortNo: "",
        version: "",
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
            message: "请输入图片地址",
            trigger: "blur",
          },
        ],
        points: [
          {
            required: true,
            // pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
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
      this.dialogedit = flag;
      // console.log(val);
      this.$nextTick(() => {
        this.$refs.editInfo.resetFields();
        this.editInfo.id = val[0].id;
        this.editInfo.title = val[0].title;
        this.editInfo.content = val[0].content;
        this.editInfo.imgUrl = val[0].imgUrl;
        this.editInfo.points = val[0].points;
        this.editInfo.sortNo = val[0].sortNo;
        this.editInfo.version = val[0].version;
        this.fileList.push();
        this.fileList[0] = {
          name: "his",
          url: "http://localhost:8081" + val[0].imgUrl,
        };
        // this.fileList.push("1111");
        // this.fileList.push("http://localhost:8081" + val[0].imgUrl);
        console.log(this.editInfo.imgUrl);
      });
    },
    editData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let pamars = {
            id: this.editInfo.id,
            title: this.editInfo.title,
            content: this.editInfo.content,
            imgUrl: this.editInfo.imgUrl,
            points: this.editInfo.points,
            sortNo: this.editInfo.sortNo,
            version: this.editInfo.version,
          };
          this.$axios
            .put("backend/advertisement/update", pamars)
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
              this.dialogedit = false;
            });
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.editInfo.imgUrl = file.url;
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
            this.editInfo.imgUrl = res.data.fileName;
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          }
        });
      }
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