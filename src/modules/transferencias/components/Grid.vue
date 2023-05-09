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
      <template #item.pontos="{ item }">{{item.pontos | integer}}</template>
      <template #item.percentual_bonus="{ item }">{{item.percentual_bonus | money}}</template>
      <template #item.total_pontos="{ item }">{{item.total_pontos | integer}}</template>
      <template #item.acoes="{ item }">
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
        { text: "Origem", value: "origem" },
        { text: "Destino", value: "destino" },
        { text: "Pontos", value: "pontos", align: "center" },
        { text: "Bônus %", value: "percentual_bonus", align: "center" },
        { text: "Total Pontos", value: "total_pontos", align: "center" },
        { text: "Ações", value: "acoes", align: "center" },
      ],
      textoPesquisa: undefined,
    };
  },

  methods: {
    onClickDeletar(transferencia) {
      this.$emit("deletar", transferencia);
    },
    onClickIncluir() {
      this.$emit("incluir");
    },
  },
};
</script>
