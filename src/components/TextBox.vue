<template>
  <input type="text" class="outline-none" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextBox",
  props: {
    
  },
});
</script>

<style scoped>
.outline-none {
  outline: none;
}
input { 
  width:100px;
  border-radius:10px;
  padding :10px 10px;
  font-size: 32px;
  font-weight:bold;
  color: gray;
  box-shadow: 1px 1px 10px gray inset;
  caret-color:lavender;
  vertical-align:middle;
  text-align:center;
  border:none;
}
input:focus{
  background-color:whitesmoke;
}
</style>
