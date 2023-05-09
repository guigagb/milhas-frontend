<template>
  <div>
    <h2 class="pb-4">Cartões</h2>
    <v-card elevation="2" class="pa-4">
      <Grid
        v-if="mostrarGrid"
        :items="cartoes"
        @incluir="onClickIncluir"
        @alterar="onClickAlterar"
        @deletar="onClickDeletar"
      />
      <Form
        :id_cartao="id_cartao"
        @inserted="onInserted"
        @updated="onUpdated"
        @reset="onResetForm"
        v-else
      />
    </v-card>
  </div>
</template>

<script>
import Form from "@/modules/cartoes/components/Form";
import Grid from "@/modules/cartoes/components/Grid";
import cartoesService from "@/modules/cartoes/services/cartoes.service";

const ACAO_LISTAR = "listar";
const ACAO_INCLUIR = "incluir";
const ACAO_ALTERAR = "alterar";

export default {
  name: "Cartoes",

  components: {
    Form,
    Grid,
  },

  created() {
    this.getCartoes();
  },

  data() {
    return {
      cartoes: [],
      id_cartao: undefined,
      acao: ACAO_LISTAR,
    };
  },

  computed: {
    mostrarGrid() {
      return this.acao === ACAO_LISTAR;
    },
  },

  methods: {
    async getCartoes() {
      try {
        this.$store.commit("setLoading", true);
        this.cartoes = await cartoesService.getCartoes();
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    onResetForm() {
      this.acao = ACAO_LISTAR;
      this.id_cartao = undefined;
    },
    onClickIncluir() {
      this.acao = ACAO_INCLUIR;
      this.id_cartao = undefined;
    },
    onClickAlterar(cartao) {
      this.acao = ACAO_ALTERAR;
      this.id_cartao = cartao.id_cartao;
    },
    async onClickDeletar(cartao) {
      this.$confirm(`Deseja realmente deletar o cartão (${cartao.nome})?`, "Atenção", "warning").then(() => {
        this.deleteCartao(cartao);
      });
    },
    async deleteCartao(cartao) {
      try {
        this.$store.commit("setLoading", true);
        await cartoesService.deleteCartao(cartao.id_cartao);
        let indexCartao = this.cartoes.findIndex((user) => user.id_cartao === cartao.id_cartao);
        this.cartoes.splice(indexCartao, 1);
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    onInserted(cartao) {
      this.cartoes.push(cartao);
      this.onResetForm();
    },
    onUpdated(cartao) {
      let indexCartao = this.cartoes.findIndex((user) => user.id_cartao === cartao.id_cartao);
      this.cartoes.splice(indexCartao, 1);
      this.cartoes.unshift(cartao);
      this.onResetForm();
    },
  },
};
</script>
