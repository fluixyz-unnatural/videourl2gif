<template>
  <video controls controlslist="nofullscreen" :src="videoSrc" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VideoPlayer",
  props: {
    videSrc:{
        type: String,
        default: ""
    },
  },
})
</script>

<style scoped>
video {
  align: center;
  width: 720px;
  border-radius: 5px;
}
</style>
