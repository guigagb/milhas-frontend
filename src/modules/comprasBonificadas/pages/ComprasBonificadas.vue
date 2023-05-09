<template>
  <div>
    <h2 class="pb-4">Compras Bonificadas</h2>
    <v-card elevation="2" class="pa-4">
      <Grid v-if="mostrarGrid" :items="comprasBonificadas" @incluir="onClickIncluir" @alterar="onClickAlterar"
        @deletar="onClickDeletar" />
      <Form :id_compra_bonificada="id_compra_bonificada" @inserted="onInserted" @updated="onUpdated" @reset="onResetForm"
        v-else />
    </v-card>
  </div>
</template>

<script>
import Form from "@/modules/comprasBonificadas/components/Form";
import Grid from "@/modules/comprasBonificadas/components/Grid";
import comprasBonificadasService from "@/modules/comprasBonificadas/services/comprasBonificadas.service";
import { KEY_CACHES } from "@/js/constants";

const ACAO_LISTAR = "listar";
const ACAO_INCLUIR = "incluir";
const ACAO_ALTERAR = "alterar";

export default {
  name: "ComprasBonificadas",

  components: {
    Form,
    Grid,
  },

  created() {
    this.getComprasBonificadas();
  },

  data() {
    return {
      comprasBonificadas: [],
      id_compra_bonificada: undefined,
      acao: ACAO_LISTAR,
    };
  },

  computed: {
    mostrarGrid() {
      return this.acao === ACAO_LISTAR;
    },
  },

  methods: {
    async getComprasBonificadas() {
      try {
        this.$store.commit("setLoading", true);
        this.comprasBonificadas = await comprasBonificadasService.getComprasBonificadas();
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    onResetForm() {
      this.acao = ACAO_LISTAR;
      this.id_compra_bonificada = undefined;
      this.$store.commit('invalidarCache', [KEY_CACHES.DASHBOARD, KEY_CACHES.MOVIMENTACOES]);
    },
    onClickIncluir() {
      this.acao = ACAO_INCLUIR;
      this.id_compra_bonificada = undefined;
    },
    onClickAlterar(compraBonificada) {
      this.acao = ACAO_ALTERAR;
      this.id_compra_bonificada = compraBonificada.id_compra_bonificada;
    },
    async onClickDeletar(compraBonificada) {
      this.$confirm(`Deseja realmente deletar a compra (${compraBonificada.produto})?`, "Atenção", "warning").then(() => {
        this.deleteCompraBonificada(compraBonificada);
      });
    },
    async deleteCompraBonificada(compraBonificada) {
      try {
        this.$store.commit("setLoading", true);
        await comprasBonificadasService.deleteCompraBonificada(compraBonificada.id_compra_bonificada);
        let indexCompraBonificada = this.comprasBonificadas.findIndex(
          (user) => user.id_compra_bonificada === compraBonificada.id_compra_bonificada
        );
        this.comprasBonificadas.splice(indexCompraBonificada, 1);
        this.$store.commit('invalidarCache', [KEY_CACHES.DASHBOARD, KEY_CACHES.MOVIMENTACOES]);
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    onInserted(compraBonificada) {
      this.comprasBonificadas.unshift(compraBonificada);
      this.onResetForm();
    },
    onUpdated(compraBonificada) {
      let indexCompraBonificada = this.comprasBonificadas.findIndex(
        (user) => user.id_compra_bonificada === compraBonificada.id_compra_bonificada
      );
      this.comprasBonificadas.splice(indexCompraBonificada, 1);
      this.comprasBonificadas.unshift(compraBonificada);
      this.onResetForm();
    },
  },
};
</script>
