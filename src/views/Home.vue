<template>
  <div class="home">
    <img alt="BeafForPeace" src="@/assets/takumiya.png" width="600" /><br />
    <h3>
    <router-link to="/file2gif">File2Gif</router-link>
    </h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {},
});
</script>

<style scoped>
img{ 
  padding: 10px;
}
</style>
