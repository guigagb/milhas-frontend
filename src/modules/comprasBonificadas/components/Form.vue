<template>
  <v-form id="formCompraBonificada" class="pa-4 full-width">
    <v-row>
      <v-col md="2" cols="12">
        <input hidden v-model="form.id_compra_bonificada" />
        <v-text-field label="Data" v-model="form.data" class="obr" hide-details outlined dense type="date"
          ref="edtData"></v-text-field>
      </v-col>
      <v-col md="6" cols="12">
        <input hidden v-model="form.id_compra_bonificada" />
        <v-text-field label="Produto" v-model="form.produto" class="obr" hide-details outlined dense
          maxlength="120"></v-text-field>
      </v-col>
      <v-col md="2" cols="12">
        <vuetify-money label="Valor" v-model="form.valor" class="obr" hide-details outlined dense></vuetify-money>
      </v-col>
      <v-col md="2" cols="12">
        <vuetify-money label="Custo" v-model="form.custo" hide-details outlined dense></vuetify-money>
      </v-col>
      <v-col md="6" cols="12">
        <v-autocomplete :items="lojas" v-model="form.id_loja" item-text="nome" item-value="id_loja" label="Loja" dense
          outlined hide-details class="obr"></v-autocomplete>
      </v-col>
      <v-col md="6" cols="12">
        <v-autocomplete :items="parceiros" v-model="form.id_parceiro" item-text="nome" item-value="id_parceiro"
          label="Parceiros" dense outlined hide-details class="obr"></v-autocomplete>
      </v-col>
      <v-col md="2" cols="12">
        <v-select :items="itensMoedas" v-model="form.id_moeda" label="Moeda" dense outlined hide-details
          class="obr"></v-select>
      </v-col>
      <v-col md="2" cols="12">
        <vuetify-money :label="labelPontuacao" v-model="form.fator_pontos" class="obr" hide-details outlined dense
          :options="{
            locale: 'pt-BR',
            precision: 0,
          }"></vuetify-money>
      </v-col>
      <v-col md="2" cols="12">
        <v-text-field label="Total pontos" :value="totalPontos" hide-details outlined dense type="number"
          disabled></v-text-field>
      </v-col>
      <v-col md="2" cols="12">
        <v-text-field label="Dias Crédito" v-model="form.dias_credito" class="obr" hide-details outlined dense
          type="number"></v-text-field>
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
import service from "@/modules/comprasBonificadas/services/comprasBonificadas.service";
import { validarObr, sanitizarDadosForm } from "@/js/util";

export default {
  name: "Form",

  components: {},

  props: {
    id_compra_bonificada: {
      type: Number,
      default: undefined,
    },
  },

  data() {
    return {
      form: {
        data: undefined,
        produto: undefined,
        valor: 0,
        custo: undefined,
        id_loja: undefined,
        id_parceiro: undefined,
        id_moeda: undefined,
        fator_pontos: 0,
        dias_credito: undefined,
      },
      parceiros: [],
    };
  },

  async beforeMount() {
    try {
      this.parceiros = await service.getParceiros();

      if (this.id_compra_bonificada) {
        await this.getCompraBonificada(this.id_compra_bonificada);
      }

      this.$refs.edtData.focus();
    } catch (error) {
      this.$notify.error("Ocorreu um erro desconhecido");
    }
  },

  computed: {
    isEdicao() {
      return this.id_compra_bonificada ? true : false;
    },

    moedas() {
      return this.$store.state.moedas;
    },

    lojas() {
      return this.$store.state.lojas;
    },

    itensMoedas() {
      return this.moedas.map((moeda) => {
        return {
          text: moeda.nome,
          value: moeda.id_moeda,
        };
      });
    },

    labelPontuacao() {
      const moeda = this.moedas.find((moeda) => moeda.id_moeda === this.form.id_moeda);
      return moeda === undefined ? "Pontos" : `Pontos por ${moeda.nome.toLowerCase()}`;
    },

    totalPontos() {
      const moeda = this.moedas.find((moeda) => moeda.id_moeda === this.form.id_moeda);
      const cotacao = moeda ? moeda.cotacao : 1;
      return Math.round(this.form.fator_pontos * (this.form.valor / cotacao));
    },
  },

  methods: {
    onClickCancelar() {
      this.$emit("reset");
    },

    async onClickSalvar() {
      if (!validarObr("#formCompraBonificada")) return;

      if (!this.form.valor) {
        this.$notify.error("O campo valor deve ser preenchido");
        return;
      }

      if (!this.id_compra_bonificada) {
        await this.insert();
      } else {
        await this.update();
      }
    },

    async getCompraBonificada(id_compra_bonificada) {
      try {
        this.$store.commit("setLoading", true);
        const compra = await service.getCompraBonificada(id_compra_bonificada);

        this.form.data = compra.data;
        this.form.produto = compra.produto;
        this.form.valor = compra.valor;
        this.form.custo = compra.custo;
        this.form.id_loja = compra.id_loja;
        this.form.id_parceiro = compra.id_parceiro;
        this.form.id_moeda = compra.id_moeda;
        this.form.fator_pontos = compra.fator_pontos;
        this.form.dias_credito = compra.dias_credito;
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
        const { id_compra_bonificada, movimentacao } = await service.insertCompraBonificada(form);
        const item = {
          ...form,
          id_compra_bonificada,
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
        const { movimentacao } = await service.updateCompraBonificada(this.id_compra_bonificada, form);
        const item = {
          ...this.form,
          id_compra_bonificada: this.id_compra_bonificada,
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
