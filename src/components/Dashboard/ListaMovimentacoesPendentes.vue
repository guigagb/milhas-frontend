<template>
  <v-card class="card-lista-movimentacoes">
    <v-card-title>
      Movimentações Pendentes
    </v-card-title>
    <v-divider class="mx-6"></v-divider>
    <v-card-text class="card-lista-movimentacoes__conteudo">
      <v-data-table
        v-if="items.length"
        :items="items"
        :headers="headers"
        hide-default-header
        :options="{
          itemsPerPage: 4
        }"
      >
        <template #item.descricao="{ item }">
          <div
            class="card-lista-movimentacoes__conteudo__item"
            :class="{ 'card-lista-movimentacoes__conteudo__item--red': expirado(item.data_credito) }"
          >
            <v-row class="card-lista-movimentacoes__conteudo__item__titulo">
              <v-col>
                <strong>{{ item.data_credito | dataBR }}</strong>
              </v-col>
              <v-col class="text-center">
                <strong>{{ item.nome_parceiro || item.nome_cartao }}</strong>
              </v-col>
              <v-col class="text-right">
                <strong>{{ item.pontos | integer }} pt</strong>
              </v-col>
            </v-row>
            <span class="card-lista-movimentacoes__conteudo__item__descricao">
              {{ item.descricao }}
            </span>
          </div>
        </template>
      </v-data-table>
      <h3
        v-else
        class="card-lista-movimentacoes__conteudo__vazio"
      >
        Nenhuma movimentação pendente
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
        { text: "Descrição", value: "descricao" },
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
.card-lista-movimentacoes {
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
      margin-top: 80px;
      opacity: 0.5;
    }
  }
}
</style>