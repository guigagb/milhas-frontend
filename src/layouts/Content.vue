<template>
  <v-app>
    <vertical-nav-menu :is-drawer-open.sync="isDrawerOpen"></vertical-nav-menu>

    <v-app-bar app flat absolute color="transparent">
      <div class="boxed-container w-full">
        <div class="d-flex align-center mx-6">
          <!-- Left Content -->
          <v-app-bar-nav-icon class="d-block me-2" @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>

          <TabsBar></TabsBar>

          <v-spacer></v-spacer>

          <!-- Right Content -->
          <theme-switcher></theme-switcher>
          <v-btn icon small class="ms-3">
            <v-icon>{{ icons.mdiBellOutline }}</v-icon>
          </v-btn>
          <app-bar-user-menu></app-bar-user-menu>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <div class="app-content-container boxed-container pt-2 px-6">
        <v-overlay :value="$store.state.loading" color="#21212178" absolute>
          <v-progress-circular color="primary" indeterminate size="90"
            style="margin-top: -150px">Aguarde..</v-progress-circular>
        </v-overlay>
        <slot></slot>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mdiMagnify, mdiBellOutline, mdiGithub } from "@mdi/js";
import VerticalNavMenu from "./components/vertical-nav-menu/VerticalNavMenu.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
import AppBarUserMenu from "./components/AppBarUserMenu.vue";
import TabsBar from "./components/tabs/TabsBar.vue";

export default {
  components: {
    VerticalNavMenu,
    ThemeSwitcher,
    AppBarUserMenu,
    TabsBar,
  },
  created() {
    if (!this.$store.state.usuario) {
      return this.$store.commit("logout");
    }

    this.buscarDadosIniciais();
  },
  data() {
    return {
      isDrawerOpen: true,
      icons: {
        mdiMagnify,
        mdiBellOutline,
        mdiGithub,
      },
    };
  },
  methods: {
    buscarDadosIniciais() {
      const usuario = sessionStorage.getItem("usuario");

      if (!usuario) {
        this.$router.push("login");
        sessionStorage.clear("moedas");
        sessionStorage.clear("lojas");
        return;
      }

      this.$store.commit("setUsuario", usuario);

      this.$vuetify.theme.dark = this.$store.state.dark;

      this.$store.commit('limparCache');
    },
  },
};
</script>

<style lang="scss" scoped>
.v-app-bar ::v-deep {
  .v-toolbar__content {
    padding: 0;

    .app-bar-search {
      .v-input__slot {
        padding-left: 18px;
      }
    }
  }
}

// .v-main {
//   overflow-y: hidden;
// }

.app-content-container {
  height: calc(100vh - 56px);
  padding-bottom: var(--space);
  overflow-y: auto;
}

.boxed-container {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}
</style>
