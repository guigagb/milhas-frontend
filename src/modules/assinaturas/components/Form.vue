<template>
  <v-form
    id="formAssinatura"
    class="pa-4 full-width"
  >
    <v-row>
      <v-col
        md="6"
        cols="12"
      >
        <v-autocomplete
          :items="parceiros"
          v-model="form.id_parceiro"
          item-text="nome"
          item-value="id_parceiro"
          label="Parceiros / Cartões"
          dense
          outlined
          hide-details
          class="obr"
          :disabled="isEdicao"
        ></v-autocomplete>
      </v-col>
      <v-col
        md="2"
        cols="12"
      >
        <vuetify-money
          label="Pontos"
          v-model="form.pontos_mensal"
          class="obr"
          hide-details
          outlined
          dense
          ref="edtPontos"
          :options="{
            locale: 'pt-BR',
            precision: 0,
          }"
        ></vuetify-money>
      </v-col>
      <v-col
        md="2"
        cols="12"
      >
        <vuetify-money
          label="Custo Mensal"
          v-model="form.custo_mensal"
          hide-details
          outlined
          dense
          :options="{
            locale: 'pt-BR',
            precision: 2,
          }"
        ></vuetify-money>
      </v-col>
      <v-col
        md="2"
        cols="12"
      >
        <vuetify-money
          label="Dia Lançamento"
          v-model="form.dia_lancamento"
          class="obr"
          hide-details
          outlined
          dense
          ref="edtDiaLancamento"
          :options="{
            locale: 'pt-BR',
            precision: 0,
          }"
        ></vuetify-money>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-spacer></v-spacer>
      <v-btn
        @click="onClickCancelar"
        color="primary"
        outlined
        class="mr-2"
      >Cancelar</v-btn>
      <v-btn
        @click="onClickSalvar"
        color="primary"
      >Salvar</v-btn>
    </v-row>
  </v-form>
</template>

<script>
import service from "@/modules/assinaturas/services/assinaturas.service";
import { validarObr, sanitizarDadosForm } from "@/js/util";

export default {
  name: "AssinaturasForm",

  components: {},

  props: {
    id_assinatura: {
      type: Number,
      default: undefined,
    },
  },

  async beforeMount() {
    this.parceiros = await service.getParceiros();

    if (this.id_assinatura) {
      this.getAssinatura(this.id_assinatura);
    }
  },

  data() {
    return {
      form: {
        custo_mensal: 0,
        pontos_mensal: 0,
        dia_lancamento: undefined,
        id_parceiro: undefined,
      },
      parceiros: [],
    };
  },

  computed: {
    isEdicao() {
      return this.id_assinatura ? true : false;
    },

    parceiro() {
      return this.parceiros.find((parceiro) => parceiro.id_parceiro === this.form.id_parceiro);
    }
  },

  methods: {
    onClickCancelar() {
      this.$emit("reset");
    },

    async onClickSalvar() {
      if (!validarObr("#formAssinatura")) return;

      this.form.custo_mensal = this.form.custo_mensal ?? 0;

      if (parseInt(this.form.pontos_mensal) === 0) {
        this.$notify.error('Qtd. de pontos deve ser maior que 0.');
        return;
      }

      const diaLancamento = parseInt(this.form.dia_lancamento);

      if (!diaLancamento || diaLancamento < 1 || diaLancamento > 31) {
        this.$notify.error('dia de lançamento inválido');
        return;
      }

      if (!this.id_assinatura) {
        await this.insert();
      } else {
        await this.update();
      }
    },

    async getAssinatura(id_assinatura) {
      try {
        this.$store.commit("setLoading", true);
        const { id_parceiro, pontos_mensal, custo_mensal, dia_lancamento } = await service.getAssinatura(id_assinatura);

        this.form.id_parceiro = id_parceiro;
        this.form.pontos_mensal = pontos_mensal;
        this.form.custo_mensal = custo_mensal;
        this.form.dia_lancamento = dia_lancamento;
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },

    async insert() {
      try {
        this.$store.commit("setLoading", true);
        const { id_assinatura } = await service.insertAssinatura(this.form);
        const dados = sanitizarDadosForm(this.form);

        const item = {
          ...dados,
          id_assinatura,
          nome_parceiro: this.parceiro.nome,
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
        delete dadosToUpdate.id_parceiro;
        await service.updateAssinatura(this.id_assinatura, dadosToUpdate);
        const item = {
          ...this.form,
          id_assinatura: this.id_assinatura,
          nome_parceiro: this.parceiro.nome,
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
