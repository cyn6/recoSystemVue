<template>
  <el-menu
    :default-active="'crop'"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :ellipsis="false"
    :router="true"
    @select="handleSelect"
  >
    <div style="max-height: 58px">
      <img src="../assets/logo.png" style="height: 59px" />
    </div>
    <div class="flex-grow" />
    <el-menu-item index="crop">粮食作物</el-menu-item>
    <el-menu-item index="vegetable">蔬菜作物</el-menu-item>
    <el-menu-item index="fruit">水果作物</el-menu-item>
    <el-menu-item index="animal">家禽家畜</el-menu-item>
    <el-sub-menu index="4">
      <template #title
        ><i class="fa fa-user-circle-o" aria-hidden="true"></i
      ></template>
      <el-menu-item index="4-1">item one</el-menu-item>
      <el-menu-item index="4-2">item two</el-menu-item>
      <el-menu-item index="4-3">item three</el-menu-item>
      <el-sub-menu index="4-4">
        <template #title>item four</template>
        <el-menu-item index="4-4-1">item one</el-menu-item>
        <el-menu-item index="4-4-2">item two</el-menu-item>
        <el-menu-item index="4-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>

  <div v-show="this.detectType == 'crop'">
    <Crops :labels="this.cropLabel"></Crops>
  </div>
  <div v-show="this.detectType == 'vegetable'">
    <Vegetables :labels="this.vegetableLabel"></Vegetables>
  </div>
  <div v-show="this.detectType == 'fruit'">
    <Fruits :labels="this.fruitLabel"></Fruits>
  </div>
  <div v-show="this.detectType == 'animal'">
    <Animals :labels="this.animalLabel"></Animals>
  </div>

  <div style="margin-top: 20px">
    <HistoryTable ref="table"></HistoryTable>
  </div>
</template>

<script>
import Crops from "./Crops.vue";
import Animals from "./Animals.vue";
import Vegetables from "./Vegetables.vue";
import Fruits from "./Fruits.vue";
import HistoryTable from "./HistoryTable.vue";

export default {
  components: {
    Crops,
    Vegetables,
    Fruits,
    Animals,
    HistoryTable,
  },
  data() {
    return {
      detectType: "crop",
      cropLabel: ["水稻", "玉米", "小麦"],
      vegetableLabel: ["辣椒", "甘蓝", "西红柿"],
      fruitLabel: ["苹果", "桃子"],
      animalLabel: ["牛", "猪", "鸡"],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.detectType = key;
      console.log(this.detectType);
    },
  },
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
