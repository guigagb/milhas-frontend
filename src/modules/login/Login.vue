<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <span class="auth-card__title">.milhas</span>

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
              <a
                href="javascript:void(0)"
                class="mt-1"
              >Esqueceu sua senha?</a>
            </div>

            <v-btn
              :loading="loading"
              block
              color="primary"
              class="mt-6"
              @click="onClickLogin"
            >Login</v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">Ainda não tem cadastro?</span>
          <a
            href="https://api.whatsapp.com/send?phone=5561983090055&text=Ol%C3%A1%2C%20desejo%20saber%20mais%20sobre%20o%20sistema%20ponto%20milhas.">Faça
            sua assinatura</a>
        </v-card-text>
      </v-card>
    </div>


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

<style lang="scss">@import "~@/plugins/vuetify/default-preset/preset/pages/auth.scss";

@font-face {
  font-family: 'Baloo';
  src: url('~@/assets/fonts/Baloo-Regular.ttf');
}

.auth-card__title {
  font-family: "Baloo", cursive;
  margin: 28px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--v-primary-base);
  font-size: 3rem;
}</style>
