<template>
  <div class="tabs-bar">
    <Tab v-for="(title,pos) in tabs" :title="title" :pos="pos" :key="title" />
  </div>
</template>

<script>
import Tab from "./Tab";
import { mapState } from "vuex";

export default {
  components: { Tab },
  data() {
    return {};
  },
  computed: {
    ...mapState("tabs", ["tabs"]),
  },
};
</script>

<style lang="sass">
.tabs-bar
  display: flex
  flex-grow: 1
  max-width: 100%
  margin: 0 5px 0 0
  overflow-x: auto
</style>