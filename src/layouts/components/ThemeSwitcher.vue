<template>
  <v-fade-transition mode="out-in">
    <v-icon
      :key="$vuetify.theme.dark"
      @click="onClickButtonTheme"
    >{{ $vuetify.theme.dark ? icons.mdiWeatherSunny : icons.mdiWeatherNight }}</v-icon>
    {{$store.state.dark}}
  </v-fade-transition>
</template>

<script>
import { mdiWeatherNight, mdiWeatherSunny } from "@mdi/js";

export default {
  data() {
    return {
      icons: {
        mdiWeatherNight,
        mdiWeatherSunny,
      },
    };
  },
  methods: {
    onClickButtonTheme() {
      const isDark = this.$store.state.dark;
      this.$store.commit("setDark", !isDark);
      this.$vuetify.theme.dark = this.$store.state.dark;
    },
  },
};
</script>
