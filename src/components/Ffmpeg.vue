<template>
  <div>
    <Button @click="exportGif" label="export" /><br />
    <p>{{ msg }}</p>
  </div>
  <br />

  <a :href="out" download>
    {{ out }}
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "Ffmpeg",
  props: {
    src: {
      type: String,
      default: "",
    },
    start: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 5,
    },
    fps: {
      type: Number,
      default: 24,
    },
    cropWidth: {
      type: Number,
      default: 100,
    },
    cropHeight: {
      type: Number,
      default: 100,
    },
    cropx: {
      type: Number,
      default: 0,
    },
    cropy: {
      type: Number,
      default: 0,
    },
    outWidth: {
      type: Number,
      default: 320,
    },
  },
  components: {
    Button,
  },
  data() {
    return {
      out: "",
      msg: "idling...",
      ffmpeg: createFFmpeg({ log: true }),
      loaded:false,
    };
  },
  methods: {
    setFile: function(props: any, e: any) {
      if (e.target === null) return;
      props.src = window.URL.createObjectURL(e.target.files[0]) as string;
    },
    exportGif: async function(props: any) {
      this.msg = "loading ffmpeg...";
      if(!this.loaded){
        await this.ffmpeg.load();
        this.loaded=true;
      }
      this.ffmpeg.FS("writeFile", "input.mp4", await fetchFile(this.src));
      this.msg = "ffmpeg running...";
      const vf =
        "crop=w=" +
        String(this.cropWidth) +
        ":h=" +
        String(this.cropHeight) +
        ":x=" +
        String(this.cropx) +
        ":y=" +
        String(this.cropy) +
        ",scale=" +
        String(this.outWidth) +
        ":-1";
      console.log(this.cropWidth);
      console.log("akljjjjjjjjjjjjjjedaaaaaaaaa");
      console.log(vf);
      await this.ffmpeg.run(
        "-ss",
        String(this.start),
        "-i",
        "input.mp4",
        "-t",
        String(this.duration),
        "-r",
        String(this.fps),
        "-vf",
        "crop=w=" +
          String(this.cropWidth) +
          ":h=" +
          String(this.cropHeight) +
          ":x=" +
          String(this.cropx) +
          ":y=" +
          String(this.cropy) +
          ",scale=" +
          String(this.outWidth) +
          ":-1",
        "output.gif"
      );
      const data = this.ffmpeg.FS("readFile", "output.gif");
      this.out = URL.createObjectURL(
        new Blob([data.buffer], { type: "image/gif" })
      );
      this.msg = "complete";
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  display: inline-block;
  margin: 10px;
}
</style>
