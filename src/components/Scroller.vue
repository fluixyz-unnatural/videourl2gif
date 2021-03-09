<template>
  <div class="back relative">
    <svg width="100%" height="10" class="absolute timeline">
      <g stroke="gray">
        <line x1="0" y1="5" x2="2000" y2="5" stroke-width="5"></line>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Scroller",
  components: {},
  props: {
    duration: {
      type: Number,
      default: 60,
    },
    currentTime: {
      type: Number,
      default: 0,
    },
  },
  data(props) {
    return {
      ratio: 1,
      timeline: 0,
    };
  },
  methods: {},
});
</script>

<style scoped>
.back {
  width: 90%;
  height: 100px;
  margin: auto;
  background-color: silver;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.timeline{
  top:0px;
  bottom:0px;
  left:0px;
  right:0px;
  margin:auto;
}
</style>
