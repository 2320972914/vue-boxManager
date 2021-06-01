<template>
  <div class="boxinfo">
    <el-card class="searchbox">
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="140px"
        class="searchform"
      >
        <el-row>
          <el-form-item label="客户名称" prop="nickName">
            <el-input
              v-model="searchForm.nickName"
              placeholder="客户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单状态" prop="status">
            <el-select v-model="searchForm.status" placeholder="请选择">
              <el-option
                v-for="item in searchForm.statuslist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button type="primary" class="search" @click="search()"
              >查询</el-button
            >
            <el-button class="reset" @click="resetform('searchForm')"
              >重置</el-button
            >
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="空箱上门下单时间" prop="emptyBoxOrderTimeStart">
            <el-date-picker
              type="date"
              placeholder="选择开始日期"
              v-model="searchForm.emptyBoxOrderTimeStart"
              style="width: 150px"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="emptyBoxOrderTimeEnd" label-width="20px">
            <el-date-picker
              type="date"
              placeholder="选择结束日期"
              v-model="searchForm.emptyBoxOrderTimeEnd"
              style="width: 150px"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="重箱上门下单时间" prop="heavyBoxOrderTimeStart">
            <el-date-picker
              type="date"
              placeholder="选择开始日期"
              v-model="searchForm.heavyBoxOrderTimeStart"
              style="width: 150px"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="heavyBoxOrderTimeEnd" label-width="20px">
            <el-date-picker
              type="date"
              placeholder="选择结束日期"
              v-model="searchForm.heavyBoxOrderTimeEnd"
              style="width: 150px"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" @click="detailData()">详情</el-button>
      <sirui-table
        :data="tabledata"
        :page="page"
        :tableHeight="tableHeight"
        @handleSelectionChange="handleSelectionChange"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="orderCode"
          label="订单编号"
          :show-overflow-tooltip="true"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="orderName"
          label="订单名称"
          :show-overflow-tooltip="true"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          :show-overflow-tooltip="true"
          width="100px"
          :formatter="Word"
        >
          <!-- <template slot-scope="scope">
            <span>{{ statusList[scope.row.status] }}</span>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="客户名称"
          :show-overflow-tooltip="true"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="boxId"
          label="箱子id"
          :show-overflow-tooltip="true"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="boxCode"
          label="箱子编号"
          :show-overflow-tooltip="true"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="boxStandard"
          label="箱子规格"
          :show-overflow-tooltip="true"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="boxUnitPrice"
          label="所需积分"
          :show-overflow-tooltip="true"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="leaseDuration"
          label="租赁时长"
          :show-overflow-tooltip="true"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="totalPrice"
          label="实付积分"
          :show-overflow-tooltip="true"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="emptyBoxOrderTime"
          label="空箱上门下单时间"
          :show-overflow-tooltip="true"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="heavyBoxOrderTime"
          label="重箱上门下单时间"
          :show-overflow-tooltip="true"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="opreation"
          label="操作"
          :show-overflow-tooltip="true"
          fixed="right"
          width="150px"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="scope.row.status === 1"
              style="color: orange"
              @click="operate(scope.row)"
              >发送空箱</el-button
            >
            <el-button
              size="mini"
              v-if="scope.row.status === 6"
              style="color: black"
              @click="operate(scope.row)"
              >发送重箱</el-button
            >
            <el-button
              size="mini"
              v-if="scope.row.status === 4"
              style="color: yellowgreen"
              @click="operate(scope.row)"
              >收取重箱</el-button
            >
            <el-button
              size="mini"
              v-if="scope.row.status === 9"
              style="color: blue"
              @click="operate(scope.row)"
              >收取空箱</el-button
            >
            <el-button
              size="mini"
              v-if="scope.row.status === 10"
              style="color: red"
              @click="deleteOrder(scope.row)"
              >删除订单</el-button
            >
            <el-button size="mini" v-else style="display: none">--</el-button>
          </template>
        </el-table-column>
      </sirui-table>
    </el-card>
    <order-detail ref="detailData"></order-detail>
  </div>
</template>
<script>
import SiruiTable from "../../components/SiruiTable/index";
import OrderDetail from "../orderManages/OrderDetail";
export default {
  name: "boxFormat",
  components: {
    SiruiTable,
    OrderDetail,
  },
  data() {
    return {
      searchForm: {
        statuslist: [
          {
            value: 1,
            label: "待发空箱",
          },
          {
            value: 2,
            label: "已发空箱",
          },
          {
            value: 3,
            label: "送达空箱",
          },
          {
            value: 4,
            label: "待收重箱",
          },
          {
            value: 5,
            label: "以存储",
          },
          {
            value: 6,
            label: "待发重箱",
          },
          {
            value: 7,
            label: "已发重箱",
          },
          {
            value: 8,
            label: "送达重箱",
          },
          {
            value: 9,
            label: "待收空箱",
          },
          {
            value: 10,
            label: "已完成",
          },
        ],

        status: "",
        nickName: "",
        emptyBoxOrderTimeStart: "",
        emptyBoxOrderTimeEnd: "",
        heavyBoxOrderTimeStart: "",
        heavyBoxOrderTimeEnd: "",
      },
      statusList: [
        "",
        "待发空箱",
        "已发空箱",
        "送达空箱",
        "待收重箱",
        "已存储",
        "待发重箱",
        "已发重箱",
        "送达重箱",
        "待收空箱",
        "已完成",
      ],
      tabledata: [],
      getOrderListUrl: "backend/order/list",
      page: {
        pages: 0,
        total: 0,
        pageSize: 10,
        pageNum: 1,
      },
      load: false,
      tableHeight: 500,
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
    detailData() {
      if (1 == this.multipleSelection.length) {
        this.$refs.detailData.openDialog(
          true,
          JSON.parse(JSON.stringify(this.multipleSelection))
        );
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          type: "info",
          message: "请选择一条数据进行操作",
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      }
    },
    //获取数据
    search() {
      this.$axios
        .get(
          this.getOrderListUrl +
            "?pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&status=" +
            this.searchForm.status +
            "&nickName=" +
            this.searchForm.nickName +
            "&emptyBoxOrderTimeStart=" +
            this.searchForm.emptyBoxOrderTimeStart +
            "&emptyBoxOrderTimeEnd=" +
            this.searchForm.emptyBoxOrderTimeEnd +
            "&heavyBoxOrderTimeStart=" +
            this.searchForm.heavyBoxOrderTimeStart +
            "&heavyBoxOrderTimeEnd=" +
            this.searchForm.heavyBoxOrderTimeEnd
        )
        .then((res) => {
          if (200 == res.data.code) {
            this.page.total = res.data.total;
            this.tabledata = res.data.rows;

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
    //格式化表格
    Word(rows) {
      // console.log(rows.status);
      // console.log(this.statusList[1]);
      return this.statusList[rows.status];
    },
    operate(row) {
      console.log(row);
      let params = row;
      let id = row.id;
      let operate = row.status + 1;
      let version = row.version;
      this.$axios
        .put(
          "backend/order/operate/" + id + "/" + operate + "/" + version,
          params
        )
        .then((res) => {
          if (200 == res.data.code) {
            // this.$message({
            //   showClose: true,
            //   message: "res.data.msg",
            //   type: "success",
            // });
            this.search();
            if (row.status == 1) {
              this.$message({
                type: "success",
                message: "发送空箱成功",
              });
            } else if (row.status == 6) {
              this.$message({
                type: "success",
                message: "发送重箱成功",
              });
            } else if (row.status == 4) {
              this.$message({
                type: "success",
                message: "收取重箱成功",
              });
            } else if (row.status == 9) {
              this.$message({
                type: "success",
                message: "收取空箱成功",
              });
            }
          } else if (500 == res.data.code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },
    deleteOrder(row) {
      let id = row.id;
      this.$confirm("确定要删除选中数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.delete("backend/order/delete/" + id).then((res) => {
            if (200 == res.data.code) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "success",
              });
              this.search();
            } else if (500 == res.data.code) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "error",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
.boxstandard {
  width: 1280px;
  height: 700px;
  background: #fff;
}
.searchbox {
  height: 170px;
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
.el-form-item {
  float: left;
}
</style>