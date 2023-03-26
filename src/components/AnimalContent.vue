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
            <el-upload ref="upload" class="upload-demo" action="" :auto-upload="false" :show-file-list="false"
              :on-change="handleImageChange" accept=".jpg, .png, .jpeg">
              <template #trigger>
                <el-button type="warning">选择图片</el-button>
              </template>
              <el-button class="ml-10" type="success" @click="submitDisease(); submitInsect()">开始检测</el-button>

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
            <el-descriptions-item label="---" label-class-name="result_label">
              <i v-show="isLoadingDisease" class="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
              {{ result.disease }}
            </el-descriptions-item>
            <el-descriptions-item label="---" label-class-name="result_label">
              <i v-show="isLoadingInsect" class="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
              {{ result.insect }}
            </el-descriptions-item>
            <el-descriptions-item label="---" label-class-name="result_label">
              <i v-show="isLoadingNutrition" class="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
              {{ result.nutrition }}
            </el-descriptions-item>
            <el-descriptions-item label="---" label-class-name="result_label">
              <i v-show="isLoadingStatus" class="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
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
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import request from '../utils/request'
import empty_box from '../assets/empty-box.png'

export default {
  data() {
    return {
      isLoadingDisease: false, // 加载icon状态控制
      isLoadingInsect: false, // 加载icon状态控制
      isLoadingNutrition: false, // 加载icon状态控制
      isLoadingStatus: false, // 加载icon状态控制
      src: empty_box, // 图片地址
      img: "",
      type: "", // 检测类型
      result: { // 检测结果
        disease: "---",
        insect: "---",
        nutrition: "---",
        status: "---"
      },
      labelStyle: { 'width': '50px' } // 设置检测结果显示样式
    }
  },
  methods: {
    // 获取图片url地址，表单中只传递url，并不实际上传图片
    handleImageChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      this.img = file.raw
      this.src = URL.createObjectURL(file.raw);
    },
    // 设置加载样式
    setLoadingStatus() {
      this.isLoadingDisease = true
      this.isLoadingInsect = true
      this.isLoadingNutrition = true
      this.isLoadingStatus = true
      this.result.disease = 'loading...'
      this.result.insect = 'loading...'
      this.result.nutrition = 'loading...'
      this.result.status = 'loading...'
    },
    // 提交虫害检测
    submitInsect() {
      console.log(this.src)
      console.log(this.img)
      if (this.src == empty_box) {
        ElMessage.error('未选择待检测图片！')
      } else {
        // this.setLoadingStatus();
        // request({
        //   method: 'POST',
        //   url: '/crop',
        //   headers: { 'Content-Type': 'multipart/form-data' },
        //   data: { detectType: 'insect', image: this.img }
        // })
        //   .then((response) => {
        //     // 处理成功情况
        //     console.log(response)
        //     this.result.insect = response.data
        //     this.isLoadingInsect = false
        //   })
        //   .catch(function (error) {
        //     // 处理错误情况
        //     console.log(error)
        //   })
        //   .then(function () {
        //     // 总是会执行
        //   })
      }
    },
    // 提交病害检测
    submitDisease() {
        console.log(this.src)
        console.log(this.img)
        if (this.src == empty_box) {
          ElMessage.error('未选择待检测图片！')
        } else {
        //   this.setLoadingStatus();
        //   request({
        //     method: 'POST',
        //     url: '/crop',
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //     data: { detectType: 'disease', image: this.img }
        //   })
        //     .then((response) => {
        //       // 处理成功情况
        //       console.log(response)
        //       this.result.disease = response.data
        //       this.isLoadingDisease = false
        //     })
        //     .catch(function (error) {
        //       // 处理错误情况
        //       console.log(error)
        //     })
        //     .then(function () {
        //       // 总是会执行
        //     })
        }
    }
  }
}
</script>

<style>
.demo-image__placeholder .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  border-left: solid 1px var(--el-border-color);
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