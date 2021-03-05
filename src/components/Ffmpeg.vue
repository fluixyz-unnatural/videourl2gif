<template>
  <div>
    <Uploader @change="setFile" ref="ref" /><br>
    <p>{{ src }}</p>
  </div>
  <div>
    <Button @click="exportGif" label="export" /><br>
    <p>{{ msg }}</p>
  </div>
  <br />
 
  <a :href="out" download>
    {{ out }}
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Uploader from "@/components/Uploader.vue";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "Ffmpeg",
  props: {},
  components: {
    Uploader,
    Button,
  },
  data() {
    return {
      src: "unselected",
      out: "",
      msg: "idling...",
      ffmpeg: createFFmpeg({ log: true }),
    };
  },
  methods: {
    setFile: function(e: any) {
      if (e.target === null) return;
      this.src = window.URL.createObjectURL(e.target.files[0]) as string;
    },
    exportGif: async function() {
      this.msg = "loading ffmpeg...";
      await this.ffmpeg.load();
      this.ffmpeg.FS("writeFile", "input.mp4", await fetchFile(this.src));
      this.msg = "ffmpeg running...";
      await this.ffmpeg.run("-i", "input.mp4", "output.gif");
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
  margin:10px;
}
</style>
