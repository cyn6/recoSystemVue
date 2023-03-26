<template lang="">
    <div>
      <el-tabs tab-position="top" class="tabs" type="card">
        <div v-for="l in labels">
          <el-tab-pane :label="l">
            <VegetableContent></VegetableContent>
          </el-tab-pane>
        </div>
        
      </el-tabs>
    </div>
</template>

<script>
import VegetableContent from "./VegetableContent.vue";
export default {
  props: ["labels"],
  components: {
    VegetableContent,
  },
};
</script>
