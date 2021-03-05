<template>
  <svg viewbox="0 0 300 300" width="300" height="300">
    <line x1="100" y1="100" x2="200" y2="200" stroke="black"></line>
    <rect :x="x" y="0" :width="width" :height="height" fill="#cccccc" stroke="black"></rect>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Rectangle",
  props: {
    msg: String,
  },
  data(){
    return{ 
      x:0,
      height:300,
      width:300
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
