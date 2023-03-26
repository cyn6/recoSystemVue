<template lang="">
    <div>
      <el-tabs tab-position="top" class="tabs" type="card">
        <div v-for="l in labels">
          <el-tab-pane :label="l">
            <FruitContent></FruitContent>
          </el-tab-pane>
        </div>
        
      </el-tabs>
    </div>
</template>

<script>
import FruitContent from "./FruitContent.vue";
export default {
  props: ["labels"],
  components: {
    FruitContent,
  },
};
</script>
