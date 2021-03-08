<template>
  <div>
    <Uploader @change="setFile" />
    <p v-show="msgOn">{{ msg }}</p>
  </div>

  <div >
    <VideoPlayer :videoSrc="videoSrc"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Uploader from "@/components/Uploader.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";

export default defineComponent({
  name: "LocalFilePlayer",
  props: {},
  components: {
    Uploader,
    VideoPlayer,
  },
  data() {
    return {
      ready: false,
      msg: "",
      msgOn: true,
      videoSrc: "",
    };
  },
  methods: {
    setFile: function(e: any) {
      const file = e.target.files[0];
      this.ready = true;
      this.msg = "selected : " + file.name;
      this.msgOn = true;

      this.videoSrc = window.URL.createObjectURL(file);
      this.msg = this.videoSrc
      //this.data.name = file.name;
      //this.data.type = file.type;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
