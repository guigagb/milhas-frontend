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
      <template #item.pontos="{ item }">{{item.pontos | money}}</template>
      <template #item.total_pontos="{ item }">{{item.venda | money}}</template>
      <template #item.acoes="{ item }">
        <v-icon small class="mr-2" @click="onClickAlterar(item)">mdi-pencil</v-icon>
        <v-icon small @click="onClickDeletar(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "CartoesGrid",

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
        { text: "Nome", value: "nome" },
        { text: "Pontuação", value: "pontos", align: "center" },
        { text: "Total Pontos", value: "total_pontos", align: "center" },
        { text: "Moeda", value: "moeda.nome", align: "center" },
        { text: "Ações", value: "acoes", align: "center" },
      ],
      textoPesquisa: undefined,
    };
  },

  methods: {
    onClickAlterar(cartao) {
      this.$emit("alterar", cartao);
    },
    onClickDeletar(cartao) {
      this.$emit("deletar", cartao);
    },
    onClickIncluir() {
      this.$emit("incluir");
    },
  },
};
</script>
