<template>
  <div>
    <h4>Ffmpeg</h4>
    <Ffmpeg />
    <h4>LocalFilePlayer</h4>
    <LocalFilePlayer />
    <h4>Uploader</h4>
    <Uploader />
    <h4>Rectangle</h4>
    <Rectangle
      canvasWidth="640"
      canvasHeight="480"
      x1="320"
      x2="120"
      y1="0"
      y2="50"
    />
    <h4>Button</h4>
    <Button label="Sample" />
    <h4>TextBox</h4>
    <TextBox />
    <h4>VideoPlayer</h4>
    <VideoPlayer videoSrc="/7seg.mp4" />
    <h4>DrawRect</h4>
    <DrawRect />
  </div>
  <br /><br /><br /><br /><br />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Uploader from "@/components/Uploader.vue";
import Rectangle from "@/components/Rectangle.vue";
import Button from "@/components/Button.vue";
import TextBox from "@/components/TextBox.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import LocalFilePlayer from "@/components/LocalFilePlayer.vue";
import DrawRect from "@/components/DrawRect.vue";
import Ffmpeg from "@/components/Ffmpeg.vue";

export default defineComponent({
  name: "Home",
  components: {
    Uploader,
    Rectangle,
    Button,
    TextBox,
    VideoPlayer,
    LocalFilePlayer,
    DrawRect,
    Ffmpeg,
  },
});
</script>

<style scoped>
br {
  padding: 100px;
}
h4 {
  padding: 50px 0px 0px 0px;
  font-size: 24px;
  font-weight: bold;
}
</style>
