<template>
  <div>
    <div
      ref="base"
      class="bg-gray-100 relative border frame w-11/12 h-72 mx-auto overflow-hidden"
    >
      <canvas
        @click="draw"
        ref="canvas"
        width="3000"
        height="3000"
        class="absolute"
      ></canvas>
    </div>
    <video src="/7seg.mp4" class="absolute" width="300" ref="player" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimeLine",
  props: {
    height: {
      type: Number,
      default: 405,
    },
    width: {
      type: Number,
      default: 720,
    },
    currentTime: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 120,
    },
    start: {
      type: Number,
      defalt: 0,
    },
    end: {
      type: Number,
      default: 0,
    },
    videosrc: {
      type: String,
      default: "/7seg.mp4",
    },
  },
  data() {
    return {
      zoom: 1,
      offset: 0,
    };
  },
  methods: {
    draw() {
      // eslint-disable-next-line
      const aa: any = this.$refs.canvas;
      // eslint-disable-next-line
      const ctx: any = aa.getContext("2d");
      ctx.strokeStyle = "#f00"; // 線の色
      ctx.lineWidth = 3; // 線の幅
      /*
    const v: HTMLVideoElement = document.createElement("video");
    v.src=this.$props.videosrc;
    v.width=300;
    */

      // eslint-disable-next-line
      const v: any = this.$refs.player;
      console.log(v);
      v.addEventListener("seeked", function() {
        ctx.drawImage(v, 160 * v.currentTime, 0, 160, 90);
      });
      v.currentTime += 1;
    },
  },
  computed: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
