<template>
  <el-form :model="form" label-width="120px">
    <el-form-item>
      <el-empty description="description" :image="src" :image-size="200" />
    </el-form-item>

    <el-form-item>
      <el-upload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" 
        :on-change="handleImageChange" :auto-upload="false" :show-file-list="false">
        <template #trigger>
          <el-button type="primary">select file</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="submitUpload">
          upload to server
        </el-button>
        <template #tip>
          <div class="el-upload__tip text-red">
            limit 1 file, new file will cover the old file
          </div>
        </template>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script >
import { reactive } from 'vue'
export default {
  data() {
    return {
      src: ""
    }
  },
  methods: {
    handleImageChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      this.src = URL.createObjectURL(file.raw);
    }
  }
}

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>
