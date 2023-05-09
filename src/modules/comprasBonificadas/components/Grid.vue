<template>
  <div>
    <v-row class="d-flex align-center justify-center pb-4">
      <v-col md="6">
        <v-text-field
          autofocus
          outlined
          hide-details
          dense
          label="Pesquisar"
          v-model="textoPesquisa"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col md="4" class="d-flex justify-end">
        <v-btn @click="onClickIncluir" color="primary">Incluir</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="textoPesquisa"
      :options="{
        itemsPerPage: 7
      }"
    >
      <template #item.data="{ item }">{{item.data | dataBR}}</template>
      <template #item.valor="{ item }">{{item.valor | money}}</template>
      <template #item.movimentacao.creditado="{ item }">
        <v-chip
          x-small
          width="12px"
          :color="item.movimentacao.creditado === 'S' ? 'success' : 'error'"
          dark
        >{{item.movimentacao.creditado === 'S' ? 'Sim' : 'Não'}}</v-chip>
      </template>
      <template #item.acoes="{ item }">
        <v-icon small class="mr-2" @click="onClickAlterar(item)">mdi-pencil</v-icon>
        <v-icon small @click="onClickDeletar(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Grid",

  components: {},

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      headers: [
        { text: "Data", value: "data" },
        { text: "Produto", value: "produto" },
        { text: "Valor", value: "valor", align: "center" },
        { text: "Pontos", value: "movimentacao.pontos", align: "center" },
        { text: "Creditado", value: "movimentacao.creditado", align: "center" },
        { text: "Ações", value: "acoes", align: "center" },
      ],
      textoPesquisa: undefined,
    };
  },

  methods: {
    onClickAlterar(compraBonificada) {
      this.$emit("alterar", compraBonificada);
    },
    onClickDeletar(compraBonificada) {
      this.$emit("deletar", compraBonificada);
    },
    onClickIncluir() {
      this.$emit("incluir");
    },
  },
};
</script>
