<template>
  <v-form id="formMovimentacao" class="pa-4 full-width">
    <v-row>
      <v-col md="2" cols="12">
        <input hidden v-model="form.id_movimentacao" />
        <v-text-field label="Data" v-model="form.data" class="obr" hide-details outlined dense type="date"
          ref="edtData"></v-text-field>
      </v-col>
      <v-col md="6" cols="12">
        <v-text-field label="Descrição" v-model="form.descricao" class="obr" hide-details outlined dense
          maxlength="120"></v-text-field>
      </v-col>
      <v-col md="2" cols="12">
        <vuetify-money label="Pontos" v-model="form.pontos" class="obr" hide-details outlined dense :options="{
          locale: 'pt-BR',
          precision: 0,
        }"></vuetify-money>
      </v-col>
      <v-col md="2" cols="12">
        <vuetify-money label="Custo" v-model="form.custo" hide-details outlined dense></vuetify-money>
      </v-col>
      <v-col md="4" cols="12">
        <v-autocomplete :items="lojas" v-model="form.id_loja" item-text="nome" item-value="id_loja" label="Loja" dense
          outlined hide-details clearable></v-autocomplete>
      </v-col>
      <v-col md="4" cols="12">
        <v-autocomplete :items="parceiros" v-model="form.id_parceiro" item-text="nome" item-value="id_parceiro"
          label="Parceiro" dense outlined hide-details clearable></v-autocomplete>
      </v-col>
      <v-col md="4" cols="12">
        <v-autocomplete :items="cartoes" v-model="form.id_cartao" item-text="nome" item-value="id_cartao" label="Cartão"
          dense outlined hide-details clearable></v-autocomplete>
      </v-col>
      <v-col md="2" cols="12">
        <v-text-field label="Dias Crédito" v-model="form.dias_credito" class="obr" hide-details outlined dense
          type="number"></v-text-field>
      </v-col>
      <v-col md="2" cols="12">
        <v-autocomplete :items="itensSimNao" v-model="form.creditado" label="Creditado" dense outlined hide-details
          class="obr"></v-autocomplete>
      </v-col>
      <v-col md="2" cols="12">
        <v-autocomplete :items="itensEntradaSaida" v-model="form.tipo_entrada" @change="onChangeTipoMovimentacao"
          label="Tipo de Movimentação" dense outlined hide-details class="obr"></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-spacer></v-spacer>
      <v-btn @click="onClickCancelar" color="primary" outlined class="mr-2">Cancelar</v-btn>
      <v-btn @click="onClickSalvar" color="primary">Salvar</v-btn>
    </v-row>
  </v-form>
</template>

<script>
import service from "@/modules/movimentacoes/services/movimentacoes.service";
import { validarObr, sanitizarDadosForm } from "@/js/util";

export default {
  name: "Form",

  components: {},

  props: {
    id_movimentacao: {
      type: Number,
      default: undefined,
    },
  },

  data() {
    return {
      form: {
        data: undefined,
        descricao: undefined,
        pontos: 0,
        custo: undefined,
        id_loja: undefined,
        id_cartao: undefined,
        id_parceiro: undefined,
        dias_credito: undefined,
        creditado: "N",
        tipo_entrada: undefined,
        origem: "MOVIMENTACOES",
        manual: "S",
      },
      parceiros: [],
      cartoes: [],
      itensSimNao: [
        { text: "Sim", value: "S" },
        { text: "Não", value: "N" },
      ],
      itensEntradaSaida: [
        { text: "Entrada", value: "E" },
        { text: "Saída", value: "S" },
      ],
    };
  },

  async beforeMount() {
    try {
      this.parceiros = await service.getParceiros();
      this.cartoes = await service.getCartoes();

      if (this.id_movimentacao) {
        await this.getMovimentacao(this.id_movimentacao);
      }
    } catch (error) {
      this.$notify.error("Ocorreu um erro desconhecido");
    }
  },

  computed: {
    isEdicao() {
      return this.id_movimentacao ? true : false;
    },

    lojas() {
      return this.$store.state.lojas;
    },
  },

  methods: {
    onClickCancelar() {
      this.$emit("reset");
    },

    onChangeTipoMovimentacao(tipo) {
      if (tipo === "E") {
        this.form.pontos = Math.abs(this.form.pontos);
      } else {
        this.form.pontos = Math.abs(this.form.pontos) * -1;
      }
    },

    async onClickSalvar() {
      if (!validarObr("#formMovimentacao")) return;

      if (!this.form.pontos) {
        this.$notify.error("O campo pontos deve ser preenchido");
        return;
      }

      if (!this.form.id_parceiro && !this.form.id_cartao) {
        this.$notify.error("O campo parceiro ou cartão deve ser preenchido");
        return;
      }

      if (!this.id_movimentacao) {
        await this.insert();
      } else {
        await this.update();
      }
    },

    async getMovimentacao(id_movimentacao) {
      try {
        this.$store.commit("setLoading", true);
        const movimentacao = await service.getMovimentacao(id_movimentacao);

        this.form.data = movimentacao.data;
        this.form.descricao = movimentacao.descricao;
        this.form.pontos = movimentacao.pontos;
        this.form.custo = movimentacao.custo;
        this.form.id_loja = movimentacao.id_loja;
        this.form.id_parceiro = movimentacao.id_parceiro;
        this.form.id_cartao = movimentacao.id_cartao;
        this.form.dias_credito = movimentacao.dias_credito;
        this.form.creditado = movimentacao.creditado;
        this.form.origem = movimentacao.origem;
        this.form.tipo_entrada = movimentacao.tipo_entrada;
        this.form.manual = movimentacao.manual;
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },

    async insert() {
      try {
        this.$store.commit("setLoading", true);
        const form = sanitizarDadosForm(this.form);
        const { id_movimentacao, movimentacao } = await service.insertMovimentacao(form);
        const item = {
          ...form,
          id_movimentacao,
          movimentacao,
        };
        this.$emit("inserted", item);
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },

    async update() {
      try {
        this.$store.commit("setLoading", true);
        const form = sanitizarDadosForm(this.form);
        const { movimentacao } = await service.updateMovimentacao(this.id_movimentacao, form);
        const item = {
          ...this.form,
          id_movimentacao: this.id_movimentacao,
          movimentacao,
        };

        this.$emit("updated", item);
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
  },
};
</script>
