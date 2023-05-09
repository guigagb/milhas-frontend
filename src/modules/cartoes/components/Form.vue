<template>
  <v-form id="formCartao" class="pa-4 full-width">
    <v-row>
      <v-col md="6" cols="12">
        <input hidden v-model="form.id_cartao" />
        <v-text-field
          label="Nome"
          v-model="form.nome"
          class="obr"
          hide-details
          outlined
          dense
          maxlength="30"
        ></v-text-field>
      </v-col>
      <v-col md="2" cols="12">
        <vuetify-money
          label="Pontuação"
          v-model="form.pontos"
          class="obr"
          hide-details
          outlined
          dense
          :options="{
            locale: 'pt-BR',
            precision: 1,
          }"
        ></vuetify-money>
      </v-col>
      <v-col md="2" cols="12">
        <v-select
          :items="itensMoedas"
          v-model="form.id_moeda"
          label="Moeda"
          dense
          outlined
          hide-details
          class="obr"
        ></v-select>
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
import service from "@/modules/cartoes/services/cartoes.service";
import { validarObr, sanitizarDadosForm } from "@/js/util";

export default {
  name: "CartoesForm",

  components: {},

  props: {
    id_cartao: {
      type: Number,
      default: undefined,
    },
  },

  created() {
    if (this.id_cartao) {
      this.getCartao(this.id_cartao);
    }
  },

  data() {
    return {
      form: {
        nome: undefined,
        pontos: 0,
        id_moeda: undefined,
        cor: "#fff",
      },
    };
  },

  computed: {
    isEdicao() {
      return this.id_cartao ? true : false;
    },
    moedas() {
      return this.$store.state.moedas;
    },
    itensMoedas() {
      return this.moedas.map((moeda) => {
        return {
          text: moeda.nome,
          value: moeda.id_moeda,
        };
      });
    },
  },

  methods: {
    onClickCancelar() {
      this.$emit("reset");
    },
    async onClickSalvar() {
      if (!validarObr("#formCartao")) return;

      if (!this.id_cartao) {
        await this.insert();
      } else {
        await this.update();
      }
    },
    async getCartao(id_cartao) {
      try {
        this.$store.commit("setLoading", true);
        const { nome, pontos, cor, moeda } = await service.getCartao(id_cartao);
        this.form.nome = nome;
        this.form.pontos = pontos;
        this.form.cor = cor;
        this.form.id_moeda = moeda.id_moeda;
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
    async insert() {
      try {
        this.$store.commit("setLoading", true);
        const { id_cartao } = await service.insertCartao(this.form);
        const dados = sanitizarDadosForm(this.form);
        const item = {
          ...dados,
          id_cartao,
          moeda: this.moedas.find((moeda) => moeda.id_moeda === this.form.id_moeda),
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
        const dadosToUpdate = sanitizarDadosForm(this.form);
        delete dadosToUpdate.qtd;
        await service.updateCartao(this.id_cartao, dadosToUpdate);
        const item = {
          ...this.form,
          id_cartao: this.id_cartao,
          moeda: this.moedas.find((moeda) => moeda.id_moeda === this.form.id_moeda),
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
