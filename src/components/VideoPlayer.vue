<template>
  <video
    controls
    controlslist="nofullscreen"
    :src="videoSrc"
    @progress="setTimeEmit"
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
  },
  data() {
    return {
      ct: 0,
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
      }, 100);
    },
  },
});
</script>

<style scoped>
video {
  align: center;
  width: 720px;
  height: 405px;
  border-radius: 5px;
}
</style>
