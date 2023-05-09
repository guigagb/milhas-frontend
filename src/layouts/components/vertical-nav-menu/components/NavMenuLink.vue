<template>
  <v-list-item
    @click="openPage({pages, title})"
    class="vertical-nav-menu-link"
    :class="{'active': pageActive.name === rota}"
    v-bind="$attrs"
    active-class="primary--text"
    exact
  >
    <v-list-item-icon>
      <v-icon class="mx-auto" :color="colorIcon" :title="title">{{ icon || alternateIcon }}</v-icon>
    </v-list-item-icon>

    <v-list-item-title>{{ title }}</v-list-item-title>
  </v-list-item>
</template>

<script>
import { mdiCheckboxBlankCircleOutline } from "@mdi/js";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: undefined,
    },
    rota: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      alternateIcon: mdiCheckboxBlankCircleOutline,
    };
  },
  computed: {
    ...mapState("tabs", ["pageActive"]),
    ...mapGetters("tabs", ["pages"]),
    colorIcon() {
      if (this.pageActive && this.pageActive.name === this.rota) return "primary";
      else return undefined;
    },
  },
  methods: {
    ...mapMutations("tabs", ["openPage"]),
  },
};
</script>

<style lang="scss" scoped>
// @import '~vuetify/src/styles/styles.sass';

.alternate-icon-small {
  font-size: 14px;
  height: 14px;
  width: 14px;
}

.vertical-nav-menu-link {
  &.v-list-item {
    min-height: 40px !important;
    height: 40px !important;

    &.active {
      color: var(--v-primary-base) !important;
    }

    .v-list-item__icon:first-child {
      height: 100%;
      margin-top: 0px !important;
      margin-bottom: 0px !important;
    }
  }

  &.v-list-item--active {
    background: none;
  }
}
</style>
