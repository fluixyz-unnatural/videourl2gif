<template>
  <div class="bg-gray">
    <canvas @click="seek" ref="canvas" width="3000" height="200"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Thumbnails",
  props: {
    duration: {
      type: Number,
      default: 12,
    },
    videosrc: {
      type: String,
      default: "/7seg.mp4",
    },
  },
  data() {
    const v: HTMLVideoElement = document.createElement("video");
    v.src = this.$props.videosrc;
    return {
      video: v,
    };
  },
  methods: {
    draw() {
      // eslint-disable-next-line
      const aa: any = this.$refs.canvas;
      // eslint-disable-next-line
      const ctx: any = aa.getContext("2d");
      ctx.drawImage(this.video, 97 * this.video.currentTime, 0, 96, 48);
      if (this.video.currentTime <= this.duration) {
        this.video.currentTime += 1;
      }
    },
    seek() {
      this.video.currentTime = 0;
    },
  },
  mounted() {
    this.video.addEventListener("seeked", this.draw);
  },
  computed: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
