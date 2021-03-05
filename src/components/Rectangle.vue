<template>
  <svg :width="canvasWidth" :height="canvasHeight">
    <rect
      :x="x"
      :y="y"
      :width="rectWidth"
      :height="rectHeight"
      fill="#cccccc"
      stroke="black"
    ></rect>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Rectangle",
  props: {
    canvasHeight: {
      type: Number,
      default: 300,
    },
    canvasWidth: {
      type: Number,
      default: 300,
    },
    x1: {
      type: Number,
      default: 0,
    },
    y1: {
      type: Number,
      default: 0,
    },
    x2: {
      type: Number,
      default: 50,
    },
    y2: {
      type: Number,
      default: 50,
    },
  },
  computed: {
    x(): number {
      return Math.min(this.x1, this.x2);
    },
    y(): number {
      return Math.min(this.y1, this.y2);
    },
    rectWidth(): number {
      return Math.abs(this.x1-this.x2);
    },
    rectHeight(): number {
      return Math.abs(this.y1-this.y2);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
