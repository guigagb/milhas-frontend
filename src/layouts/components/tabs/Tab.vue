<template>
  <div
    v-if="$vuetify.breakpoint.mdAndUp"
    class="tab-container"
  >
    <div
      @click="openPage({ pages, title })"
      :class="[pageActive.meta.title == page.meta.title ? 'tab active' : 'tab']"
    >
      <div
        class="flex"
        style="align-items: center: padding: 7px 0"
      >
        <v-icon
          color="#f2f2f2"
          size="12"
          class="ml-1"
          :class="{ 'tab__icon--inative': !active }"
        >{{ page.meta.icon }}</v-icon>
        <label :class="{ 'tab__text--inative': !active }">{{ page.meta.title }}</label>
      </div>
      <v-btn
        @click.prevent.stop="closePage({ pages, title })"
        fab
        x-small
        elevation="0"
        width="20"
        height="20"
        class="pa-0 ml-1 tab-btn-close"
      >
        <v-icon size="10">mdi-close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  props: ["title", "pos"],
  computed: {
    ...mapState("tabs", ["pageActive"]),
    ...mapGetters("tabs", ["pages"]),
    active() {
      return this.pageActive.meta.title == this.title;
    },
    page() {
      return this.pages.find((page) => {
        if (page.meta && page.meta.title === this.title) return true;
        return false;
      });
    },
  },
  methods: {
    ...mapMutations("tabs", ["openPage", "closePage"]),
  },
};
</script>

<style lang="scss" scoped>
.tab-container {
  padding: 5px 2px;

  .tab {
    background: none;
    border: 1px solid var(--v-primary-base);
    border-radius: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 0.7rem;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    min-height: 28px;
    color: #f2f2f2;
    position: relative;

    &.active {
      background: var(--v-primary-base);
    }

    label {
      margin-left: 5px;
      line-height: 1;
    }

    &__icon--inative {
      color: var(--v-primary-base) !important;
    }

    &__text--inative {
      color: var(--v-primary-base);
    }

    .tab-btn-close {
      background: rgba(0, 0, 0, 0.15) !important;
      color: #fff;
      margin: 0 4px;
    }
  }
}</style>