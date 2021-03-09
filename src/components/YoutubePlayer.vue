<template>
  <iframe
    ref="youtube"
    width="560"
    height="315"
    src="https://www.youtube.com/embed/4muYzftomAE"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
  <p @click="setTimeEmit">test</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Vue from "vue";
import axios from "axios";
import ytdl from "ytdl-core";

export default defineComponent({
  name: "YoutubePlayer",
  props: {
    label: {
      type: String,
      default: "ボタン",
    },
    videoId: {
      type: String,
      default: "CwEQF4QOtT0",
    },
  },
  methods: {
    setTimeEmit: function(e: any) {
      fetch("https://www.youtube.com/get_video_info?video_id=rvkxtVkvawc", {
        mode: "no-cors",
      })
        .then((response) => console.log(response));
    },
  },
});
</script>

<style scoped></style>
