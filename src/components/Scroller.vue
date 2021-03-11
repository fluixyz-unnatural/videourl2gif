<template>
  <div>
    <div
      class="back relativeCanvas"
      v-on:wheel.exact.prevent
      v-on:wheel.alt.exact.prevent
      v-on:wheel.ctrl.exact.prevent
      @mousedown="setCurrentTime"
      @mousemove="ifSetCurrentTime"
      @mouseup="mouseUp"
      @mouseleave="mouseUp"
      @wheel.alt.exact="zoom"
      @wheel.exact="slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="String(viewBoxX) + ', 0, ' + String(viewBoxWidth) + ', 100'"
        width="720"
        height="100"
        class="absolute timeline"
        preserveAspectRatio="none"
      >
        <!-- タイムライン !-->
        <line
          x1="0"
          y1="50"
          :x2="duration"
          y2="50"
          stroke-width="100"
          stroke="lightgray"
        ></line>
        <line
          x1="0"
          y1="50"
          :x2="duration"
          y2="50"
          stroke-width="5"
          stroke="gray"
        ></line>
        <line
          :x1="0"
          :x2="0"
          y1="0"
          y2="100"
          :stroke-width="2 * reRatio"
          stroke="gray"
        ></line>
        <line
          :x1="duration"
          :x2="duration"
          y1="0"
          y2="100"
          :stroke-width="2 * reRatio"
          stroke="gray"
        ></line>

        <!-- 選択範囲 !-->
        <line
          v-show="start < end"
          :x1="start"
          :x2="end"
          y1="50"
          y2="50"
          stroke-width="10"
          stroke="dodgerblue"
        ></line>
        <!-- 現在地点 !-->
        <line
          :x1="currentTime"
          :x2="currentTime"
          y1="0"
          y2="100"
          :stroke-width="reRatio"
          stroke="red"
        ></line>
        <!-- start !-->
        <line
          :x1="start"
          :x2="start"
          y1="40"
          y2="60"
          :stroke-width="3 * reRatio"
          stroke="dodgerblue"
        ></line>
        <line
          :x1="end"
          :x2="end"
          y1="40"
          y2="60"
          :stroke-width="3 * reRatio"
          stroke="dodgerblue"
        ></line>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="720"
        height="100"
        class="absolute timeline"
        preserveAspectRatio="none"
      >
        <g v-for="scale in scales" :key="scale">
          <line
            v-show="ratio > scale.wipe"
            v-for="i in 200"
            :key="i"
            :x1="
              (-viewBoxX % scale.interval) * ratio +
                scale.interval * (i - 3) * ratio
            "
            :x2="
              (-viewBoxX % scale.interval) * ratio +
                scale.interval * (i - 3) * ratio
            "
            y1="0"
            :y2="scale.peak < ratio ? 10 : scale.half < ratio ? 5 : 3"
            :stroke-width="scale.peak < ratio ? 3 : scale.half < ratio ? 2 : 1"
            stroke="#2c2c2c"
          ></line>
        </g>
      </svg>
    </div>
    <div
      class="relativeCanvas back2"
      @wheel.alt.exact="zoom"
      @wheel.exact="slide"
      v-on:wheel.exact.prevent
      v-on:wheel.alt.exact.prevent
      v-on:wheel.ctrl.exact.prevent
    >
      <!-- バー !-->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="720"
        height="20"
        class="absolute bar"
      >
        <!-- バーの背景 !-->
        <line
          stroke-linecap="round"
          x1="-50"
          x2="720"
          y1="10"
          y2="10"
          stroke-width="10"
          stroke="#444"
        ></line>
        <!-- 動画部分 !-->
        <line
          :x1="(viewBoxX * 720) / duration / 3 + 720 / 3"
          :x2="((viewBoxX + 720 * reRatio) * 720) / duration / 3 + 720 / 3"
          y1="10"
          y2="10"
          stroke-width="14"
          stroke="#999"
          @mousedown="barMouseDown"
          @mouseup="barMouseUp"
          @mouseleave="barMouseUp"
          @mousemove="barMove"
        ></line>
        <!-- 頭 !-->
        <circle
          :cx="(viewBoxX * 720) / duration / 3 + 720 / 3"
          cy="10"
          r="8"
          fill="#eee"
        ></circle>
        <!-- しっぽ !-->
        <circle
          :cx="((viewBoxX + 720 * reRatio) * 720) / duration / 3 + 720 / 3"
          cy="10"
          r="8"
          fill="#eee"
        ></circle>
      </svg>
    </div>
  </div>

  {{ ratio }}
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
      default: 0,
    },
  },
  data() {
    return {
      ratio: 1,
      timeline: 0,
      viewBoxX: -10,
      isPushed: false,
      scales: [
        { interval: 1, wipe: 3, half: 8, peak: 15 },
        { interval: 5, wipe: 0.8, half: 3, peak: 8 },
        { interval: 15, wipe: 0.5, half: 0.8, peak: 3 },
        { interval: 60, wipe: 0.1, half: 0.5, peak: 0.8 },
        { interval: 60 * 5, wipe: 0.01, half: 0.5, peak: 1 },
        { interval: 60 * 15, wipe: 0, half: 0, peak: 1 },
        { interval: 60 * 60, wipe: 0, half: 0, peak: 0 },
      ],
      barIsPushed: false,
      barPrevX:0,
    };
  },
  methods: {
    zoom: function(e: WheelEvent) {
      let targetR = this.ratio;
      if (e.deltaY < 0) {
        targetR *= 1.1;
      } else {
        targetR /= 1.1;
      }
      targetR = Math.max(0.005, targetR);
      targetR = Math.min(100, targetR);
      this.ratio = targetR;
      let targetX = this.viewBoxX;
      targetX = Math.min(targetX, this.$props.duration);
      targetX = Math.max(targetX, -720 / this.ratio);
      this.viewBoxX = targetX;
    },
    slide: function(e: WheelEvent) {
      let targetX = this.viewBoxX - e.deltaY / (10 * this.ratio);
      targetX = Math.min(targetX, this.$props.duration);
      targetX = Math.max(targetX, -720 / this.ratio);
      this.viewBoxX = targetX;
    },
    setCurrentTime: function(e: MouseEvent) {
      this.isPushed = true;
      console.log(e.offsetX / this.ratio);
      this.$emit("setCurrentTime", this.viewBoxX + e.offsetX / this.ratio);
    },
    mouseUp: function() {
      this.isPushed = false;
    },
    ifSetCurrentTime: function(e: MouseEvent) {
      if (this.isPushed) {
        console.log(e.offsetX / this.ratio);
        this.$emit("setCurrentTime", this.viewBoxX + e.offsetX / this.ratio);
      }
    },
    barMouseDown: function(e: MouseEvent) {
      this.barIsPushed = true;
      this.barPrevX = e.offsetX;
    },
    barMouseUp: function(e: Event) {
      console.log(e);
      this.barIsPushed = false;
    },
    barMove: function(e: MouseEvent) {
      if (this.barIsPushed) {
        console.log(e);
        this.viewBoxX += (e.offsetX-this.barPrevX)/3;
        this.barPrevX = e.offsetX;
      }
    },
  },
  computed: {
    viewBoxWidth: function(): number {
      return 720 / this.ratio;
    },
    reRatio: function(): number {
      return 1 / this.ratio;
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
}
.back2 {
  width: 720px;
  height: 20px;
  margin: auto;
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
.bar {
  bottom: 0px;
  left: 0px;
}
</style>
