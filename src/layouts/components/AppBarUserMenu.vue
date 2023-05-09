<template>
  <v-menu offset-y left nudge-bottom="14" min-width="230" content-class="user-profile-menu-content">
    <template v-slot:activator="{ on, attrs }">
      <v-avatar class="ms-4" size="40px" v-bind="attrs" v-on="on">
        <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
      </v-avatar>
    </template>
    <v-list>
      <div class="pb-3 pt-2">
        <v-avatar class="ms-4" size="40px">
          <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
        </v-avatar>
        <div class="d-inline-flex flex-column justify-center ms-3" style="vertical-align:middle">
          <span class="text--primary font-weight-semibold mb-n1">{{nomeUsuario}}</span>
          <!-- <small class="text--disabled text-capitalize">Admin</small> -->
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Profile -->
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">{{ icons.mdiAccountOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Settings -->
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">{{ icons.mdiCogOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Configurações</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Pricing -->
      <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">{{ icons.mdiCurrencyUsd }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Planos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- FAQ -->
      <!-- <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">{{ icons.mdiHelpCircleOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>FAQ</v-list-item-title>
        </v-list-item-content>
      </v-list-item>-->

      <v-divider class="my-2"></v-divider>

      <!-- Logout -->
      <v-list-item @click="onClickSair" link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">{{ icons.mdiLogoutVariant }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {
  mdiAccountOutline,
  mdiEmailOutline,
  mdiCheckboxMarkedOutline,
  mdiChatOutline,
  mdiCogOutline,
  mdiCurrencyUsd,
  mdiHelpCircleOutline,
  mdiLogoutVariant,
} from "@mdi/js";

export default {
  data() {
    return {
      icons: {
        mdiAccountOutline,
        mdiEmailOutline,
        mdiCheckboxMarkedOutline,
        mdiChatOutline,
        mdiCogOutline,
        mdiCurrencyUsd,
        mdiHelpCircleOutline,
        mdiLogoutVariant,
      },
    };
  },
  computed: {
    nomeUsuario() {
      return this.$store?.state?.usuario?.nome;
    },
  },
  methods: {
    onClickSair() {
      this.$store.commit("logout");
    },
  },
};
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
