<template>
  <div class="dashboard">
    <v-row>
      <v-col cols="6">
        <h2>Dashboard</h2>
      </v-col>
    </v-row>
    <div class="my-0 py-0 container-progress">
      <v-progress-linear v-if="loading" class="ma-0" indeterminate></v-progress-linear>
    </div>
    <v-row class="mt-0">
      <v-col>
        <CardInfoDuploValor color="#23b7e5" title="Compras Bonificadas" icon="mdi-cart"
          :valor="comprasBonificadas.creditado | integer" :valor2="comprasBonificadas.naoCreditado | integer"
          texto1="Creditado" texto2="Não Creditado" />
      </v-col>
      <v-col>
        <CardInfoDuploValor color="#f39c12" title="Transferências" aumento="2" icon="mdi-sync"
          :valor="transferencias.creditado | integer" :valor2="transferencias.naoCreditado | integer" texto1="Creditado"
          texto2="Não Creditado" />
      </v-col>
      <v-col>
        <CardInfoDuploValor color="#2ecc71" title="Vendas" icon="mdi-cash-multiple" :valor="vendas.creditado | money"
          :valor2="vendas.naoCreditado | money" texto1="Recebido" texto2="Não Recebido" />
      </v-col>
      <v-col>
        <CardInfoDuploValor class="primary" title="Lucro Líquido" icon="mdi-cash-check"
          :valor="lucroLiquido.creditado | money" :valor2="lucroLiquido.naoCreditado | money" texto1="Recebido"
          texto2="Não Recebido" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <ListaSaldos :items="totaisParceiros" />
      </v-col>
      <v-col cols="12" md="4">
        <ListaVendasPendentes :items="vendasPendentes" />
      </v-col>
      <v-col cols="12" md="4">
        <ListaMovimentacoesPendentes :items="movimentacoesPendentes" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardInfoDuploValor from "./CardInfoDuploValor.vue";
import dashboardService from "./dashboard.service";
import { KEY_CACHES } from "@/js/constants";
import { temCache } from "@/js/util";
import ListaSaldos from "./ListaSaldos.vue";
import ListaMovimentacoesPendentes from "./ListaMovimentacoesPendentes.vue";
import ListaVendasPendentes from "./ListaVendasPendentes.vue";

export default {
  name: "Dashboard",
  components: {
    CardInfoDuploValor,
    ListaSaldos,
    ListaMovimentacoesPendentes,
    ListaVendasPendentes
  },
  data() {
    return {
      loading: false,
      comprasBonificadas: {
        creditado: 0,
        naoCreditado: 0,
      },
      transferencias: {
        creditado: 0,
        naoCreditado: 0,
      },
      vendas: {
        creditado: 0,
        naoCreditado: 0,
      },
      lucroLiquido: {
        creditado: 0,
        naoCreditado: 0,
      },
      totaisParceiros: [],
      movimentacoesPendentes: [],
      vendasPendentes: [],
    };
  },

  activated() {
    this.getDadosDashboard();
  },

  computed: {
    ...mapState(['caches']),
  },

  methods: {
    clearValues() {
      this.comprasBonificadas = {
        creditado: 0,
        naoCreditado: 0,
      };

      this.transferencias = {
        creditado: 0,
        naoCreditado: 0,
      };

      this.vendas = {
        creditado: 0,
        naoCreditado: 0,
      };

      this.lucroLiquido = {
        creditado: 0,
        naoCreditado: 0,
      };
    },

    async getDadosDashboard() {

      if (temCache(this.caches, KEY_CACHES.DASHBOARD)) return;

      this.clearValues();

      try {
        this.loading = true;
        const {
          cards,
          totaisParceiros,
          movimentacoesPendentes,
          vendasPendentes,
        } = await dashboardService.getDadosDashboard();

        this.comprasBonificadas = cards.comprasBonificadas;
        this.transferencias = cards.transferencias;
        this.vendas = cards.vendas;
        this.lucroLiquido = cards.lucroLiquido;
        this.totaisParceiros = totaisParceiros;
        this.movimentacoesPendentes = movimentacoesPendentes;
        this.vendasPendentes = vendasPendentes;

        this.$store.commit('adicionarCache', KEY_CACHES.DASHBOARD);
      } catch (error) {
        this.$notify.error("ocorreu um erro ao buscar os dados");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.dashboard .container-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5px;
}
</style>
