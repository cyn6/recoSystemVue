<template lang="">
  <div>
    <el-tabs tab-position="top" class="tabs" type="card">
      <el-tab-pane v-for="l in labels" :label="l">
        <CropContent :tabLabel="l"></CropContent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import CropContent from "./CropContent.vue";
  export default {
    props: ["labels"],
    components: {
      CropContent,
    },
  };
</script>
