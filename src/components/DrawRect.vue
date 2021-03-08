<template>
  <Rectangle
    @mousedown="dragStart"
    @mouseup="dragEnd"
    @mousemove="draw"
    :canvasWidth="canvasWidth"
    :canvasHeight="canvasHeight"
    :x1="x1"
    :x2="x2"
    :y1="y1"
    :y2="y2"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Rectangle from "@/components/Rectangle.vue";

export default defineComponent({
  name: "DrawRect",
  components: {
    Rectangle,
  },
  props: {
    canvasWidth: {
      type: Number,
      default: 640,
    },
    canvasHeight: {
      type: Number,
      default: 360,
    },
  },
  data(props) {
    return {
      x1: 0,
      x2: props.canvasWidth,
      y1: 0,
      y2: props.canvasHeight,
      counter: 0,
      isDown:false,
    };
  },
  methods: {
    draw: function(e: any) {
      if(this.isDown){
        this.x2 = e.offsetX;
        this.y2 = e.offsetY;
        this.counter++;
      }
    },
    dragStart: function(e: any){
      this.isDown=true;
      this.x1 = e.offsetX;
      this.y1 = e.offsetY;
    },
    dragEnd: function(){
      this.isDown=false;
      this.$emit('drawed',[this.x1,this.y1,this.x2,this.y2])
    },
  },
});
</script>

<style scoped>
video {
  align: center;
  width: 720px;
  border-radius: 5px;
}
</style>
