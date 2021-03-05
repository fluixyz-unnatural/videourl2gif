<template>
  <div>
    <label>
      Open File
      <input type="file" name="input.mp4" />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Uploader",
  props: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  display: none;
}
label {
  color: #222222;
  background-color: whitesmoke;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 1px 1px 10px gray;
  border:none;
}
label:active {
  box-shadow: 1px 1px 10px gray inset;
}
label:hover {
  background-color: lavender;
  transition-property: background-color;
  transition-duration: 0.5s;
}
div{
  padding-bottom:20px;
  padding-top:20px;
}
</style>
