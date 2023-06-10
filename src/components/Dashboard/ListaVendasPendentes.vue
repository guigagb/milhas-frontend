<template>
  <v-card class="card-lista-vendas">
    <v-card-title>
      Vendas Pendentes
    </v-card-title>
    <v-card-text class="card-lista-vendas__conteudo">
      <v-data-table
        v-if="items.length"
        :items="items"
        :headers="headers"
        :options="{
          itemsPerPage: 5
        }"
      >
        <template #item.data_recebimento="{ item }">
          <span :class="{ 'card-lista-vendas__conteudo__item--red': expirado(item.data_recebimento) }">
            {{ item.data_recebimento | dataBR }}
          </span>
        </template>
        <template #item.nome_plataforma_venda="{ item }">
          <span :class="{ 'card-lista-vendas__conteudo__item--red': expirado(item.data_recebimento) }">
            {{ item.nome_plataforma_venda }}
          </span>
        </template>
        <template #item.valor="{ item }">
          <span :class="{ 'card-lista-vendas__conteudo__item--red': expirado(item.data_recebimento) }">
            {{ item.valor | money }}
          </span>
        </template>
      </v-data-table>
      <h3
        v-else
        class="card-lista-vendas__conteudo__vazio"
      >
        Nenhuma venda pendente
      </h3>
    </v-card-text>
  </v-card>
</template>

<script>

import * as moment from 'moment';

export default {
  name: "ListaMovimentacoesPendentes",

  props: {
    items: {
      type: Array,
      default: () => ([]),
    },
  },

  data() {
    return {
      headers: [
        { text: "Data Receb.", value: "data_recebimento" },
        { text: "Plataforma", value: "nome_plataforma_venda" },
        { text: "Valor", value: "valor" },
      ]
    };
  },

  methods: {
    expirado(data) {
      return moment(data).isBefore(moment());
    }
  }
};
</script>

<style lang="scss" scoped>
.card-lista-vendas {
  min-height: 430px;
  max-height: 600px;

  overflow-y: auto;

  &__conteudo {
    display: flex;
    justify-content: center;

    &__item {

      margin: 0.8rem 0;

      &--red {
        color: #E57373;
      }

      &__titulo {
        display: flex;
        justify-content: space-between;
      }

    }

    &__vazio {
      width: 250px;
      text-align: center;
      margin-top: 100px;
      opacity: 0.5;
    }
  }
}
</style>