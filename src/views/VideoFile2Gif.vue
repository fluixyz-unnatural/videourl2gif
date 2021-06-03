<template>
  <div class="page">
    <div class="container center">
      <h1>動画ファイルからアニメーションGIFを作成 v0.1</h1>
      <Uploader @change="setFile" /><br />
      <div :height="playerHeight" class="relative">
        <VideoPlayer
          ref="player"
          :height="playerHeight"
          :width="playerWidth"
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
    <Scroller
      @setCurrentTime="setCurrentTime"
      :duration="nativeDuration"
      :currentTime="currentTime"
      :start="start"
      :end="end"
    />
    <div class="settings">
      <div class="container buttons">
        <ToggleButton
          @click="cropButtonPushed"
          label="crop"
          class="settingbutton"
        />
        <Button @click="setStart" label="SetStart" class="settingbutton" />
        <Button @click="setEnd" label="SetEnd" class="settingbutton" />
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
    </div>
    <div class="container">
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
    <div align="left">
    <ul>使い方</ul>
    <li>Open FileからGIFにしたい動画を選択</li>
    <li>SetStartで今映っている時間を開始地点に</li>
    <li>SetEndで今映っている時間を終了地点に</li>
    <li>cropを押すと範囲選択モードになる</li>
    <li>動画下部のバー(ホイールで移動、alt＋ホイールで拡大縮小)で選択範囲の確認が可能</li>
    <li>FrameRateでフレームレートを選択</li>
    <li>Widthで出力するGIFのサイズを設定</li>
    </div>
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
import Scroller from "@/components/Scroller.vue";

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
    Scroller,
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
      canvasWidth: 720,
      canvasHeight: 405,
      playerWidth: 0,
      playerHeight: 0,
      r: 1,
      nativeDuration:60,
    };
  },
  methods: {
    setFile: function(e: any) {
      const file = e.target.files[0];
      this.videoSrc = window.URL.createObjectURL(file);
      console.log(file.name);
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
      console.log("setPlayer");
      const w = e.target.videoWidth;
      const h = e.target.videoHeight;
      this.nativeDuration=e.target.duration;
      const maxWidth = 720;
      const maxHeight = 405;
      this.r = Math.min(maxWidth / w, maxHeight / h);
      this.canvasWidth = this.playerWidth = this.r * w;
      this.canvasHeight = this.playerHeight = this.r * h;
    },
    setCurrentTime: function(ct: number) {
      this.currentTime = ct;
      const player = this.$refs.player as InstanceType<typeof VideoPlayer>;
      player.setCurrentTime(ct);
    },
  },
});
</script>

<style scoped>
.relative {
  position: relative;
  width: 720px;
  height: 405px;
  align-self: center;
  background-color: gray;
  margin: auto;
}
.absolute {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.multiply {
  mix-blend-mode: difference;
}
.container {
  max-width:1020px;
  padding: 10px;
  top: 0px;
  right: 0px;
}
.page {
  text-align:center;
  max-width:1020px;
  margin:0 auto;
}
.buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 300px;
  margin:10 auto;
}
.params {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width:300px;
  margin:10 auto;
}
.items p {
  width: 200px;
  font-size: 18px;
  padding: 10px;
}
.items {
  display: flex;
  width: 300px;
}
.settings {
  display: flex;
  justify-content: center;
}
.settingbutton {
  margin: 10px;
}
h1{
  font-size:32px;
  margin:20px;
}
</style>
