<template>
  <div>
    <h2 class="pb-4">Assinaturas</h2>
    <v-card
      elevation="2"
      class="pa-4"
    >
      <Grid
        v-if="mostrarGrid"
        :items="assinaturas"
        @incluir="onClickIncluir"
        @alterar="onClickAlterar"
        @deletar="onClickDeletar"
      />
      <Form
        v-else
        :id_assinatura="id_assinatura"
        @inserted="onInserted"
        @updated="onUpdated"
        @reset="onResetForm"
      />
    </v-card>
  </div>
</template>

<script>
import Form from "@/modules/assinaturas/components/Form";
import Grid from "@/modules/assinaturas/components/Grid";
import assinaturasService from "@/modules/assinaturas/services/assinaturas.service";
import { KEY_CACHES } from "@/js/constants";

const ACAO_LISTAR = "listar";
const ACAO_INCLUIR = "incluir";
const ACAO_ALTERAR = "alterar";

export default {
  name: "Assinaturas",

  components: {
    Form,
    Grid,
  },

  created() {
    this.getAssinaturas();
  },

  data() {
    return {
      assinaturas: [],
      id_assinatura: undefined,
      acao: ACAO_LISTAR,
    };
  },

  computed: {
    mostrarGrid() {
      return this.acao === ACAO_LISTAR;
    },
  },

  methods: {
    async getAssinaturas() {
      try {
        this.$store.commit("setLoading", true);
        this.assinaturas = await assinaturasService.getAssinaturas();
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    onResetForm() {
      this.acao = ACAO_LISTAR;
      this.id_assinatura = undefined;
      this.$store.commit('invalidarCache', [KEY_CACHES.DASHBOARD, KEY_CACHES.MOVIMENTACOES]);
    },
    onClickIncluir() {
      this.acao = ACAO_INCLUIR;
      this.id_assinatura = undefined;
    },
    onClickAlterar(assinatura) {
      this.acao = ACAO_ALTERAR;
      this.id_assinatura = assinatura.id_assinatura;
    },
    async onClickDeletar(assinatura) {
      this.$confirm(`Deseja realmente deletar a assinatura (${assinatura.nome_parceiro})?`, "Atenção", "warning").then(() => {
        this.deleteAssinatura(assinatura);
      });
    },
    async deleteAssinatura(assinatura) {
      try {
        this.$store.commit("setLoading", true);
        await assinaturasService.deleteAssinatura(assinatura.id_assinatura);
        let indexAssinatura = this.assinaturas.findIndex((user) => user.id_assinatura === assinatura.id_assinatura);
        this.assinaturas.splice(indexAssinatura, 1);
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    onInserted(assinatura) {
      this.assinaturas.push(assinatura);
      this.onResetForm();
    },
    onUpdated(assinatura) {
      let indexAssinatura = this.assinaturas.findIndex((user) => user.id_assinatura === assinatura.id_assinatura);
      this.assinaturas.splice(indexAssinatura, 1);
      this.assinaturas.unshift(assinatura);
      this.onResetForm();
    },
  },
};
</script>
