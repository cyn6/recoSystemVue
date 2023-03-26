<template>
  <el-form>
    <div class="demo-image__placeholder">
      <div class="block">
        <span class="demonstration">请选择待检测图片</span>
        <div class="image_part_1">
          <el-empty :image="src" description=" " :image-size="300" />
        </div>
        <el-form-item>
          <div class="image_part_2">
            <el-upload
              ref="upload"
              class="upload-demo"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleImageChange"
              accept=".jpg, .png, .jpeg"
            >
              <template #trigger>
                <el-button type="warning">选择图片</el-button>
              </template>
              <el-button class="ml-10" type="success" @click="submit"
                >开始检测</el-button
              >

              <template #tip>
                <div class="el-upload__tip text-red">
                  limit 1 file, new file will cover the old file
                </div>
              </template>
            </el-upload>
          </div>
        </el-form-item>
      </div>
      <div class="block">
        <span class="demonstration"></span>
        <div class="result_part">
          <el-descriptions title="检测结果" border :column="1" size="large">
            <el-descriptions-item label="病害" label-class-name="result_label">
              <i
                v-show="isLoadingDisease"
                class="fa fa-spinner fa-pulse fa-lg fa-fw"
              ></i>
              {{ result.disease }}
            </el-descriptions-item>
            <el-descriptions-item label="虫害" label-class-name="result_label">
              <i
                v-show="isLoadingInsect"
                class="fa fa-spinner fa-pulse fa-lg fa-fw"
              ></i>
              {{ result.insect }}
            </el-descriptions-item>
            <el-descriptions-item
              label="营养健康"
              label-class-name="result_label"
            >
              <i
                v-show="isLoadingNutrition"
                class="fa fa-spinner fa-pulse fa-lg fa-fw"
              ></i>
              {{ result.nutrition }}
            </el-descriptions-item>
            <el-descriptions-item
              label="生长周期"
              label-class-name="result_label"
            >
              <i
                v-show="isLoadingStatus"
                class="fa fa-spinner fa-pulse fa-lg fa-fw"
              ></i>
              {{ result.status }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
  </el-form>
  <el-divider />
</template>
<script>
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { uploadImage, getSingleResult } from "../api/cropApi.js";
import empty_box from "../assets/empty-box.png";
import { bus } from "../utils/eventbus";

// 设置日期格式
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

export default {
  props: ["tabLabel"],
  data() {
    return {
      isLoadingDisease: false, // 加载icon状态控制
      isLoadingInsect: false, // 加载icon状态控制
      isLoadingNutrition: false, // 加载icon状态控制
      isLoadingStatus: false, // 加载icon状态控制
      src: empty_box, // 图片地址
      img: "",
      type: "", // 检测类型
      result: {
        // 检测结果
        disease: "---",
        insect: "---",
        nutrition: "---",
        status: "---",
      },
      labelStyle: { width: "50px" }, // 设置检测结果显示样式
    };
  },
  methods: {
    // 获取图片url地址，表单中传递url，并上传图片
    handleImageChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.img = file.raw;
      this.src = URL.createObjectURL(file.raw);//本地图片，用于展示，但后端访问不到，因此需要传入后端
    },
    // 设置加载样式
    setLoadingStatus() {
      this.isLoadingDisease = true;
      this.isLoadingInsect = true;
      this.isLoadingNutrition = true;
      this.isLoadingStatus = true;
      this.result.disease = "loading...";
      this.result.insect = "loading...";
      this.result.nutrition = "loading...";
      this.result.status = "loading...";
    },
    // 提交并处理返回数据
    submit() {
      console.log("Crop检测事件");
      this.setLoadingStatus();
      // 点击提交发送两次请求：第一次上传图片到服务器，并返回服务器上的图片路径；便于表格显示、导出
      //                     第二次请求等待第一次返回结果，发送四个并行请求，获取检测结果
      let upload = uploadImage(this.img);
      upload.then(async (response) => {
        let imagePath = response.data;
        console.log(imagePath);
        await axios
          .all([
            getSingleResult(imagePath, "disease"),
            getSingleResult(imagePath, "insect"),
            getSingleResult(imagePath, "nutrition"),
            getSingleResult(imagePath, "status"),
          ])
          .then(
            // 处理成功情况
            axios.spread(
              (diseaseResult, insectResult, nutritionResult, statusResult) => {
                console.log(diseaseResult);
                this.result.disease = diseaseResult.data;
                this.isLoadingInsect = false;
                this.result.insect = insectResult.data;
                this.isLoadingDisease = false;
                this.result.nutrition = nutritionResult.data;
                this.isLoadingNutrition = false;
                this.result.status = statusResult.data;
                this.isLoadingStatus = false;
                console.log(this.result);

                // 将返回结果以 {图片路径：检测结果} 的形式保存到浏览器本地sessionStorage中
                sessionStorage.setItem(
                  imagePath,
                  JSON.stringify({
                    src: imagePath,
                    time: new Date().Format("yyyy-MM-dd  HH:mm:ss"),
                    category: this.tabLabel,
                    type: "粮食作物",
                    result: this.result,
                  })
                ); // JSON.stringify(this.result)：将对象转换为Json字符串

                // 向HistoryTable发送事件，传递本次接受的数据
                bus.emit("submit", {
                  src: imagePath,
                  time: new Date().Format("yyyy-MM-dd  HH:mm:ss"),
                  category: this.tabLabel,
                  type: "粮食作物",
                  result: this.result,
                });
              }
            )
          )
          .catch(function (error) {
            // 处理错误情况
            console.log(error);
          })
          .then(function () {
            // 总是会执行
          });
      });
    },
  },
};
</script>

<style>
.demo-image__placeholder .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
  height: 500px;
}

.demo-image__placeholder .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.demo-image__placeholder .image_part_1 {
  display: block;
  height: 360px;
}

.demo-image__placeholder .image_part_2 {
  display: block;
  margin: 0 auto;
}

.demo-image__placeholder .result_part {
  display: block;
  width: 80%;
  margin: 100px auto 0px;
}

.demo-image__placeholder .result_label {
  width: 150px;
}
</style>
