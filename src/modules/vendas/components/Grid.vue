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
      <template #item.data_venda="{ item }">{{item.data_venda | dataBR}}</template>
      <template #item.data_recebimento="{ item }">{{item.data_recebimento | dataBR}}</template>
      <template #item.valor="{ item }">{{item.valor | money}}</template>
      <template #item.qtd_milhas="{ item }">{{item.qtd_milhas | integer}}</template>
      <template #item.lucro="{ item }">{{item.lucro | money}}</template>
      <template #item.recebido="{ item }">
        <v-chip
          x-small
          width="12px"
          :color="item.recebido === 'S' ? 'success' : 'error'"
          dark
        >{{item.recebido === 'S' ? 'Sim' : 'Não'}}</v-chip>
      </template>
      <template #item.acoes="{ item }">
        <v-icon
          v-if="item.recebido === 'N'"
          small
          class="mr-2"
          hin
          @click="onClickCreditar(item)"
        >mdi-check-circle</v-icon>
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
        { text: "Data Venda", value: "data_venda" },
        { text: "Parceiro", value: "parceiro.nome" },
        { text: "Plataforma", value: "plataforma_venda.nome" },
        { text: "Valor", value: "valor", align: "center" },
        { text: "Qtd Milhas", value: "qtd_milhas", align: "center" },
        { text: "Qtd CPF's", value: "qtd_cpf", align: "center" },
        { text: "Data Recebimento", value: "data_recebimento", align: "center" },
        { text: "Recebido", value: "recebido", align: "center" },
        { text: "Ações", value: "acoes", align: "center" },
      ],
      textoPesquisa: undefined,
    };
  },

  methods: {
    onClickAlterar(venda) {
      this.$emit("alterar", venda);
    },
    onClickDeletar(venda) {
      this.$emit("deletar", venda);
    },
    onClickCreditar(venda) {
      this.$emit("creditar", venda);
    },
    onClickIncluir() {
      this.$emit("incluir");
    },
  },
};
</script>
