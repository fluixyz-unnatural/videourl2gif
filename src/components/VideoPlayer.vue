<template>
  <video
    controls
    controlslist="nofullscreen"
    :currentTime="currentTime"
    :src="videoSrc"
    @progress="setTimeEmit"
    :width="width"
    :height="height"
    @loadedmetadata="lmd"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VideoPlayer",
  props: {
    videoSrc: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 360,
    },
    height: {
      type: Number,
      default: 240,
    },
  },
  data() {
    return {
      ct: 0,
      currentTime: 0,
    };
  },
  methods: {
    setTimeEmit: function(e: any) {
      setInterval(() => {
        {
          if (e.target.currentTime !== null) {
            this.$emit("timeemit", e.target.currentTime);
            this.ct = e.target.currentTime;
          }
        }
      }, 1);
    },
    lmd: function(e: any){
      this.$emit("loadedmetadata",e);
    },
    setCurrentTime: function(ct: number){
      this.currentTime=ct;
    }
  },
});
</script>

<style scoped></style>
