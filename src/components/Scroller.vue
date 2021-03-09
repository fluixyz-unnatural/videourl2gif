<template>
  <div
    class="back relativeCanvas"
    v-on:wheel.exact.prevent 
    v-on:wheel.alt.exact.prevent 
    v-on:wheel.ctrl.exact.prevent 
    @wheel.exact="zoom"
    @wheel.alt.exact="slide"
    @click="setCurrentTime"
  >
    <svg
      :viewBox="String(viewBoxX)+', 0, ' + String(viewBoxWidth) + ', 100'"
      width="720"
      height="100"
      class="absolute timeline"
      preserveAspectRatio="none"
    >
      <line
        x1="0"
        y1="50"
        :x2="duration"
        y2="50"
        stroke-width="5"
        stroke="gray"
      ></line>
      <line
        :x1="start"
        :x2="end"
        y1="50"
        y2="50"
        stroke-width="10"
        stroke="red"
      ></line>
      <line
        :x1="currentTime"
        :x2="currentTime"
        y1="0"
        y2="100"
        :stroke-width="reRatio"
        stroke="black"
      ></line>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Scroller",
  components: {},
  props: {
    duration: {
      type: Number,
      default: 72000,
    },
    currentTime: {
      type: Number,
      default: 0,
    },
    start: {
      type: Number,
      default: 0,
    },
    end: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      ratio: 1,
      timeline: 0,
      viewBoxX:-10,
    };
  },
  methods: {
    zoom: function(e: any) {
      this.ratio *= 1 - e.deltaY / 300;
    },
    slide: function(e: any) {
      this.viewBoxX += e.deltaY/(10*this.ratio);
    },
    setCurrentTime: function(e: any){
      console.log(e.offsetX/this.ratio);
      this.$emit("setCurrentTime",(this.viewBoxX)+e.offsetX/this.ratio);
    }
  },
  computed: {
    viewBoxWidth: function(): number {
      return 720 / this.ratio;
    },
    reRatio: function(): number{
      return 1/this.ratio;
    },
  },
});
</script>

<style scoped>
.back {
  width: 720px;
  height: 100px;
  margin: auto;
  background-color: silver;
  border: 2px solid gray;
  touch-action: none;
}
.relativeCanvas {
  position: relative;
}
.absolute {
  position: absolute;
}
.timeline {
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
}
</style>
