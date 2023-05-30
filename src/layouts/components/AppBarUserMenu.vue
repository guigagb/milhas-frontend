<template>
  <v-menu
    offset-y
    left
    nudge-bottom="14"
    min-width="230"
    class="user-profile-content"
    content-class="user-profile-menu-content"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-avatar
        class="ms-4 avatar"
        size="30px"
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-list>
      <div class="pb-3 pt-2">
        <div
          class="d-inline-flex flex-column justify-center ms-3"
          style="vertical-align:middle"
        >
          <span class="text--primary font-weight-semibold my-2">{{ nomeUsuario }}</span>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Profile -->
      <v-list-item
        link
        @click="onClickAlterarSenha"
      >
        <v-list-item-icon class="me-2">
          <v-icon size="22">{{ icons.mdiLock }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Alterar senha</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <!-- Logout -->
      <v-list-item
        @click="onClickSair"
        link
      >
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
  mdiLock,
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
        mdiLock,
      },
    };
  },
  computed: {
    nomeUsuario() {
      return this.$store?.state?.usuario?.nome;
    },
  },
  methods: {
    onClickAlterarSenha() {
      this.$emit('clickAlterarSenha');
    },
    onClickSair() {
      this.$store.commit("logout");
    },
  },
};
</script>

<style lang="scss">
.avatar {
  background: hsla(289, 94%, 67%, 1);
  background: linear-gradient(90deg, hsla(289, 94%, 67%, 1) 0%, hsla(272, 93%, 73%, 1) 100%);
  background: -moz-linear-gradient(90deg, hsla(289, 94%, 67%, 1) 0%, hsla(272, 93%, 73%, 1) 100%);
  background: -webkit-linear-gradient(90deg, hsla(289, 94%, 67%, 1) 0%, hsla(272, 93%, 73%, 1) 100%);
}

.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
