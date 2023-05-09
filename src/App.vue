<template>
  <component v-if="resolveLayout === 'layout-blank'" :is="resolveLayout">
    <router-view></router-view>
  </component>
  <component v-else-if="resolveLayout === 'layout-content'" :is="resolveLayout">
    <keep-alive :include="tabsName">
      <component :is="pageActive.name"></component>
    </keep-alive>
  </component>
</template>

<script>
import LayoutBlank from "@/layouts/Blank.vue";
import LayoutContent from "@/layouts/Content.vue";
import { mapState } from "vuex";

export default {
  components: {
    LayoutBlank,
    LayoutContent,
  },
  name: "App",
  created() {
    document.title = "Carteira de Milhas";
  },
  computed: {
    ...mapState("tabs", ["tabsName", "pageActive"]),
    resolveLayout() {
      if (this.$route.name === null) return null;

      if (this.$route.meta?.layout === "blank") return "layout-blank";

      return "layout-content";
    },
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import "./styles/styles";

html {
  overflow: hidden;
}

// @import url('https://fonts.googleapis.com/css?family=Poppins')
// @import url('https://fonts.googleapis.com/css?family=Archivo')
</style>