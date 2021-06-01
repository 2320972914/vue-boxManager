<template>
  <div class="customerManages">
    <el-card class="searchbox">
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="80px"
        class="searchform"
      >
        <el-form-item label="" prop="searchValue">
          <el-input
            v-model="searchForm.searchValue"
            placeholder="提交人/意见标题"
          ></el-input>
          <el-button type="primary" class="search" @click="search()"
            >查询</el-button
          >
          <el-button class="reset" @click="resetform('searchForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <sirui-table
        :data="tabledata"
        :page="page"
        :tableHeight="tableHeight"
        :loading="load"
        @handleSelectionChange="handleSelectionChange"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          v-for="item in columnList"
          :key="item.num"
          :label="item.label"
          :width="item.width"
          :prop="item.prop"
        >
        </el-table-column>
      </sirui-table>
    </el-card>
    <customer-add ref="addData"></customer-add>
    <customer-edit ref="editData"></customer-edit>
  </div>
</template>
<script>
import SiruiTable from "../../components/SiruiTable/index";
import CustomerAdd from "../customerManages/CustomerAdd";
import CustomerEdit from "../customerManages/CustomerEdit";
export default {
  name: "customerManages",
  components: {
    SiruiTable,
    CustomerAdd,
    CustomerEdit,
  },
  data() {
    return {
      searchForm: {
        searchValue: "",
      },
      columnList: [
        {
          prop: "id",
          label: "编号",
          width: 200,
          num: 1,
        },
        {
          prop: "nickName",
          label: "提交人",
          width: 200,
          num: 2,
        },
        {
          prop: "title",
          label: "意见标题",
          width: 200,
          num: 3,
        },
        {
          prop: "content",
          label: "意见内容",
          width: 200,
          num: 4,
        },
        {
          prop: "createTime",
          label: "提交时间",
          width: 200,
          num: 5,
        },
        {
          prop: "delFlag",
          label: "删除状态",
          width: 150,
          num: 6,
        },
      ],
      tabledata: [],
      page: {
        pages: 1,
        total: 0,
        pageSize: 10,
        pageNum: 1,
      },
      load: false,
      tableHeight: 600,
      multipleSelection: [],
    };
  },
  methods: {
    resetform(formName) {
      this.$refs[formName].resetFields();
      this.page.pageNum = 1;
      this.search();
    },
    handleSelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.search();
    },
    search() {
      this.$axios
        .get(
          "backend/advice/list" +
            "?pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&searchValue=" +
            this.searchForm.searchValue
        )
        .then((res) => {
          if (200 == res.data.code) {
            this.page.total = res.data.total;
            this.tabledata = res.data.rows;
            this.word();
            this.$message({
              showClose: true,
              message: "查询成功",
              type: "success",
            });
          } else if (500 == res.data.code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },
    word() {
      for (let i in this.tabledata) {
        if (this.tabledata[i].delFlag == 0) {
          this.tabledata[i].delFlag = "未删除";
        }
        if (this.tabledata[i].delFlag == 1) {
          this.tabledata[i].delFlag = "已删除";
        }
      }
    },
  },
  mounted() {
    this.search();
  },
};
</script>
<style  scoped>
html {
  margin: 0;
  padding: 0;
}
.customerManages {
  width: 1280px;
  height: 700px;
  background: #fff;
}
.searchbox {
  height: 120px;
}
.el-card {
  background: #fff;
  margin: 10px;
  border-radius: 4px;
}
.el-input {
  width: 220px;
}
.search {
  margin-left: 80px;
}
.reset {
  margin-left: 80px;
}
.searchform {
  margin-top: 20px;
}
</style>