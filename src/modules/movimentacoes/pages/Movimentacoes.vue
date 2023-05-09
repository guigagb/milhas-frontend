<template>
  <div>
    <h2 class="pb-4">Movimentações</h2>
    <v-card elevation="2" class="pa-4">
      <Grid v-if="mostrarGrid" :items="movimentacoes" :loading="loading" :page="page" :qtdPages="qtdPages"
        @incluir="onClickIncluir" @alterar="onClickAlterar" @creditar="onClickCreditar" @deletar="onClickDeletar"
        @updatePage="updatePage" />
      <Form :id_movimentacao="id_movimentacao" @inserted="onInserted" @updated="onUpdated" @reset="onResetForm" v-else />
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Form from "@/modules/movimentacoes/components/Form";
import Grid from "@/modules/movimentacoes/components/Grid";
import movimentacoesService from "@/modules/movimentacoes/services/movimentacoes.service";
import { temCache } from "@/js/util";
import { KEY_CACHES } from "@/js/constants";


const ACAO_LISTAR = "listar";
const ACAO_INCLUIR = "incluir";
const ACAO_ALTERAR = "alterar";

export default {
  name: "Movimentacoes",

  components: {
    Form,
    Grid,
  },

  activated() {
    this.getMovimentacoes({
      page: 1,
    });
  },

  data() {
    return {
      movimentacoes: [],
      todasMovimentacoes: {},
      id_movimentacao: undefined,
      acao: ACAO_LISTAR,
      loading: true,
      page: 1,
      qtdPages: 1,
    };
  },

  computed: {
    ...mapState(['caches']),
    mostrarGrid() {
      return this.acao === ACAO_LISTAR;
    },
  },

  methods: {
    async getMovimentacoes({ page } = { page: 1 }) {
      try {
        this.loading = true;

        if (!temCache(this.caches, KEY_CACHES.MOVIMENTACOES)) {
          this.movimentacoes = [];
          this.todasMovimentacoes = {};
        }

        if (this.todasMovimentacoes[page]) {
          this.movimentacoes = this.todasMovimentacoes[page];
          this.page = page;
          return;
        }

        this.$store.commit("setLoading", true);
        const { data, pagination } = await movimentacoesService.getMovimentacoes(page);
        this.movimentacoes = data;
        this.qtdPages = pagination.totalPages;
        this.page = pagination.currentPage;
        this.todasMovimentacoes[this.page] = data;
        this.$store.commit('adicionarCache', KEY_CACHES.MOVIMENTACOES);
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.loading = false;
        this.$store.commit("setLoading", false);
      }
    },
    onResetForm() {
      this.acao = ACAO_LISTAR;
      this.id_movimentacao = undefined;
      this.$store.commit('invalidarCache', KEY_CACHES.DASHBOARD);
    },
    onClickIncluir() {
      this.acao = ACAO_INCLUIR;
      this.id_movimentacao = undefined;
    },
    onClickAlterar(movimentacao) {
      this.acao = ACAO_ALTERAR;
      this.id_movimentacao = movimentacao.id_movimentacao;
    },
    async onClickCreditar(movimentacao) {
      try {
        this.$store.commit("setLoading", true);
        await movimentacoesService.creditarMovimentacao(movimentacao.id_movimentacao, {
          creditado: "S",
        });
        let movimentacaoFiltrada = this.movimentacoes.find((user) => user.id_movimentacao === movimentacao.id_movimentacao);
        movimentacaoFiltrada.creditado = "S";
        this.$store.commit('invalidarCache', KEY_CACHES.DASHBOARD);
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    async onClickDeletar(movimentacao) {
      this.$confirm(`Deseja realmente deletar a movimentação (${movimentacao.descricao})?`, "Atenção", "warning").then(
        () => {
          this.deleteMovimentacao(movimentacao);
        }
      );
    },
    async deleteMovimentacao(movimentacao) {
      try {
        this.$store.commit("setLoading", true);
        await movimentacoesService.deleteMovimentacao(movimentacao.id_movimentacao);
        let indexMovimentacao = this.movimentacoes.findIndex(
          (user) => user.id_movimentacao === movimentacao.id_movimentacao
        );
        this.movimentacoes.splice(indexMovimentacao, 1);
        this.$store.commit('invalidarCache', KEY_CACHES.DASHBOARD);
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    onInserted(movimentacao) {
      this.movimentacoes.unshift(movimentacao);
      this.onResetForm();
    },
    onUpdated(movimentacao) {
      let indexMovimentacao = this.movimentacoes.findIndex((user) => user.id_movimentacao === movimentacao.id_movimentacao);
      this.movimentacoes.splice(indexMovimentacao, 1);
      this.movimentacoes.unshift(movimentacao);
      this.onResetForm();
    },
    async updatePage(page) {
      await this.getMovimentacoes({
        page,
      });
    },
  },
};
</script>
