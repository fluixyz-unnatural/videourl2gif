<template>
  <div :width=width :height=height ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimeLine",
  props: {
    height:{
      type: Number,
      default:405,
    },
    width:{
      type:Number,
      default:720,
    }
  },
  computed: {
    
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
