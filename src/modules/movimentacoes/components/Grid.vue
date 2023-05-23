<template>
  <div>
    <v-row class="d-flex align-center justify-center pb-4">
      <v-col md="6">
        <v-text-field autofocus outlined hide-details dense label="Pesquisar" v-model="textoPesquisa"></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col md="4" class="d-flex justify-end">
        <v-btn @click="onClickIncluir" color="primary">Incluir</v-btn>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="items" :search="textoPesquisa" :options="{
      itemsPerPage: 7
    }" :hide-default-footer="true">
      <template #item.data="{ item }">{{ item.data | dataBR }}</template>
      <template #item.data_credito="{ item }">{{ item.data_credito | dataBR }}</template>
      <template #item.creditado="{ item }">
        <v-chip x-small width="12px" :color="item.creditado === 'S' ? 'success' : 'error'" dark>{{ item.creditado === 'S'
          ?
          'Sim' : 'Não' }}</v-chip>
      </template>
      <template #item.acoes="{ item }">
        <v-icon v-if="item.creditado === 'N'" small class="mr-2" hin
          @click="onClickCreditar(item)">mdi-check-circle</v-icon>
        <v-icon v-if="item.manual === 'S'" small class="mr-2" @click="onClickAlterar(item)">mdi-pencil</v-icon>
        <v-icon v-if="mostrarBotaoDeletar(item)" small @click="onClickDeletar(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination :value="page" @input="updatePage" :length="qtdPages" :total-visible="7"></v-pagination>
    </div>
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
    loading: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 1,
    },
    qtdPages: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      headers: [
        { text: "Data", value: "data", align: "center" },
        { text: "Descrição", value: "descricao" },
        { text: "Pontos", value: "pontos", align: "center" },
        { text: "Efetivado", value: "creditado", align: "center" },
        { text: "Data efetivação", value: "data_credito", align: "center" },
        { text: "Ações", value: "acoes", align: "center" },
      ],
      textoPesquisa: undefined,
    };
  },

  computed: {
    pagination() {
      return {
        sortBy: "name",
        descending: false,
        page: this.page,
        rowsPerPage: 10,
      };
    },
  },

  methods: {
    onClickAlterar(movimentacao) {
      this.$emit("alterar", movimentacao);
    },
    onClickDeletar(movimentacao) {
      this.$emit("deletar", movimentacao);
    },
    onClickIncluir() {
      this.$emit("incluir");
    },
    onClickCreditar(movimentacao) {
      this.$emit("creditar", movimentacao);
    },
    updatePage(page) {
      this.$emit("updatePage", page);
    },
    mostrarBotaoDeletar(item) {
      return item.manual === "S";
    },
  },
};
</script>
