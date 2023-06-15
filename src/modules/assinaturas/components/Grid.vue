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
      <v-col
        md="4"
        class="d-flex justify-end"
      >
        <v-btn
          @click="onClickIncluir"
          color="primary"
        >Incluir</v-btn>
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
      <template #item.nome="{ item }">{{ item.nome_parceiro || item.nome_cartao }}</template>
      <template #item.pontos_mensal="{ item }">{{ item.pontos_mensal | integer }}</template>
      <template #item.custo_mensal="{ item }">{{ item.custo_mensal | money }}</template>
      <template #item.acoes="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="onClickAlterar(item)"
        >mdi-pencil</v-icon>
        <v-icon
          small
          @click="onClickDeletar(item)"
        >mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "AssinaturasGrid",

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
        { text: "Pontos Mensal", value: "pontos_mensal", align: "center" },
        { text: "Custo", value: "custo_mensal", align: "center" },
        { text: "Dia Lançamento", value: "dia_lancamento", align: "center" },
        { text: "Ações", value: "acoes", align: "center" },
      ],
      textoPesquisa: undefined,
    };
  },

  methods: {
    onClickAlterar(assinatura) {
      this.$emit("alterar", assinatura);
    },
    onClickDeletar(assinatura) {
      this.$emit("deletar", assinatura);
    },
    onClickIncluir() {
      this.$emit("incluir");
    },
  },
};
</script>
