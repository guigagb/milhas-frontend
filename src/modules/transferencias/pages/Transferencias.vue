<template>
  <div>
    <h2 class="pb-4">Transferências</h2>
    <v-card
      elevation="2"
      class="pa-4"
    >
      <Grid
        v-if="mostrarGrid"
        :items="transferencias"
        @incluir="onClickIncluir"
        @deletar="onClickDeletar"
      />
      <Form
        :id_transferencia="id_transferencia"
        @inserted="onInserted"
        @updated="onUpdated"
        @reset="onResetForm"
        v-else
      />
    </v-card>
  </div>
</template>

<script>
import Form from "@/modules/transferencias/components/Form";
import Grid from "@/modules/transferencias/components/Grid";
import transferenciasService from "@/modules/transferencias/services/transferencias.service";
import { KEY_CACHES } from "@/js/constants";

const ACAO_LISTAR = "listar";
const ACAO_INCLUIR = "incluir";

export default {
  name: "Transferencias",

  components: {
    Form,
    Grid,
  },

  created() {
    this.getTransferencias();
  },

  data() {
    return {
      transferencias: [],
      id_transferencia: undefined,
      acao: ACAO_LISTAR,
    };
  },

  computed: {
    mostrarGrid() {
      return this.acao === ACAO_LISTAR;
    },
  },

  methods: {
    async getTransferencias() {
      try {
        this.$store.commit("setLoading", true);
        this.transferencias = await transferenciasService.getTransferencias();
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    onResetForm() {
      this.acao = ACAO_LISTAR;
      this.id_transferencia = undefined;
      this.$store.commit('invalidarCache', [KEY_CACHES.DASHBOARD, KEY_CACHES.MOVIMENTACOES]);
    },
    onClickIncluir() {
      this.acao = ACAO_INCLUIR;
      this.id_transferencia = undefined;
    },
    async onClickDeletar(transferencia) {
      this.$confirm(
        `
        Deseja realmente deletar a transferência (${transferencia.origem} -> ${transferencia.destino})?`,
        "Atenção",
        "warning"
      ).then(() => {
        this.deleteTransferencia(transferencia);
      });
    },
    async deleteTransferencia(transferencia) {
      try {
        this.$store.commit("setLoading", true);
        await transferenciasService.deleteTransferencia(transferencia.id_transferencia);
        let indexTransferencia = this.transferencias.findIndex(
          (user) => user.id_transferencia === transferencia.id_transferencia
        );
        this.transferencias.splice(indexTransferencia, 1);
        this.$store.commit('invalidarCache', [KEY_CACHES.DASHBOARD, KEY_CACHES.MOVIMENTACOES]);
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    onInserted(transferencia) {
      this.transferencias.unshift(transferencia);
      this.onResetForm();
    },
    onUpdated(transferencia) {
      let indexTransferencia = this.transferencias.findIndex(
        (user) => user.id_transferencia === transferencia.id_transferencia
      );
      this.transferencias.splice(indexTransferencia, 1);
      this.transferencias.unshift(transferencia);
      this.onResetForm();
    },
  },
};
</script>
