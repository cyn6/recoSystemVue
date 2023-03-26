<template lang="">
    <div>
      <el-tabs tab-position="top" class="tabs" type="card">
        <el-tab-pane v-for="l in labels" :label="l">
          <AnimalContent></AnimalContent>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import AnimalContent from "./AnimalContent.vue";
export default {
  props: ["labels"],//子组件声明
  components: {
    AnimalContent,
  },
};
</script>
