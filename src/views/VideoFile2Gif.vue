<template>
  <div class="container center">
    <Uploader @change="setFile" />
    <div class="relative">
      <VideoPlayer
        :width="playerWidth"
        :height="playerHeight"
        :videoSrc="videoSrc"
        class="absolute"
        @timeemit="currentTimeUpdate"
        @loadedmetadata="setPlayer"
      />
      <DrawRect
        @drawed="setCrop"
        v-show="cropping"
        :canvasWidth="canvasWidth"
        :canvasHeight="canvasHeight"
        class="absolute multiply"
      />
    </div>
  </div>
  <div class="container buttons">
    <ToggleButton @click="cropButtonPushed" label="crop" />
    <Button @click="setStart" label="SetStart" />
    <Button @click="setEnd" label="SetEnd" />
  </div>
  <div class="container params">
    <div class="items">
      <p>FrameRate</p>
      <TextBox @change="setFps" />
    </div>
    <div class="items">
      <p>Width</p>
      <TextBox @change="setWidth" />
    </div>
  </div>
  <div class="container">
    {{ cropx }}<br />
    {{ cropy }}<br />
    fps:{{ fps }}<br />
    wid: {{ outWidth }}<br />
    st: {{ start }}<br />
    end:{{ end }} <br />
    dur: {{ duration }} <br />
    <Ffmpeg
      :src="videoSrc"
      :start="start"
      :duration="duration"
      :fps="fps"
      :cropWidth="cropwidth"
      :cropHeight="cropheight"
      :cropx="cropx"
      :cropy="cropy"
      :outWidth="outWidth"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Button.vue";
import TextBox from "@/components/TextBox.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import DrawRect from "@/components/DrawRect.vue";
import Ffmpeg from "@/components/Ffmpeg.vue";
import Uploader from "@/components/Uploader.vue";
import ToggleButton from "@/components/ToggleButton.vue";

export default defineComponent({
  name: "VideoFile2Gif",
  components: {
    Button,
    TextBox,
    VideoPlayer,
    DrawRect,
    Ffmpeg,
    Uploader,
    ToggleButton,
  },
  data() {
    return {
      videoSrc: "",
      cropping: false,
      start: 0,
      end: 0,
      duration: 30,
      fps: 24,
      cropwidth: 100,
      cropheight: 100,
      cropx: 0,
      cropy: 0,
      outWidth: 320,
      currentTime: 0,
      canvasWidth: 640,
      canvasHeight: 300,
      playerWidth: 640,
      playerHeight: 300,
      r: 1,
    };
  },
  methods: {
    setFile: function(e: any) {
      const file = e.target.files[0];
      this.videoSrc = window.URL.createObjectURL(file);
      console.log(file);
    },
    cropButtonPushed: function() {
      this.cropping = !this.cropping;
    },
    setCrop: function(pos: number[]) {
      this.cropx = Math.min(pos[0], pos[2]) / this.r;
      this.cropy = Math.min(pos[1], pos[3]) / this.r;
      this.cropwidth = Math.abs(pos[0] - pos[2]) / this.r;
      this.cropheight = Math.abs(pos[1] - pos[3]) / this.r;
    },
    setWidth: function(e: any) {
      this.outWidth = e.target.value;
    },
    setFps: function(e: any) {
      this.fps = e.target.value;
    },
    currentTimeUpdate: function(time: number) {
      this.currentTime = time;
    },
    setStart: function() {
      this.start = this.currentTime;
      this.duration = this.end - this.start;
    },
    setEnd: function() {
      this.end = this.currentTime;
      this.duration = this.end - this.start;
    },
    setPlayer: function(e: any) {
      const w = e.target.videoWidth;
      const h = e.target.videoHeight;
      const maxWidth = 720;
      const maxHeight = 405;
      this.r = Math.min(maxWidth / w, maxHeight / h);
      this.canvasWidth = this.playerWidth = this.r * w;
      this.canvasHeight = this.playerHeight = this.r * h;
    },
  },
});
</script>

<style scoped>
.relative {
  position: relative;
  width: 720px;
  height: 405px;
}
.absolute {
  position: absolute;
  top: 0px;
  right: 0px;
}
.multiply {
  mix-blend-mode: difference;
}
.container {
  padding: 10px;
  margin: auto;
}
.buttons {
  display: flex;
  justify-content: space-evenly;
}
.params {
  display: flex;
  flex-direction: column;
}
.items p {
  width: 200px;
  font-size: 18px;
  padding: 10px;
}
.items {
  display: flex;
  padding: 10px;
}
</style>
