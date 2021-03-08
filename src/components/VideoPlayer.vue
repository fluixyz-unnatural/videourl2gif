<template>
  <video
    controls
    controlslist="nofullscreen"
    :src="videoSrc"
    @progress="setTimeEmit"
    :width="width"
    :height="height"
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
      type:Number,
      default: 240,
    }
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
</style>
