<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <!-- <v-img
            :src="require('@/assets/prootica.png')"
            max-height="32px"
            max-width="200px"
            alt="logo"
            contain
            class="me-3"
          ></v-img>-->
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold light-text--primary mb-2">Seja bem vindo! 👋🏻</p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form id="formLogin">
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              placeholder="john@example.com"
              hide-details
              class="mb-3 obr"
              ref="edtEmail"
              maxlength="150"
            ></v-text-field>

            <v-text-field
              v-model="senha"
              outlined
              label="Senha"
              placeholder="············"
              hide-details
              class="obr"
              maxlength="10"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              @click:append="isPasswordVisible = !isPasswordVisible"
              @keypress.enter.prevent="onClickLogin"
            ></v-text-field>

            <div class="d-flex align-center justify-end flex-wrap">
              <!-- forgot link -->
              <a href="javascript:void(0)" class="mt-1">Esqueceu sua senha?</a>
            </div>

            <v-btn :loading="loading" block color="primary" class="mt-6" @click="onClickLogin">Login</v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">Ainda não tem cadastro?</span>
          <router-link :to="{name:'pages-register'}">Faça sua assinatura</router-link>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
      alt="borda do rodapé"
    />

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
  </div>
</template>

<script>
import { mdiEyeOutline, mdiEyeOffOutline } from "@mdi/js";
import { validarObr, validarEmail } from "@/js/util";
import { mapMutations } from "vuex";
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      isPasswordVisible: false,
      email: undefined,
      senha: undefined,
      loading: false,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    };
  },
  methods: {
    ...mapMutations("tabs", ["resetTabs"]),
    goToHome() {
      this.$router.push("/");
    },
    buscarDadosIniciais() {
      const usuario = sessionStorage.getItem("usuario");

      if (!usuario) {
        this.$router.push("login");
        return;
      }

      this.$store.commit("setUsuario", usuario);

      this.$store.dispatch("getMoedasCotacoes").then((moedas) => {
        this.$store.commit("setMoedasCotacoes", moedas);
      });

      this.$store.dispatch("getLojas").then((lojas) => {
        this.$store.commit("setLojas", lojas);
      });

      this.goToHome();
    },
    async onClickLogin() {
      if (!validarObr("#formLogin")) return;

      if (!validarEmail(this.email)) {
        this.$refs.edtEmail.focus();
        return this.$notify.error("Informe um email válido!");
      }

      try {
        this.loading = true;

        let rs = await this.$store.dispatch("login", {
          email: this.email,
          senha: this.senha,
        });

        if (rs.statusCode == 401) throw new Error(rs.message);

        if (!rs.headers.authorization) throw new Error(rs.data.msg);

        const user = jwt_decode(rs.headers.authorization);
        user.token = "Bearer " + rs.headers.authorization;

        this.$store.commit("setUsuario", JSON.stringify(user));

        this.resetTabs();
        this.buscarDadosIniciais();
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/plugins/vuetify/default-preset/preset/pages/auth.scss";
</style>
