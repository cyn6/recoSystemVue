<template>
  <el-button type="primary" class="export-button" @click="handleExportExcel"
    ><i class="fa fa-floppy-o" aria-hidden="true"></i>
    <span class="ml-10">导出 Excel</span>
  </el-button>
  <el-table
    :data="tableData"
    style="width: 100%"
    max-height="400"
    stripe
    border
    table-layout="auto"
    highlight-current-row
    :default-sort="{ prop: 'time', order: 'ascending' }"
  >
    <el-table-column type="index" :index="indexMethod" align="center" />
    <el-table-column label="检测图片" width="180" align="center">
      <template #default="scope">
        <div
          style="
            display: flex;
            align-items: center;
            margin: 0 20px;
            height: 100px;
          "
        >
          <el-image
            :src="scope.row.imgSrc"
            fit="fill"
            :preview-src-list="[scope.row.imgSrc]"
            :preview-teleported="true"
          />
        </div>
      </template>
    </el-table-column>
    <!-- <el-table-column label="Thumbnail" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-image :preview-src-list="imgSrc" />
        </div>
      </template>
    </el-table-column> -->
    <el-table-column prop="time" label="检测时间" width="180" align="center" />
    <el-table-column prop="category" label="种类" align="center" />
    <el-table-column prop="type" label="类型" align="center" />
    <el-table-column label="检测结果" fixed="right" align="center" width="100">
      <template #default="scope">
        <el-button
          size="small"
          type="primary"
          @click="handleView(scope.$index, scope.row)"
          >查看</el-button
        >
      </template>
    </el-table-column>
    <!-- <el-table-column
      prop="tag"
      label="类型"
      width="100"
      :filters="[
        { text: 'Home', value: 'Home' },
        { text: 'Office', value: 'Office' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.tag === 'Home' ? '' : 'success'"
          disable-transitions
          >{{ scope.row.tag }}</el-tag
        >
      </template>
    </el-table-column> -->
  </el-table>

  <el-dialog
    v-model="dialogVisible"
    title="检测结果"
    width="40%"
    align-center
    draggable
  >
    <el-descriptions border :column="1" size="large">
      <el-descriptions-item
        v-for="(value, key) in this.description"
        :label="key"
        :key="key"
      >
        {{ value }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
import { bus } from "../utils/eventbus";
import * as xlsx from "xlsx";
import table2excel from "js-table2excel";
import { flatten } from "../utils/obj-tools";

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      description: {
        disease: String,
        insect: String,
        nutrition: String,
        status: String,
      },
      // TODO: 这里修改查看检测结果窗口里的变量到中文标签的对应关系
      keyMap: {
        disease: "病害",
        insect: "虫害",
        nutrition: "营养健康",
        status: "生长周期",
      },
    };
  },
  created() {
    // 每次刷新页面时，从sessionStorage中读取数据
    this.tableData = [];
    for (var i = 0; i < sessionStorage.length; i++) {
      var data = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
      var newResult = {};
      for (var d in data.result) {
        newResult[this.keyMap[d]] = data.result[d];
      }
      this.tableData.push({
        imgSrc: sessionStorage.key(i),
        time: data.time,
        category: data.category,
        type: data.type,
        result: newResult,
      });
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleView(index, row) {
      console.log(index, row);
      this.description = this.tableData[index].result;
      this.dialogVisible = true;
    },
    handleExportExcel() {
      var exportTableData = [];
      for (var td = 0; td < this.tableData.length; td++) {
        exportTableData.push(flatten(this.tableData[td]));
      }
      console.log(exportTableData);
      const cropColumn = [ // 粮食作物导出Excel格式
        {
          title: "检测图片",
          key: "imgSrc",
          type: "image",
          width: 70,
          height: 50,
        },
        {
          title: "检测时间",
          key: "time",
          type: "text",
        },
        {
          title: "种类",
          key: "category",
          type: "text",
        },
        {
          title: "类型",
          key: "type",
          type: "text",
        },
        // 主要修改如下部分
        {
          title: "病害",
          key: "result.病害",
          type: "text",
        },        {
          title: "虫害",
          key: "result.虫害",
          type: "text",
        },        {
          title: "营养健康",
          key: "result.营养健康",
          type: "text",
        },        {
          title: "生长周期",
          key: "result.生长周期",
          type: "text",
        }
      ];
      // TODO
      const vegetableColum = [] // 蔬菜导出Excel格式
      const fruitColum = [] // 水果导出Excel格式
      const animalColum = [] // 家禽家畜导出Excel格式
      table2excel(cropColumn, exportTableData, '检测结果')      
    }
  },
  mounted() {
    // 将通过eventbus传递的数据添加到tableData中
    bus.on("submit", (emitResult) => {
      console.log("emit传来数据: ", emitResult);
      var newResult = {};
      for (var d in emitResult.result) {
        newResult[this.keyMap[d]] = emitResult.result[d];
      }
      this.tableData.push({
        imgSrc: emitResult.src,
        time: emitResult.time,
        category: emitResult.category,
        type: emitResult.type,
        result: newResult,
      });
    });
  },
};
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.export-button {
  float: right;
  margin-bottom: 10px;
}
</style>
