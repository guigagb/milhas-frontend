<template>
  <v-card class="card-lista-saldos">
    <v-card-title>
      Saldos Disponíveis
    </v-card-title>
    <v-card-text class="card-lista-movimentacoes__conteudo">
      <v-data-table v-if="items.length" :headers="headers" :items="items" :options="{
        itemsPerPage: 5
      }">
        <template #item.nome_parceiro="{ item }">{{ item.nome_parceiro || item.nome_cartao }}</template>
        <template #item.total="{ item }">{{ item.total | integer }}</template>
        <template #item.custo_medio="{ item }">{{ item.custo_medio | money }}</template>
      </v-data-table>
      <h3 v-else class="card-lista-saldos__conteudo__vazio">
        Nenhum saldo disponível
      </h3>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ListaSaldos",

  props: {
    items: {
      type: Array,
      default: () => ([]),
    },
  },

  data() {
    return {
      headers: [
        { text: "Nome", value: "nome_parceiro" },
        { text: "Pontos", value: "total", align: "center" },
        { text: "CMM", value: "custo_medio", align: "center" },
        { text: "CPF's dispon.", value: "qtd_cpf", align: "center" },
      ],
    };
  }
};
</script>

<style lang="scss" scoped>
.card-lista-saldos {
  height: 430px;

  &__conteudo {
    display: flex;
    justify-content: center;

    &__vazio {
      width: 250px;
      text-align: center;
      margin-top: 100px;
      opacity: 0.5;
    }

  }
}
</style>