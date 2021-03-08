<template>
  <button @click="pushed" :class="{pushed : isPushed,unpushed:!isPushed}">
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
  data() {
    return{ 
      isPushed : false,
    }
  },
  methods: {
    pushed: function(){
      this.isPushed = !this.isPushed
    }
  }
});
</script>

<style scoped>
button {
  outline: none;
}
.unpushed {
  color: #222222;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 1px 1px 10px gray;
  border:none;
}
.pushed {
  color: #222222;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 1px 1px 10px gray inset;
  border:none;
}

</style>
