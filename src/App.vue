<script setup>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
const componentSize = ref("small");
</script>

<template>
  <div>
    <a-config-provider component-size="small">
      <a-radio-group v-model:value="componentSize">
        <a-radio-button value="small">小</a-radio-button>
        <a-radio-button value="middle">中</a-radio-button>
        <a-radio-button value="large">大</a-radio-button>
      </a-radio-group>
    </a-config-provider>
    <a-config-provider :component-size="componentSize">
      <HelloWorld />
    </a-config-provider>
  </div>
</template>

<style scoped></style>
