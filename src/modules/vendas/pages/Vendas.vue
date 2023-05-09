<template>
  <div>
    <h2 class="pb-4">Vendas</h2>
    <v-card elevation="2" class="pa-4">
      <Grid v-if="mostrarGrid" :items="vendas" :loading="loading" :page="page" :qtdPages="qtdPages"
        @incluir="onClickIncluir" @alterar="onClickAlterar" @creditar="onClickCreditar" @deletar="onClickDeletar" />
      <Form v-else :id_venda="id_venda" @inserted="onInserted" @updated="onUpdated" @reset="onResetForm" />
    </v-card>
  </div>
</template>

<script>
import Form from "@/modules/vendas/components/Form";
import Grid from "@/modules/vendas/components/Grid";
import vendasService from "@/modules/vendas/services/vendas.service";
import { formatarDataBR, temCache } from "@/js/util";
import { KEY_CACHES } from "@/js/constants";
import { mapState } from "vuex";

const ACAO_LISTAR = "listar";
const ACAO_INCLUIR = "incluir";
const ACAO_ALTERAR = "alterar";

export default {
  name: "Vendas",

  components: {
    Form,
    Grid,
  },

  activated() {
    this.getVendas({
      page: 1,
    });
  },

  data() {
    return {
      vendas: [],
      todasVendas: {},
      id_venda: undefined,
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
    async getVendas() {

      if (temCache(this.caches, KEY_CACHES.VENDAS)) return;

      try {
        this.$store.commit("setLoading", true);
        this.vendas = await vendasService.getVendas();
        this.$store.commit('adicionarCache', KEY_CACHES.VENDAS);
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    onResetForm() {
      this.acao = ACAO_LISTAR;
      this.id_venda = undefined;
      this.$store.commit('invalidarCache', [KEY_CACHES.DASHBOARD, KEY_CACHES.MOVIMENTACOES]);
    },
    onClickIncluir() {
      this.acao = ACAO_INCLUIR;
      this.id_venda = undefined;
    },
    onClickAlterar(venda) {
      this.acao = ACAO_ALTERAR;
      this.id_venda = venda.id_venda;
    },
    async onClickCreditar(venda) {
      try {
        this.$store.commit("setLoading", true);
        await vendasService.updateVenda(venda.id_venda, {
          recebido: "S",
        });

        let vendaLocalizada = this.vendas.find((user) => user.id_venda === venda.id_venda);
        vendaLocalizada.recebido = "S";
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    async onClickDeletar(venda) {
      this.$confirm(
        `
        Deseja realmente deletar a venda de (${venda.parceiro.nome} -> ${venda.plataforma_venda.nome
        }) do dia ${formatarDataBR(venda.data_venda)}?
        `,
        "Atenção",
        "warning"
      ).then(() => {
        this.deleteVenda(venda);
      });
    },
    async deleteVenda(venda) {
      try {
        this.$store.commit("setLoading", true);
        await vendasService.deleteVenda(venda.id_venda);
        let indexVenda = this.vendas.findIndex((user) => user.id_venda === venda.id_venda);
        this.vendas.splice(indexVenda, 1);
        this.$store.commit('invalidarCache', [KEY_CACHES.DASHBOARD, KEY_CACHES.MOVIMENTACOES]);
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    onInserted(venda) {
      this.vendas.unshift(venda);
      this.onResetForm();
    },
    onUpdated(venda) {
      let indexVenda = this.vendas.findIndex((user) => user.id_venda === venda.id_venda);
      this.vendas.splice(indexVenda, 1);
      this.vendas.unshift(venda);
      this.onResetForm();
    },
  },
};
</script>
