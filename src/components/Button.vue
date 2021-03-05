<template>
  <button class="outline-none">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    label: {
      type: String,
      default: "ボタン",
    },
  },
});
</script>

<style scoped>
.outline-none {
  outline: none;
}
button {
  color: #222222;
  padding: 30px 50px;
  font-size: 32px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 1px 1px 10px gray;
  border:none;
}
button:active {
  box-shadow: 1px 1px 10px gray inset;
}
button:hover {
  background-color: lavender;
  transition-property: background-color;
  transition-duration: 0.5s;
}
</style>
